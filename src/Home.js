import Carousel from 'react-bootstrap/Carousel';
import cartIcon from "./rsc/cart.svg";
import Card from 'react-bootstrap/Card';
import {useNavigate} from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import StarRating from "./StarRating";

import {banner1,banner2, Laptop1, Laptop2, Desktop1,Desktop2,Printer1,WideScreen1,Screen1,Keyboard1,Keyboard2,Mouse1,Mouse2,Chair1,Chair2,Desk1} from './rsc/imgIndex.js';
import data from './data.json'

import './Home.css';


import { useTranslation } from "react-i18next";


const Home = () => {
    
    const {t,i18n} = useTranslation()

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
        navigate(`/store/${category}`)
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
    const categoryList = [0,2,4,6,8,10,12,14]
    const categoryMap = {0:"Laptops",2:"Desktops",4:"Printers",6:"Monitors",8:"Keyboards",10:"Computer Mice",12:"Desk Chairs",14:"Desks"}

    return (
        <div className="home">
            {/* Carousel */}
            <Carousel data-bs-theme="dark" className='carouselBox'>
                <Carousel.Item>
                    <img className="d-block h-100 carousel-image" src={banner1} alt="First slide"/>
                    <Carousel.Caption>
                    <h3>{t("Upcoming Sale")}</h3>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img className="d-block h-100 carousel-image" src={banner2} alt="Second slide" />
                    <Carousel.Caption>
                    <h3>{t("New Laptops in Stock")}</h3>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
            
            <h1 className='py-2'>{t("Top Selling Items")}</h1>

            <Row className="g-0 px-4">
            {
                bestItems.map((item) => (
                    <Col sm={6} xl={3} key={item.id} className="p-2">
                        <Card onClick={() => redirect(item.id)} style={{height:"365px"}}>
                            <Card.Img variant="top" src={item.imageData} style={{maxHeight:"250px"}} />
                                <Card.Body style={{display:"flex",alignItems:"flex-end"}}>
                                    <Col>
                                        <Card.Title>{item.name}</Card.Title>
                                        <Row>
                                            <Col><StarRating presetRating={getReviewScore(item.id)} viewOnly={true}/></Col>
                                            <Col>
                                                <Card.Text>
                                                Cost: {item.cost}$
                                                </Card.Text>
                                            </Col>
                                        </Row>
                                    </Col>
                                    
                                </Card.Body>
                        </Card>
                    </Col>                        
                ))
            }
            </Row>

            <h1 className='py-2'>{t("Explore Categories")}</h1>

            <Row className="g-0 px-4">
            {
                categoryList.map((category,index) => {
                    var catItemList = itemData.filter((item) => item.category.includes(category))
                    var displayItem;
                    if (catItemList.length!==0) {
                        displayItem = catItemList[0]
                    } else {
                        return
                    }
                    
                    return (
                        <Col sm={6} xl={3} key={index} className="p-2">
                            <Card onClick={() => redirectCategory(category)} style={{height:"325px"}}>
                                <Card.Img variant="top" src={displayItem.imageData} style={{maxHeight:"275px"}}/>
                                <Card.Body className='p-2 justify-content-center' style={{display:"flex",alignItems:"flex-end"}}>
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