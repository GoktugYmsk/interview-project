import React, { useState } from 'react';
import data from '../../assets/data';
import './index.scss';

function Content() {
  const [list, setList] = useState(data);
  const [selectedCategory, setSelectedCategory] = useState('');

  const filterProducts = (category) => {
    setSelectedCategory(category);
    if (category) {
      const filteredList = data.filter((product) => product.category === category);
      setList(filteredList);
    } else {
      setList(data);
    }
  };

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
        {list.map((product, index) => (
          <div key={index} className='product-container'>
            <div className='product-object'>
              <img src={product.image} alt={product.title} />
              <h3>{product.title}</h3>
              <hr className='product-object__hr' />
              <p>{product.price} TL</p>
              <p>{product.description}</p>
              <p>Rating: {product.rating.count}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Content;
