import React, { useState } from 'react';

import { useSelector } from 'react-redux';
import data from '../../../assets/data';
import { Row, Col } from 'react-bootstrap';

import './index.scss'

function LeftBar({ setList }) {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const input = useSelector((state) => state.inputValue.input);
  const productCategories = [...new Set(data.map((product) => product.category))];

  const filterProducts = (category) => {
    const categoryIndex = selectedCategories.indexOf(category);
    let updatedCategories = [...selectedCategories];
    if (categoryIndex > -1) {
      updatedCategories.splice(categoryIndex, 1);
    } else {
      updatedCategories.push(category);
    }
    setSelectedCategories(updatedCategories);

    if (updatedCategories.length > 0) {
      const filteredList = data.filter(
        (product) =>
          updatedCategories.includes(product.category) &&
          product.title.toLowerCase().includes(input.toLowerCase())
      );
      setList(filteredList);
    } else {
      setList(data);
    }
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <Row>
      <Col >
        <div className={`leftBar__container ${isMenuOpen ? 'open' : ''}`}>
          <div className="leftBar__menuToggle" onClick={handleMenuToggle}>
            <div className="leftBar__menuToggle-line"></div>
            <div className="leftBar__menuToggle-line"></div>
            <div className="leftBar__menuToggle-line"></div>
          </div>
          <div className="leftBar__content">
            <div className="leftBar__container-box">
              <h3>Product Assortment</h3>
              <ul>
                {productCategories.map((option, index) => (
                  <li key={index} onClick={() => filterProducts(option)}>
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(option)}
                      readOnly
                    />
                    {option}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
}

export default LeftBar;
