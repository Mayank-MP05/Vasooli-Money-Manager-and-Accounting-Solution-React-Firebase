import React from "react";
import { Link } from "react-router-dom";
export default function SidebarV() {
  return (
    <div
      className='card'
      style={{ width: "250px", background: "white", height: "100vh" }}>
      <img
        className='card-img-top'
        src='...'
        alt='Card image cap'
        style={{ borderRadius: "50%" }}
      />
      <div className='card-body'>
        <p className='card-title'>Card title</p>
        <div className='card-text'>
          <ul className='list-group list-group-flush'>
            <Link to='/dashboard' className='list-group-item'>
              Dashboard
            </Link>
            <Link to='/transactions' className='list-group-item'>
              Transactions
            </Link>
            <Link to='/vasooli' className='list-group-item'>
              Vasooli
            </Link>
            <Link to='/profile' className='list-group-item'>
              Profile
            </Link>
          </ul>
        </div>
        <a href='#' className='btn btn-primary w-50 m-auto'>
          Log out
        </a>
      </div>
    </div>
  );
}
