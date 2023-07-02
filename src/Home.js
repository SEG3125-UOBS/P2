import Carousel from 'react-bootstrap/Carousel';
import cartIcon from "./rsc/cart.svg";
import Card from 'react-bootstrap/Card';
import {useNavigate} from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import StarRating from "./StarRating";

import {Laptop1, Laptop2, Desktop1,Desktop2,Printer1,WideScreen1,Screen1,Keyboard1,Keyboard2,Mouse1,Mouse2,Chair1,Chair2,Desk1} from './rsc/imgIndex.js';
import data from './data.json'

import './Home.css';

const Home = () => {
    
    var itemData = data.items;
    //Dictionary for images
    const imgDict = {
        "Laptop1": Laptop1,
        "Laptop2": Laptop2,
        "Desktop1": Desktop1,
        "Desktop2": Desktop2,
        "Printer1": Printer1,
        "WideScreen1": WideScreen1,
        "Screen1": Screen1,
        "Keyboard1": Keyboard1,
        "Keyboard2": Keyboard2,
        "Mouse1": Mouse1,
        "Mouse2": Mouse2,
        "Chair1": Chair1,
        "Chair2": Chair2,
        "Desk1": Desk1
    }
    //Bind items to their image
    itemData = itemData.map(eachItem => ({...eachItem, imageData:imgDict[eachItem.image]}))

    //Arbitrary top sellers
    const topSellingIds = [1,3,5,7]
    const bestItems = itemData.filter(item => topSellingIds.includes(item.id))

    const navigate = useNavigate();
    function redirect(itemId){
        navigate(`/item/${itemId}`)
    }
    function redirectCategory(category){
        //TBD: REDIRECT____________________________________________________________________________
    }

    //Calculates the score of the item
    function getReviewScore(itemId) {
        const relevantReviews = data.reviews.filter(review => review.itemId===itemId)
        var score = 0;
        for (let i=0;i<relevantReviews.length;i++) {
            score += relevantReviews[i].rating
        }
        return (Math.round(score/relevantReviews.length))
    }

    //Arbitrary category list for display
    const categoryList = ["laptop","desktop","printer","monitor","keyboard","mouse","chair","desk"]
    const categoryMap = {"laptop":"Laptops","desktop":"Desktops","printer":"Printers","monitor":"Monitors","keyboard":"Keyboards","mouse":"Computer Mice","chair":"Desk Chairs","desk":"Desks"}

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
            
            <h1 className='py-2'>Top Selling Items</h1>

            <Row className="g-0 px-4">
            {
                bestItems.map((item) => (
                    <Col sm={6} xl={3} key={item.id} className="p-2">
                        <Card onClick={() => redirect(item.id)}>
                            <Card.Img variant="top" src={item.imageData} style={{maxHeight:"275px"}}/>
                            <Card.Body>
                                <Card.Title>{item.name}</Card.Title>
                                <Row>
                                    <Col><StarRating presetRating={getReviewScore(item.id)} viewOnly={true}/></Col>
                                    <Col>
                                        <Card.Text>
                                        Cost: {item.cost}$
                                        </Card.Text>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>                        
                ))
            }
            </Row>

            <h1 className='py-2'>Explore Categories</h1>

            <Row className="g-0 px-4">
            {
                categoryList.map((category) => {
                    var catItemList = itemData.filter((item) => item.category.includes(category))
                    var displayItem;
                    if (catItemList.length!==0) {
                        displayItem = catItemList[0]
                    } else {
                        return 
                    }
                    
                    return (
                        <Col sm={6} xl={3} className="p-2">
                            <Card onClick={() => redirectCategory()}>
                                <Card.Img variant="top" src={displayItem.imageData} style={{maxHeight:"275px"}}/>
                                
                                <Card.Body className='p-2'>
                                    <Card.Title>{categoryMap[category]}</Card.Title>
                                </Card.Body>
                            </Card>
                        </Col>  
                    )
                                          
                })
            }
            </Row>

        </div>
    );
}

export default Home;