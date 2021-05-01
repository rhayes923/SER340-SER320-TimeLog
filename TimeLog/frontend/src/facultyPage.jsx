import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import background from "./images/login-background.png";
import "./styles/login.css";
import Navbar from "./navbar";
import axios from "axios";
import { Card, Badge, CardGroup } from "react-bootstrap";
import auth from "./service/authService";

class FacultyPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      courseCode: "",
      courses: [],
      lessons: [],
      timelogs: [],
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleCodeChange = this.handleCodeChange.bind(this);
    this.handleLessonNameChange = this.handleLessonNameChange.bind(this);
    this.handleCourseCodeChange = this.handleCourseCodeChange.bind(this);
    this.handleLessonCategoryChange = this.handleLessonCategoryChange.bind(
      this
    );
    this.handleLessonDateChange = this.handleLessonDateChange.bind(this);
    this.handleLessonSubmit = this.handleLessonSubmit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCardClick = this.handleCardClick.bind(this);
  }

  handleNameChange(event) {
    this.setState({ name: event.target.value });
  }

  handleCodeChange(event) {
    this.setState({ courseCode: event.target.value });
  }

  handleLessonNameChange(event) {
    this.setState({ lessonNumber: event.target.value });
  }

  handleCourseCodeChange(event) {
    this.setState({ courseCode2: event.target.value });
  }

  handleLessonCategoryChange(event) {
    this.setState({ category: event.target.value });
  }

  handleLessonDateChange(event) {
    this.setState({ date: event.target.value });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const course = {
      name: this.state.name,
      courseCode: this.state.courseCode,
      lessons: this.state.lessons,
    };
    let result = await axios
      .post(`http://localhost:8080/users/courses`, course)
      .catch((error) => {
        console.error(error);
      });

    let id = auth.getUserID();
    let result2 = await axios
      .post(`http://localhost:8080/users/${id}/courselist`, course)

      .catch((error) => {
        console.error(error);
      });
  }

  async handleLessonSubmit(event) {
    // localStorage.setItem(`TimeLogReq${this.state.courseCode2}`, `${this.state.lessonNumber}`)
    event.preventDefault();
    const lesson = {
      lessonNumber: this.state.lessonNumber,
      category: this.state.category,
      date: this.state.date,
    };
    let result = await axios
      .post(
        // the router contains this route with post funtion but is giving 404
        `http://localhost:8080/users/lessons`,
        lesson
      )
      .catch((error) => {
        console.error(error);
      });
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

    let timelogs = await axios
      .get(`http://localhost:8080/users/timelogs`)
      .catch((error) => {
        console.error(error);
      });
    if (timelogs != null) {
      this.setState({
        timelogs: timelogs.data,
      });
      console.log(timelogs);
      this.render();
    }
  }

  render() {
    let timelogs = [...this.state.timelogs];
    let courses = [...this.state.courses];
    return (
      <div>
        <Navbar />
        <header
          style={{
            backgroundImage: `url(${background})`,
            height: "2000px",
            alignitems: "center",
            justifycontent: "center",
          }}
        >
          <CardGroup style={{ padding: "5rem", justifyContent: "center" }}>
            {this.state.courses != []
              ? courses.map((course) => {
                  console.log(course);
                  return (
                    <Card style={{ width: "16rem" }}>
                      <Card.Body
                        onClick={() =>
                          this.handleCardClick(course._id, course.courseCode)
                        }
                      >
                        <Card.Title variant="primary">
                          <Badge
                            variant="primary"
                            style={{ width: "5rem", color: "white" }}
                          >
                            {course.name}
                          </Badge>{" "}
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
          <label style={{ color: "white" }}>
            TimeLogs{this.state.courseName}:
          </label>

          <CardGroup style={{ padding: "2rem", justifyContent: "center" }}>
            {this.state.timelogs != []
              ? timelogs.map((timelog) => {
                  console.log(timelog);
                  return (
                    <Card style={{ width: "13rem" }}>
                      <Card.Body>
                        <Card.Title variant="primary">
                          <Badge variant="primary">
                            Lesson: {timelog.course}
                          </Badge>{" "}
                        </Card.Title>
                        <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
                        <p style={{ color: "black" }}>{timelog.minutes}</p>
                      </Card.Body>
                    </Card>
                  );
                })
              : null}
          </CardGroup>

          <hr></hr>

          <h2 style={{ color: "white" }}>Add a course</h2>
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              placeholder="Name"
              value={this.state.name}
              onChange={this.handleNameChange}
            />

            <input
              type="text"
              placeholder="Code"
              value={this.state.courseCode}
              onChange={this.handleCodeChange}
            />

            <input type="submit" value="Submit" />
          </form>
          <hr></hr>
          <hr></hr>
          <h2 style={{ color: "white" }}>Add a Lesson</h2>
          <form onSubmit={this.handleLessonSubmit}>
            <input
              type="text"
              placeholder="Lesson Number"
              value={this.state.lessonNumber}
              onChange={this.handleLessonNameChange}
            />

            <input
              type="text"
              placeholder="Category"
              value={this.state.category}
              onChange={this.handleLessonCategoryChange}
            />

            <input
              type="text"
              placeholder="Course ID"
              value={this.state.courseCode2}
              onChange={this.handleCourseCodeChange}
            />

            <input
              type="text"
              placeholder="Date"
              value={this.state.date}
              onChange={this.handleLessonDateChange}
            />

            <input type="submit" value="Submit" />
          </form>
        </header>
      </div>
    );
  }

  // autofills 'add lesson' course id + logic for displaying timelogs
  handleCardClick(event, courseName) {
    this.setState({ courseCode2: event });
    this.setState({ courseName: courseName });
  }

  // // export timelog data as plain text
  // handleExport() {}
}

export default FacultyPage;
