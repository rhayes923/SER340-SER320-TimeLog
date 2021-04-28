import React, { Component } from 'react';
import axios from 'axios'
import { Card, ListGroupItem, Button } from 'react-bootstrap'
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";


class CoursesList extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          name: '',
          courseCode: '',
          courses: [],
          lessons: []
        };
      this.handleNameChange = this.handleNameChange.bind(this);
      this.handleCodeChange = this.handleCodeChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleNameChange(event) {
      this.setState({name: event.target.value});
    }

    handleCodeChange(event) {
        this.setState({courseCode: event.target.value});
      }
  
    async handleSubmit(event) {
        event.preventDefault();
        const course = {
            name: this.state.name,
            courseCode: this.state.courseCode,
            lessons: this.state.lessons
        }
        let result = await axios
        .post(`http://localhost:8080/users/${this.props.userID}/courses`, course)
        .catch((error) => {
          console.error(error);
        }); 
    
    }

  
    render() {
      return (
        <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Course Name:
            <input type="text" value={this.state.name} onChange={this.handleNameChange} />
          </label>
          <label>
            Course Code:
            <input type="text" value={this.state.courseCode} onChange={this.handleCodeChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <Link to={{
        pathname: `/coursesPage/${this.props.userID}}`,
        }}>
            <Button variant="primary">Back</Button>
        </Link>
        </div>
      );
    }
  }
export default CoursesList;