import React from "react";
import { Container, Navbar, Nav, Form, FormControl, Button, NavItem } from "react-bootstrap";
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

export default function Header() {
  return (

    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">Student Managment Utility</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="jobs.html">Jobs</Nav.Link>
          <Nav.Link href="events.html">Events</Nav.Link>
          <Nav.Link href="articles.html">Articles</Nav.Link>
          <Nav.Link href="videos.html">Videos</Nav.Link>


        </Nav>



        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-info">Search</Button>
        </Form>
        <Nav.Link>Login</Nav.Link>
        <Nav.Link>Sign Up</Nav.Link>
      </Container>
    </Navbar >

  );
}
