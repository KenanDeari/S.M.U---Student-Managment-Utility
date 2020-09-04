import React from "react";
import { Jumbotron, Container } from "react-bootstrap";
import './BigJumbo.css'

export default function BigJumbo() {
  return (
    <div className="bigjumbo">
      <Jumbotron fluid className="jumbotron">
        <Container>
          <h1>Get a new job.</h1>
          <p>
            We curated and scraped jobs from various sites just for you.
          </p>
        </Container>
      </Jumbotron>
    </div>
  );
}
