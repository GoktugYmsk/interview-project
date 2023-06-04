import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { FaShoppingBasket } from 'react-icons/fa';
import { HiOutlineSearch } from 'react-icons/hi';

import { setInput } from '../configure/configure';
import './index.scss';

function Header() {
    const dispatch = useDispatch();

    const amount = useSelector((state) => state.amountValue.amount);

    const handleChange = (e) => {
        const inputValue = e.target.value;
        dispatch(setInput(inputValue));
    };

    return (
        <div className='header-container'>
            <div className='header__search' >
                <HiOutlineSearch className='header__search-icon'/>
                <input onChange={(e) => handleChange(e)} placeholder='Search' />
            </div>
            <div className='header__basket'>
                <p className='header__amount'>
                    {amount}
                </p>
                <FaShoppingBasket className='header__icon' />
            </div>
        </div>
    );
}

export default Header;
