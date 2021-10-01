import React from 'react';
import './App.css';
import Header from './Header';
import Home from './Home';
import Checkout from './Checkout';
import Login from './Login.js';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


function App() {
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
