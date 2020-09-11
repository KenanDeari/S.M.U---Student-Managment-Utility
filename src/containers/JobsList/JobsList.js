import React from "react";
import { Alert, Container, CardDeck, CardColumns, CardGroup } from "react-bootstrap";
import JobItem from "./../../components/JobItem/JobItem";
export default function JobsList({ jobs }) {
  const hasJobs = jobs.length === 0 ? true : false
  console.log("hasjobs", hasJobs)
  return hasJobs ? (
    <Alert variant="info">Loading..... </Alert>
  ) :
    (
      <>
        <CardColumns>
          {jobs.map(job => (
            <JobItem key={job.id} job={job} />
          ))}
        </CardColumns>
      </>
    );
}
