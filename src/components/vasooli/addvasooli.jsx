import React, { useEffect, useState, Fragment } from "react";
import categories from "./../../data/categories";
export default function Addvasooli() {
  const [vasooli, setvasooli] = useState({
    to: "",
    amount: 0,
    category: 0,
    date: new Date(),
    desc: "",
  });
  const [success, setsuccess] = useState(false);
  const [error, seterror] = useState(false);
  const [errorBody, seterrorBody] = useState({});

  const onsubmit = () => {
    let user = fire.auth().currentUser;
    addTrans(
      user.uid,
      trans,
      (res) => {
        console.log(res);
        setsuccess(true);
        settrans({
          type: "",
          amount: 0,
          category: 0,
          date: new Date(),
          desc: "",
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
    settrans({ ...trans, [e.target.name]: e.target.value });
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

  useEffect(() => {
      //Getting user list
      
  }, []);

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
              <option>email@email.com 1</option>
              <option>email@email.com 1</option>
              <option>email@email.com 1</option>
              <option>email@email.com 1</option>
              <option>email@email.com 1</option>
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
