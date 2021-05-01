import React, { Component } from "react";
import "./styles/navbar.css";
import logo from "./images/QU-Logo.png";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Container } from "react-bootstrap";

import { Link } from "react-router-dom";

class Navbar extends React.Component {

  constructor(props) {
    super(props);
    console.log(props.data);
    this.state = {
      user: this.props.data,
    }
  
  }

  render() {
    const { user } = this.state;
    return (
      <Container style={{padding: "10px 0px 10px 0px"}}>
        <Row id="nav">
          <Col style={{paddingLeft: "0px"}}>
            <img id="navlogo" src={logo}></img>
          </Col>
          <Row>
            <Col id="welcome">
              {/* <h3>Welcome, {`${user.fName} ${user.lName}`}</h3> */}
              <h3>Welcome!</h3>
              {/* {this.props != null ? (<h3>Welcome {this.props.user.data.firstName}!</h3>) : <h3>Welcome!</h3> } */}
            </Col>
            <Col id="logout">
              <Link to="/logout">
                <button
                  type="button"
                  class="btn btn-outline-primary btn-sm"
                >
                  Logout
                </button>
              </Link>
            </Col>
          </Row>
        </Row>
      </Container>
    );
  }
}

export default Navbar;
