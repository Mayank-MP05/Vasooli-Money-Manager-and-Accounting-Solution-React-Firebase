import React, { useState, Fragment } from "react";
import Transactioncard from "./../components/transactions/transactioncard";
export default function TransactionsV() {
  const [value, setvalue] = useState(undefined);
  const print = (e) => {
    setvalue(e.target.value);
    console.log(value);
  };
  return (
    <Fragment>
      <select
        className='custom-select'
        value={value}
        onChange={(e) => print(e)}>
        <option value='1'>One</option>
        <option value='2'>Two</option>
        <option value='3'>Three</option>
      </select>
      <Transactioncard />
      <Transactioncard />
      <Transactioncard />
      <Transactioncard />
      <Transactioncard />
    </Fragment>
  );
}
