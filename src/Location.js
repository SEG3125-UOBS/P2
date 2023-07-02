import './Location.css'
import { Col, Row } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import { useState } from 'react';

const locationData = [
    {phone:"", email:"", postal:"", hours:[["N/A","N/A"],
                                            ["N/A","N/A"],
                                            ["N/A","N/A"],
                                            ["N/A","N/A"],
                                            ["N/A","N/A"],
                                            ["N/A","N/A"],
                                            ["N/A","N/A"]]},
    {phone:"999-999-9999", email:"mecMax1@gmail.com", postal:"K1A 1L4", hours:[["9:30","21:00"],
                                                                                ["9:30","21:00"],
                                                                                ["9:30","21:00"],
                                                                                ["9:30","21:00"],
                                                                                ["9:30","21:00"],
                                                                                ["9:30","16:00"],
                                                                                ["9:30","21:00"]]},
    {phone:"888-888-8888", email:"mecMax2@gmail.com", postal:"K1L", hours:[["9:30","21:00"],
                                                                                ["9:30","21:00"],
                                                                                ["10:30","21:00"],
                                                                                ["9:30","21:00"],
                                                                                ["9:30","19:00"],
                                                                                ["9:30","21:00"],
                                                                                ["9:30","21:00"]]},
    {phone:"777-777-7777", email:"mecMax3@gmail.com", postal:"K2E 0A5", hours:[["9:30","21:00"],
                                                                                ["9:30","21:00"],
                                                                                ["9:30","21:00"],
                                                                                ["9:30","21:00"],
                                                                                ["9:30","21:00"],
                                                                                ["12:30","21:00"],
                                                                                ["9:30","20:00"]]}
];

const Location = () => {

    const [activeLoc, setLoc] = useState(0)

    return (
        <div className="location">
            <h1 className='p-4 m-4'>Our Store Locations</h1>
            <div id="google-map-box" className="m-4 p-4 ">
                <iframe src="https://www.google.com/maps/d/u/0/embed?mid=16GGPC-smlgkJXEUs5wx_-4JO8CAs_qY&ehbc=2E312F" 
                title="google-map-title" id="google-map" loading="lazy"></iframe>
            </div>
            <h1 className='p-4 m-4'>Select a Location to view Information</h1>
            <Row className='p-4'>
                <Col xs={12} md={6}>

                    {/* Selecting Location */}
                    <label title="" htmlFor="locSelect" className="form-select-label">Location: </label>
                    <Form.Select aria-label="Default select example" onChange={(e) => setLoc(e.target.value)} defaultValue={"0"}>
                        <option value="0" disabled>Select a Location</option>
                        <option value="1">Gatineau</option>
                        <option value="2">Vanier</option>
                        <option value="3">Nepean</option>
                    </Form.Select>
                    
                    {/* Displaying contact info */}
                    <h2 className='p-3 m-3'>Contact Info</h2>
                    <div className='bg-custom text-start p-2'>
                        <h4 className='ms-4 p-2 lead'>Phone Number</h4>
                        <p className='ms-5'>{locationData[activeLoc].phone}</p>
                        <h4 className='ms-4 p-2 lead'>Email</h4>
                        <p className='ms-5'>{locationData[activeLoc].email}</p>
                        <h4 className='ms-4 p-2 lead'>Mail Address</h4>
                        <p className='ms-5'>{locationData[activeLoc].postal}</p>
                    </div>
                </Col>
                <Col>
                    {/* Displaying Open hours */}
                    <h2 className='p-3 m-3'>Open Hours</h2>
                    <div className='bg-custom text-start p-2'>
                        <Row className='justify-content-center pt-1'>
                            <Col xs={4}>
                            <p className='ms-3 lead'>Monday: </p>
                            <p className='ms-3 lead'>Tuesday: </p>
                            <p className='ms-3 lead'>Wednesday: </p>
                            <p className='ms-3 lead'>Thursday: </p>
                            <p className='ms-3 lead'>Friday: </p>
                            <p className='ms-3 lead'>Saturday: </p>
                            <p className='ms-3 lead'>Sunday: </p>
                            </Col>
                            <Col xs={5}>
                            <p className='ms-3 lead'>{locationData[activeLoc].hours[0][0]} - {locationData[activeLoc].hours[0][1]}</p>
                            <p className='ms-3 lead'>{locationData[activeLoc].hours[1][0]} - {locationData[activeLoc].hours[1][1]}</p>
                            <p className='ms-3 lead'>{locationData[activeLoc].hours[2][0]} - {locationData[activeLoc].hours[2][1]}</p>
                            <p className='ms-3 lead'>{locationData[activeLoc].hours[3][0]} - {locationData[activeLoc].hours[3][1]}</p>
                            <p className='ms-3 lead'>{locationData[activeLoc].hours[4][0]} - {locationData[activeLoc].hours[4][1]}</p>
                            <p className='ms-3 lead'>{locationData[activeLoc].hours[5][0]} - {locationData[activeLoc].hours[5][1]}</p>
                            <p className='ms-3 lead'>{locationData[activeLoc].hours[6][0]} - {locationData[activeLoc].hours[6][1]}</p>
                            </Col>
                        </Row>
                        
                        
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default Location;