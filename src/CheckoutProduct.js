import React from 'react';
import './checkout-product.css';
import {useStateValue} from './StateProvider';

const CheckoutProduct = ({ id, image, title, price, rating }) => {
    const [{basket}, dispatch] = useStateValue();
        //Action to remove item from basket
//{ id, image, title, price, rating }
    const removeFromBasket = () => {
        dispatch({
            type: "REMOVE_FROM_BASKET",
            id: id 
        })
    }
    return (
        <div className="checkoutProduct" >
            <img className="checkoutProduct__img" src={image} alt="cart image"/>
            <div className="checkoutProduct__info">
                <p className="checkoutProduct__title">{title}</p>
                <p className="checkoutProduct__price">
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                <div className="checkoutProduct__rating">
                    {Array(rating).fill().map((_, i)=>(
                        <p key={"checkoutStar_"+i}>🌟</p>
                    ))}
                </div>
                <button onClick={removeFromBasket}>Remove From Basket</button>
            </div>
        </div>
    );
}

export default CheckoutProduct;
