import React, {useState, useEffect} from 'react';
import './payment.css';
import { useStateValue } from './StateProvider';
import CheckoutProduct from './CheckoutProduct';
import { Link, useHistory } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { getBasketTotal } from './reducer';
import NumberFormat from 'react-number-format';
import axios from "./axios.js";
import { getFirestore, setDoc, doc} from "firebase/firestore";


function Payment () {
    const stripe = useStripe();
    const elements = useElements();
    const history = useHistory();
    const db = getFirestore();
    
// const collection = fireStoreLite.collection;
//console.log(">>>>>>> FireStoreLite: ",fireStoreLite)
console.log("####### Database: ",db)


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

    console.log("the secret is: ..... ", clientSecret)
    const handleSubmit = async (e) => {
             // handle stripe
            e.preventDefault();
            setProcessing(true);
            
            const payload = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement)
                }
            }).then(({ paymentIntent }) => {
                    //paymentIntent = payment confirmation(from stripe)

                    //path should be "collection/document"
                    const docRef = doc(db, `users/${user?.uid}`);
                    const childDoc = doc(docRef, "orders/paymentIntent.id");
                    //const childDocRef = doc(docRef, "newCollection/newDoc") for relative path
                    // or
                    // "users/user?.uid/newCollection/newDoc" for absolute path                
                    (function writeUserDetail() {
                        const shoppingDetails = {
                            basket: basket,
                            amount: paymentIntent.amount,
                            created: paymentIntent.created
                        };
                        setDoc(docRef, shoppingDetails)
                    })()
                            
                    setSucceeded(true);
                    setError(null);
                    setProcessing(false);

                    dispatch({
                        type: "EMPTY_BASKET",
                    })
                
                    history.replace('/orders')
                })
                .catch(error => console.log("Ooops! Caugth this error: ", error));
    }
    const handleChange = event => {
        //listen for changes in card elements and display any errors during typing
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
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
                                {
                                    typeof clientSecret === "string" ?
                                    <button disabled={processing || disabled || succeeded} >
                                            <span>{processing ? <p> ...Processing</p> : "Buy Now"}</span>
                                    </button> :
                                    "Enter card details above"
                                }
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
