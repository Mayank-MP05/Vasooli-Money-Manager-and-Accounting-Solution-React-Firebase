import React from "react";

export default function SidebarV() {
  return (
    <div className='card' style={{ width: "250px", background: "white" }}>
      <img
        className='card-img-top'
        src='...'
        alt='Card image cap'
        style={{ borderRadius: "50%" }}
      />
      <div className='card-body'>
        <p className='card-title'>Card title</p>
        <p className='card-text'>
          <ul className='list-group list-group-flush'>
            <button className='list-group-item'>Dashboard</button>
            <button className='list-group-item'>Transactions</button>
            <button className='list-group-item'>Vasooli</button>
            <button className='list-group-item'>Profile</button>
          </ul>
        </p>
        <a href='#' className='btn btn-primary w-50 m-auto'>
          Log out
        </a>
      </div>
    </div>
  );
}
