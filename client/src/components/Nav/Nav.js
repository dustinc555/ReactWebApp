import React from "react";
import { Navbar, Nav } from "react-bootstrap";

export default class CNav extends React.Component {
  render() {
    return (
      <Navbar bg="dark" variant="dark" style={{ height: "10%" }}>
        <Navbar.Brand href="/">Song Player</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/Play">Play</Nav.Link>
          <Nav.Link href="/Upload">Upload</Nav.Link>
        </Nav>
      </Navbar>
    );
  }
}
