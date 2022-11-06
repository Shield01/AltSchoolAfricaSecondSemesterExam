import React, { useState, useEffect } from "react";
import classes from "./Login.module.css";
import axios from "axios";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLoginHandler = (e) => {
    e.preventDefault();
    const login = { email, password };
    console.log(login);
    const url = "http://localhost:8000/api/user_login";
    axios
      .post(url, { email, password })
      .then((res) => console.log("posting data", res))
      .catch((err) => console.log(err));
    setEmail(email);
    setPassword(password);
  };

  return (
    <div className={classes["mainlogin-box"]}>
      <div className={classes["login-box"]}>
        <div className={classes["login-head"]}>
          <h3>Login</h3>
          <p>
            Login By continuing, you are setting up a Buzzzz account and agree
            to our User Agreement and Privacy Policy.
          </p>
        </div>
        <form>
          <div>
            <input
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>
          <div>
            <input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>
          <span className={classes["forgot-pass"]}>
            Forgot <i>Username</i> or <i>password</i> ?
          </span>
          <div className={classes["login-btn"]}>
            <Link to="/afterlogin" onClick={onLoginHandler}>
              <button>Login</button>
            </Link>
          </div>
        </form>
        <div className={classes["dont-have"]}>
          <p>
            Don't have an account? <i>Sign Up</i>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
