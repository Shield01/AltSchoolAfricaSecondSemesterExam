import axios from "axios";
import React, { useState } from "react";
import classes from "./Publish.module.css";

function Publish() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const publishHandler = (e) => {
    e.preventDefault();
    const url = "http://localhost:8000/blogs/create_blog";
    axios
      .post(url, { title, content })
      .then((res) => console.log("posting data", res));
  };

  return (
    <div>
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

      <div>
        <div>
          <p>Title</p>
          <textarea onChange={(e) => setTitle(e.target.value)}></textarea>
        </div>
        <div>
          <p>Content</p>
          <textarea onChange={(e) => setContent(e.target.value)}></textarea>
        </div>
      </div>
      <div>
        <button onClick={publishHandler}>Publish</button>
      </div>
    </div>
  );
}

export default Publish;
