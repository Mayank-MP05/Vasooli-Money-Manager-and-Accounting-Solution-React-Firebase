import React from 'react'

export default function SignupV() {
    return (
       <div class="card col-md-5 p-2 m-auto">
        <h4>Vasooli - Sign up form</h4>
        <div class="form-group">
            <label>Email address</label>
            <input type="email" class="form-control"placeholder="ex. johndoe@email.com"/>
        </div>
        <div class="form-group">
            <label>Full Name</label>
            <input type="text" class="form-control"placeholder="ex. John Doe"/>
        </div>
        <div class="form-group">
            <label for="exampleInputPassword1">Password First</label>
            <input type="password" class="form-control" placeholder="Password1"/>
        </div>
        <div class="form-group">
            <label for="exampleInputPassword1">Password Confirm</label>
            <input type="password" class="form-control" placeholder="Password1"/>
        </div>
        <button class="btn btn-primary w-75 m-auto m-2">Sign up</button>
        </div>
    )
}
