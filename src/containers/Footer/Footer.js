import React from "react";
import { Container } from "react-bootstrap";

export default function Footer() {
  return (
    <footer
      style={{
        // position: "absolute",
        bottom: "0",
        backgroundColor: "#f5f5f5"
      }}
    >
      <Container className="py-3 text-center">
        <span className="text-muted text-centered">
          Created by Kenny, Isaias, KP, Daniel. You can find us on:
          <br />
          <i className="fab fa-github" /> github.com
        </span>
      </Container>
    </footer>
  );
}
