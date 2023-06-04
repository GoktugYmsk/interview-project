import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import data from '../../assets/data';

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
    console.log('product id', productId);
    setCount(count + 1);
    dispatch(setAmount(count));
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
              <img src={product.image} alt={product.title} />
              <h3>{product.title}</h3>
              <hr className='product-object__hr' />
              <p>{product.price} TL</p>
              <button onClick={() => handleClick(product.id)} >Add to cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Content;
