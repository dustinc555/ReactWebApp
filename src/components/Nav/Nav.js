import "./Nav.css";

import React from "react";
import { Navbar, Nav, Button, Form, FormControl } from "react-bootstrap";

export default class CNav extends React.Component {
  render() {
    return (
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">Song Player</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/Play">Play</Nav.Link>
          <Nav.Link href="/Upload">Upload</Nav.Link>
        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-info">Search</Button>
        </Form>
      </Navbar>
    );
  }
}
