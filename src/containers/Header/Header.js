import React from "react";
import { Container, Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import { Navlink } from "react-router-dom";

export default function Header() {
  return (

    <Navbar bg="dark" variant="dark">
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
