import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Toast from 'react-bootstrap/Toast';
import data from '../../assets/data';
import { setSelectedProductList } from '../configure/configure';
import { setAmount } from '../configure/configure';
import LeftBar from './leftBar';
import './index.scss';

function Content() {
  const [list, setList] = useState(data);

  const [popup, setPopup] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const dispatch = useDispatch();

  const input = useSelector((state) => state.inputValue.input);
  const selectedProductList = useSelector((state) => state.productInfo.selectedProductList);
  const active = useSelector((state) => state.pageBlur.active);
  const amount = useSelector((state) => state.amountValue.amount);

  const handleClick = (product) => {
    const updatedCount = amount + 1;
    dispatch(setAmount(updatedCount));
    const updatedProductList = [...selectedProductList, product];
    dispatch(setSelectedProductList(updatedProductList));

    setPopup(true);
  };
  
  const handleClose = () =>{
    setPopup(false)
  }

  const handleRemove = (product) => {
    const updatedCount = amount - 1;
    dispatch(setAmount(updatedCount));
    const updatedProductList = selectedProductList.filter(
      (item) => item.title !== product.title
    );
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

  return (
    <div className={`content-container ${active ? 'content-blur' : ''}`}>
      <LeftBar setList={setList} />
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
              <p>Son {product.rating.count} Adet </p>
              {hoveredIndex === index && (
                selectedProductList.some((item) => item.title === product.title) ? (
                  <button className='product-object-button-remove' onClick={() => handleRemove(product)}>Remove from basket</button>
                ) : (
                  <button className='product-object-button' onClick={() => handleClick(product)}>Add to basket</button>
                )
              )}
            </div>
          </div>
        ))}
      </div>
      {popup && (
        <div className="toast-container">
          <Toast onClose={handleClose} >
            <Toast.Header>
              <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
            </Toast.Header>
            <Toast.Body>Product added to cart</Toast.Body>
          </Toast>
        </div>
      )}
    </div>
  );
}

export default Content;
