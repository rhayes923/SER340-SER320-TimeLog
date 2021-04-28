import React, { Component } from "react";
import Login from "./login";
import "bootstrap/dist/css/bootstrap.min.css";
import StudentPage from "./studentPage";
import axios from "axios";

class CreateAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      type: null,
    };
  }

  render() {
    const { user } = this.props;

    if (this.state.type === null) {
      return (
        <div className="createaccount">
          <meta charSet="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@500&display=swap"
            rel="stylesheet"
          />
          <link
            rel="stylesheet"
            href="https://use.fontawesome.com/releases/v5.0.13/css/all.css"
            integrity="sha384-DNOHZ68U8hZfKXOrtjWvjxusGo9WQnrNx2sqG0tfsghAvtVlRW3tvkXWZh58N9jp"
            crossOrigin="anonymous"
          />
          <link
            rel="stylesheet"
            href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css"
            integrity="sha384-WskhaSGFgHYWDcbwN70/dfYBj47jz9qbsMId/iRN3ewGhXQFZCSftd1LZCfmhktB"
            crossOrigin="anonymous"
          />
          <link rel="stylesheet" href="styles/login.css" />
          <title>TimeLog</title>
          {/*Main Section*/}
          <header id="main-section">
            <div className="jumbotron jumbotron-fluid">
              <div className="container">
                <h1 className="display-1">TimeLog</h1>
                <div className="row">
                  <div className="col-lg-8">
                    <div className="d-flex">
                      {/*Left-side Info and Icons*/}
                      <div className="p-3 align-self-start">
                        <i className="mt-2 fas fa-pencil-alt fa-3x" />
                      </div>
                      <div className="p-3 align-self-end">
                        <h4>Submit Data</h4>
                        <p className="lead">
                          Log the time spent on individual course lessons
                        </p>
                      </div>
                    </div>
                    <div className="d-flex">
                      <div className="p-3 align-self-start">
                        <i className="mt-2 fas fa-book fa-3x" />
                      </div>
                      <div className="p-3 align-self-end">
                        <h4>View Data</h4>
                        <p className="lead">
                          View and export all time data to a spreadsheet for
                          further use
                        </p>
                      </div>
                    </div>
                    <div className="d-flex">
                      <div className="p-3 align-self-start">
                        <i className="mt-2 fas fa-lock fa-3x" />
                      </div>
                      <div className="p-3 align-self-end">
                        <h4>Security</h4>
                        <p className="lead">
                          Submit data through user accounts anonymously
                        </p>
                      </div>
                    </div>
                  </div>
                  {/*Create Account Form*/}
                  <div className="col-lg-4">
                    <div className="card bg-info text-center card-form">
                      <h3 className="card-header">Create Account</h3>
                      <div className="card-body">
                        <form className="pb-3">
                          <div className="form-group">
                            <input
                              type="email"
                              id="emailInput"
                              className="form-control form-control-lg"
                              placeholder="Email"
                              onChange={(event, newValue) =>
                                this.setState({ email: event.target.value })
                              }
                            />
                          </div>
                          <div className="form-group">
                            <input
                              type="password"
                              id="passwordInput"
                              className="form-control form-control-lg"
                              placeholder="Password"
                              onChange={(event, newValue) =>
                                this.setState({ password: event.target.value })
                              }
                            />
                          </div>
                          <div className="form-group">
                            <input
                              type="password"
                              id="confirmPasswordInput"
                              className="form-control form-control-lg"
                              placeholder="Confirm Password"
                              onChange={(event, newValue) =>
                                this.setState({
                                  confirmpassword: event.target.value,
                                })
                              }
                            />
                          </div>
                        </form>
                        <button
                          id="createaccount"
                          type="submit"
                          className="btn btn-danger btn-block"
                          role="button"
                          onClick={this.handleCreate}
                        >
                          Create
                        </button>
                        <button
                          id="createaccount"
                          type="submit"
                          className="btn btn-secondary"
                          onClick={this.handleLogin}
                        >
                          Login to Existing Account
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </header>
        </div>
      );
    } else if (this.state.type === "login") {
      return <Login {...this.state.user} />;
    } else if (this.state.type === "create") {
      return <StudentPage {...this.state.user} />;
    }
  }

  handleLogin = async (event) => {
    this.setState({ type: "login" });
  };
  handleCreate = async (event) => {
    const password = this.state.password;
    if (this.state.email != "" && this.state.email != null) {
      if (this.state.password != null) {
        if (this.state.password == this.state.confirmpassword) {
          let user = {
            username: this.state.email,
            password: this.state.password,
            userType: "STUDENT",
            courses: null,
          };
          let received = await axios
            .post("http://localhost:8080/users", user)
            .catch((error) => {
              console.error(error);
            });
          this.setState({ type: "create" });
        } else {
          alert("Password do not match.");
        }
      } else {
        alert("Password must not be blank.");
      }
    } else {
      alert("Email must not be blank.");
    }
  };
}

export default CreateAccount;
