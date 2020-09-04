import React from "react";
import { Container, Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
// import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

export default function Header() {
  return (

    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">Student Managment Utility</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="jobs">Jobs</Nav.Link>
          <Nav.Link href="notes">Notes</Nav.Link>
          <Nav.Link href="events">Events</Nav.Link>
          <Nav.Link href="articles">Articles</Nav.Link>
          <Nav.Link href="videos">Videos</Nav.Link>



        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-info">Search</Button>
        </Form>
      </Container>
    </Navbar>

  );
}
