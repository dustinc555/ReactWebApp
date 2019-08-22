import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./RootComponent.css";

import Nav from "../Nav/Nav";
import Upload from "../Upload/Upload";
import SongList from "../SongList/SongList";
import About from "../About/About";

import { BrowserRouter as Router, Route } from "react-router-dom";
import { Col, Row } from "react-bootstrap";

export default class RootComponent extends React.Component {
  render() {
    return (
      <div className="App">
        <Nav />
        <div className="content">
          <Router>
            <Route exact path="/" component={() => <About />} />
            <Route path="/Play" component={() => <SongList />} />
            <Route path="/Upload" component={() => <Upload />} />
          </Router>
        </div>
      </div>
    );
  }
}
