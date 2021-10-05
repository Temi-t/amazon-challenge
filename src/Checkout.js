import React from 'react';
import './checkout.css';
import ad from './images/ad2.png';
import Subtotal from './Subtotal';
import CheckoutProduct from './CheckoutProduct';
import { useStateValue } from './StateProvider';
import FlipMove from 'react-flip-move';
// import mage from './images/sasu-naru.jpg';

function Checkout () {
    const [ {basket, user}, dispatch ] = useStateValue();
    const ticketNotVisibleState = {
      transform: "translateX(-100%)",
      opacity: 0.1
    };
    return(
    <div className="checkout">
        <div className="checkout__left">
            <img className="checkout__ad" src={ad} alt="advert"/>
            <div>
                <h3>Hello, {user?.email}</h3>
                <h2 className="checkout__title"> Your shopping Basket</h2>
                    <FlipMove
                         enterAnimation={{
                        from: ticketNotVisibleState,
                        to: {}
                        }}
                        leaveAnimation={{
                        from: {},
                        to: ticketNotVisibleState
                        }}
                    >
                        {basket.map(
                            (item, i) => (
                                <div>
                                    < CheckoutProduct 
                                        key={"basketItem_"+i} 
                                        item={item} 
                                        id = {item.id} 
                                        image = {item.image}
                                        title = {item.title}
                                        price = {item.price}
                                        rating = {item.rating}      
                                    />
                                </div>
                            )
                        )}
                    </FlipMove>

            </div>
        </div>
        <div className="checkout__right">
            <Subtotal />
        </div>
    </div>
    )
};
export default Checkout;
