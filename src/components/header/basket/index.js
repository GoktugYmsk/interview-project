import React, { useEffect, useRef, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { RiDeleteBin5Fill } from 'react-icons/ri';

import { setSelectedProductList, setActive, setAmount } from '../../configure/configure';
import './index.scss'

function Basket() {
    const [productCounts, setProductCounts] = useState({});
    const [showWarning, setShowWarning] = useState(false);

    const dispatch = useDispatch();
    const wrapperRef = useRef(null);

    const active = useSelector((state) => state.pageBlur.active);
    const selectedProductList = useSelector((state) => state.productInfo.selectedProductList);
    const amount = useSelector((state) => state.amountValue.amount);

    const handleDeleteProduct = (productId) => {
        const updatedProductList = selectedProductList.filter(
            (product) => product.id !== productId
        );
        dispatch(setSelectedProductList(updatedProductList));
        dispatch(setAmount(amount - 1));
    };

    const handleModalClose = () => {
        dispatch(setActive(false));
    };

    const handleCountChange = (productId, value) => {
        const parsedValue = parseInt(value, 10) || 0;
        setProductCounts((prevCounts) => ({
            ...prevCounts,
            [productId]: parsedValue,
        }));
    };

    const handleDecrementCount = (productId) => {
        const currentCount = productCounts[productId] || 0;
        const newCount = currentCount > 0 ? currentCount - 1 : 0;
        setProductCounts((prevCounts) => ({
            ...prevCounts,
            [productId]: newCount,
        }));
    };

    const handleIncrementCount = (productId) => {
        const currentCount = productCounts[productId] || 0;
        const newCount = currentCount + 1;
        setProductCounts((prevCounts) => ({
            ...prevCounts,
            [productId]: newCount,
        }));
    };

    useEffect(() => {
        const initialProductCounts = {};
        selectedProductList.forEach((product) => {
            const existingCount = productCounts[product.id] || 0;
            initialProductCounts[product.id] = existingCount > 0 ? existingCount : 1;
        });
        setProductCounts(initialProductCounts);
    }, [selectedProductList]);

    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                dispatch(setActive(false));
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dispatch]);

    useEffect(() => {
        const exceedsRating = selectedProductList.some((product) => {
            const ratingCount = product.rating.count;
            const currentCount = productCounts[product.id] || 0;
            return currentCount > ratingCount;
        });

        setShowWarning(exceedsRating);
    }, [selectedProductList, productCounts]);

    return (
        <>
            {active && (
                <div className="basket-modal" ref={wrapperRef}>
                    <h2>My Basket</h2>
                    {selectedProductList.length > 0 ? (
                        <div className="basket-modal__box">
                            {selectedProductList.map((product, index) => (
                                <div key={index} className="basket-modal__list">
                                    <div className="basket-modal__list-top">
                                        <img src={product.image} alt={product.title} />
                                        <p>{product.title}</p>
                                    </div>
                                    <div className="basket-modal__list-alt">
                                        <p className="basket-modal__list-amount">
                                            Amount:{' '}
                                            <input
                                                type="number"
                                                min="0"
                                                value={productCounts[product.id] || 0}
                                                onChange={(e) => handleCountChange(product.id, e.target.value)}
                                            />
                                        </p>
                                        <div className="count-controls">
                                            <button onClick={() => handleDecrementCount(product.id)}>-</button>
                                            <button onClick={() => handleIncrementCount(product.id)}>+</button>
                                            <RiDeleteBin5Fill
                                                className="basket-modal__list-icon"
                                                onClick={() => handleDeleteProduct(product.id)}
                                            />
                                        </div>
                                    </div>
                                    {showWarning && productCounts[product.id] > product.rating.count && (
                                        <p style={{ color: 'red' }}>Quantity entered exceeds stock quantity!</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>Your cart is empty</p>
                    )}
                    <button onClick={handleModalClose} className="basket-model__close">
                        Keep Shopping
                    </button>
                </div>
            )}
        </>
    );
}

export default Basket;
