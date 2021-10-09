import React, {useState, useEffect} from 'react';
import './payment.css';
import { useStateValue } from './StateProvider';
import CheckoutProduct from './CheckoutProduct';
import { Link, useHistory } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { getBasketTotal } from './reducer';
import NumberFormat from 'react-number-format';
import axios from "./axios.js";


function Payment () {
    const stripe = useStripe();
    const elements = useElements();
    const history = useHistory();

    const [{ basket, user }, dispatch] = useStateValue();
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState(""); 
    const [clientSecret, setClientSecret] = useState(true); 
    
    useEffect(()=>{
        //generate stripeSecret for charging customer
        const getClientSecret = async() => {
            const response = await axios({
                method: "post",
                //stripe expects total in a currencies subunit (ie. 100cents/dollar, 100kobo/naira)
                url: `/payments/create?total=${ getBasketTotal(basket) * 100 }`
            });
            setClientSecret(response.data.clientSecret)
        }
        getClientSecret();
    }, [basket]);


    const handleSubmit = async (e) => {
             // handle stripe
            e.preventDefault();
            setProcessing(true);
            
            const payload = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement)
                }
            }).then(({ paymentIntent }) => {
                    //paymentIntent = payment confirmation
                    setSucceeded(true);
                    setError(null);
                    setProcessing(false);
                
                    history.replace('/orders')
                })
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
                            <div className="payment__priceContainer">
                                <NumberFormat
                                  value={getBasketTotal(basket)}
                                  className="foo"
                                  displayType={'text'}
                                  thousandSeparator={true}
                                  prefix={'$'}
                                  decimalScale={2}

                                  renderText={(value) => (
                                    <h3>Order Total: {value}</h3>
                                  )}
                                />
                                <button disabled={processing || disabled || succeeded} >
                                    <span>{processing ? <p> ...Processing</p> : "Buy Now"}</span>
                                </button>
                            </div>
                            
                            {/*Errors*/}
                            {error && <div>{error}</div>}
                        </form>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Payment;
