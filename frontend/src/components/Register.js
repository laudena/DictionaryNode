import { Link } from "react-router-dom";
import ListErrors from "./ListErrors";
import React from "react";
import agent from "../agent";
import { connect } from "react-redux";
import {
  UPDATE_FIELD_AUTH,
  REGISTER,
  REGISTER_PAGE_UNLOADED,
} from "../constants/actionTypes";

const mapStateToProps = (state) => ({ ...state.auth });

const mapDispatchToProps = (dispatch) => ({
  onChangeEmail: (value) =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: "email", value }),
  onChangePassword: (value) =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: "password", value }),
  onChangeUsername: (value) =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: "username", value }),
  onChangeAdmin: (value) => {
    let role = value === "checked" ? "admin" : "user";
    dispatch({ type: UPDATE_FIELD_AUTH, key: "role", role });
  },
  onSubmit: (username, email, password) => {
    const payload = agent.Auth.register(username, email, password);
    dispatch({ type: REGISTER, payload });
  },
  onUnload: () => dispatch({ type: REGISTER_PAGE_UNLOADED }),
});

class Register extends React.Component {
  constructor() {
    super();
    this.changeEmail = (ev) => this.props.onChangeEmail(ev.target.value);
    this.changePassword = (ev) => this.props.onChangePassword(ev.target.value);
    this.changeUsername = (ev) => this.props.onChangeUsername(ev.target.value);
    this.changeAdmin = (ev) => this.props.onChangeAdmin(ev.target.checked);

    this.submitForm = (username, email, password) => (ev) => {
      ev.preventDefault();
      this.props.onSubmit(username, email, password);
    };
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    const email = this.props.email;
    const password = this.props.password;
    const username = this.props.username;
    const admin = this.props.admin || false;

    return (
      <div className="auth-page">
        <div className="container page text-center text-dark">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12 bg-white p-4">
              <h1 className="text-xs-center font-weight-bold pb-4">
                רישום משתמש חדש
              </h1>

              <div className="container page">
                <div
                  className="alert alert-danger text-start"
                  role="alert"
                  hidden={!this.props.errors}
                >
                  <div className="hebrew">
                    &nbsp; שגיאה בעת שמירת משתמש חדש.&nbsp;&nbsp;
                  </div>
                </div>
              </div>
              <ListErrors errors={this.props.errors} />

              <form onSubmit={this.submitForm(username, email, password)}>
                <fieldset>
                  <fieldset className="form-group">
                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <span
                          className="input-group-text"
                          style={{ background: null }}
                        >
                          <i className="bi bi-person-fill text-secondary"></i>
                        </span>
                      </div>
                      <input
                        className="form-control form-control-lg"
                        type="text"
                        placeholder="Username"
                        value={this.props.username || ""}
                        onChange={this.changeUsername}
                      />
                    </div>
                  </fieldset>

                  <fieldset className="form-group">
                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <span
                          className="input-group-text"
                          style={{ background: null }}
                        >
                          <i className="bi bi-lock-fill text-secondary"></i>
                        </span>
                      </div>
                      <input
                        className="form-control form-control-lg"
                        type="password"
                        placeholder="Password"
                        value={this.props.password || ""}
                        onChange={this.changePassword}
                      />
                    </div>
                  </fieldset>

                  <fieldset className="form-group">
                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <span
                          className="input-group-text"
                          style={{ background: null }}
                        >
                          <i className="bi bi-envelope-fill text-secondary"></i>
                        </span>
                      </div>
                      <input
                        className="form-control form-control-lg"
                        type="email"
                        placeholder="Email"
                        value={this.props.email || ""}
                        onChange={this.changeEmail}
                      />
                    </div>
                  </fieldset>

                  <fieldset className="form-group">
                    <div className="input-group mb-3">
                      <div>
                        <div className="form-check form-switch">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="flexSwitchCheckChecked"
                            checked={admin}
                            value="yes"
                            onChange={this.changeAdmin}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="flexSwitchCheckChecked"
                          >
                            Admin user?
                          </label>
                        </div>
                      </div>
                    </div>
                  </fieldset>

                  <button
                    className="btn btn-lg btn-primary btn-block"
                    type="submit"
                    disabled={this.props.inProgress}
                    style={{
                      border: 0,
                      background:
                        "linear-gradient(90deg, #4683CA -3.21%, #AF93F2 100%)",
                      borderRadius: "5px",
                    }}
                  >
                    צור משתמש חדש
                  </button>
                </fieldset>
              </form>
              <p className="text-center pt-4">
                <Link to="/login" className="text-light">
                  Have an account?
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
