import React from 'react';
import { calculateChart } from '../utils/astrology';

interface BirthChartProps {
  birthDate: string;
  birthTime: string;
  latitude: number;
  longitude: number;
}

const BirthChart: React.FC<BirthChartProps> = ({
  birthDate,
  birthTime,
  latitude,
  longitude
}) => {
  const [error, setError] = React.useState<string | null>(null);
  const chartData = React.useMemo(() => {
    try {
      return calculateChart(birthDate, birthTime, latitude, longitude);
    } catch (error) {
      console.error('Error calculating chart:', error);
      setError(error instanceof Error ? error.message : 'An unknown error occurred');
      return null;
    }
  }, [birthDate, birthTime, latitude, longitude]);

  if (error) {
    return (
      <div className="tarot-card p-6">
        <h3 className="text-xl font-semibold text-red-500 mb-4">Error</h3>
        <p className="text-gray-300">{error}</p>
      </div>
    );
  }

  if (!chartData?.mainPoints) {
    return (
      <div className="tarot-card p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Loading...</h3>
        <p className="text-gray-300">Calculating birth chart...</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <div className="tarot-card p-6">
          <h3 className="text-xl font-semibold text-white mb-4">星盤解析</h3>
          <div className="space-y-4 text-gray-300">
            <p>太陽位於：{chartData.mainPoints.sun.sign.name} {chartData.mainPoints.sun.degree}</p>
            <p>月亮位於：{chartData.mainPoints.moon.sign.name} {chartData.mainPoints.moon.degree}</p>
            <p>上升星座：{chartData.mainPoints.ascendant.sign.name} {chartData.mainPoints.ascendant.degree}</p>
          </div>
        </div>
        
        <div className="tarot-card p-6">
          <h3 className="text-xl font-semibold text-white mb-4">重要相位</h3>
          <div className="space-y-2 text-gray-300">
            {chartData.aspects.map((aspect, index) => (
              <p key={index}>
                {aspect.p1}與{aspect.p2}形成{aspect.type} ({aspect.angle}°)
              </p>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="tarot-card p-6">
          <h3 className="text-xl font-semibold text-white mb-4">行星位置</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {chartData.planets.map((planet, index) => (
              <div key={index} className="flex items-center space-x-2 text-gray-300">
                <span className="text-xl">{planet.symbol}</span>
                <div>
                  <p>{planet.name}</p>
                  <p className="text-sm">{planet.sign.name} {planet.formattedLongitude}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="tarot-card p-6">
          <h3 className="text-xl font-semibold text-white mb-4">宮位分析</h3>
          <div className="space-y-2 text-gray-300">
            {chartData.houses.map((degree, index) => index > 0 && (
              <p key={index}>
                第{index}宮：{getZodiacSign(degree).name} {formatDegree(degree % 30)}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

function getZodiacSign(longitude: number) {
  const zodiacSigns = [
    { name: '白羊座', startDegree: 0 },
    { name: '金牛座', startDegree: 30 },
    { name: '雙子座', startDegree: 60 },
    { name: '巨蟹座', startDegree: 90 },
    { name: '獅子座', startDegree: 120 },
    { name: '處女座', startDegree: 150 },
    { name: '天秤座', startDegree: 180 },
    { name: '天蠍座', startDegree: 210 },
    { name: '射手座', startDegree: 240 },
    { name: '摩羯座', startDegree: 270 },
    { name: '水瓶座', startDegree: 300 },
    { name: '雙魚座', startDegree: 330 }
  ];

  const degree = longitude % 360;
  return zodiacSigns.find(sign => 
    degree >= sign.startDegree && degree < (sign.startDegree + 30)
  ) || zodiacSigns[0];
}

function formatDegree(degree: number) {
  const d = Math.floor(degree);
  const m = Math.floor((degree - d) * 60);
  return `${d}° ${m}'`;
}

export default BirthChart;