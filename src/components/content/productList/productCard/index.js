import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Toast from 'react-bootstrap/Toast';

import { setAmount, setSelectedProductList } from '../../../configure/configure';
import './index.scss'

function ProductCart({ product, index, isMobile }) {
    const [popup, setPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState()
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const selectedProductList = useSelector((state) => state.productInfo.selectedProductList);
    const amount = useSelector((state) => state.amountValue.amount);

    const dispatch = useDispatch();

    const handleClick = (product) => {
        const updatedCount = amount + 1;
        dispatch(setAmount(updatedCount));
        const updatedProductList = [...selectedProductList, product];
        dispatch(setSelectedProductList(updatedProductList));
        setPopupMessage('Product successfully added to cart')
        setPopup(true);
    };

    const handleRemove = (product) => {
        const updatedCount = amount - 1;
        dispatch(setAmount(updatedCount));
        const updatedProductList = selectedProductList.filter((item) => item.title !== product.title);
        dispatch(setSelectedProductList(updatedProductList));
        setPopupMessage('Product successfully removed to cart')
        setPopup(true);
    };

    const handleMouseEnter = (index) => {
        setHoveredIndex(index);
    };

    const handleMouseLeave = () => {
        setHoveredIndex(null);
    };

    return (
        <div
            key={index}
            className="product-container"
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
        >
            <div className="product-object">
                <div className="product-object__list">
                    <img src={product.image} alt={product.title} />
                    <h4>{product.title}</h4>
                    <hr className="product-object__hr" />
                    <p><strong>{product.price} $</strong></p>
                </div>
                <p>Last {product.rating.count} Pieces  </p>
                {(isMobile || hoveredIndex === index) &&
                    (selectedProductList.some((item) => item.title === product.title) ? (
                        <button className="product-object-button-remove" onClick={() => handleRemove(product)}>
                            <p>Remove from basket</p>
                        </button>
                    ) : (
                        <button className="product-object-button" onClick={() => handleClick(product)}>
                            <p>Add to basket</p>
                        </button>
                    ))}
            </div>
            {popup && (
                <div className="toast-container">
                    <Toast onClose={() => setPopup(false)} show={popup} delay={3000} autohide>
                        <Toast.Body>{popupMessage}</Toast.Body>
                    </Toast>
                </div>
            )}
        </div>
    )
}

export default ProductCart
