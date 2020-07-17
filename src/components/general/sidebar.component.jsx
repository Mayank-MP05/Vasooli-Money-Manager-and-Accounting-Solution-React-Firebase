import React from "react";
import { Link } from "react-router-dom";
import {user2} from './../../data/userimages'
export default function SidebarV({ control }) {
  return (
    <div
      className='card'
      style={{ width: "250px", background: "white", height: "100vh" }}>
      <img
        className='card-img-top'
        src={user2}
        alt='Card image cap'
        style={{ borderRadius: "50%" , width:"60%" ,margin:"auto" , marginTop:"5vh"}}
      />
      <div className='card-body'>
        <p className='card-title'>mayank5pande@gmail.com</p>
        <hr/>
        <div className='card-text'>
          <ul className='list-group list-group-flush'>
            <Link to='/dashboard' className='list-group-item' onClick={() => control(false)}>
              Dashboard
            </Link>
            <Link to='/transactions' className='list-group-item'  onClick={() => control(false)}>
              Transactions
            </Link>
            <Link to='/vasooli' className='list-group-item'  onClick={() => control(false)}>
              Vasooli
            </Link>
            <Link to='/profile' className='list-group-item'  onClick={() => control(false)}>
              Profile
            </Link>
          </ul>
        </div>
        <hr/>
        <a href='#' className='btn btn-primary w-50 m-auto'>
          Log out
        </a>
      </div>
    </div>
  );
}
