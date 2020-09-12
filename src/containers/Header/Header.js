import React from "react";
import { Container, Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import { Navlink } from "react-router-dom";

export default function Header() {
  return (

<<<<<<< HEAD
    <Navbar style={{ color: "red " }} class="navCol" bg="dark" variant="dark">
=======
    <Navbar style={{ color: "red " }} class="navCol" bg="primary" variant="dark">
>>>>>>> master
      <Container>
        <Navbar.Brand href="#home">Student Management Utility</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="notes.html">Notes</Nav.Link>
          <Nav.Link href="events.html">Events</Nav.Link>
          <Nav.Link href="articles.html">Articles</Nav.Link>
          <Nav.Link href="videos.html">Videos</Nav.Link>
        </Nav>
      </Container>
    </Navbar>

  );
}
