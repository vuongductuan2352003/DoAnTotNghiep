import React from 'react';
import HeaderHome from '../components/HeaderHome';
import FooterHome from '../components/FooterHome';
// Dung chung Trang Chu
export default function HomeLayout({ children }) {
  return (
    <div className="app">
   <HeaderHome></HeaderHome>
      {children}
    
    </div>
  );
}
