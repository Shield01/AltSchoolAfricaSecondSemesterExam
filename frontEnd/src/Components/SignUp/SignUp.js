import axios from "axios";
import React, { useState } from "react";
import classes from "./SignUp.module.css";

function SignUp() {
  const [firstname, setfirstname] = useState("");
  const [lastname, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const signUpHandler = (e) => {
    e.preventDefault();
    const url = "http://localhost:8000/api/user_signup";
    axios
      .post(url, {
        firstname,
        lastname,
        gender,
        phone_number,
        password,
        email,
      })
      .then((res) => console.log("posting data", res))
      .catch((err) => console.log(err));
  };

  return (
    <div className={classes["signup-main"]}>
      <div className={classes["signup-sub"]}>
        <div className={classes["sign-head"]}>
          <h3>Sign Up</h3>
          <p>
            By continuing, you are setting up a Buzzzz account and agree to our
            User Agreement and Privacy Policy.
          </p>
        </div>
        <form className={classes["signup-form"]}>
          <div>
            <input
              placeholder="First Name"
              type="name"
              value={firstname}
              onChange={(e) => setfirstname(e.target.value)}
              required
            ></input>
          </div>
          <div>
            <input
              placeholder="Last Name"
              type="name"
              value={lastname}
              onChange={(e) => setLastName(e.target.value)}
              required
            ></input>
          </div>
          <div>
            <input
              placeholder="gender"
              type="name"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
            ></input>
          </div>
          <div>
            <input
              placeholder="Phone Number"
              type="name"
              name="phone_number"
              value={phone_number}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            ></input>
          </div>
          <div>
            <input
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            ></input>
          </div>
          <div>
            <input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            ></input>
          </div>
          {/* <div>
            <input placeholder="Email" type="email"></input>
          </div> */}
          <div className={classes["signup--btn"]}>
            <button onClick={signUpHandler}>Sign Up</button>
          </div>
        </form>
        <div className={classes["dont--have"]}>
          <p>
            Already Have An account? <i>Login</i>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
