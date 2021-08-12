import React from "react";
import { Link } from "react-router-dom";
import { Navbar,Container,Nav } from "react-bootstrap";
const Navigation = ()=>{
  return(
    <Navbar bg="primary" variant={"dark"} expand="lg" className={"mb-5"} >
      <Container>
        <Navbar.Brand href="/">Get it done</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/*<Nav.Link href="/">Home</Nav.Link>*/}
          </Nav>
          <Nav>
            <Nav.Link href="/signin">Sign In</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
export default Navigation