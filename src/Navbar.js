import { Link } from "react-router-dom"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function BootNav() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} to="/">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="flex-grow-1">
            <Container>
              <Row className="justify-content-end"> 
                <Nav.Link className="w-auto" as={Link} to="/">Home</Nav.Link>
                <Nav.Link className="w-auto" as={Link} to="/store">Store</Nav.Link>
              </Row>
              <Row className="justify-content-end">
                <Nav.Link className="w-auto" as={Link} to="/">Home</Nav.Link>
                <Nav.Link className="w-auto" as={Link} to="/store">Store</Nav.Link>
              </Row>
            </Container>
            
          </Nav>
        </Navbar.Collapse>

      </Container>
    </Navbar>
  );
}

export default BootNav;