import React from "react";
import "./App.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Nav from "../Nav/Nav";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Route exact path="/" component={() => <h1>Home</h1>} />
        <Route path="/Play" component={() => <h1>Play</h1>} />
        <Route path="/Upload" component={() => <h1>Upload</h1>} />
        <Route path="/List" component={() => <h1>List</h1>} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
