import React from 'react';
import './Header.css'; 
import { Link } from 'react-router-dom';
import { Search, ShoppingBasket } from '@material-ui/icons';
import amzon_img from './images/amazon_PNG11.png';
import { useStateValue } from './StateProvider';
import {auth} from './Login';


console.log("This is the auth from Login: ", auth);
function Header () {
    const [ {basket, user}, dispatch ] = useStateValue();
    const handleAuthentication = () => {
  //...
    }
    return(
        <div className="header">
            <Link to="/">
                <img
                    className="header__logo"
                    src={amzon_img}
                    alt="logo" 
                />
            </Link>
            <div className="header__search">
                <input
                    className="header__searchInput"
                    type="text" 
                />
                <Search className="header__searchIcon"/>
            </div>
            <div className="header__nav">
                <Link to="/login">
                    <div onClick={handleAuthentication} className="header__option">
                        <span className="header__optionLineOne">
                            Hello Guest
                        </span>
                        <span className="header__optionLineTwo">
                            {user ? "Sign Out" : "Sign In"}
                        </span>
                    </div>
                </Link>
                <div className="header__option">
                    <span className="header__optionLineOne">Returns</span>
                    <span className="header__optionLineTwo">& Orders</span>
                </div>
                <div className="header__option">
                    <span className="header__optionLineOne">Your</span>
                    <span className="header__optionLineTwo">Prime</span>
                </div>
                <Link to="/checkout">
                    <div className="header__optionBasket">
                        < ShoppingBasket />
                        <span className="header__optionLineTwo header__basketCount">
                            {basket.length}
                        </span>
                    </div> 
                </Link>
            </div>
        </div>
    )
}

export default Header;
