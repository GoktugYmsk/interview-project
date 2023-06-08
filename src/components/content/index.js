import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import ProductList from './productList';

import './index.scss';

function Content({ list }) {
  
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const active = useSelector((state) => state.pageBlur.active);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={`content-container ${active ? 'content-blur' : ''}`}>
      <ProductList list={list} isMobile={isMobile}  />
    </div>
  );
}

export default Content;
