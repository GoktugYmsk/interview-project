import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import data from '../../assets/data';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { setProductList } from '../configure/configure';
import { setAmount } from '../configure/configure';
import './index.scss';

function Content() {
  const [list, setList] = useState(data);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [count, setCount] = useState(0);

  const input = useSelector((state) => state.inputValue.input);
  const productList = useSelector((state) => state.productInfo.productList);
  const productListArray = Array.isArray(productList) ? productList : [productList];

  const dispatch = useDispatch();

  const filterProducts = (category) => {
    setSelectedCategory(category);
    if (category) {
      const filteredList = data.filter(
        (product) =>
          product.category === category &&
          product.title.toLowerCase().includes(input.toLowerCase())
      );
      setList(filteredList);
    } else {
      setList(data);
    }
  };

  const handleClick = (product) => {
    const updatedCount = count + 1;
    setCount(updatedCount);
    dispatch(setAmount(updatedCount));

    const updatedProductList = [...productListArray, product];
    dispatch(setProductList(updatedProductList));
  };
  
  const filteredProducts = list.filter((product) =>
    product.title.toLowerCase().includes(input.toLowerCase())
  );

  const uniqueCategories = [...new Set(data.map((product) => product.category))];

  return (
    <div className="content-container">
      <div className="leftBar__container">
        <h3>Ürün Çeşidi</h3>
        <ul>
          {uniqueCategories.map((option, index) => (
            <li key={index} onClick={() => filterProducts(option)}>
              {option}
            </li>
          ))}
        </ul>
      </div>
      <div className="product-list">
        {filteredProducts.map((product, index) => (
          <div key={index} className="product-container">
            <div className="product-object">
              <div className="product-object__list">
                <img src={product.image} alt={product.title} />
                <h4>{product.title}</h4>
                <hr className="product-object__hr" />
                <p>{product.price} TL</p>
              </div>
              <button
                className="product__add-button"
                onClick={() => handleClick(product)}
              >
                Add to basket
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Content;
