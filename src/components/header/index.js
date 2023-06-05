import React, { useRef, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { FaShoppingBasket } from 'react-icons/fa';
import { HiOutlineSearch } from 'react-icons/hi';
import 'bootstrap/dist/css/bootstrap.min.css';

import { setProductList } from '../configure/configure';
import { setInput } from '../configure/configure';
import './index.scss';

function Header() {
    const [isInputFocused, setIsInputFocused] = useState(false);
    const [active, setActive] = useState(false);
    const dispatch = useDispatch();
    const inputRef = useRef(null);

    const productList = useSelector((state) => state.productInfo.productList);
    const productListArray = Array.isArray(productList) ? productList : [productList];
    const amount = useSelector((state) => state.amountValue.amount);

    const logo =
        'https://uploads-ssl.webflow.com/605c9d764f1ef938a009ac98/61e01bfbdd8632a72962edc2_Pinsoft_Yatay_Logo_mavi-for%20animation.svg';

    const handleChange = (e) => {
        const inputValue = e.target.value;
        dispatch(setInput(inputValue));
    };

    const handleIconClick = () => {
        setIsInputFocused(true);
        inputRef.current.focus();
    };

    const handleInputBlur = () => {
        setIsInputFocused(false);
    };

    const handleBasketClick = () => {
        setActive(true);
    };

    const handleModalClose = () => {
        setActive(false);
    };
    
    const handleAddToProduct = (productId) => {
        const updatedProductList = productListArray.map((product) => {
          if (product.id === productId) {
            return { ...product, count: product.count + 1 };
          }
          return product;
        });
      
        dispatch(setProductList(updatedProductList));
      };
      

    const getProductCount = (productId) => {
        const productCount = productListArray.reduce((count, product) => {
            if (product.id === productId) {
                return count + 1;
            }
            return count;
        }, 0);
        return productCount;
    };

    const uniqueProductList = productListArray.reduce((uniqueList, product) => {
        const existingProduct = uniqueList.find((p) => p.title === product.title);
        if (!existingProduct) {
            const productWithCount = { ...product, count: getProductCount(product.id) };
            return [...uniqueList, productWithCount];
        }
        return uniqueList;
    }, []);

    return (
        <>
            <div className="header-container">
                <img className="header-logo" src={logo} />
                <div className="input-group">
                    <input
                        ref={inputRef}
                        onBlur={handleInputBlur}
                        onChange={(e) => handleChange(e)}
                        placeholder="Search"
                        type="text"
                        className="form-control"
                        aria-label="Dollar amount (with dot and two decimal places)"
                    />
                    <span className="input-group-text">
                        <HiOutlineSearch onClick={handleIconClick} />
                    </span>
                </div>
                {!active && (
                    <div onClick={handleBasketClick} className="header__basket">
                        Sepetim
                        <p className="header__amount">{amount}</p>
                        <FaShoppingBasket className="header__icon" />
                    </div>
                )}
                {active && (
                    <div className="basket-modal">
                        <h2>Sepetim</h2>
                        <div className="basket-modal__box">
                            {uniqueProductList.map((product, index) => (
                                <div key={index} className="basket-modal__list">
                                    <p>{product.title}</p>
                                    <p>Adet: {product.count}</p>
                                    <button onClick={() => handleAddToProduct(product.id)}>
                                        ekle
                                    </button>

                                </div>
                            ))}
                        </div>
                        <button onClick={handleModalClose} className="basket-model__close">
                            Alışverişe devam et
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}

export default Header;
