import React from "react";

export default function Transactioncard() {
  return (
        <div className="card text-center m-2">
      <div className="card-body d-flex">
        <a href="#" className="btn btn-primary">Go somewhere</a>
        <div className="col-10 justify-content-start text-left">

          <h6 className="card-title">Category name : Special title treatment</h6>
          <p className="card-text">Categody Description : With supporting text below as a natural lead-in to additional content.</p>
          <hr/>
          <p className="card-text">Date : {new Date().toLocaleString()}</p>
        </div>
      {/* </div>
      <div className="card-footer d-flex">
        <div className="col-4 justify-content-start text-left">
        
        <span className="badge badge-info p-2">Paid / Unpaid</span>
        </div>
        <div className="col-8 justify-content-end text-right">

        <button className="btn btn-warning m-1">Approve</button>
        <button className="btn btn-success m-1">Pay Now</button>
        <button className="btn btn-danger m-1">Decline</button>
        </div>
      */}
      </div>
    </div>
  );
}
