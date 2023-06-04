import React from 'react';
import { useDispatch } from 'react-redux';
import { setInput } from '../configure/configure';
import './index.scss';

function Header() {
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const inputValue = e.target.value;
        dispatch(setInput(inputValue));
        console.log(inputValue);
    };

    return (
        <div className='header-container'>
            <input onChange={(e)=>handleChange(e)} placeholder='Search' />
            <div className='header__basket'>
                <p className='header__amount'></p>
                <p>icon</p>
            </div>
        </div>
    );
}

export default Header;
