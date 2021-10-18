import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";

const AddUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [message, setMessage] = useState("");
  const [fileName, setfileName] = useState("");

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

    setName("");
    setEmail("");
    setMobile("");

    axios
      .post("/users/add", formData)
      .then((res) => setMessage(res.data))
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <MainContainer>
      <h1 className="text-center">Add Users</h1>
      <span className="message">{message}</span>
      <div className="container">
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
              Submit
            </button>
          </div>
        </form>
      </div>
    </MainContainer>
  );
};

export default AddUser;

const MainContainer = styled.div`
  margin: 3rem auto;
  padding: 4rem;
  width: 70%;

  .message {
    font-weight: 900;
    color: tomato;
    padding: 1rem 1rem 1rem 0;
  }
`;
