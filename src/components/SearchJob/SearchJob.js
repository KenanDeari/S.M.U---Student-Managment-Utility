import React, { useState } from "react";
import { Form, FormControl, Button, InputGroup } from "react-bootstrap";

export default function SearchJob({ updateJobDetail, updateJobTitle, updateJobLocation }) {
  const [job, setJob] = useState({
    title: "",
    location: ""
  })

  const onSubmit = e => {
    e.preventDefault();
    updateJobDetail(job)
  };

  const onChange = e => {
    // setSearch(e.target.value);
    setJob({
      ...job, [e.target.name] : e.target.value
    })
  };
  return (
    <Form className="mb-4" onSubmit={onSubmit}>
      <InputGroup>
        <InputGroup.Prepend>
          <InputGroup.Text id="basic-addon1">
            <i className="fas fa-search" />
          </InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          type="text"
          value={job.title}
          name="title"
          placeholder="Search Jobs"
          className="mr-sm-2"
          onChange={onChange}
        />
        <InputGroup.Prepend>
          <InputGroup.Text id="basic-addon1">
            <i className="fas fa-map-marker-alt" />
          </InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          type="text"
          value={job.location}
          name="location"
          placeholder="Search Location"
          className="mr-sm-2"
          onChange={onChange}
        />
        <Button type="submit" variant="outline-info">
          Search
        </Button>
      </InputGroup>
    </Form>
  );
}
