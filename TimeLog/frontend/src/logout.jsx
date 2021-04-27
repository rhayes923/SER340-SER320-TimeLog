import { Component } from "react";
//import auth from "../service/authService";
class Logout extends Component {
  componentDidMount() {
    //auth.logout();
    localStorage.clear();
    //window.location = "/";
    window.location.href = "/";
    console.log("Logging out!!")
  }

  render() {
    return null;
  }
}

export default Logout;