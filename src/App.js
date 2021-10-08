import React, { useEffect } from 'react';
import './App.css';
import Header from './Header';
import Home from './Home';
import Checkout from './Checkout';
import Login from './Login.js';
import Payment from './Payment';
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useStateValue } from './StateProvider';

//  "homepage": "https://temi-t.github.io/amazon-challenge",
//full ecommerce build with serverless architecture

//pk_test_51Ji3SnBUY2FILOIPzsZkohPza8xWsiv5gpewm31UOl1TbDkow79U39HHQO9KfOvB6qNtjYaHocxz2mc1lNOWSNAM00j202Unox

const auth = getAuth();
function App() {

    const [{}, dispatch] = useStateValue();

    useEffect(()=>{
        onAuthStateChanged( auth, (authUser)=>{
            console.log("USER >>> ",authUser)
            console.log("AUTH >>> ", auth)
            if(authUser){
                //if user is signed in

                dispatch({
                    type: "SET_USER",
                    user: authUser
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

            <Switch>
                 <Route path="/login">
                    <Login />
                </Route> 
                <Route path="/checkout">
                    <Header />
                    <Checkout/>
                </Route>
                <Route path="/payment">
                    <Header />
                    <Payment />
                </Route>  
                
{/* Here, home route is kept at the bottom intentionally*/}
                <Route path="/">
                    <Header />
                    <Home />
                </Route>                
            </Switch>
        </div>
    </Router>
  );
}

export default App;
