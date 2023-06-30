import { Col, Row } from "react-bootstrap";
import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import StarRating from "./StarRating";
import Accordion from 'react-bootstrap/Accordion';

import {Laptop1} from './rsc/imgIndex.js';

import itemData from './data.json'

function redirect(name) {
    //TBD: Redirect to item page
    console.log(name);
}

const Store = () => {
    //Data
    const [items, setItems] = useState(
        itemData.items.map(eachItem => ({...eachItem, image:Laptop1}))
    );

    //Cost Filter Data
    const [costDisabled, setCostDisabled] = useState(true)

    //Rating Filter Data
    const [ratingDisabled, setRatingDisabled] = useState(true)
    
    return (
        <div className="store">
            {/* Categories and filters */}
            <Row className="mw-100 g-0">
                <Col xs={5} md={3}>
                    {/* Categories */}
                    <Row className="m-2 bg-light">
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
                                                Lorem ipsum 
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="Desktops">
                                            <Accordion.Header>Desktops</Accordion.Header>
                                            <Accordion.Body>
                                                Lorem ipsum 
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="Printers">
                                            <Accordion.Header>Printers</Accordion.Header>
                                            <Accordion.Body>
                                                Lorem ipsum 
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
                                                Lorem ipsum 
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="Keyboards">
                                            <Accordion.Header>Keyboards</Accordion.Header>
                                            <Accordion.Body>
                                                Lorem ipsum 
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="Mouse">
                                            <Accordion.Header>Mouse</Accordion.Header>
                                            <Accordion.Body>
                                                Lorem ipsum 
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
                                                Lorem ipsum 
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="Desks">
                                            <Accordion.Header>Desks</Accordion.Header>
                                            <Accordion.Body>
                                                Lorem ipsum 
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>
                                </Accordion.Body>
                            </Accordion.Item>

                        </Accordion>
                    </Row>

                    {/* Filters */}
                    <Row className="m-2 bg-light">
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
                                <Card onClick={() => redirect(item.name)}>
                                    <Card.Img variant="top" src={item.image} />
                                    <Card.Body>
                                        <Card.Title>{item.name}</Card.Title>
                                        <Row>
                                            <Col><StarRating presetRating={item.rating} viewOnly={true}/></Col>
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