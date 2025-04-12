import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Star, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="bg-transparent backdrop-blur-sm fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <Star className="h-8 w-8 text-yellow-400" />
            </Link>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link to="/" className="text-white hover:text-yellow-200 px-3 py-2 rounded-md text-sm font-medium">首頁</Link>
                <Link to="/birth-chart" className="text-white hover:text-yellow-200 px-3 py-2 rounded-md text-sm font-medium">生成星盤</Link>
                <a href="#" className="text-white hover:text-yellow-200 px-3 py-2 rounded-md text-sm font-medium">我的占星</a>
                <a href="#" className="text-white hover:text-yellow-200 px-3 py-2 rounded-md text-sm font-medium">文章</a>
                <a href="#" className="text-white hover:text-yellow-200 px-3 py-2 rounded-md text-sm font-medium">聯絡我們</a>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm font-medium">
                登入 / 註冊
              </button>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-yellow-200 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-indigo-900/90 backdrop-blur-sm">
            <Link to="/" className="text-white hover:text-yellow-200 block px-3 py-2 rounded-md text-base font-medium">首頁</Link>
            <Link to="/birth-chart" className="text-white hover:text-yellow-200 block px-3 py-2 rounded-md text-base font-medium">生成星盤</Link>
            <a href="#" className="text-white hover:text-yellow-200 block px-3 py-2 rounded-md text-base font-medium">我的占星</a>
            <a href="#" className="text-white hover:text-yellow-200 block px-3 py-2 rounded-md text-base font-medium">文章</a>
            <a href="#" className="text-white hover:text-yellow-200 block px-3 py-2 rounded-md text-base font-medium">聯絡我們</a>
            <button className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm font-medium mt-4">
              登入 / 註冊
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;