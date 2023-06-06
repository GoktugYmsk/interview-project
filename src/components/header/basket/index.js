import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { setSelectedProductList, setActive, setAmount } from '../../configure/configure';

function Basket() {
    const active = useSelector((state) => state.pageBlur.active);
    const selectedProductList = useSelector((state) => state.productInfo.selectedProductList);
    const dispatch = useDispatch();
    const wrapperRef = useRef(null);
    const [productCounts, setProductCounts] = useState({});

    const amount = useSelector((state) => state.amountValue.amount);
    const handleDeleteProduct = (productId) => {
        const updatedProductList = selectedProductList.filter(
            (product) => product.id !== productId
        );
        dispatch(setSelectedProductList(updatedProductList));

        const deletedProductCount = productCounts[productId] || 0;
        dispatch(setAmount(amount - deletedProductCount));
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
        const previousCount = productCounts[productId] || 0;
        const updatedAmount = amount - previousCount + parsedValue;
        dispatch(setAmount(updatedAmount < 0 ? 0 : updatedAmount));
    };

    const handleDecrementCount = (productId) => {
        const currentCount = productCounts[productId] || 0;
        const newCount = currentCount > 0 ? currentCount - 1 : 0;
        setProductCounts((prevCounts) => ({
            ...prevCounts,
            [productId]: newCount,
        }));
        dispatch(setAmount(amount - 1 < 0 ? 0 : amount - 1));
    };

    const handleIncrementCount = (productId) => {
        const currentCount = productCounts[productId] || 0;
        const newCount = currentCount + 1;
        setProductCounts((prevCounts) => ({
            ...prevCounts,
            [productId]: newCount,
        }));
        dispatch(setAmount(amount + 1));
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

    return (
        <>
            {active && (
                <div className="basket-modal" ref={wrapperRef}>
                    <h2>Sepetim</h2>
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
                                            Adet:{' '}
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
                                </div>
                            ))}
                        </div>

                    ) : (
                        <p>sepetiniz boş</p>
                    )}
                    <button onClick={handleModalClose} className="basket-model__close">
                        Alışverişe Devam Et
                    </button>
                </div>
            )}
        </>
    );

}

export default Basket;
