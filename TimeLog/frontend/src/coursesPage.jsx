import React, { Component } from 'react';
import axios from "axios";
import { Card, ListGroupItem, Button, Badge, CardGroup } from 'react-bootstrap'
import background from "./images/login-background.png";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import auth from './service/authService'
import Navbar from './navbar'
import FacultyPage from './facultyPage';
import StudentPage from "./studentPage";

class CoursesPage extends Component {
    constructor(props) {
        super(props);
        this.state = { courses: [] }
    }

    async componentDidMount() {
        console.log(this.props)
        // .get(`http://localhost:8080/users/${this.props.userID}/courses`)
        let id = auth.getUserID()
        let courses = await axios
        .get(`http://localhost:8080/users/${id}/courses`)
        .catch((error) => {
          console.error(error);
        }); 
        this.setState({
            courses: courses.data
        })
        console.log(courses)
    }
    


    render() { 
        let courses = [...this.state.courses]
        return ( <div>
        
            <Navbar />
            <CardGroup style={{ padding: '5rem', justifyContent: 'center' }}>
            {this.state.courses != [] ? (courses.map((course) => {
                console.log(course)
                return (
                    <Card style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title variant='primary'><Badge variant="primary">Course Name: {course.name}</Badge>{' '}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">Course Code: {course.courseCode}</Card.Subtitle>
                    </Card.Body>
                    </Card>
                ) 
                            })) : null}</CardGroup>
        <Link to={{
        pathname: `/coursesList/${auth.getUserID()}`,
        }}>
            <Button variant="primary">Add Course</Button>
        </Link>
        </div> );

    }
}
 
export default CoursesPage;