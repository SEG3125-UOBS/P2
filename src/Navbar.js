import { Link } from "react-router-dom"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import {logo, cartIcon, storeIcon, locationIcon, forumIcon} from './rsc/imgIndex.js';

function BootNav() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        {/* Logo */}
        <Navbar.Brand as={Link} to="/P2"><img src={logo} className="m-0 p-0" style={{maxHeight:"100px"}}></img></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="flex-grow-1">
            <Container className="my-1">
              <Row className="my-2"> 
                {/* Search Bar */}
                <Col lg={9}>
                    <Form className="d-flex">
                      <Form.Control
                        type="search"
                        placeholder="Search"
                        className="me-2"
                        aria-label="Search"
                      />
                      <Button variant="outline-success">Search</Button>
                    </Form>
                </Col>
                {/* Cart */}
                <Col className="d-flex p-0">
                  <div className="w-100 d-lg-flex d-none justify-content-end" style={{minHeight:"100%",height:"0"}}>
                    <img src={cartIcon} className="h-100" alt="cartIcon"/>
                  </div>
                  <Nav.Link as={Link} to="/cart">Cart</Nav.Link>
                </Col>
              </Row>
              {/* Nav links */}
              <Row className="my-2 me-5 justify-content-around">
                <Col className="d-flex">
                  <div className="w-100 d-lg-flex d-none justify-content-end" style={{minHeight:"100%",height:"0"}}>
                    <img src={storeIcon} className="h-100" alt="storeIcon"/>
                  </div>
                  <Nav.Link className="w-auto" as={Link} to="/store">Store</Nav.Link>
                </Col>
                <Col className="d-flex">
                  <div className="w-100 d-lg-flex d-none justify-content-end" style={{minHeight:"100%",height:"0"}}>
                    <img src={locationIcon} className="h-100" alt="locationIcon"/>
                  </div>
                  <Nav.Link className="w-auto" as={Link} to="/location"><nobr>Our Locations</nobr></Nav.Link>
                </Col>
                <Col className="d-flex">
                  <div className="w-100 d-lg-flex d-none justify-content-end" style={{minHeight:"100%",height:"0"}}>
                    <img src={forumIcon} className="h-100" alt="forumIcon"/>
                  </div>
                  <Nav.Link className="w-auto" as={Link} to="/forums">Forums</Nav.Link>
                </Col>
              </Row>
            </Container>
            
          </Nav>
        </Navbar.Collapse>

      </Container>
    </Navbar>
  );
}

export default BootNav;