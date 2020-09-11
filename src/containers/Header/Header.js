import React from "react";
import { Container, Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import { Navlink } from "react-router-dom";

export default function Header() {
  return (

    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">Student Management Utility</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="jobs">Jobs</Nav.Link>
          <Nav.Link href="notes.html">Notes</Nav.Link>
          <Nav.Link href="events">Events</Nav.Link>
          <Nav.Link href="articles">Articles</Nav.Link>
          <Nav.Link href="videos">Videos</Nav.Link>
        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-info" className="SearchButton">Search</Button>
        </Form>
      </Container>
    </Navbar>

  );
}
