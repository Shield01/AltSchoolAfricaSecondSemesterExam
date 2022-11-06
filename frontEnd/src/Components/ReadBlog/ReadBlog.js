import React, { useState, useEffect } from "react";
import classes from "./ReadBlog.module.css";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

function ReadBlog() {
  const { id } = useParams();
  const [blog, setBlog] = useState([]);
  const [display, setDisplay] = useState("");

  // console.log(url);
  // console.log(blog);
  // console.log(url_);
  // useEffect(() => {
  //   axios.get(url, url_).then((response, res) => {
  //     console.log(response);
  //     console.log(response.data);
  //     console.log(res);
  //     setBlog(response.data);
  //   });
  // }, [url, url_]);

  const fetchData = () => {
    const url = "http://localhost:8000/blogs/homepage";
    const url_ = `http://localhost:8000/blogs/${id}`;

    const getUrl = axios.get(url);
    const getUrl_ = axios.get(url_);
    axios.all([getUrl, getUrl_]).then(
      axios.spread((...allData) => {
        const firstURL = allData[0];
        const secondURL = allData[1];

        // console.log(firstURL);
        console.log(secondURL);

        setBlog(firstURL.data);
        setDisplay(secondURL.data);
      })
    );
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    // <div>
    //   {blog.map((item) => {
    //     return <p>{display.content}</p>;
    //   })}
    // </div>
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
            <Link to="/publish">
              <span>Publish</span>
            </Link>
          </li>
        </ul>
        <img src="" alt=""></img>
      </nav>
      <div className={classes.created}>
        <span>{display.created_by}</span>
        <span>{display.created_at}</span>
      </div>
      <div className={classes.title}>{display.title}</div>
      <div className={classes.content}>
        {" "}
        {display.content}
        <div>
          <button>Edit</button>
        </div>
      </div>
    </div>
  );
}

export default ReadBlog;
