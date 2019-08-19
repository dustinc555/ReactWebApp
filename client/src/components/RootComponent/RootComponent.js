import React from "react";
import "bootstrap/dist/css/bootstrap.css";

import Nav from "../Nav/Nav";
import Upload from "../Upload/Upload";
import SongList from "../SongList/SongList";
import About from "../About/About";

import { BrowserRouter as Router, Route } from "react-router-dom";
import { Col, Row } from "react-bootstrap";

export default class RootComponent extends React.Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Nav />
          <Row>
            <Col sm={8}>
              <Route exact path="/" component={() => <Upload />} />
              <Route path="/Upload" component={() => <Upload />} />
              <Route path="/About" component={() => <About />} />
            </Col>
            <Col sm={4}>
              <SongList />
            </Col>
          </Row>
        </div>
      </Router>
    );
  }
}
