import React, { useState } from "react";

export default function SignupV() {
  const [User, setUser] = useState({
    email: "",
    fullName: "",
    pass1: "",
    pass2: "",
  });
  return (
    <div className='card col-md-6 p-2 m-auto'>
      <h4>Vasooli - Sign up form</h4>
      <div className='form-group'>
        <label>Email address</label>
        <input
          type='email'
          className='form-control'
          placeholder='ex. johndoe@email.com'
        />
      </div>
      <div className='form-group'>
        <label>Full Name</label>
        <input
          type='text'
          className='form-control'
          placeholder='ex. John Doe'
        />
      </div>
      <div className='form-group'>
        <label>Password First</label>
        <input
          type='password'
          className='form-control'
          placeholder='Password1'
        />
      </div>
      <div className='form-group'>
        <label>Password Confirm</label>
        <input
          type='password'
          className='form-control'
          placeholder='Password1'
        />
      </div>
      <button className='btn btn-primary w-75 m-auto m-2'>Sign up</button>
    </div>
  );
}
