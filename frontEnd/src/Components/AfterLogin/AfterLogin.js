import React, { useState, useEffect } from "react";
import axios from "axios";
import classes from "./AfterLogin.module.css";
import { Link } from "react-router-dom";

function AfterLogin() {
  const [productName, setProductName] = useState([]);

  const url = "http://localhost:8000/blogs/homepage";

  useEffect(() => {
    axios.get(url).then((response) => {
      console.log(response);
      console.log(response.data);
      setProductName(response.data);
    });
  }, [url]);

  return (
    <>
      <nav className={classes.nav}>
        <div>
          <h1>AltSchool Africa</h1>
        </div>
        <ul>
          <li>
            <span>About Us</span>
            <span>Contact Us</span>
            <span>Write</span>
            <span>More</span>
          </li>
        </ul>
        <img src="" alt=""></img>
      </nav>
      <p>Trending Today</p>
      <div className={classes["page-content"]}>
        {productName.map((postproduct) => {
          return (
            <div key={postproduct._id} className={classes["page-content--sub"]}>
              <Link to={`/readblogs/${postproduct._id}`}>
                <h3>{postproduct.title}</h3>
              </Link>
              <div className={classes["content-updated"]}>
                <div className={classes.content}>
                  <p>{postproduct.content}</p>
                  <span>{postproduct.updated_at}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default AfterLogin;
