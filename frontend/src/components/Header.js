import React from "react";
import { Link } from "react-router-dom";
// import logo from "../imgs/topbar_logo.png";

const LoggedOutView = (props) => {
  if (!props.currentUser) {
    return (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link to="/" className="nav-link text-left author-left">
            <i className="ion-home"></i>&nbsp;חזרה
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/login" className="nav-link">
            כניסה
          </Link>
        </li>
      </ul>
    );
  }
  return null;
};

const LoggedInView = (props) => {
  if (props.currentUser) {
    console.log(props.currentUser);
    return (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link to="/" className="nav-link text-left author-left">
            <i className="ion-home"></i>&nbsp;חזרה
          </Link>
        </li>

        {props.currentUser.role === "admin" && (
          <li className="nav-item">
            <Link to="/register" className="nav-link">
              <i className="ion-compose"></i>&nbsp;משתמש חדש
            </Link>
          </li>
        )}

        <li className="nav-item">
          <Link to="/settings" className="nav-link">
            <i className="ion-gear-a"></i>&nbsp;{props.currentUser.username}
          </Link>
        </li>
      </ul>
    );
  }

  return null;
};

class Header extends React.Component {
  render() {
    return (
      <nav
        className="navbar navbar-expand-md navbar-light"
        style={{ padding: "0.5rem 2rem" }}
      >
        <Link to="/" className="navbar-brand">
          {/*<img alt="logo" src={logo} />*/}
        </Link>

        <LoggedOutView currentUser={this.props.currentUser} />
        <LoggedInView currentUser={this.props.currentUser} />
      </nav>
    );
  }
}

export default Header;
