import React, { Fragment } from "react";

import Chart from "./../components/dashboard/chart";
import Threegroup from "./../components/dashboard/threegroup";

export default function DashboardV() {
  return (
    <Fragment>
      <div className='row'>
        <Chart />
      </div>
      <hr className='display-3' />
      <div className='row'>
        <div className='col-md-6'></div>
        <div className='col-md-6'></div>
      </div>
    </Fragment>
  );
}
