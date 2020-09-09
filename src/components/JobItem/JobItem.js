import React from "react";
import { Card, Button, CardDeck } from "react-bootstrap";
// import { FontAwesomeIcon } from "react-fontawesome";

export default function JobItem({ job }) {
  const { title, company, location, created_at, url, from} = job;
  let date = new Date(created_at);
  date = `${date.getDate()} ${date.toLocaleString("default", {
    month: "long"
  })}`;
  const iconClass = `fab fa-${from}`
  // console.log(date);
  return (
    <Card
      // style={{ minWidth: "18rem" }}
      bg="light"
      // className="mb-3 mr-3"
    >
      <Card.Body>
        <Card.Title>{title} 
        <small className="text-muted"> <i className={iconClass} /></small>
        </Card.Title>
        <Card.Text>
          <i className="fas fa-map-marker-alt" /> {location}
          <br />
          <small className="text-muted">
            <i className="fas fa-building" /> {company}
          </small>
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <small
          style={{ alignItems: "center" }}
          className="d-flex justify-content-between text-muted"
        >
          <span className="align-middle">
            <i className="fas fa-calendar-alt" /> {date}
          </span>

          <span className="align-middle">
            <a href={url}>
              <Button variant="light" size="sm">
                Apply
              </Button>
            </a>
          </span>
        </small>
      </Card.Footer>
    </Card>
  );
}
