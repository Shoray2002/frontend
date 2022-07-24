import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Spiderbot from "./Spiderbot";

class Body extends Component {
  render() {
    return (
      <Container>
        <Router>
          <Routes>
            <Route path = '/spiderbot_ui' element = {<Spiderbot/>}></Route>
          </Routes>
        </Router>
      </Container>
    );
  }
}

export default Body;
