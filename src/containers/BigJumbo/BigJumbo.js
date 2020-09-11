import React from "react";
import { Jumbotron, Container } from "react-bootstrap";
import './BigJumbo.css'

export default function BigJumbo() {
  return (
    <div>
      <Jumbotron fluid className="jumbotron">
        <Container>
          <h1>Use This Search Engine to Find Your Next Job!</h1>
          <p>
            We curated and scraped jobs from various sites just for you.          </p>
        </Container>
      </Jumbotron>
    </div>
  );
}
