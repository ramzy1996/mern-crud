import "./App.css";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";
import Navbar from "./components/layout/Navbar";
import Users from "./components/Users";
import User from "./components/User";
import AddUser from "./components/AddUser";
import UpdateUsers from "./components/UpdateUsers";
import { Route } from "react-router-dom";
import axios from "axios";

function App() {
  const [details, setDetails] = useState([]);
  useEffect(() => {
    axios
      .get("/users")
      .then((res) => setDetails(res.data))
      .catch((error) => console.log(error));
  });
  return (
    <div>
      <Navbar />
      <Route exact path="/" render={() => <Users details={details} />} />
      <Route
        path="/user/:id"
        render={(props) => <User {...props} details={details} />}
      />
      <Route
        path="/update-user/:id"
        render={(props) => <UpdateUsers {...props} details={details} />}
      />
      <Route path="/add-user" component={AddUser} />
    </div>
  );
}

export default App;
