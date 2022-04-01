import React from 'react';
import './home.css';
import banner from './images/chair_banner.jpg';
import Product from './Product';
import img from './images/index.js';
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
                    title="This is the title part of this product"
                    price={99.49}
                    image={img.img3}
                    rating={4}
                /> 
                <Product 
                    id={uuidv4()}
                    title="This is also another part of this component"
                    price={32.99}
                    image={img.img4}
                    rating={3}
                />
                <Product 
                    id={uuidv4()}
                    title="What do we have here ..."
                    price={78.29}
                    image={img.img5}
                    rating={2}
                />
            </div>
            <div className="home__row">
                <Product 
                    id={uuidv4()}
                    title="The lean startup"
                    price={29.99}
                    image={img.img1}
                    rating={5}
                />
                <Product 
                    id={uuidv4()}
                    title="Something nice"
                    price={45.09}
                    image={img.img2}
                    rating={3}
                />
            </div>
            <div className="home__row">
                <Product 
                    id={uuidv4()}
                    title="The second card"
                    price={14.39}
                    image={img.img7}
                    rating={4}
                /> 
                <Product 
                    id={uuidv4()}
                    title="why are we here"
                    price={36.59}
                    image={img.img8}
                    rating={2}
                />
                <Product 
                    id={uuidv4()}
                    title="Things we do for food"
                    price={8.32}
                    image={img.img9}
                    rating={5}
                />
            </div>
            <div className="home__row">
                <Product 
                    id={uuidv4()}
                    title="The green house"
                    price={29.99}
                    image={img.img6}
                    rating={5}
                />
            </div>
        </div>
    )
};

export default Home;
