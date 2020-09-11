import React from "react";
import { Jumbotron, Container } from "react-bootstrap";
import './BigJumbo.css'

export default function BigJumbo() {
  return (
    <div>
      <Jumbotron fluid className="jumbotron">
        <Container>
          <h1>Get a new job.</h1>
          <p>
            Motto goes here...
          </p>
        </Container>
      </Jumbotron>
    </div>
  );
}
