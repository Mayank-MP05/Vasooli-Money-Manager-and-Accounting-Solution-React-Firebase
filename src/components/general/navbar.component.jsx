import React from "react";
import icon from "./../../assets/img/icon.png";
export default function NavbarV() {
  return (
    <nav className='navbar navbar-light bg-primary text-white'>
      <a className='navbar-brand text-white d-flex' href='#'>
        <img
          src={icon}
          width='50'
          height='50'
          className='d-inline-block align-top'
          alt='Vasooli App Icon'
          style={{ borderRadius: "50%" }}
        />
        <h3 className="m-2">Vasooli</h3>
      </a>
    </nav>
  );
}
