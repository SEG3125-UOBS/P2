import { Link, useParams } from "react-router-dom";
import data from './data.json';
import { Col, Row } from "react-bootstrap";
import StarRating from "./StarRating";
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import {useNavigate} from "react-router-dom";
import ProgressBar from 'react-bootstrap/ProgressBar';
import Card from 'react-bootstrap/Card';

import {cartIcon ,Laptop1, Laptop2, Desktop1,Desktop2,Printer1,WideScreen1,Screen1,Keyboard1,Keyboard2,Mouse1,Mouse2,Chair1,Chair2,Desk1} from './rsc/imgIndex.js';

import { useTranslation } from "react-i18next";

const Item = (masterCart) => {
    const {t,i18n} = useTranslation()
    
    const currentCartItems = masterCart.cart[0]
    const setCartItems = masterCart.cart[1]

    const {itemId} = useParams()

    const itemData = data.items;
    var itemBasic = itemData.filter(item => item.id===parseInt(itemId))[0]
    //Convert img string to actual Image
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
    itemBasic.imageData = imgDict[itemBasic.image]

    const reviewsData = data.reviews;
    const itemReviews = reviewsData.filter(item => item.itemId===parseInt(itemId))

    const itemDetailsData = data.itemDetails;
    const itemDetails = itemDetailsData.filter(item => item.id===parseInt(itemId))[0]

    var alsoBought = itemData.filter(item => itemDetails.alsoBought.includes(item.id));
    for (var i=0;i<alsoBought.length;i++) {
        alsoBought[i].imageData = imgDict[alsoBought[i].image]
        
        var relevantReviews = data.reviews.filter(review => review.itemId===alsoBought[i].id)
        alsoBought[i].reviewScore = 0;
        for (let j=0;j<relevantReviews.length;j++) {
            alsoBought[i].reviewScore += relevantReviews[j].rating
        }
        alsoBought[i].reviewScore = Math.round(alsoBought[i].reviewScore/relevantReviews.length);
    }
    function redirect(itemId){
        navigate(`/item/${itemId}`)
    }
    
    //Get 1 forum post for display
    const selectedForum = data.forums.filter(post => post.itemId===parseInt(itemId))[0]
    //Get 1 review for display
    const selectedReview = itemReviews[0]

    function getReviewScore() {
        var score = 0;
        for (let i=0;i<itemReviews.length;i++) {
            score += itemReviews[i].rating
        }
        return (Math.round(score/itemReviews.length))
    }
    function getReviewPercent(rating) {
        return (itemReviews.filter(review => review.rating===rating).length / itemReviews.length)*100
    }
    function getReviewAmount(rating) {
        return (itemReviews.filter(review => review.rating===rating).length)
    }


    const [showReviewPrompt, setReviewPrompt] = useState(false)
    function onPlaceReviewClick(){
        setReviewPrompt(!showReviewPrompt) 
    }

    const navigate = useNavigate();
    function forumRedirect(){
        navigate(`/forumPost/${selectedForum.id}`)
    }

    function addToCart(){    
        setCartItems(currentCartItems => [...currentCartItems, itemBasic.id])
    }

    //Actual page begins here
    return (
        <div className="itemPage">
            <div className="d-flex ps-4 m-4 justify-content-start">
                <Link to="/store" >&lt; {t("Back to Store page")}</Link>
            </div>

            <Row className="justify-content-center px-4" style={{margin:"auto"}}>
                
                <Col xs={6} className="py-2 bg-custom">
                    {/* Title */}
                    <Row>
                        <h1 className="fw-bold">{itemBasic.name}</h1>
                    </Row>
                    {/* Rating */}
                    <Row>
                        <Col xs={12} md={6}><StarRating presetRating={getReviewScore()} viewOnly={true}/></Col>
                        <Col xs={12} md={6}><p>({itemReviews.length} {t("reviews")})</p></Col>
                    </Row>
                    {/* Cost and Cart */}
                    <Row className="g-0">
                        <Col xs={12} md={6}><p>{t("Cost")}: {itemBasic.cost}$</p></Col>
                        <Col xs={12} md={6} className="d-md-flex d-none">
                            <div className="w-100 d-flex justify-content-center" style={{minHeight:"100%",height:"0"}}>
                                <img src={cartIcon} className="h-100" alt="cartIcon"/>
                                <p className="ps-2 m-0 align-bottom" onClick={addToCart} style={{cursor:"pointer",color:"rgba(var(--bs-link-color-rgb),var(--bs-link-opacity,1))"}}>{t("Add to cart")}</p>
                            </div>
                        </Col>
                        <Col xs={12} md={6} className="d-md-none d-flex justify-content-center">
                            <div className="d-flex justify-content-center" style={{minHeight:"100%",height:"0"}}>
                                <img src={cartIcon} className="h-100" alt="cartIcon"/>
                            </div>
                            <p className="ps-4 m-0 align-bottom" onClick={addToCart} style={{cursor:"pointer"}}>{t("Add to cart")}</p>
                        </Col>
                    </Row>
                    {/* Description */}
                    <Row className="text-start p-2">
                        <h4>{t("Description")}:</h4>
                        <p>{itemDetails.description}</p>
                    </Row>
                </Col>
                
                <Col xs={6}>
                    <img src={itemBasic.imageData} className="mh-100 mw-100" alt="itemImage"/>
                </Col>

            </Row>
            {/* Additional details box */}
            <div className="bg-custom p-4 m-4">
                <ul className="text-start">
                    {
                        itemDetails.additional.map((point,index) => (
                            <li key={index}>{point}</li>
                        ))
                    }
                </ul>
            </div>

            

            {/* Forums and Reviews */}
            <Row>
                {/* Forums */}
                <Col xs={12} md={4}>
                    <h2 className="">{t("Forums")}</h2>
                    <Link to="/forums" >{t("Write your own forum post")}</Link>
                    {
                    selectedForum!==undefined &&
                    <div className="p-4 m-4 bg-custom" onClick={() => forumRedirect()} style={{cursor:"pointer"}}>
                        <h3>{selectedForum.title}</h3>
                        <p className='card-text' style={{textAlign:"start",overflow:"hidden",textOverflow:"ellipsis"}}>
                            {selectedForum.text}
                        </p>
                    </div>
                    }
                </Col>

                {/* Reviews */}
                <Col xs={12} md={4}>
                    <h2 className="">{t("Reviews")}</h2>
                    <p className="m-0 align-bottom" onClick={onPlaceReviewClick} style={{cursor:"pointer",textDecoration:"underline",color:"rgba(var(--bs-link-color-rgb),var(--bs-link-opacity,1))"}}>{t("Leave a review")}</p>
                    {
                    selectedReview!==undefined &&
                    <div className="p-4 m-4 bg-custom">
                        <StarRating presetRating={selectedReview.rating} viewOnly={true}/>
                        <p className='card-text' style={{textAlign:"start",overflow:"hidden",textOverflow:"ellipsis"}}>
                            {selectedReview.text}
                        </p>
                    </div>
                    }
                </Col>

                <Col xs={12} md={4}>
                    <h2 className="mb-5 pb-2">{t("Review Distribution")}</h2>
                    {
                        <div className="p-4 m-4 bg-custom text-start">
                            <Row className="g-0 p-0">
                                <Col md={12} xl={5}><StarRating presetRating={5} viewOnly={true}/></Col>
                                <Col md={11} xl={6} className="mt-1"><ProgressBar now={getReviewPercent(5)} /></Col>
                                <Col xs={1}><p className="m-0">({getReviewAmount(5)})</p></Col>
                            </Row>
                            <Row className="g-0 p-0">
                                <Col md={12} xl={5}><StarRating presetRating={4} viewOnly={true}/></Col>
                                <Col md={11} xl={6} className="mt-1"><ProgressBar now={getReviewPercent(4)} /></Col>
                                <Col xs={1}><p className="m-0">({getReviewAmount(4)})</p></Col>
                            </Row>
                            <Row className="g-0 p-0">
                                <Col md={12} xl={5}><StarRating presetRating={3} viewOnly={true}/></Col>
                                <Col md={11} xl={6} className="mt-1"><ProgressBar now={getReviewPercent(3)} /></Col>
                                <Col xs={1}><p className="m-0">({getReviewAmount(3)})</p></Col>
                            </Row>
                            <Row className="g-0 p-0">
                                <Col md={12} xl={5}><StarRating presetRating={2} viewOnly={true}/></Col>
                                <Col md={11} xl={6} className="mt-1"><ProgressBar now={getReviewPercent(2)} /></Col>
                                <Col xs={1}><p className="m-0">({getReviewAmount(2)})</p></Col>
                            </Row>
                            <Row className="g-0 p-0">
                                <Col md={12} xl={5}><StarRating presetRating={1} viewOnly={true}/></Col>
                                <Col md={11} xl={6} className="mt-1"><ProgressBar now={getReviewPercent(1)} /></Col>
                                <Col xs={1}><p className="m-0">({getReviewAmount(1)})</p></Col>
                            </Row>
                        </div>
                    }
                </Col>
            </Row>
            
            {/* User Review section */}
            {
                showReviewPrompt &&
                <div className="m-4 px-4 newReview text-start">
                    <h2>{t("Enter your review")}</h2>
                    <StarRating viewOnly={false}/>
                    <textarea className="form-control mt-2" id="reviewText" placeholder={t("Review Text")} rows={5}></textarea>
                    <Button className="m-2 mt-3" variant="outline-primary">{t("Submit Review")}</Button>
                </div>
            }

            {/* Users also bought */}

            <h2 className='py-2'>{t("Customers also bought")}:</h2>

            <Row className="g-0 px-4">
            {
                alsoBought.map((item) => (
                    <Col sm={6} xl={3} key={item.id} className="p-2">
                        <Card onClick={() => redirect(item.id)} style={{height:"365px"}}>
                            <Card.Img variant="top" src={item.imageData} style={{maxHeight:"250px"}} />
                                <Card.Body style={{display:"flex",alignItems:"flex-end"}}>
                                    <Col>
                                        <Card.Title>{item.name}</Card.Title>
                                        <Row>
                                            <Col><StarRating presetRating={item.reviewScore} viewOnly={true}/></Col>
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
            
        </div>
    );
}

export default Item;