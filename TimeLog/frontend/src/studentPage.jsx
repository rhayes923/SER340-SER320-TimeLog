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
    this.state = {
      courseid: "608c36a74e789e0722ca8f58",
      courses: [],
      lessons: [],
      timeLog: null,
      type: null,
      lessonName: null,
    };
  }

  async componentDidMount() {
    console.log(this.props);
    // .get(`http://localhost:8080/users/${this.props.userID}/courses`)
    let id = auth.getUserID();
    let courses = await axios
      .get(`http://localhost:8080/users/${id}/courselist`)
      .catch((error) => {
        console.error(error);
      });

    if (courses != null) {
      this.setState({
        courses: courses.data,
      });
      console.log(courses);
    }

    let lessons = await axios
      .get(`http://localhost:8080/users/lessons`)
      .catch((error) => {
        console.error(error);
      });
    if (lessons != null) {
      this.setState({
        lessons: lessons.data,
      });
      console.log(lessons);
      this.render();
    }
  }

  async handleGetCourse(courseid) {
    let id = auth.getUserID();
    let courseget = await axios
      .get(`http://localhost:8080/users/${id}/courselist/${courseid}`)
      .catch((error) => {
        console.error(error);
      });
    // alert(courseget.name)
    return courseget.name;
    // if (courses != null) {
    //   this.setState({
    //     courses: courses.data,
    //   });
    //   console.log(courses);
    // }
  }

  async getLessons(courseid) {
    console.log(this.props);
    let id = auth.getUserID();
    let courses = await axios
      .get(`http://localhost:8080/lessons`)
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
    let lessons = [...this.state.lessons];
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
                Lessons for {this.state.course}:
              </h3>
              <CardGroup style={{ padding: "2rem", justifyContent: "center" }}>
                {this.state.lessons != []
                  ? lessons.map((lesson) => {
                      console.log(lesson);
                      return (
                        <Card style={{ width: "13rem" }}>
                          <Card.Body>
                            <Card.Title variant="primary">
                              <Badge variant="primary">Lesson</Badge>{" "}
                            </Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">
                              Code: {lesson.lessonNumber}
                            </Card.Subtitle>
                            <form onSubmit={this.handleTimeLog}>
                              <label style={{ color: "black" }}>
                                Lesson {this.state.courseCode}
                              </label>
                              <input
                                style={{ color: "black" }}
                                type="text"
                                placeholder="Time taken (min)"
                                value={this.state.timeLog}
                                // onChange={this.handleCodeChange}
                              />
                              <input
                                type="submit"
                                style={{ color: "black" }}
                                value="Submit"
                              />
                            </form>
                          </Card.Body>
                        </Card>
                      );
                    })
                  : null}
              </CardGroup>

              <hr></hr>
            </div>
          </header>
        </div>
      );
    } else if (this.state.type === "coursespage") {
      return <CoursesPage {...this.state.user} />;
    }
  }

  async handleTimeLog(event) {
    event.preventDefault();

    // event.preventDefault();
    const timelog = {
      minutes: "12",
      // minutes: this.state.timeLog,
      course: "1.2",
      // course: this.state.courseName,
    };

    let result = await axios
      .post(`http://localhost:8080/users/timelogs`, timelog)
      .catch((error) => {
        console.error(error);
      });
  }

  handleCoursesPage = async (event) => {
    this.setState({ type: "coursespage" });
  };

  async handleCardClick(courseCode, courseid2) {
    this.state.courseid = courseid2;
    this.componentDidMount();

    //   }
  }
}

export default StudentPage;
