import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import data from '../../assets/data';
import { RiDeleteBin5Fill } from 'react-icons/ri';

import { setAmount } from '../configure/configure';
import './index.scss';

function Content() {
  const [list, setList] = useState(data);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [count, setCount] = useState(0)

  const input = useSelector((state) => state.inputValue.input);

  const dispatch = useDispatch()

  const filterProducts = (category) => {
    setSelectedCategory(category);
    if (category) {
      const filteredList = data.filter((product) => product.category === category && product.title.toLowerCase().includes(input.toLowerCase()));
      setList(filteredList);
    } else {
      setList(data);
    }
  };

  const handleClick = (productId) => {
    const updatedCount = count + 1;
    setCount(updatedCount);
    dispatch(setAmount(updatedCount));
    console.log('product added', productId);
  };

  const handleDelete = (productId) => {
    if (count > 0) {
      const updatedCount = count - 1;
      setCount(updatedCount);
      dispatch(setAmount(updatedCount));
      console.log('product deleted', productId);
    } else {
      console.log('Count is already 0. Cannot decrease further.');
    }
  };



  const filteredProducts = list.filter((product) => product.title.toLowerCase().includes(input.toLowerCase()));

  const uniqueCategories = [...new Set(data.map((product) => product.category))];

  return (
    <div className='content-container'>
      <div className='leftBar__container'>
        <ul>
          {uniqueCategories.map((option, index) => (
            <li key={index} onClick={() => filterProducts(option)}>
              {option}
            </li>
          ))}
        </ul>
      </div>
      <div className='product-list'>
        {filteredProducts.map((product, index) => (
          <div key={index} className='product-container'>
            <div className='product-object'>
              <div className='product-object__list'>
                <img src={product.image} alt={product.title} />
                <h3>{product.title}</h3>
                <hr className='product-object__hr' />
                <p>{product.price} TL</p>
              </div>
              <button className='product__add-button' onClick={() => handleClick(product)} >Add to cart</button>
              <RiDeleteBin5Fill onClick={() => handleDelete(product)} className='product__delete-icon' />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Content;
