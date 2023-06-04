import React from 'react'

import './index.scss'

function Header() {
  return (
    <div className='header-container' >
      <input placeholder='Search' />
      <div className='header__basket' >
        <p className='header__amount' ></p>
        <p>icon</p>
      </div>
    </div>
  )
}

export default Header
