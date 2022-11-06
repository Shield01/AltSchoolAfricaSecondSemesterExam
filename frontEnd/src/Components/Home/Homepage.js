import React from "react";
import classes from "./Homepage.module.css";
import { Link } from "react-router-dom";

function Homepage() {
  return (
    <div className={classes["nav-box"]}>
      <nav className={classes.nav}>
        <div>
          <h1>AltSchool Africa</h1>
        </div>
        <ul>
          <li>
            <span>About Us</span>
            <span>Contact Us</span>
          </li>
        </ul>
        <div className={classes["nav-btns"]}>
          <div className={classes["login-btn"]}>
            <Link to="/login">
              <button>Login</button>
            </Link>
          </div>

          <div className={classes["signup-btn"]}>
            <Link to="/signup">
              <button>Sign Up</button>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Homepage;
