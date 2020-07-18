import React from "react";
import { Link } from "react-router-dom";
import { user2 } from "./../../data/userimages";
import { FBlogout } from "./../../firebase/user";
import { Button } from "react-bootstrap";
export default function SidebarV({ control, cleanuser }) {
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
      <img
        className='card-img-top'
        src={user2}
        alt='Card image cap'
        style={{
          borderRadius: "50%",
          width: "60%",
          margin: "auto",
          marginTop: "5vh",
        }}
      />
      <div className='card-body'>
        <p className='card-title'>mayank5pande@gmail.com</p>
        <Link to='/signup' className='btn btn-warning m-1'>
          Sign Up
        </Link>
        <Link to='/login' className='btn btn-success m-1'>
          Log In
        </Link>
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
        <Button onClick={logout} className='btn btn-primary w-50 m-auto'>
          Log out
        </Button>
      </div>
    </div>
  );
}
