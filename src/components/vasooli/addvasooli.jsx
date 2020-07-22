import React, { useEffect, useState, Fragment } from "react";
import categories from "./../../data/categories";

import fire from "./../../firebase/fire";
import { getUserList } from "./../../firebase/user";
import { addVasooli } from "./../../firebase/vasooli";

export default function Addvasooli() {
  const [vasooli, setvasooli] = useState({
    to: "",
    amount: 0,
    category: 0,
    date: new Date(),
    desc: "",
    status: "WAITING",
  });
  const [user, setuser] = useState({});
  const [userlist, setuserlist] = useState([]);
  const [success, setsuccess] = useState(false);
  const [error, seterror] = useState(false);
  const [errorBody, seterrorBody] = useState({});

  const onsubmit = () => {
    let user = fire.auth().currentUser;
    addVasooli(
      user.email,
      vasooli,
      (res) => {
        console.log(res);
        setsuccess(true);
        setvasooli({
          to: "",
          amount: 0,
          category: 1,
          date: new Date(),
          desc: "",
          status: "WAITING",
        });
      },
      (err) => {
        console.log(err);
        seterrorBody(err);
        seterror(true);
      }
    );
  };

  const handleChange = (e) => {
    setvasooli({ ...vasooli, [e.target.name]: e.target.value });
    //console.log(user);
  };
  const sucessAlert = () => (
    <div className='alert alert-success'>Vasooli Added Successfully !</div>
  );

  const errorAlert = () => (
    <div className='alert alert-danger'>
      {errorBody.message
        ? errorBody.message
        : "Something Went Wrong Please Try Again !"}
    </div>
  );

  const listing = () => {
    //Getting user list
    getUserList(
      (res) => {
        setuserlist(res.data);
      },
      (err) => {
        seterror(true);
        seterrorBody(err);
        console.log(err);
      }
    );
  };

  const getuser = () => {
    let user = fire.auth().currentUser;
    setuser(user);
    return <h1>Jusr Demo</h1>;
  };

  //To Stop displaying the popup after 3 sec
  useEffect(() => {
    if (error) {
      setTimeout(() => {
        seterror(false);
      }, 3000);
    }
  }, [error]);
  //To Stop displaying the popup after 3 sec
  useEffect(() => {
    if (success) {
      setTimeout(() => {
        setsuccess(false);
      }, 3000);
    }
  }, [success]);

  useEffect(() => {
    listing();
  }, []);
  return (
    <Fragment>
      {success && sucessAlert()}
      {error && errorAlert()}
      <div className='card p-2 m-auto'>
        <h4>Request your Money</h4>
        <hr />

        <div className='form-group row'>
          <label className='col-sm-2 col-form-label'>Amount</label>
          <div className='col-sm-10'>
            <input
              type='number'
              className='form-control'
              placeholder='ex. 50'
              min='1'
              max='100000'
              name='amount'
              value={vasooli.amount}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className='form-group row'>
          <label className='col-sm-2 col-form-label'>To </label>
          <div className='col-sm-10'>
            <select
              className='form-control'
              name='to'
              value={vasooli.to}
              onChange={handleChange}>
              {userlist
                .filter((itr) => itr !== user.email)
                .map((usr, index) => (
                  <option key={index} value={usr}>
                    {usr}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <div className='form-group row'>
          <label className='col-sm-2 col-form-label'>Category </label>
          <div className='col-sm-10'>
            <select
              className='form-control'
              name='category'
              value={vasooli.category}
              onChange={handleChange}>
              {categories.map((cat, index) => (
                <option key={index} value={index}>
                  {cat.title}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className='form-group row'>
          <label className='col-sm-2 col-form-label'>Description</label>
          <div className='col-sm-10'>
            <input
              type='text'
              className='form-control'
              name='desc'
              value={vasooli.desc}
              onChange={handleChange}
              placeholder='ex. Meal at Gangotri Bill'
            />
          </div>
        </div>
        <div className='row d-flex justify-content-center'>
          <button className='btn btn-success' onClick={onsubmit}>
            Ask for Vasooli
          </button>
        </div>
      </div>
    </Fragment>
  );
}
