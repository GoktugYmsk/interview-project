import React, { useEffect, useRef, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaShoppingBasket } from 'react-icons/fa';
import { HiOutlineSearch } from 'react-icons/hi';
import { setIsMenuOpen } from '../configure/configure';

import Basket from './basket';
import { setSelectedProductList, setInput, setActive } from '../configure/configure';
import './index.scss';

function Header() {
    const [isInputFocused, setIsInputFocused] = useState(false);
    const dispatch = useDispatch();
    const inputRef = useRef(null);

    const selectedProductList = useSelector((state) => state.productInfo.selectedProductList);
    const amount = useSelector((state) => state.amountValue.amount);
    const active = useSelector((state) => state.pageBlur.active)
    const isMenuOpen = useSelector((state) => state.menuOpen.isMenuOpen);

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
        dispatch(setActive(true))
    };

    useEffect(() => {
        const prepareProductList = selectedProductList.map((product) => {
            return {
                ...product, count: 1,
            }
        })
        console.log(prepareProductList)
        setSelectedProductList(prepareProductList)
    }, [selectedProductList])


    const handleMenuToggle = () => {
        dispatch(setIsMenuOpen(!isMenuOpen))
    };


    return (
        <>
            <div className={`header-container ${active ? 'header-blur' : ''}`}>
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
                <div className="leftBar__menuToggle" onClick={handleMenuToggle}>
                    <div className="leftBar__menuToggle-line"></div>
                    <div className="leftBar__menuToggle-line"></div>
                    <div className="leftBar__menuToggle-line"></div>
                </div>
                {!active && (
                    <div onClick={handleBasketClick} className="header__basket">
                        <p className='header__basket-title' >Basket</p>
                        <p className="header__amount">{amount}</p>
                        <FaShoppingBasket className="header__icon" />
                    </div>
                )}
            </div>
            <Basket />
        </>
    );
}

export default Header;
