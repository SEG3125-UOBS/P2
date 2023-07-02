import { Col, Row } from "react-bootstrap";
import { useState } from 'react';
import { Link, useParams } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import StarRating from "./StarRating";
import Accordion from 'react-bootstrap/Accordion';
import {useNavigate} from "react-router-dom";
import Form from 'react-bootstrap/Form';

import {Laptop1, Laptop2, Desktop1,Desktop2,Printer1,WideScreen1,Screen1,Keyboard1,Keyboard2,Mouse1,Mouse2,Chair1,Chair2,Desk1} from './rsc/imgIndex.js';

import data from './data.json'


const Store = () => {

    const {category} = useParams()
    const categoryMap = {
        "laptop":[0,1],
        "desktop":[2,3],
        "printer":[4,5],
        "monitor":[6,7],
        "keyboard":[8,9],
        "mouse":[10,11],
        "chair":[12,13],
        "desk":[14]
    }
    var defaultActive = [true,true,true,true,true,true,true,true,true,true,true,true,true,true,true];
    if (category!==undefined) {
        var selectedActive = categoryMap[category]
        defaultActive = [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false];
        for (var i=0;i<selectedActive.length;i++) {
            defaultActive[selectedActive[i]]=true
        }
    }
    const [activeCat, setActiveCat] = useState(defaultActive)

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
    const [items, setItems] = useState(
        data.items.map(eachItem => ({...eachItem, imageData:imgDict[eachItem.image]}))
    );

    //Cost Filter Data
    const [costDisabled, setCostDisabled] = useState(true)

    //Rating Filter Data
    const [ratingDisabled, setRatingDisabled] = useState(true)
    
    const navigate = useNavigate();
    function redirect(itemId){
        navigate(`/item/${itemId}`)
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

    return (
        <div className="store">
            {/* Categories and filters */}
            <Row className="mw-100 g-0">
                <Col xs={5} md={3}>
                    {/* Categories */}
                    <Row className="m-2 bg-custom">
                        <h2 className="p-2">Categories</h2>
                        
                        {/* <Accordion defaultActiveKey="0" alwaysOpen> FOR STARTING WITH 1 SECTION OPEN*/}
                        <Accordion className="p-2" alwaysOpen>

                            <Accordion.Item eventKey="Electronic Devices">
                                <Accordion.Header>Electronic Devices</Accordion.Header>
                                <Accordion.Body className="p-0">
                                    <Accordion className="ps-4" alwaysOpen>
                                        <Accordion.Item eventKey="Laptops">
                                            <Accordion.Header>Laptops</Accordion.Header>
                                            <Accordion.Body>
                                                <Form.Check type={"checkbox"} defaultChecked={activeCat[0]} label={`Gaming Laptops`} className="pt-1 text-start"/> 
                                                <Form.Check type={"checkbox"} defaultChecked={activeCat[1]} label={`Office Laptops`} className="pt-1 text-start"/>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="Desktops">
                                            <Accordion.Header>Desktops</Accordion.Header>
                                            <Accordion.Body>
                                                <Form.Check type={"checkbox"} defaultChecked={activeCat[2]} label={`Gaming Prebuilt Desktop`} className="pt-1 text-start"/> 
                                                <Form.Check type={"checkbox"} defaultChecked={activeCat[3]} label={`Office Prebuilt Desktop`} className="pt-1 text-start"/>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="Printers">
                                            <Accordion.Header>Printers</Accordion.Header>
                                            <Accordion.Body>
                                                <Form.Check type={"checkbox"} defaultChecked={activeCat[4]} label={`Home Printers`} className="pt-1 text-start"/>
                                                <Form.Check type={"checkbox"} defaultChecked={activeCat[5]} label={`Office Printers`} className="pt-1 text-start"/>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>
                                </Accordion.Body>
                            </Accordion.Item>

                            <Accordion.Item eventKey="Peripherals">
                                <Accordion.Header>Peripherals</Accordion.Header>
                                <Accordion.Body className="p-0">
                                    <Accordion className="ps-4" alwaysOpen>
                                        <Accordion.Item eventKey="Monitors">
                                            <Accordion.Header>Monitors</Accordion.Header>
                                            <Accordion.Body>
                                                <Form.Check type={"checkbox"} defaultChecked={activeCat[6]} label={`WideScreen Monitors`} className="pt-1 text-start"/> 
                                                <Form.Check type={"checkbox"} defaultChecked={activeCat[7]} label={`Office Monitors`} className="pt-1 text-start"/>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="Keyboards">
                                            <Accordion.Header>Keyboards</Accordion.Header>
                                            <Accordion.Body>
                                                <Form.Check type={"checkbox"} defaultChecked={activeCat[8]} label={`Gaming Keyboards`} className="pt-1 text-start"/> 
                                                <Form.Check type={"checkbox"} defaultChecked={activeCat[9]} label={`Standard Keyboards`} className="pt-1 text-start"/>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="Mouse">
                                            <Accordion.Header>Mouse</Accordion.Header>
                                            <Accordion.Body>
                                                <Form.Check type={"checkbox"} defaultChecked={activeCat[10]} label={`Gaming Mice`} className="pt-1 text-start"/> 
                                                <Form.Check type={"checkbox"} defaultChecked={activeCat[11]} label={`Standard Mice`} className="pt-1 text-start"/>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>
                                </Accordion.Body>
                            </Accordion.Item>

                            <Accordion.Item eventKey="Furniture">
                                <Accordion.Header>Furniture</Accordion.Header>
                                <Accordion.Body className="p-0">
                                    <Accordion className="ps-4" alwaysOpen>
                                        <Accordion.Item eventKey="Chairs">
                                            <Accordion.Header>Chairs</Accordion.Header>
                                            <Accordion.Body>
                                                <Form.Check type={"checkbox"} defaultChecked={activeCat[12]} label={`Gaming Chairs`} className="pt-1 text-start"/> 
                                                <Form.Check type={"checkbox"} defaultChecked={activeCat[13]} label={`Office Chairs`} className="pt-1 text-start"/>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="Desks">
                                            <Accordion.Header>Desks</Accordion.Header>
                                            <Accordion.Body>
                                                <Form.Check type={"checkbox"} defaultChecked={activeCat[14]} label={`Office Desks`} className="pt-1 text-start"/>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>
                                </Accordion.Body>
                            </Accordion.Item>

                        </Accordion>
                    </Row>

                    {/* Filters */}
                    <Row className="m-2 bg-custom">
                        <h2 className="p-2">Filters</h2>
                        {/* TBD: This could be a form? */}

                        {/* Cost Filter */}
                        <div className="text-start p-2">
                            <input type="checkbox" id="cost-switch" className="form-check-input mx-3" onChange={e => setCostDisabled(!e.target.checked)}></input>
                            <label title="" htmlFor="cost-switch" className="form-check-label">Cost Filter</label>

                            <Row className="p-2">
                                <Col><input className="form-control" type="number" id="minCost" placeholder="Minimum" disabled={costDisabled}></input></Col>
                                <Col><input className="form-control" type="number" id="maxCost" placeholder="Maximum" disabled={costDisabled}></input></Col>
                            </Row>
                        </div>

                        {/* Rating Filter */}
                        <div className="text-start p-2">
                            <input type="checkbox" id="rating-switch" className="form-check-input mx-3" onChange={e => setRatingDisabled(!e.target.checked)}></input>
                            <label title="" htmlFor="rating-switch" className="form-check-label">Rating Filter</label>

                            <Row className="p-2">
                                {/* <Col><input className="form-control" type="number" id="minRating" placeholder="Minimum" disabled={ratingDisabled}></input></Col> */}
                                <Col><StarRating viewOnly={ratingDisabled}/></Col>
                            </Row>
                        </div>

                        {/* Sale Filter */}
                        <div className="text-start p-2 pb-4">
                            <input type="checkbox" id="sale-switch" className="form-check-input mx-3"></input>
                            <label title="" htmlFor="sale-switch" className="form-check-label">Sale Filter</label>
                        </div>
                        
                    </Row>
                </Col>
                {/* Items */}
                <Col xs={7} md={9}>
                    <Row className="g-0">
                    {
                        items.map((item) => (
                            <Col sm={12} md={6} xl={4} key={item.id} className="p-4">
                                <Card onClick={() => redirect(item.id)}>
                                    <Card.Img variant="top" src={item.imageData} style={{maxHeight:"250px"}} />
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
                
                </Col>

            </Row>
            
        </div>
    );
}

export default Store;