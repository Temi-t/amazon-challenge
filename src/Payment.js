import React, {useState} from 'react';
import './payment.css';
import { useStateValue } from './StateProvider';
import CheckoutProduct from './CheckoutProduct';
import { Link } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

function Payment () {
    const [{ basket, user }, dispatch] = useStateValue();
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = e => {
//        handle stripe
    }
    const handleChange = e => {
        //listen for changes in card elements and display any errors during typing
        setDisabled(e.empty);
        setError(e.error ? e.error.message : "");
    }

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
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange} />
                            <div className="payment__classContainer"></div>
                        </form>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Payment;
