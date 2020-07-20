import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import Transactioncard from "./../components/transactions/transactioncard";
import { getTransactionByFilter } from "./../firebase/transaction";
import { getCurrentUser } from "./../firebase/user";
import fire from "./../firebase/fire";
const labels = {
  ALL: "All",
  INC: "Incomes",
  EXP: "Expenses",
};

export default function TransactionsV() {
  const [filter, setfilter] = useState("ALL");
  const [TransactionsArr, setTransactionsArr] = useState([]);
  const [user, setuser] = useState({});

  const getDataFromFB = () => {
    console.log(filter);
    console.log(TransactionsArr);
    let uid = user.uid;
    getTransactionByFilter(
      uid,
      filter,
      (res) => {
        let Arr = [];
        res.forEach((item) => {
          Arr.push(item.data());
        });
        setTransactionsArr(Arr);
      },
      (err) => console.log(err)
    );
  };

  useEffect(() => {
    fire.auth().onAuthStateChanged(function (user) {
      if (user) {
        setuser(user);
        getTransactionByFilter(
          user.uid,
          "ALL",
          (res) => {
            let Arr = [];
            res.forEach((item) => {
              Arr.push(item.data());
            });
            setTransactionsArr(Arr);
          },
          (err) => console.log(err)
        );
      } else {
        console.log("NO user AUth Change");
      }
    });
  }, []);

  return (
    <Fragment>
      <div className='row' style={{ marginBottom: "7px" }}>
        <div className='col-6 col-sm-6 col-md-6'>
          <select
            className='custom-select w-100'
            value={filter}
            onChange={(e) => setfilter(e.target.value)}>
            <option value='ALL'>All</option>
            <option value='INC'>Income</option>
            <option value='EXP'>Expenses</option>
          </select>
        </div>
        <div className='col-6 col-sm-6 col-md-6 d-flex flex-row'>
          <button className='btn btn-outline-info mx-1' onClick={getDataFromFB}>
            Apply
          </button>
          <Link to='/addtransaction' className='btn btn-success mx-1'>
            New
            <i className='fa fa-plus mx-1'></i>
          </Link>
        </div>
      </div>
      {TransactionsArr
        ? TransactionsArr.map((trans, index) => (
            <Transactioncard key={index} trans={trans} />
          ))
        : "Loading..."}
    </Fragment>
  );
}
