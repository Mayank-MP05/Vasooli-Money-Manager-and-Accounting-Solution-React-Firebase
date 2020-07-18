import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { imgArr } from "./../../data/userimages";
import { FBlogout } from "./../../firebase/user";
import { Button } from "react-bootstrap";
import "./sidebar.style.css";

export default function SidebarV({ control, cleanuser, user, loggedin }) {
  const logout = () => {
    FBlogout(
      () => {
        //Sucess Function
        console.log("Log Out Successful");
        cleanuser();
      },
      () => {
        //Error Function
        console.log("Error Occured");
      }
    );
  };
  return (
    <div
      className='card'
      style={{ width: "250px", background: "white", height: "100vh" }}>
      <div className='card-body'>
        {loggedin ? (
          <Fragment>
            <img
              className='card-img-top'
              src={imgArr[parseInt(user.photoURL)]}
              alt='Card image cap'
              id={user.uid}
              style={{
                borderRadius: "50%",
                width: "60%",
                margin: "3vh 19%",
              }}
            />
            <p
              className='card-title d-flex justify-content-center'
              style={{ fontWeight: "bold" }}>
              {user.email}
            </p>
          </Fragment>
        ) : (
          <Fragment>
            <Link to='/signup' className='btn btn-warning m-1'>
              Sign Up
            </Link>
            <Link to='/login' className='btn btn-success m-1'>
              Log In
            </Link>
          </Fragment>
        )}
        <hr />
        <div className='card-text'>
          <ul className='list-group list-group-flush'>
            <Link
              to='/dashboard'
              className='list-group-item'
              onClick={() => control(false)}>
              Dashboard
            </Link>
            <Link
              to='/transactions'
              className='list-group-item'
              onClick={() => control(false)}>
              Transactions
            </Link>
            <Link
              to='/vasooli'
              className='list-group-item'
              onClick={() => control(false)}>
              Vasooli
            </Link>
            <Link
              to='/profile'
              className='list-group-item'
              onClick={() => control(false)}>
              Profile
            </Link>
          </ul>
        </div>
        <hr />
        {loggedin ? (
          <Button
            onClick={logout}
            className='btn btn-outline-danger w-75 m-auto bg-white d-flex justify-content-center'>
            Log out
          </Button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
