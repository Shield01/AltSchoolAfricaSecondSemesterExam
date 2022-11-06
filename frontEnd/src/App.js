import Homepage from "./Components/Home/Homepage";
import React, { useState, useEffect } from "react";
// import axios from "axios";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";

import PageContent from "./Components/PageContent/PageContent";
import Login from "./Components/Login/Login";
import SignUp from "./Components/SignUp/SignUp";
import AfterLogin from "./Components/AfterLogin/AfterLogin";
import ReadBlog from "./Components/ReadBlog/ReadBlog";
import Publish from "./Components/Publish/Publish";
import Edit from "./Components/Edit/Edit";

function App() {
  // const getTitle = () => {
  //   axios
  //     .get("http://localhost:8000/blogs/homepage")
  //     .then((response) => console.log(response));

  // };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="App">
              <Homepage />
              <PageContent />
            </div>
          }
        ></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/afterlogin" element={<AfterLogin />}></Route>
        <Route path="/readblogs/:id" element={<ReadBlog />}></Route>
        <Route path="/publish" element={<Publish />}></Route>
        <Route path="/edit/id" element={<Edit />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
