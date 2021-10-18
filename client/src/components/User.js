import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import spinner from "../assets/spinner2.gif";
import { Link } from "react-router-dom";

const User = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [fileName, setfileName] = useState("");

  useEffect(() => {
    axios
      .get(`/users/${props.match.params.id}`)
      .then((res) => [
        setName(res.data.name),
        setEmail(res.data.email),
        setMobile(res.data.mobile),
        setfileName(res.data.userImage),
      ])
      .catch((err) => console.log(err));
  }, []);

  return (
    <MainContainer>
      {!name || !email || !mobile ? (
        <img src={spinner} alt="Loading..." className="center" />
      ) : (
        <div>
          <img
            src={`/images/${fileName}`}
            width="150"
            height="150"
            style={{ borderRadius: "10px" }}
            alt="..."
          />
          <h2>{name}</h2>
          <p>{email}</p>
          <p>{mobile}</p>
          <Link to="/" className="btn btn-primary">
            Back to Home
          </Link>
        </div>
      )}
    </MainContainer>
  );
};

export default User;

const MainContainer = styled.div`
  margin: 7rem 0 0 7rem;

  .center {
    display: block;
    margin-left: 50%;
    margin-right: 50%;
    width: 3rem;
  }
`;
