import React from 'react';
import './payment.css';
import { useStateValue } from './StateProvider';
import CheckoutProduct from './CheckoutProduct';
import { Link } from "react-router-dom";


function Payment () {
    const [{ basket, user }, dispatch] = useStateValue();
    return(
        <div className="payment">
            <div className="payment__container">
                <h1>
                    Checkout(
                        <Link to="/checkout">{basket?.length} items</Link>
                    )
                </h1>
                <section className="payment__section">
                    <div className="payment__title">
                        <h3>Delivery address</h3>
                    </div>
                    <address className="payment__address">
                        <p>{user?.email}</p>
                        <p>123, React Lane</p>
                        <p>Los Angeles, CA</p>
                    </address>
                </section>

                <section className="payment__section">
                    <div className="payment__title">
                        <h3>Review items and delivery</h3>
                    </div>
                    <div className="payment__items">
                        { 
                            basket.map((item, i) => (
                                <CheckoutProduct
                                    key={"CheckoutItem_"+i} 
                                    item={item} 
                                    id = {item.id} 
                                    image = {item.image}
                                    title = {item.title}
                                    price = {item.price}
                                    rating = {item.rating} 
                                />
                            ))
                         }
                    </div>
                </section>

                <section className="payment__section">
                    <div className="payment__title">
                        <h3>Payment Method</h3>
                    </div>
                    <div className="payment__details">
                        stripe stuff
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Payment;
