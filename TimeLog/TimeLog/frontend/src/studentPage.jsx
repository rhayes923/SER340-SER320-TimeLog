import React, { Component } from "react";
import Navbar from "./navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/login.css";
import CoursesPage from "./coursesPage";
import axios from "axios";
import { Card, Badge, CardGroup } from "react-bootstrap";
import background from "./images/login-background.png";
import auth from "./service/authService";

class StudentPage extends Component {
  constructor(props) {
    super(props);
    this.state = { courses: [], lessons: [], type: null };
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

  handleGetLessons = async (event) => {
    let id = auth.getUserID();
    let courseId = this.state.courseId;
    let lessons = await axios
      .get(`http://localhost:8080/users/${id}/courses/${courseId}/lessons`)
      .catch((error) => {
        console.error(error);
      });
    if (lessons != null) {
      this.setState({
        lessons: lessons.data,
      });
      console.log(lessons);
    }
  };

  render() {
    let courses = [...this.state.courses];
    const { user } = this.props;

    if (this.state.type === null) {
      return (
        <div>
          <Navbar />
          <meta charSet="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <link
            rel="stylesheet"
            href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css"
            integrity="sha384-WskhaSGFgHYWDcbwN70/dfYBj47jz9qbsMId/iRN3ewGhXQFZCSftd1LZCfmhktB"
            crossOrigin="anonymous"
          />
          <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"
          />
          <link rel="stylesheet" href="styles/surveyForm.css" />
          <header
            id="main-section"
            style={{
              backgroundImage: `url(${background})`,
              height: "640px",
              alignitems: "center",
              justifycontent: "center",
            }}
          >
            <div className="content">
              <div className="container" />
              <h1 style={{ color: "white" }}>Survey Form</h1>
              <button
                id="coursespage"
                type="submit"
                style={{ width: "100px" }}
                className="btn btn-danger btn-block"
                role="button"
                onClick={this.handleCoursesPage}
              >
                My Courses
              </button>
            </div>
            <div>
              <CardGroup style={{ padding: "2rem", justifyContent: "center" }}>
                {this.state.courses != []
                  ? courses.map((course) => {
                      console.log(course);
                      return (
                        <Card style={{ width: "13rem" }}>
                          <Card.Body
                            onClick={() =>
                              this.handleCardClick(
                                course.courseCode,
                                course._id
                              )
                            }
                          >
                            <Card.Title variant="primary">
                              <Badge variant="primary">{course.name}</Badge>{" "}
                            </Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">
                              Code: {course.courseCode}
                            </Card.Subtitle>
                          </Card.Body>
                        </Card>
                      );
                    })
                  : null}
              </CardGroup>

              <h3 style={{ color: "white" }}>
                Lessons for {this.state.courseTitle}:
              </h3>

              <form onSubmit={this.handleTimeLog}>
                <label style={{ color: "white" }}>Lesson Name</label>
                <input
                  type="text"
                  placeholder="Time taken (min)"
                  value={this.state.courseCode}
                  onChange={this.handleCodeChange}
                />
                <input type="submit" value="Submit" />
              </form>
              <hr></hr>
            </div>
          </header>
        </div>
      );
    } else if (this.state.type === "coursespage") {
      return <CoursesPage {...this.state.user} />;
    }
  }

  handleCoursesPage = async (event) => {
    this.setState({ type: "coursespage" });
  };

  handleCardClick(event, id) {
    this.setState({ courseTitle: event });
    this.setState({ courseId: id });
  }

  // // logic for uploading timelog data to database
  // handleTimeLog() {}
}

export default StudentPage;
