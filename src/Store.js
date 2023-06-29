import { Col, Row } from "react-bootstrap";
import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import StarRating from "./StarRating";

const Store = () => {
    //Data
    const [items, setItems] = useState([
        {name:"temp1", cost:10, rating:3, id:1},
        {name:"temp2", cost:10, rating:3, id:2},
        {name:"temp3", cost:10, rating:3, id:3},
        {name:"temp4", cost:10, rating:3, id:4}
    ]);
    
    return (
        <div className="store">
            {/* Categories and filters */}
            <Row>
                <Col xs={3}>
                    <Row>

                    </Row>
                    <Row>

                    </Row>
                </Col>
                {/* Items */}
                <Col xs={9}>
                    <Row>
                    {
                        items.map((item) => (
                            <Col key={item.id}>
                                <Card style={{ width: '18rem' }}>
                                    <Card.Img variant="top" src="holder.js/100px180" />
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