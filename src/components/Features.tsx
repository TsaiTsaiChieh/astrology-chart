import React from 'react';
import { Star, Moon, Sun, Heart } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <Star className="h-12 w-12 text-yellow-400" />,
      title: '個人星盤解析',
      description: '深入分析你的出生星盤，了解性格特質和人生方向'
    },
    {
      icon: <Moon className="h-12 w-12 text-blue-400" />,
      title: '行運運勢',
      description: '追蹤行星運行，預測未來機遇與挑戰'
    },
    {
      icon: <Sun className="h-12 w-12 text-orange-400" />,
      title: '專業占星師服務',
      description: '一對一專業占星師諮詢，獲得個人化指導'
    },
    {
      icon: <Heart className="h-12 w-12 text-pink-400" />,
      title: '婚戀占星',
      description: '分析感情運勢，找到最適合的伴侶'
    }
  ];

  return (
    <div className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-600">
              我們的服務
            </span>
          </h2>
          <p className="text-gray-300 text-lg">專業的占星分析，幫助你更好地認識自己</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="tarot-card rounded-xl p-8 flex flex-col items-center">
              <div className="mb-6 transform transition hover:scale-110">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-white text-center mb-4">{feature.title}</h3>
              <p className="text-gray-300 text-center">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;