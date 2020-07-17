import React ,{Fragment} from "react";
import Transactioncard from "./../transactions/transactioncard"
export default function Threegroup() {
  return (
      <Fragment>
          <h4>Income</h4>
          <Transactioncard />
          <Transactioncard />
          <Transactioncard />
    </Fragment>
  );
}
