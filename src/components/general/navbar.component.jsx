import React, { Fragment } from "react";
import icon from "./../../assets/img/icon.png";
import { Link } from "react-router-dom";
export default function NavbarV({ onSetSidebarOpen }) {
  return (
    <Fragment>
      {/* Navbar Top Start Here */}
      <nav className='navbar navbar-light bg-primary text-white'>
        <i
          className='fa fa-bars'
          style={{ fontSize: "30px" }}
          onClick={() => onSetSidebarOpen(true)}></i>
        <Link className='navbar-brand text-white d-flex' to='/'>
          <h3 className='m-2'>Vasooli</h3>
          <img
            src={icon}
            width='50'
            height='50'
            className='d-inline-block align-top'
            alt='Vasooli App Icon'
            style={{ borderRadius: "50%" }}
          />
        </Link>
      </nav>
      {/* Navbar Top Ends Here */}
    </Fragment>
  );
}
