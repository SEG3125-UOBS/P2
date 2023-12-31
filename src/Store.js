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

import { useTranslation } from "react-i18next";

const Store = () => {
    const {t,i18n} = useTranslation()

    const {category} = useParams()
    const categoryMap = {
        0:[0,1],
        2:[2,3],
        4:[4,5],
        6:[6,7],
        8:[8,9],
        10:[10,11],
        12:[12,13],
        14:[14]
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
    const [costFilterData, setCostFilters] = useState([-1,-1])

    //Rating Filter Data
    const [ratingDisabled, setRatingDisabled] = useState(true)
    const [ratingFilterData, setRatingFilter] = useState(-1)
    
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

    function changeActiveCategory(index,state){
        var clone = activeCat.slice()
        clone[index]=state;
        setActiveCat(clone);
    }

    function isActive(item){
        if (!ratingDisabled && getReviewScore(item.id)<ratingFilterData) {
            return false;
        }

        if (!costDisabled && (item.cost<costFilterData[0] || (item.cost>costFilterData[1] && costFilterData[1]!==-1))) {
            return false;
        }
        
        var active = false;
        for (var i=0;i<item.category.length;i++) {
            if (activeCat[item.category[i]]) {
                active=true;
                break;
            }
        }

        return active;
    }

    function onChangeCostFilter(value, index){
        if (value!=="") {
            var clone = costFilterData.slice();
            clone[index] = parseInt(value);
            setCostFilters(clone);
        }
    }

    return (
        <div className="store">
            {/* Categories and filters */}
            <Row className="mw-100 g-0">
                <Col xs={5} md={3}>
                    {/* Categories */}
                    <Row className="m-2 bg-custom">
                        <h2 className="p-2">{t("Categories")}</h2>
                        
                        {/* <Accordion defaultActiveKey="0" alwaysOpen> FOR STARTING WITH 1 SECTION OPEN*/}
                        <Accordion className="p-2" alwaysOpen>

                            <Accordion.Item eventKey="Electronic Devices">
                                <Accordion.Header>{t("Electronic Devices")}</Accordion.Header>
                                <Accordion.Body className="p-0">
                                    <Accordion className="ps-4" alwaysOpen>
                                        <Accordion.Item eventKey="Laptops">
                                            <Accordion.Header>{t("Laptops")}</Accordion.Header>
                                            <Accordion.Body>
                                                <Form.Check type={"checkbox"} defaultChecked={activeCat[0]} onChange={(e)=>changeActiveCategory(0,e.target.checked)} label={t("Gaming Laptops")} className="pt-1 text-start"/> 
                                                <Form.Check type={"checkbox"} defaultChecked={activeCat[1]} onChange={(e)=>changeActiveCategory(1,e.target.checked)} label={t(`Office Laptops`)} className="pt-1 text-start"/>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="Desktops">
                                            <Accordion.Header>{t("Desktops")}</Accordion.Header>
                                            <Accordion.Body>
                                                <Form.Check type={"checkbox"} defaultChecked={activeCat[2]} onChange={(e)=>changeActiveCategory(2,e.target.checked)}  label={t(`Gaming Prebuilt Desktop`)} className="pt-1 text-start"/> 
                                                <Form.Check type={"checkbox"} defaultChecked={activeCat[3]} onChange={(e)=>changeActiveCategory(3,e.target.checked)}  label={t(`Office Prebuilt Desktop`)} className="pt-1 text-start"/>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="Printers">
                                            <Accordion.Header>{t("Printers")}</Accordion.Header>
                                            <Accordion.Body>
                                                <Form.Check type={"checkbox"} defaultChecked={activeCat[4]} onChange={(e)=>changeActiveCategory(4,e.target.checked)}  label={t(`Home Printers`)} className="pt-1 text-start"/>
                                                <Form.Check type={"checkbox"} defaultChecked={activeCat[5]} onChange={(e)=>changeActiveCategory(5,e.target.checked)}  label={t(`Office Printers`)} className="pt-1 text-start"/>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>
                                </Accordion.Body>
                            </Accordion.Item>

                            <Accordion.Item eventKey="Peripherals">
                                <Accordion.Header>{t("Peripherals")}</Accordion.Header>
                                <Accordion.Body className="p-0">
                                    <Accordion className="ps-4" alwaysOpen>
                                        <Accordion.Item eventKey="Monitors">
                                            <Accordion.Header>{t("Monitors")}</Accordion.Header>
                                            <Accordion.Body>
                                                <Form.Check type={"checkbox"} defaultChecked={activeCat[6]} onChange={(e)=>changeActiveCategory(6,e.target.checked)}  label={t(`WideScreen Monitors`)} className="pt-1 text-start"/> 
                                                <Form.Check type={"checkbox"} defaultChecked={activeCat[7]} onChange={(e)=>changeActiveCategory(7,e.target.checked)}  label={t(`Office Monitors`)} className="pt-1 text-start"/>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="Keyboards">
                                            <Accordion.Header>{t("Keyboards")}</Accordion.Header>
                                            <Accordion.Body>
                                                <Form.Check type={"checkbox"} defaultChecked={activeCat[8]} onChange={(e)=>changeActiveCategory(8,e.target.checked)}  label={t(`Gaming Keyboards`)} className="pt-1 text-start"/> 
                                                <Form.Check type={"checkbox"} defaultChecked={activeCat[9]} onChange={(e)=>changeActiveCategory(9,e.target.checked)}  label={t(`Standard Keyboards`)} className="pt-1 text-start"/>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="Mouse">
                                    <Accordion.Header>{t("Mouse")}</Accordion.Header>
                                            <Accordion.Body>
                                                <Form.Check type={"checkbox"} defaultChecked={activeCat[10]} onChange={(e)=>changeActiveCategory(10,e.target.checked)}  label={t(`Gaming Mice`)} className="pt-1 text-start"/> 
                                                <Form.Check type={"checkbox"} defaultChecked={activeCat[11]} onChange={(e)=>changeActiveCategory(11,e.target.checked)}  label={t(`Standard Mice`)} className="pt-1 text-start"/>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>
                                </Accordion.Body>
                            </Accordion.Item>

                            <Accordion.Item eventKey="Furniture">
                                <Accordion.Header>{t("Furniture")}</Accordion.Header>
                                <Accordion.Body className="p-0">
                                    <Accordion className="ps-4" alwaysOpen>
                                        <Accordion.Item eventKey="Chairs">
                                            <Accordion.Header>{t("Chairs")}</Accordion.Header>
                                            <Accordion.Body>
                                                <Form.Check type={"checkbox"} defaultChecked={activeCat[12]} onChange={(e)=>changeActiveCategory(12,e.target.checked)}  label={t(`Gaming Chairs`)} className="pt-1 text-start"/> 
                                                <Form.Check type={"checkbox"} defaultChecked={activeCat[13]} onChange={(e)=>changeActiveCategory(13,e.target.checked)}  label={t(`Office Chairs`)} className="pt-1 text-start"/>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="Desks">
                                            <Accordion.Header>{t("Desks")}</Accordion.Header>
                                            <Accordion.Body>
                                                <Form.Check type={"checkbox"} defaultChecked={activeCat[14]} onChange={(e)=>changeActiveCategory(14,e.target.checked)}  label={t(`Office Desks`)} className="pt-1 text-start"/>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>
                                </Accordion.Body>
                            </Accordion.Item>

                        </Accordion>
                    </Row>

                    {/* Filters */}
                    <Row className="m-2 bg-custom">
                        <h2 className="p-2">{t("Filters")}</h2>

                        {/* Cost Filter */}
                        <div className="text-start p-2">
                            <input type="checkbox" id="cost-switch" className="form-check-input mx-3" onChange={e => setCostDisabled(!e.target.checked)}></input>
                            <label title="" htmlFor="cost-switch" className="form-check-label">{t("Cost Filter")}</label>

                            <Row className="p-2">
                                <Col><input className="form-control" onChange={(e)=>onChangeCostFilter(e.target.value,0)} type="number" id="minCost" placeholder={t("Minimum")} disabled={costDisabled}></input></Col>
                                <Col><input className="form-control" onChange={(e)=>onChangeCostFilter(e.target.value,1)} type="number" id="maxCost" placeholder={t("Maximum")} disabled={costDisabled}></input></Col>
                            </Row>
                        </div>

                        {/* Rating Filter */}
                        <div className="text-start p-2">
                            <input type="checkbox" id="rating-switch" className="form-check-input mx-3" onChange={e => setRatingDisabled(!e.target.checked)}></input>
                            <label title="" htmlFor="rating-switch" className="form-check-label">{t("Rating Filter")}</label>

                            <Row className="p-2">
                                {/* <Col><input className="form-control" type="number" id="minRating" placeholder="Minimum" disabled={ratingDisabled}></input></Col> */}
                                <Col><StarRating viewOnly={ratingDisabled} onChange={(rating)=>{setRatingFilter(rating)}}/></Col>
                            </Row>
                        </div>

                        {/* Sale Filter CURRENTLY UNUSED*/}
                        {/* 
                        <div className="text-start p-2 pb-4">
                            <input type="checkbox" id="sale-switch" className="form-check-input mx-3"></input>
                            <label title="" htmlFor="sale-switch" className="form-check-label">Sale Filter</label>
                        </div> 
                        */}
                        
                    </Row>
                </Col>
                {/* Items */}
                <Col xs={7} md={9}>
                    <Row className="g-0">
                    {
                        items.map((item) => (
                            
                            isActive(item) &&
                            <Col sm={12} md={6} xl={4} key={item.id} className="p-4">
                                <Card onClick={() => redirect(item.id)} style={{height:"340px"}}>
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
                
                </Col>

            </Row>
            
        </div>
    );
}

export default Store;