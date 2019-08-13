import React from "react";
import "./App.css";
import Nav from "../Nav/Nav";
import Upload from "../Upload/Upload";
import SongList from "../SongList/SongList";

import { BrowserRouter as Router, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Route exact path="/" component={() => <h1>Home</h1>} />
        <Route path="/Play" component={() => <h1>Play</h1>} />
        <Route path="/Upload" component={Upload} />
        <SongList songs="" />
      </div>
    </Router>
  );
}

export default App;
