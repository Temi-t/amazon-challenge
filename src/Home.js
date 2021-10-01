import React from 'react';
import './home.css';
import banner from './images/chair_banner.jpg';
import Product from './Product';
import saruto from './images/sasu-naru.jpg';
import {v4 as uuidv4} from 'uuid';

function Home () {
    return (
        <div className="home">
            <div className="home__container">
                <img 
                    src={banner} alt="banner"
                    className="home__image"
                />
            </div>
            <div className="home__row">
                <Product 
                    id={uuidv4()}
                    title="The lean startup"
                    price={29.99}
                    image={saruto}
                    rating={5}
                />
                <Product 
                    id={uuidv4()}
                    title="Something nice"
                    price={45.09}
                    image={saruto}
                    rating={3}
                />
            </div>
            <div className="home__row">
                <Product 
                    id={uuidv4()}
                    title="The second card"
                    price={14.39}
                    image={saruto}
                    rating={4}
                /> 
                <Product 
                    id={uuidv4()}
                    title="why are we here"
                    price={36.59}
                    image={saruto}
                    rating={2}
                />
                <Product 
                    id={uuidv4()}
                    title="Things we do for food"
                    price={8.32}
                    image={saruto}
                    rating={5}
                />
            </div>
            <div className="home__row">
                <Product 
                    id={uuidv4()}
                    title="The green house"
                    price={29.99}
                    image={saruto}
                    rating={5}
                />
            </div>
        </div>
    )
};

export default Home;
