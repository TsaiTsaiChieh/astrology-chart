import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star } from 'lucide-react';

const Hero = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const createStars = () => {
      const container = document.querySelector('.stars-container');
      if (!container) return;

      container.innerHTML = '';
      
      for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animationDelay = `${Math.random() * 3}s`;
        container.appendChild(star);
      }
    };

    createStars();
    window.addEventListener('resize', createStars);

    return () => {
      window.removeEventListener('resize', createStars);
    };
  }, []);

  const handleGenerateChart = () => {
    navigate('/birth-chart');
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="mystical-bg"></div>
      <div className="stars-container absolute inset-0"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          <div className="flex justify-center mb-8">
            <Star className="h-20 w-20 text-yellow-400 animate-pulse" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold">
            <span className="text-white">探索你的</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-600"> 星盤</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto">
            通過專業的占星分析，了解你的人生軌跡，發現潛在的機遇與挑戰
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button
              onClick={handleGenerateChart}
              className="golden-border mystical-glow bg-gradient-to-r from-yellow-600 to-yellow-500 text-white px-8 py-4 rounded-full text-lg font-semibold transform transition hover:scale-105 hover:shadow-lg"
            >
              立即生成我的星盤
            </button>
            <button className="golden-border mystical-glow bg-transparent text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/5 transform transition hover:scale-105">
              了解更多
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;