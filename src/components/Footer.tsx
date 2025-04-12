import React from 'react';
import { Star, Facebook, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-indigo-950/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <Star className="h-8 w-8 text-yellow-400 mr-2" />
              <span className="text-white text-xl font-bold">星盤解析</span>
            </div>
            <p className="text-gray-400">
              專業的占星分析服務，幫助你更好地認識自己，規劃人生。
            </p>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">快速連結</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white">首頁</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">生成星盤</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">我的占星</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">文章</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">聯絡資訊</h3>
            <ul className="space-y-2">
              <li className="text-gray-400">電話：(02) 1234-5678</li>
              <li className="text-gray-400">信箱：contact@astrology.com</li>
              <li className="text-gray-400">地址：台北市信義區星座路88號</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">關注我們</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">© 2025 星盤解析. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;