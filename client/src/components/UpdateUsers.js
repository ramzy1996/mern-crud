import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import spinner from "../assets/spinner2.gif";

const UpdateUsers = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [message, setMessage] = useState("");
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
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onChangeFile = (e) => {
    setfileName(e.target.files[0]);
  };

  const changeOnClick = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", name);
    formData.append("email", email);
    formData.append("mobile", mobile);
    formData.append("userImage", fileName);

    axios
      .put(`/users/update/${props.match.params.id}`, formData)
      .then((res) => setMessage(res.data))
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <MainContainer>
      <h1 className="text-center">Update Users</h1>
      <span className="message">{message}</span>
      <div className="container">
        {!name && !email && !mobile ? (
          <img src={spinner} alt="Loading..." className="center" />
        ) : (
          <form onSubmit={changeOnClick} encType="multipart/form-data">
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>

              <input
                type="text"
                className="form-control"
                id="name"
                value={name}
                placeholder="Enter Name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                placeholder="Enter Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="mobile" className="form-label">
                Mobile
              </label>
              <input
                type="text"
                className="form-control"
                id="mobile"
                value={mobile}
                placeholder="Enter Mobile"
                onChange={(e) => setMobile(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="file" className="form-label">
                Choose Image
              </label>
              <input
                type="file"
                filename="userImage"
                className="form-control"
                id="file"
                onChange={onChangeFile}
              />
            </div>
            <div className="d-grid gap-2">
              <button type="submit" className="btn btn-primary">
                Update
              </button>
            </div>
          </form>
        )}
      </div>
    </MainContainer>
  );
};

export default UpdateUsers;

const MainContainer = styled.div`
  margin: 3rem auto;
  padding: 4rem;
  width: 70%;
  .message {
    font-weight: 900;
    color: tomato;
    padding: 1rem 1rem 1rem 0;
  }

  .center {
    display: block;
    margin-left: 50%;
    margin-right: 50%;
    width: 3rem;
  }
`;
