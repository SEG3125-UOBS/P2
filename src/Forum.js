import Accordion from 'react-bootstrap/Accordion';
import { Col, Row } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './Forum.css'
import {useNavigate} from "react-router-dom";
import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';

import { useTranslation } from "react-i18next";

import dataImport from './data.json'
const itemData = dataImport.items;
var forumData = dataImport.forums.filter(headPost => headPost.reply===false);
//Get the names of the items from the IDs
forumData = forumData.map(
    post => ({...post, itemName:itemData.filter(item => item.id===post.itemId)[0].name})
)

const itemFilterOptions = itemData.map(item=>item.name)

const Forum = () => {
    const {t,i18n} = useTranslation()

    const navigate = useNavigate();
    function forumRedirect(forumSelected){
        navigate(`/forumPost/${forumSelected}`)
    }
    
    const [activeItemFilter, setActiveItemFilter] = useState("")
    function filterByItem(param){
        if (itemFilterOptions.includes(param)) {
            setActiveItemFilter(param);
        } else {
            setActiveItemFilter("");
        }
    }

    const [activeTitleFilter,setActiveTitleFilter] = useState("")

    function getActiveForums(){
        var activeForums = forumData.slice();

        if (activeItemFilter!=="") {
            activeForums = activeForums.filter(forum=>forum.itemName===activeItemFilter)
        }

        activeForums = activeForums.filter(forum=>forum.title.includes(activeTitleFilter))

        return activeForums;
    }

    const [showAlert,setAlert] = useState(-1)
    function onCompleteClick() {
        const subject = document.getElementById("subjectLine");
        const text = document.getElementById("forumText");

        var display=1;
        if (subject.value==="") {
            display=0;
            subject.style.border = "1px solid #ff0000";
        } else {subject.style.border = "";}
        if (text.value==="") {
            display=0;
            text.style.border = "1px solid #ff0000";
        } else {text.style.border = "";}

        setAlert(display);
    }

    return (
        <div className="forum">

            {/* Alerts */}
            <Alert show={showAlert===1} onClose={()=>setAlert(-1)} variant="success" className="m-4" dismissible>
                <Alert.Heading>
                    <div>{t("Forum Post Created")}</div>
                </Alert.Heading>
                <p>
                {t("Congratulations! Your forum post has been submitted and is awaiting manual review. It will be posted shortly.")}
                <br></br>
                {t("You may close this page.")}
                </p>
            </Alert>
            <Alert show={showAlert===0} variant="danger" onClose={()=>setAlert(-1)} className="m-4" dismissible>
                <Alert.Heading>
                    <div>{t("Forum Post Error")}</div>
                </Alert.Heading>
                <p>
                {t("There was a problem creating your forum post. Check your post details and try again.")}
                </p>
            </Alert>

            <h1 className='p-3 m-3'>{t("Forums")}</h1>

            {/* New Forum Post */}
            <h3 className='p-1'>{t("Have a Question")}?</h3>
            <Row className='justify-content-center'>
                <Col xs={8}>

                    <Accordion className="ps-4" alwaysOpen>
                        <Accordion.Item eventKey="Laptops">
                            <Accordion.Header>{t("Make a forum post")}</Accordion.Header>
                            <Accordion.Body>
                                <Row>
                                    <Col xs={8}>
                                        <input className="form-control" type="text" id="subjectLine" placeholder={t("Subject Line")}></input>
                                    </Col>
                                    <Col xs={4}>
                                    <input className="form-control mr-sm-2" list="datalistOptions" id="dataList" placeholder={t("Relevant Product")}></input>
                                    <datalist id="datalistOptions">
                                        {
                                            itemData.map((item) => (
                                                <option value={item.name} key={item.id}>{item.name}</option>
                                            ))
                                        }
                                    </datalist>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                    <textarea className="form-control mt-2" id="forumText" placeholder={t("Forum Post Text")} rows={5}></textarea>
                                    </Col>
                                </Row>
                                <Button className='mt-3' onClick={()=>onCompleteClick()}>{t("Submit")}</Button>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Col>
            </Row>

            {/* Forum list */}
            <div className='p-5'>
                <h3 className='p-1'>{t("Find posts by product or by forum title")}</h3>
                <Row>
                    <Col xs={8}>
                        <input className="form-control" onInput={(e)=>setActiveTitleFilter(e.target.value)} type="text" id="subjectLineFilter" placeholder={t("Search by Forum Title")}></input>
                    </Col>
                    <Col xs={4}>
                    <input className="form-control mr-sm-2" onInput={(e)=>filterByItem(e.target.value)} list="datalistOptions" id="dataListFilter" placeholder={t("Filter by product")}></input>
                    <datalist id="datalistOptions">
                        {
                            itemData.map((item) => (
                                <option value={item.name} key={item.name}>{item.name}</option>
                            ))
                        }
                    </datalist>
                    </Col>
                </Row>
                <Row className="g-0">
                    {
                        getActiveForums().map((forum) => (
                            <Col sm={12} md={6} xl={4} key={forum.id} className="p-4">
                                <Card onClick={() => forumRedirect(forum.id)}>
                                    <Card.Body>
                                        <Card.Title>{forum.title}</Card.Title>
                                        {/* Make Clickable?: add hover cursor effect, add redirect */}
                                        <p className='fw-bold'>{t("Related Product")}: {forum.itemName}</p>
                                        <Row>
                                            <Col>
                                                <p className='card-text forumText'>
                                                    {forum.text}
                                                </p>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Col>                        
                        ))
                    }
                    </Row>
            </div>
            

        </div>
    );
}

export default Forum;