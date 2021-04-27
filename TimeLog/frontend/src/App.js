import React, { Component } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import logo from "./images/QU-Logo.png";
import "./App.css";
import Login from './login'
import Logout from "./logout";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    }
  }

  
  
  render() {
    const { user } = this.state;
    console.log("App.js state = " + user);
    return (
      <div className = "App">
        <BrowserRouter >
        <Switch>
          <Route exact path = "/" render={(props) => <Login  {...props} />}></Route>
          <Route exact path = "/logout" render={(props) => <Logout  {...props}/>}></Route>
          
        </Switch> </BrowserRouter>
      </div>
    );
  }
}

export default App;

