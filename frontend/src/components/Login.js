import ListErrors from "./ListErrors";
import React from "react";
import agent from "../agent";
import { connect } from "react-redux";
import {
  UPDATE_FIELD_AUTH,
  LOGIN,
  LOGIN_PAGE_UNLOADED,
} from "../constants/actionTypes";

const mapStateToProps = (state) => ({ ...state.auth });

const mapDispatchToProps = (dispatch) => ({
  onChangeEmail: (value) =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: "email", value }),
  onChangePassword: (value) =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: "password", value }),
  onSubmit: (email, password) =>
    dispatch({ type: LOGIN, payload: agent.Auth.login(email, password) }),
  onUnload: () => dispatch({ type: LOGIN_PAGE_UNLOADED }),
});

class Login extends React.Component {
  constructor() {
    super();
    this.changeEmail = (ev) => this.props.onChangeEmail(ev.target.value);
    this.changePassword = (ev) => this.props.onChangePassword(ev.target.value);
    this.submitForm = (email, password) => (ev) => {
      ev.preventDefault();
      this.props.onSubmit(email, password);
    };
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    const email = this.props.email;
    const password = this.props.password;
    return (
      <div className="auth-page">
        <div className="container page text-center text-dark">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12 bg-white p-4">
              <h1 className="text-xs-center font-weight-bold pb-4">
                כניסה למנויים
              </h1>

              <ListErrors errors={this.props.errors} />

              <form onSubmit={this.submitForm(email, password)}>
                <fieldset>
                  {/*<div className="container page">*/}
                  {/*  <div className="alert alert-danger text-start" role="alert" hidden={!this.props.errors}>*/}
                  {/*    <div className="hebrew">*/}
                  {/*      &nbsp; האימייל או הסיסמה אינם נכונים.&nbsp;&nbsp;*/}
                  {/*    </div>*/}
                  {/*  </div>*/}
                  {/*</div>*/}

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
                        value={email || ""}
                        onChange={this.changeEmail}
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
                        value={password || ""}
                        onChange={this.changePassword}
                      />
                    </div>
                  </fieldset>

                  <button
                    className="btn btn-lg btn-primary btn-block"
                    type="submit"
                    disabled={this.props.inProgress}
                    style={{
                      border: 0,
                      background:
                        "linear-gradient(90deg, #969696 -3.21%, #d5d5d5 100%)",
                      borderRadius: "5px",
                    }}
                  >
                    כניסה למערכת
                  </button>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
