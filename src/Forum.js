import Accordion from 'react-bootstrap/Accordion';
import { Col, Row } from "react-bootstrap";

import itemDataImport from './data.json'
const itemData = itemDataImport.items;

const Forum = () => {
    return (
        <div className="forum">
            <h1 className='p-3 m-3'>Forums</h1>
            <h3 className='p-1'>Have a Question?</h3>
            <Row className='justify-content-center'>
                <Col xs={8}>
                    <Accordion className="ps-4" alwaysOpen>
                        <Accordion.Item eventKey="Laptops">
                            <Accordion.Header>Make a forum post</Accordion.Header>
                            <Accordion.Body>
                                <Row>
                                    <Col xs={8}>
                                        <input className="form-control" type="text" id="minCost" placeholder="Subject Line"></input>
                                    </Col>
                                    <Col xs={4}>
                                    <input class="form-control mr-sm-2" oninput='onInput()' list="datalistOptions" id="dataList" placeholder="Relevant Product"></input>
                                    <datalist id="datalistOptions">
                                        {
                                            itemData.map((item) => (
                                                <option value={item.name}>{item.name}</option>
                                            ))
                                        }
                                    </datalist>
                                    </Col>
                                </Row>
                                <p>1</p>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Col>
            </Row>
            
        </div>
    );
}

export default Forum;