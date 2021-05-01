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
    this.state = {
      courses: [],
      type: null,
      name: "",
      courseCode: "",
      lessons: [],
    };
  }

  async componentDidMount() {
    console.log(this.props);
    // .get(`http://localhost:8080/users/${this.props.userID}/courses`)
    let id = auth.getUserID();
    let courses = await axios
      .get(`http://localhost:8080/users/courses`)
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
                      <Card.Body
                        onClick={() =>
                          this.handleCardClick(course._id, course.courseCode)
                        }
                      >
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
          <p>
            {this.state.courseName}-{this.state.courseCode2}
          </p>

          <Button
            variant="primary"
            onClick={() =>
              this.handleCourseAdd(
                this.state.courseName,
                this.state.courseCode2
              )
            }
          >
            Add Course
          </Button>

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

  handleCardClick(event, courseName) {
    this.setState({ courseCode2: event });
    this.setState({ courseName: courseName });
  }

  async handleCourseAdd() {
    let courses3 = await axios
      .get(`http://localhost:8080/users/courses/${this.state.courseCode2}`)
      .catch((error) => {
        console.error(error);
      });
    if (courses3 != null) {
      this.setState({
        courses3: courses3.data,
      });
      // alert(this.state.courses3.name);
    }
    this.setState({ type: "back" });

    let courses2 = {
      name: this.state.courses3.name,
      courseCode: this.state.courses3.courseCode,
      lessons: null,
    };

    let id = auth.getUserID();
    let result2 = await axios
      .post(`http://localhost:8080/users/${id}/courselist`, courses2)
      .catch((error) => {
        console.error(error);
      });
  }

  handleBack = async (event) => {
    this.setState({ type: "back" });
  };
}

export default CoursesPage;
