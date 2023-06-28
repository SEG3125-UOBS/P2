import Carousel from 'react-bootstrap/Carousel';
import cartIcon from "./rsc/cart.svg";

import './Home.css';

const Home = () => {
    return (
        <div className="home">
            {/* Carousel */}
            <Carousel data-bs-theme="dark" className='carouselBox'>
                <Carousel.Item>
                    <img className="d-block h-100 carousel-image" src={cartIcon} alt="First slide"/>
                    <Carousel.Caption>
                    <h3>First slide label</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img className="d-block h-100 carousel-image" src={cartIcon} alt="Second slide" />
                    <Carousel.Caption>
                    <h3>Second slide label</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
            
            

            <h1>home</h1>
        </div>
    );
}

export default Home;