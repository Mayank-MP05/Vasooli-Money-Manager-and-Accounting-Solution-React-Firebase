import React, { useState, useEffect, Fragment } from "react";
import categories from "./../../data/categories";
import fire from "../../firebase/fire";
import { addTrans } from "../../firebase/transaction";

export default function Addtransaction() {
  const [trans, settrans] = useState({
    type: "EXP",
    amount: 0,
    category: 0,
    date: new Date(),
    desc: "",
  });
  const [success, setsuccess] = useState(false);
  const [error, seterror] = useState(false);
  const [errorBody, seterrorBody] = useState({});

  const handleChange = (e) => {
    settrans({ ...trans, [e.target.name]: e.target.value });
    //console.log(user);
  };
  const sucessAlert = () => (
    <div className='alert alert-success'>Transaction Added Successfully !</div>
  );

  const errorAlert = () => (
    <div className='alert alert-danger'>
      {errorBody.message
        ? errorBody.message
        : "Something Went Wrong Please Try Again !"}
    </div>
  );

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
        <h4>Add a Transaction</h4>
        <hr />
        <select
          className='form-control m-2'
          name='type'
          value={trans.type}
          onChange={handleChange}>
          <option value='INC'>Income</option>
          <option value='EXP'>Expense</option>
        </select>
        <div className='form-group row'>
          <label className='col-sm-2 col-form-label'>Amount</label>
          <div className='col-sm-10'>
            <input
              type='number'
              className='form-control'
              placeholder='ex. 50'
              name='amount'
              value={trans.amount}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className='form-group row'>
          <label className='col-sm-2 col-form-label'>Category</label>
          <div className='col-sm-10'>
            <select
              className='form-control'
              name='category'
              value={trans.category}
              onChange={handleChange}>
              {categories.map((cat, index) => {
                return (
                  <option key={index} value={index}>
                    {cat.title}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className='form-group row'>
          <label className='col-sm-2 col-form-label'>Date</label>
          <div className='col-sm-10'>
            <input
              type='date'
              name='date'
              value={trans.date}
              onChange={handleChange}
              className='form-control'
            />
          </div>
        </div>
        <div className='form-group row'>
          <label className='col-sm-2 col-form-label'>Description</label>
          <div className='col-sm-10'>
            <input
              type='text'
              className='form-control'
              name='desc'
              value={trans.desc}
              onChange={handleChange}
              placeholder='ex.KFC Bill'
            />
          </div>
        </div>
        <div className='row d-flex justify-content-center'>
          <button className='btn btn-success' onClick={onsubmit}>
            Add Transaction
          </button>
        </div>
      </div>
    </Fragment>
  );
}
