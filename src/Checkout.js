import React from 'react';
import './checkout.css';
import ad from './images/ad2.png';
import Subtotal from './Subtotal';
import CheckoutProduct from './CheckoutProduct';
import { useStateValue } from './StateProvider';
// import mage from './images/sasu-naru.jpg';

function Checkout () {
    const [ {basket, user}, dispatch ] = useStateValue();
    return(
    <div className="checkout">
        <div className="checkout__left">
            <img className="checkout__ad" src={ad} alt="advert"/>
            <div>
                <h3>Hello, {user?.email}</h3>
                <h2 className="checkout__title"> Your shopping Basket</h2>
                    {basket.map(
                    (item, i) => (
                        < CheckoutProduct 
                            key={"basketItem_"+i} 
                            item={item} 
                                id = {item.id} 
                                image = {item.image}
                                title = {item.title}
                                price = {item.price}
                                rating = {item.rating}      
                        />
                    )
                )}

            </div>
        </div>
        <div className="checkout__right">
            <Subtotal />
        </div>
    </div>
    )
};
export default Checkout;
