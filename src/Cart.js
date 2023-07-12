import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom"
import Button from 'react-bootstrap/Button';
import data from './data.json';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { useState } from 'react';

const Cart = (masterCart) => {
    //Global cart items
    let cartItems = masterCart.cart[0]
    //Set global cart (careful about infinite loop)
    let cartSet = masterCart.cart[1]

    var cartData = cartItems.map(eachId => data.items.filter(eachItem=>eachItem.id===eachId)[0])

    //arbitrary tax rate
    const taxRate = 0.2;
    var subtotal = 0;
    for (var i=0;i<cartData.length;i++) {
        subtotal = subtotal+cartData[i].cost
    }
    const taxAmount = subtotal*taxRate
    const total = subtotal+taxAmount

    function removeItemFromCart(index){
        var clone = cartItems.slice()
        clone.splice(index,1)
        cartSet(clone)
    }

    const [showAlert,setAlert] = useState(-1)
    function onCompleteClick() {
        const store = document.getElementById("locationbox");
        const time = document.getElementById("timebox");
        const name = document.getElementById("namebox");
        const cell = document.getElementById("numberbox");
        
        var display=1;
        if (store.value==="0") {
            display=0;
            store.style.border = "1px solid #ff0000";
        } else {store.style.border = "";}
        if (time.value==="0") {
            display=0;
            time.style.border = "1px solid #ff0000";
        } else {time.style.border = "";}
        if (name.value==="") {
            display=0;
            name.style.border = "1px solid #ff0000";
        } else {name.style.border = "";}
        if (!(/^\d+$/.test(cell.value))) {
            display=0;
            cell.style.border = "1px solid #ff0000";
        } else {cell.style.border = "";}

        setAlert(display);
    }

    return (
        <div className="cart">

            {/* Alerts */}
            <Alert show={showAlert===1} onClose={()=>setAlert(-1)} variant="success" className="m-4" dismissible>
                <Alert.Heading>
                    <div>Purchase Completed</div>
                </Alert.Heading>
                <p>
                Congratulations! Your items have been reserved for you. Visit the store at your booked time to pick up your items. 
                <br></br>
                You may close this page.
                </p>
            </Alert>
            <Alert show={showAlert===0} variant="danger" onClose={()=>setAlert(-1)} className="m-4" dismissible>
                <Alert.Heading>
                    <div>Purchase Error</div>
                </Alert.Heading>
                <p>
                There was a problem purchasing your items. Try checking your appointment details before trying again.
                </p>
            </Alert>


            <h1 className="p-3">Your Cart</h1>
            <Row className="justify-content-center">
                <Col sm={12} md={4}>
                    <h3 className="p-1">Missing Anything?</h3>
                </Col>
                <Col xs={12} md={3}>
                    <Button as={Link} to="/store" variant="outline-primary">Back to Store page</Button>
                </Col>
            </Row>

            <Row className="justify-content-center p-4">
                {/* Cart Items */}
                <Col sm={12} md={8} className="bg-custom p-4">
                    
                    {/* Item Section */}
                    <Row>
                        {/* Prices */}
                        <Col xs={2}>
                            {
                                cartData.map((eachItem,index) => (
                                    <p key={index}>{eachItem.cost}$</p>
                                ))
                            }
                        </Col>
                        {/* Divider */}
                        <Col xs={1} style={{borderLeft:"2px solid black"}}></Col>
                        {/* Item Names */}
                        <Col xs={3} className="text-start">
                            {
                                cartData.map((eachItem,index) => (
                                    <p key={index} className="fw-bold">{eachItem.name}</p>
                                ))
                            }
                        </Col>
                        {/* Sales */}
                        <Col xs={2}>
                            {
                                cartData.map((eachItem,index) => (
                                    <p key={index}>No Sale</p>
                                ))
                            }
                        </Col>
                        {/* Remove button */}
                        <Col xs={4}>
                            {
                                cartItems.map((eachId,index) => (
                                    <Button key={index} onClick={() => removeItemFromCart(index)} variant="outline-danger" className="w-100">Remove from cart</Button>
                                ))
                            }
                        </Col>
                    </Row>

                    {/* Divider */}
                    <Row style={{borderTop:"2px solid black"}}></Row>

                    {/* Totals Section */}
                    <Row className="pt-2">
                        {/* Prices */}
                        <Col xs={2}>
                            <p>{subtotal}$</p>
                            <p>{taxAmount}$</p>
                            <p>{total}$</p>
                        </Col>
                        {/* Divider */}
                        <Col xs={1} style={{borderLeft:"2px solid black"}}></Col>
                        {/* Total Name */}
                        <Col className="text-start">
                            <p className="fw-underline">Subtotal</p>
                            <p className="fw-underline">Taxes</p>
                            <p className="fw-underline">Total Due</p>
                        </Col>
                    </Row>

                </Col>

                {/* Pickup Booking */}
                <Col xs={12} md={4} className="p-4">
                    <h3>Set a Pickup Appointment</h3>
                    <div className="text-start pt-3">
                        <label title="" htmlFor="locSelect" className="form-select-label">Enter Store Location: </label>
                    </div>
                    <Form.Select aria-label="Default select example" id="locationbox" defaultValue={"0"}>
                        <option value="0" disabled>Location</option>
                        <option value="1">Gatineau</option>
                        <option value="2">Vanier</option>
                        <option value="3">Nepean</option>
                    </Form.Select>

                    <div className="text-start pt-3">
                        <label title="" htmlFor="locSelect" className="form-select-label">Enter Pickup Time:</label>
                    </div>
                    <Form.Select aria-label="Default select example" id="timebox" defaultValue={"0"}>
                        <option value="0" disabled>Pickup Time</option>
                        <option value="1">10:00</option>
                        <option value="2">11:00</option>
                        <option value="3">12:00</option>
                        <option value="4">13:00</option>
                        <option value="5">14:00</option>
                    </Form.Select>

                    <div className="text-start pt-3">
                        <label title="" htmlFor="locSelect" className="form-select-label">Enter Full Name:</label>
                    </div>
                    <input className="form-control" type="text" id="namebox" placeholder="ex: John Doe"></input>

                    <div className="text-start pt-3">
                        <label title="" htmlFor="locSelect" className="form-select-label">Enter Cell Phone Number:</label>
                    </div>
                    <input className="form-control" type="text" id="numberbox" placeholder="ex: 6131112222"></input>

                    <div className="text-start pt-3">
                        <label title="" htmlFor="locSelect" className="form-select-label">Do you need employee assistance?</label>
                    </div>
                    <Form.Check type={"checkbox"} label={`Employee Assistance`} className="pt-2 text-start"/>
                </Col>
            </Row>

            <Button variant="outline-success" className="mt-3" onClick={()=>onCompleteClick()}>Complete Purchase</Button>

        </div>
    );
}

export default Cart;