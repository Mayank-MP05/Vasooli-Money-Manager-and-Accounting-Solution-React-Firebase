import React from "react";
const bottom = {
  position: "fixed",

  right: 0,
  left: 0,
  bottom: 0,
};
const FooterV = () => {
  return (
    <nav
      className='navbar navbar-light bg-primary text-white text-center d-flex justify-content-center p-2'
      style={bottom}>
      <h6 className='m-2'>
        Designed with ❤️ by{" "}
        <a style={{ color: "white" }} href='https://github.com/mayank-MP05'>
          @Mayank_MP5
        </a>
      </h6>
    </nav>
  );
};

export default FooterV;
