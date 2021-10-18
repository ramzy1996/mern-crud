import React, { useState } from "react";
import spinner from "../assets/spinner2.gif";
import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";

const Users = ({ details }) => {
  const [user, setUser] = useState([]);

  // delete users
  const deleteUser = (id) => {
    axios.delete(`/users/${id}`).then((res) => console.log(res.data));
    setUser(user.filter((elem) => elem._id !== id));
  };
  let i = 1;
  return (
    <MainContainer>
      <div>
        <Link className="btn btn-outline-success" to="add-user">
          Add Users
        </Link>
      </div>
      {!details.length ? (
        <img src={spinner} alt="Loading..." className="center text-center" />
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Image</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Mobile</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {details.map((user, key) => (
              <tr key={key}>
                <th>{i++}</th>
                <td>
                  <Link to={{ pathname: `/user/${user._id}` }}>
                    <img
                      src={`/images/${user.userImage}`}
                      width="70"
                      height="70"
                      style={{ borderRadius: "50%" }}
                      alt="..."
                    />
                  </Link>
                </td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.mobile}</td>
                <td>
                  <Link
                    to={`/update-user/${user._id}`}
                    className="btn btn-outline-success"
                  >
                    Edit
                  </Link>
                  &nbsp;
                  <button
                    onClick={() => {
                      if (window.confirm("sure to delete?") === true) {
                        deleteUser(user._id);
                      }
                    }}
                    className="btn btn-outline-danger"
                  >
                    Del
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </MainContainer>
  );
};

export default Users;

const MainContainer = styled.div`
  margin: 7rem 0;
  
  .center {
    display: block;
    margin-left: 50%;
    margin-right: 50%;
    width: 3rem;
  }s
`;
