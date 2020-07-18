import React, { useState } from "react";
import { FBlogin } from "./../firebase/user";
import { Link } from "react-router-dom";
export default function LoginV() {
  const [user, setuser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setuser({ ...user, [e.target.name]: e.target.value });
    //console.log(user);
  };

  const onSubmit = () => {
    //Validations Here
    let res, err;
    FBlogin(user.email, user.password)
      .then(() => {
        console.log("User Logged In");
      })
      .catch(function (error) {
        console.log(error);
        err = error;
      });
  };

  return (
    <div className='card col-md-6 p-2 m-auto'>
      <h4>Vasooli - Login</h4>
      <div className='form-group'>
        <label>Email address</label>
        <input
          type='email'
          className='form-control'
          placeholder='Enter email'
          name='email'
          value={user.email}
          onChange={handleChange}
        />
      </div>
      <div className='form-group'>
        <label>Password</label>
        <input
          type='password'
          className='form-control'
          id='exampleInputPassword1'
          placeholder='Password'
          name='password'
          value={user.password}
          onChange={handleChange}
        />
      </div>
      <button className='btn btn-primary w-75 m-auto m-2' onClick={onSubmit}>
        Log In
      </button>
      <p>
        Don't have an account <Link to='/signup'>Create one here</Link>
      </p>
    </div>
  );
}
