import React, { Component } from "react";
import axios from "axios";
import { Card, Button, Badge, CardGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import auth from "./service/authService";
import Navbar from "./navbar";
import StudentPage from "./studentPage";

class CoursesPage extends Component {
  constructor(props) {
    super(props);
    this.state = { courses: [], type: null };
  }

  async componentDidMount() {
    console.log(this.props);
    // .get(`http://localhost:8080/users/${this.props.userID}/courses`)
    let id = auth.getUserID();
    let courses = await axios
      .get(`http://localhost:8080/users/${id}/courses`)
      .catch((error) => {
        console.error(error);
      });
    if (courses != null) {
      this.setState({
        courses: courses.data,
      });
      console.log(courses);
    }
  }

  render() {
    let courses = [...this.state.courses];
    if (this.state.type === null) {
      return (
        <div>
          <Navbar />
          <CardGroup style={{ padding: "5rem", justifyContent: "center" }}>
            {this.state.courses != []
              ? courses.map((course) => {
                  console.log(course);
                  return (
                    <Card style={{ width: "18rem" }}>
                      <Card.Body>
                        <Card.Title variant="primary">
                          <Badge variant="primary">
                            Course Name: {course.name}
                          </Badge>{" "}
                        </Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">
                          Course Code: {course.courseCode}
                        </Card.Subtitle>
                      </Card.Body>
                    </Card>
                  );
                })
              : null}
          </CardGroup>
          <Link
            to={{
              pathname: `/coursesList/${auth.getUserID()}`,
            }}
          >
            <Button variant="primary">Add Course</Button>
          </Link>

          <button
            id="back"
            type="submit"
            style={{ width: "100px" }}
            className="btn btn-danger btn-block"
            role="button"
            onClick={this.handleBack}
          >
            Back
          </button>
        </div>
      );
    } else if (this.state.type === "back") {
      return <StudentPage {...this.state.user} />;
    }
  }

  handleBack = async (event) => {
    this.setState({ type: "back" });
  };
}

export default CoursesPage;
