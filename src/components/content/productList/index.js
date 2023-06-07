import React from 'react'

import { useSelector } from 'react-redux';

import ProductContainer from './productContainer';

function ProductList({ isMobile, list, setPopup }) {
    const active = useSelector((state) => state.pageBlur.active);
    const input = useSelector((state) => state.inputValue.input);

    const filteredProducts = list.filter((product) =>
        product.title.toLowerCase().includes(input.toLowerCase())
    );

    return (
        <div className={`product-list ${active ? 'prodcut-list__none' : ''}`}>
            {filteredProducts.map((product, index) => (
                <ProductContainer product={product} index={index} isMobile={isMobile} setPopup={setPopup} />
            ))}
        </div>
    )
}

export default ProductList
