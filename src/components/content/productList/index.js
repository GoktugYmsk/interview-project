import React from 'react'

import { useSelector } from 'react-redux';

import ProductCart from './productCard';

function ProductList({ isMobile, list }) {
    const active = useSelector((state) => state.pageBlur.active);
    const input = useSelector((state) => state.inputValue.input);

    const filteredProducts = list.filter((product) =>
        product.title.toLowerCase().includes(input.toLowerCase())
    );

    return (
        <div className={`product-list ${active ? 'prodcut-list__none' : ''}`}>
            {filteredProducts.map((product, index) => (
                <ProductCart product={product} index={index} isMobile={isMobile} />
            ))}
        </div>
    )
}

export default ProductList
