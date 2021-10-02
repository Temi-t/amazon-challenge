import React, {useState} from 'react';
import './login.css';
import img from './images/amazon_PNG11.png';
import { Link, useHistory } from 'react-router-dom';
import { db } from './firebase';
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

export const auth = getAuth();

function Login () {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signIn = e => {
        e.preventDefault();
        //firebase login...
        signInWithEmailAndPassword(auth, email, password)
            .then( userCredential => history.push('/'))
            .catch( error => alert(error.message))
    }

    const register = e => {
        e.preventDefault();
       //firebase register
        createUserWithEmailAndPassword( auth, email, password )
            .then( userCredential => history.push('/'))
//                console.log(userCredential)
            .catch(error => alert(error.message))
    }

    return (
        <div className="login">
            <Link to='/'>
                <img className="login__logo" src={img} alt="login" />
            </Link>
            <div className="login__container">
                <h1>Sign In</h1>
                <form>
                    <h5>E-mail</h5>
                    <input 
                        type="email" 
                        value={email} 
                        placeholder="email"
                        onChange={e => setEmail(e.target.value) }
                    />
                    <h5>Password</h5>
                    <input 
                        value={password}
                        type="password" 
                        placeholder="password"
                        onChange={e => setPassword(e.target.value)} 
                    />
                    <button 
                        className="login__signInBtn" 
                        type="submit"
                        onClick={signIn}
                    >
                        Sign In
                    </button>
                </form>
                <p>
                    By signing-in you agree to Amaton's Condition of Use & Sale.
                    Please see our Privacy Notice, out Cookies Notice and         our Interest-Based Ads Notice.
                </p>
                <button 
                    className="login__registerBtn"
                    onClick={register}
                >
                    Create your account
                </button>
            </div>
        </div>
    )
}

export default Login;
