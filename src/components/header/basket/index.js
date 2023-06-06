import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { setSelectedProductList,setActive } from '../../configure/configure';

function Basket() {

    const active = useSelector((state) => state.pageBlur.active)
    const selectedProductList = useSelector((state) => state.productInfo.selectedProductList);

    const dispatch = useDispatch();

    const handleDeleteProduct = (productId) => {
        const updatedProductList = selectedProductList.filter((product) => product.id !== productId);
        dispatch(setSelectedProductList(updatedProductList));
    };


    const handleModalClose = () => {
        dispatch(setActive(false))
    };


    const handleIncrementCount = (productId) => {
        const updatedProductList = selectedProductList.map((product) => {
            if (product.id === productId) {
                console.log(product)
                return { ...product, count: product?.count + 1 };
            }
            return product;
        });

        console.log(updatedProductList)
        dispatch(setSelectedProductList(updatedProductList));
    };

    const handleDecrementCount = (productId) => {
        const updatedProductList = selectedProductList.map((product) => {
            if (product.id === productId && product.count > 0) {
                return { ...product, count: product.count - 1 };
            }
            return product;
        });

        dispatch(setSelectedProductList(updatedProductList));
    };

    return (
        <>
            {active && (
                <div className="basket-modal">
                    <h2>Sepetim</h2>
                    {selectedProductList.length > 0 ? (
                        <div className="basket-modal__box">
                            {selectedProductList.map((product, index) => (
                                <div key={index} className="basket-modal__list">
                                    <div className='basket-modal__list-top' >
                                        <img src={product.image} alt={product.title} />
                                        <p>{product.title}</p>
                                    </div>
                                    <div className='basket-modal__list-alt' >
                                        <p className='basket-modal__list-amount' >Adet: {product.count}</p>
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
                        Keep Shopping
                    </button>
                </div>
            )}
        </>
    )
}

export default Basket
