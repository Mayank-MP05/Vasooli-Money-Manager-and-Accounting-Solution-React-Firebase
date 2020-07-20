import React, { useState, Fragment } from "react";
import { Link } from "react-router-dom"
import Transactioncard from "./../components/transactions/transactioncard";

export default function TransactionsV() {
  const [value, setvalue] = useState("ALL");
  const print = (e) => {
    setvalue(e.target.value);
    console.log(value);
  };
  return (
    <Fragment>
      <div className='row'>
        <div className='col-xs-6 col-sm-6 col-md-8'>
          <select
            className='custom-select'
            value={value}
            onChange={(e) => print(e)}>
            <option value='ALL'>All</option>
            <option value='INC'>Income</option>
            <option value='EXP'>Expenses</option>
          </select>
        </div>
        <div className='col-xs-6 col-sm-6 col-md-4'>
          <button className='btn btn-outline-info'>Apply Filter</button>
          <Link className='btn btn-success'>Add Transaction</Link>
        </div>
      </div>
      <Transactioncard />
      <Transactioncard />
      <Transactioncard />
      <Transactioncard />
      <Transactioncard />
    </Fragment>
  );
}
