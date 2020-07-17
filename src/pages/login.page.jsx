import React,{useState} from 'react'

export default function LoginV() {
    const [user, setuser] = useState({
        email:'',
        password:''
    })

    const onSubmit = () => {

    }

    return (
       <div class="card col-md-5 p-2 m-auto">
        <h4>Vasooli - Login</h4>
        <div class="form-group">
            <label>Email address</label>
            <input type="email" class="form-control" placeholder="Enter email"/>
        </div>
        <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password"/>
        </div>
        <button class="btn btn-primary w-75 m-auto m-2">Log In</button>
        </div>
    )
}
