import React, { Component } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import logo from "./images/QU-Logo.png";
import "./App.css";
import Login from './login'
import Logout from "./logout";
import CoursesPage from './coursesPage'
import CoursesList from './coursesList'
import ToCourses from './toCourses'
import ToCoursesList from './toCoursesList'
import StudentPage from './studentPage'
import FacultyPage from './facultyPage'


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
          <Route exact path = "/coursesList/:userID" render={(props) => <ToCoursesList  {...props}/>}></Route>
          <Route exact path = "/coursesPage/:userID" render={(props) => <ToCourses  {...props}/>}></Route>
          {/* <Route exact path = "/faculty" render={(props) => <FacultyPage  {...props}/>}></Route>
          <Route exact path = "/student" render={(props) => <StudentPage  {...props}/>}></Route> */}
        </Switch> 
        </BrowserRouter>
      </div>
    );
  }
}

export default App;

