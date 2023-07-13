import { Link } from "react-router-dom"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {useNavigate} from "react-router-dom";

import data from './data.json';
import {logo, cartIcon, storeIcon, locationIcon, forumIcon} from './rsc/imgIndex.js';

function BootNav(masterCart) {

  const navigate = useNavigate();

  const numOfCartItems = masterCart.cartValues[0]

  const searchBarCatMap = new Map([
    ["Laptops",()=>navigate(`/store/${0}`)],
    ["Desktops",()=>navigate(`/store/${2}`)],
    ["Printers",()=>navigate(`/store/${4}`)],
    ["Monitors",()=>navigate(`/store/${6}`)],
    ["Keyboards",()=>navigate(`/store/${8}`)],
    ["Computer Mice",()=>navigate(`/store/${10}`)],
    ["Desk Chairs",()=>navigate(`/store/${12}`)],
    ["Desks",()=>navigate(`/store/${14}`)]
  ])
  const searchBarItemMap = new Map(data.items.map((item)=>([item.name,()=>navigate(`/item/${item.id}`)])))
  const searchBarForumMap = new Map(data.forums.map((forum)=>([forum.title,()=>navigate(`/forumPost/${forum.id}`)])))
  searchBarForumMap.delete('')

  function searchBarNav() {
    const searchTerm = document.getElementById("searchBar").value;

    var searchFunc = searchBarItemMap.get(searchTerm)
    if (searchFunc!==undefined) {
      searchFunc();
      return;
    }

    searchFunc = searchBarCatMap.get(searchTerm);
    if (searchFunc!==undefined) {
      searchFunc();
      return;
    }

    searchFunc = searchBarForumMap.get(searchTerm)
    if (searchFunc!==undefined) {
      searchFunc();
      return;
    }
    
  }


  return (
    <Navbar expand="lg" className="bg-custom">
      <Container>
        {/* Logo */}
        <Navbar.Brand as={Link} to="/P2"><img src={logo} className="m-0 p-0" style={{maxHeight:"100px"}} alt="logo"></img>MecMax</Navbar.Brand>
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
                        id="searchBar"
                        list="searchOptions"
                      />
                      <datalist id="searchOptions">
                          {
                            Array.from(searchBarCatMap).map(([mapkey,value]) => (
                                <option value={mapkey} key={mapkey}>{mapkey}</option>
                            ))
                          }
                          {
                            Array.from(searchBarItemMap).map(([mapkey,value]) => (
                              <option value={mapkey} key={mapkey}>{mapkey}</option>
                            ))
                          }
                          {
                            Array.from(searchBarForumMap).map(([mapkey,value]) => (
                              <option value={mapkey} key={mapkey}>{mapkey}</option>
                            ))
                          }
                      </datalist>

                      <Button variant="outline-primary" onClick={()=>searchBarNav()}>Search</Button>
                    </Form>
                </Col>
                {/* Cart */}
                <Col className="d-flex p-0">
                  <div className="w-100 d-lg-flex d-none justify-content-end" style={{minHeight:"100%",height:"0"}}>
                    <img src={cartIcon} className="h-100" alt="cartIcon"/>
                  </div>
                  <Nav.Link as={Link} to="/cart"><nobr>Cart ({numOfCartItems})</nobr></Nav.Link>
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