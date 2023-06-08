import React, { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';
import Toast from 'react-bootstrap/Toast';

import ProductList from './productList';
import './index.scss';

function Content({ list }) {
  const [popup, setPopup] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const active = useSelector((state) => state.pageBlur.active);

  const handleClose = () => {
    setPopup(false);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={`content-container ${active ? 'content-blur' : ''}`}>
      <ProductList list={list} isMobile={isMobile} setPopup={setPopup} />
      {popup && (
        <div className="toast-container">
          <Toast onClose={handleClose} show={popup}>
            <Toast.Header>
              <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
            </Toast.Header>
            <Toast.Body>Product successfully added to cart</Toast.Body>
          </Toast>
        </div>
      )}
    </div>
  );
}

export default Content;
