import React, { useEffect } from 'react';
import './App.css';
import Header from './Header';
import Home from './Home';
import Checkout from './Checkout';
import Login from './Login.js';
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useStateValue } from './StateProvider';



const auth = getAuth();
function App() {

    const [{}, dispatch] = useStateValue();

    useEffect(()=>{
        onAuthStateChanged( auth, (user)=>{
            console.log("USER >>> ",user)
            if(user){
                //if user is signed in

                dispatch({
                    type: "SET_USER",
                    user: user
                })
            } else{
                //user is signed out
                    
                dispatch({
                    type: "SET_USER",
                    user: null
                })
            }
        });
    }, []);

  return (
    <Router>
        <div className="App">
            <Header />
            <Switch>
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/checkout">
                    <Checkout/>
                </Route> 
                
{/* Here, home route is kept at the bottom intentionally*/}
                <Route path="/">
                    <Home />
                </Route>                
            </Switch>
        </div>
    </Router>
  );
}

export default App;
