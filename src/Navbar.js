import { Link } from "react-router-dom"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import cart from './cart.svg'

function BootNav() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        {/* Logo */}
        <Navbar.Brand as={Link} to="/">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="flex-grow-1">
            <Container className="my-1">
              <Row className="my-1"> 
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
                <Col className="d-flex p-0 justify-content-end">
                  <div className="mh-100" style={{minHeight:"100%",height:"0"}}>
                    <img src={cart} className="h-100" alt="cartIcon"/>
                  </div>
                    <Nav.Link className="w-auto" as={Link} to="/cart">Cart</Nav.Link>
                  
                </Col>
              </Row>
              {/* Nav links */}
              <Row className="my-1 justify-content-around">
                <Nav.Link className="w-auto" as={Link} to="/store">Store</Nav.Link>
                <Nav.Link className="w-auto" as={Link} to="/locations">Location</Nav.Link>
                <Nav.Link className="w-auto" as={Link} to="/forums">Forums</Nav.Link>
              </Row>
            </Container>
            
          </Nav>
        </Navbar.Collapse>

      </Container>
    </Navbar>
  );
}

export default BootNav;