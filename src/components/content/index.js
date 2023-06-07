import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import Toast from 'react-bootstrap/Toast';

import { setSelectedProductList } from '../configure/configure';
import { setAmount } from '../configure/configure';
import './index.scss';

function Content({list}) {
  const [popup, setPopup] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const dispatch = useDispatch();
  const input = useSelector((state) => state.inputValue.input);
  const selectedProductList = useSelector((state) => state.productInfo.selectedProductList);
  const active = useSelector((state) => state.pageBlur.active);
  const amount = useSelector((state) => state.amountValue.amount);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 540);

  const handleClick = (product) => {
    const updatedCount = amount + 1;
    dispatch(setAmount(updatedCount));
    const updatedProductList = [...selectedProductList, product];
    dispatch(setSelectedProductList(updatedProductList));
    setPopup(true);
  };

  const handleClose = () => {
    setPopup(false);
  };

  const handleRemove = (product) => {
    const updatedCount = amount - 1;
    dispatch(setAmount(updatedCount));
    const updatedProductList = selectedProductList.filter((item) => item.title !== product.title);
    dispatch(setSelectedProductList(updatedProductList));
  };

  const filteredProducts = list.filter((product) =>
    product.title.toLowerCase().includes(input.toLowerCase())
  );

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 540);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={`content-container ${active ? 'content-blur' : ''}`}>
      <div className="product-list">
        {filteredProducts.map((product, index) => (
          <div
            key={index}
            className="product-container"
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="product-object">
              <div className="product-object__list">
                <img src={product.image} alt={product.title} />
                <h4>{product.title}</h4>
                <hr className="product-object__hr" />
                <p>{product.price} $</p>
              </div>
              <p>last {product.rating.count} Pieces  </p>
              {(isMobile || hoveredIndex === index) &&
                (selectedProductList.some((item) => item.title === product.title) ? (
                  <button className="product-object-button-remove" onClick={() => handleRemove(product)}>
                    <p>Remove from basket</p>
                  </button>
                ) : (
                  <button className="product-object-button" onClick={() => handleClick(product)}>
                    <p>Add to basket</p>
                  </button>
                ))}
            </div>
          </div>
        ))}
      </div>
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
