import { zodiacSigns, planets } from './constants';

export async function calculateChart(birthDate: string, birthTime: string, latitude: number, longitude: number) {
  try {
    // 驗證輸入參數
    if (!birthDate || !birthTime || latitude === undefined || longitude === undefined) {
      throw new Error('缺少必要參數：出生日期、時間、經度或緯度');
    }

    const response = await fetch('/.netlify/functions/calculate-chart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        birthDate,
        birthTime,
        latitude,
        longitude
      })
    });

    // Check if response is ok before attempting to parse JSON
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `計算星盤時發生錯誤: ${errorText || '伺服器回應錯誤'}`
      );
    }

    // Ensure we have content before parsing
    const text = await response.text();
    if (!text) {
      throw new Error('伺服器返回空回應');
    }

    // Parse the JSON response
    const data = JSON.parse(text);
    return data;

  } catch (error) {
    console.error('Error calculating chart:', error);
    throw error instanceof Error 
      ? error 
      : new Error('計算星盤時發生錯誤');
  }
}

export { zodiacSigns, planets };