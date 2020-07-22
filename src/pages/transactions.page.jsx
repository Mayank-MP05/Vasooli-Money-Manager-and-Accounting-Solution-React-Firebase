import React, { useState, useEffect, Fragment } from "react";
import { Link, useLocation } from "react-router-dom";
import Transactioncard from "./../components/transactions/transactioncard";
import { getTransactionByFilter } from "./../firebase/transaction";
import Spinner from "react-bootstrap/Spinner";
import Empty from "./../components/general/empty.component";

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
  const [loading, setloading] = useState(true);
  const [user, setuser] = useState({});
  let loc = useLocation();

  const getDataFromFB = () => {
    console.log(filter);
    console.log(TransactionsArr);
    let uid = user.uid;
    setloading(true);
    getTransactionByFilter(
      uid,
      filter,
      (res) => {
        let Arr = [];
        res.forEach((item) => {
          Arr.push(item.data());
        });
        setTransactionsArr(Arr);
        setloading(false);
      },
      (err) => console.log(err)
    );
  };

  useEffect(() => {
    setloading(true);
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
            setloading(false);
          },
          (err) => console.log(err)
        );
      } else {
        console.log("NO user AUth Change");
      }
    });
  }, [loc.pathname]);

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
      {!loading ? (
        TransactionsArr.length > 0 ? (
          TransactionsArr.map((trans, index) => (
            <Transactioncard key={index} trans={trans} />
          ))
        ) : (
          <Empty />
        )
      ) : (
        <div className='w-100 d-flex justify-content-center'>
          <Spinner
            animation='border'
            role='status'
            style={{ width: "70px", height: "70px", margin: "auto" }}>
            <span className='sr-only'>Loading...</span>
          </Spinner>
        </div>
      )}
    </Fragment>
  );
}
