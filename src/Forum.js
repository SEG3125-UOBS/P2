import Accordion from 'react-bootstrap/Accordion';
import { Col, Row } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './Forum.css'
import {useNavigate} from "react-router-dom";

import dataImport from './data.json'
const itemData = dataImport.items;
const forumData = dataImport.forums.filter(headPost => headPost.reply===false);

const Forum = () => {

    const navigate = useNavigate();
    function forumRedirect(forumSelected){
        navigate(`/forumPost/${forumSelected}`)
    }
    

    return (
        <div className="forum">
            <h1 className='p-3 m-3'>Forums</h1>

            {/* New Forum Post */}
            <h3 className='p-1'>Have a Question?</h3>
            <Row className='justify-content-center'>
                <Col xs={8}>
                    <Accordion className="ps-4" alwaysOpen>
                        <Accordion.Item eventKey="Laptops">
                            <Accordion.Header>Make a forum post</Accordion.Header>
                            <Accordion.Body>
                                <Row>
                                    <Col xs={8}>
                                        <input className="form-control" type="text" id="subjectLine" placeholder="Subject Line"></input>
                                    </Col>
                                    <Col xs={4}>
                                    <input className="form-control mr-sm-2" list="datalistOptions" id="dataList" placeholder="Relevant Product"></input>
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
                                    <textarea className="form-control mt-2" id="forumText" placeholder="Forum Post Text" rows={5}></textarea>
                                    </Col>
                                </Row>
                                <Button className='mt-3'>Submit</Button>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Col>
            </Row>

            {/* Forum list */}
            <div className='p-5'>
                <h3 className='p-1'>Find posts by product or by forum title</h3>
                <Row>
                    <Col xs={8}>
                        <input className="form-control" type="text" id="subjectLineFilter" placeholder="Search by Forum Title"></input>
                    </Col>
                    <Col xs={4}>
                    <input className="form-control mr-sm-2" list="datalistOptions" id="dataListFilter" placeholder="Filter by product"></input>
                    <datalist id="datalistOptions">
                        {
                            itemData.map((item) => (
                                <option value={item.name} key={item.id}>{item.name}</option>
                            ))
                        }
                    </datalist>
                    </Col>
                </Row>
                <Row className="g-0">
                    {
                        forumData.map((forum) => (
                            <Col sm={12} md={6} xl={4} key={forum.id} className="p-4">
                                <Card onClick={() => forumRedirect(forum.id)}>
                                    <Card.Body>
                                        <Card.Title>{forum.title}</Card.Title>
                                        {/* Make Clickable?: add hover cursor effect, add redirect */}
                                        <p className='fw-bold'>Related Product: {forum.item}</p>
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