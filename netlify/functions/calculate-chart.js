const swisseph = require('swisseph-v2');
const { zodiacSigns, planets } = require('../../src/utils/constants.js');

// 設置星曆路徑 - 使用相對路徑
const ephePath = process.env.NETLIFY ? '/var/runtime/ephe' : './ephe';
swisseph.swe_set_ephe_path(ephePath);

// 獲取星座
function getZodiacSign(longitude) {
  const degree = longitude % 360;
  return zodiacSigns.find(sign => 
    degree >= sign.startDegree && degree < (sign.startDegree + 30)
  ) || zodiacSigns[0];
}

// 格式化度數
function formatDegree(degree) {
  const d = Math.floor(degree);
  const m = Math.floor((degree - d) * 60);
  return `${d}° ${m}'`;
}

// 計算相位
function calculateAspects(positions) {
  const aspects = [];
  const orb = 8; // 容許誤差度數

  for (let i = 0; i < positions.length; i++) {
    for (let j = i + 1; j < positions.length; j++) {
      const diff = Math.abs(positions[i].longitude - positions[j].longitude);
      const adjustedDiff = diff > 180 ? 360 - diff : diff;
      
      if (adjustedDiff <= orb) {
        aspects.push({
          p1: positions[i].name,
          p2: positions[j].name,
          type: '合相',
          angle: 0,
          orb: adjustedDiff
        });
      }
      else if (Math.abs(adjustedDiff - 180) <= orb) {
        aspects.push({
          p1: positions[i].name,
          p2: positions[j].name,
          type: '對分相位',
          angle: 180,
          orb: Math.abs(adjustedDiff - 180)
        });
      }
      else if (Math.abs(adjustedDiff - 120) <= orb) {
        aspects.push({
          p1: positions[i].name,
          p2: positions[j].name,
          type: '三分相位',
          angle: 120,
          orb: Math.abs(adjustedDiff - 120)
        });
      }
      else if (Math.abs(adjustedDiff - 90) <= orb) {
        aspects.push({
          p1: positions[i].name,
          p2: positions[j].name,
          type: '四分相位',
          angle: 90,
          orb: Math.abs(adjustedDiff - 90)
        });
      }
      else if (Math.abs(adjustedDiff - 60) <= orb) {
        aspects.push({
          p1: positions[i].name,
          p2: positions[j].name,
          type: '六分相位',
          angle: 60,
          orb: Math.abs(adjustedDiff - 60)
        });
      }
    }
  }

  return aspects;
}

exports.handler = async (event) => {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  try {
    // Handle OPTIONS request for CORS
    if (event.httpMethod === 'OPTIONS') {
      return {
        statusCode: 204,
        headers
      };
    }

    // 只允許 POST 請求
    if (event.httpMethod !== 'POST') {
      return {
        statusCode: 405,
        headers,
        body: JSON.stringify({ error: 'Method not allowed' })
      };
    }

    // 驗證請求體
    if (!event.body) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: '請求缺少必要參數' })
      };
    }

    // 解析請求體
    let parsedBody;
    try {
      parsedBody = JSON.parse(event.body);
    } catch (e) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: '無效的 JSON 格式' })
      };
    }

    const { birthDate, birthTime, latitude, longitude } = parsedBody;

    // 驗證必要參數
    if (!birthDate || !birthTime || latitude === undefined || longitude === undefined) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: '缺少必要參數：出生日期、時間、經度或緯度' })
      };
    }

    // 解析日期時間
    const [year, month, day] = birthDate.split('-').map(Number);
    const [hour, minute] = birthTime.split(':').map(Number);
    
    // 驗證日期時間
    if (isNaN(year) || isNaN(month) || isNaN(day) || isNaN(hour) || isNaN(minute)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: '日期或時間格式無效' })
      };
    }

    // 計算儒略日
    const jd = swisseph.swe_julday(year, month, day, hour + minute/60, swisseph.SE_GREG_CAL);

    // 計算行星位置
    const planetPositions = await Promise.all(planets.map(async planet => {
      try {
        const result = await swisseph.swe_calc_ut(jd, planet.id, swisseph.SEFLG_SPEED);
        return {
          name: planet.name,
          symbol: planet.symbol,
          longitude: result.longitude,
          latitude: result.latitude,
          distance: result.distance,
          speed: result.speedLong
        };
      } catch (err) {
        console.error(`Error calculating position for ${planet.name}:`, err);
        throw new Error(`計算${planet.name}位置時發生錯誤`);
      }
    }));

    // 計算宮位
    const houses = await swisseph.swe_houses(jd, latitude, longitude, 'P', swisseph.SEFLG_SIDEREAL);
    
    // 計算相位
    const aspects = calculateAspects(planetPositions);

    // 獲取重要天體的星座位置
    const sunPosition = planetPositions.find(p => p.name === '太陽');
    const moonPosition = planetPositions.find(p => p.name === '月亮');
    const ascendant = {
      longitude: houses.house[0],
      name: '上升點'
    };

    // 計算財帛點
    const isDayTime = sunPosition.longitude < 180;
    const fortune = isDayTime
      ? (ascendant.longitude + moonPosition.longitude - sunPosition.longitude) % 360
      : (ascendant.longitude + sunPosition.longitude - moonPosition.longitude) % 360;

    const chartData = {
      planets: planetPositions.map(p => ({
        ...p,
        sign: getZodiacSign(p.longitude),
        formattedLongitude: formatDegree(p.longitude % 30)
      })),
      houses: houses.house,
      aspects,
      mainPoints: {
        sun: {
          position: sunPosition,
          sign: getZodiacSign(sunPosition.longitude),
          degree: formatDegree(sunPosition.longitude % 30)
        },
        moon: {
          position: moonPosition,
          sign: getZodiacSign(moonPosition.longitude),
          degree: formatDegree(moonPosition.longitude % 30)
        },
        ascendant: {
          position: ascendant,
          sign: getZodiacSign(ascendant.longitude),
          degree: formatDegree(ascendant.longitude % 30)
        },
        fortune: {
          longitude: fortune,
          sign: getZodiacSign(fortune),
          degree: formatDegree(fortune % 30)
        }
      }
    };

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(chartData)
    };
  } catch (error) {
    console.error('Error calculating chart:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: error.message || '計算星盤時發生錯誤',
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      })
    };
  }
};