import React, { useRef, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { FaShoppingBasket } from 'react-icons/fa';
import { HiOutlineSearch } from 'react-icons/hi';

import { setInput } from '../configure/configure';
import './index.scss';

function Header() {
    const [isInputFocused, setIsInputFocused] = useState(false);

    const dispatch = useDispatch();
    const amount = useSelector((state) => state.amountValue.amount);
    const inputRef = useRef(null);


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

    const handleBasketClick = () =>{
        alert('çalıştı')
    }

    return (
        <div className='header-container'>
            <div className='header__search' >
                <HiOutlineSearch className='header__search-icon' onClick={handleIconClick} />
                <input ref={inputRef}
                    onBlur={handleInputBlur}
                    onChange={(e) => handleChange(e)}
                    placeholder='Search' />
            </div>
            <div className='header__basket'>
                Sepetim
                <p className='header__amount'>
                    {amount}
                </p>
                <FaShoppingBasket onClick={handleBasketClick} className='header__icon' />
            </div>

        </div>
    );
}

export default Header;
