import React, { useState, useEffect } from "react";
import categories from "./../../data/categories";
import "./../transactions/transactioncard.style.css";
import { updateVasooliStatus } from "./../../firebase/vasooli";
export default function Vasoolicard({
  data: { from, to, amount, category, date, desc, status, id },
  filter,
}) {
  const [UIControls, setUIControls] = useState({
    approve: "",
    decline: "",
    paynow: "",
  });

  const updateStatus = (sts) => {
    //console.log(id);
    updateVasooliStatus(
      id,
      { status: sts },
      (res) => {
        //console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
    //UI updates
    if (sts === "APPROVED" || sts === "DECLINED") {
      setUIControls({
        approve: "d-none",
        decline: "d-none",
        paynow: "",
      });
    } else {
      setUIControls({
        approve: "d-none",
        decline: "d-none",
        paynow: "d-none",
      });
    }
  };

  //Check if Bill is Already Paid
  useEffect(() => {
    if (status === "APPROVED" || status === "DECLINED") {
      setUIControls({
        approve: "d-none",
        decline: "d-none",
        paynow: "",
      });
    } else if (status === "PAID") {
      setUIControls({
        approve: "d-none",
        decline: "d-none",
        paynow: "d-none",
      });
    } else {
      setUIControls({
        approve: "",
        decline: "",
        paynow: "",
      });
    }
  }, []);

  return (
    <div
      className={"card text-center rounded-lg m-3 p-0"}
      style={{ marginBottom: "4px" }}>
      <div className='card-body d-flex'>
        <div className='btn img-col' style={categories[category].style}>
          <i
            className={`${categories[category].iconclass} imgIcon`}
            aria-hidden='true'></i>
          <p
            className='text-bold amount'
            style={{
              fontWeight: "bold",
              background: "black",
              color: "white",
              padding: "2px",
              marginTop: "7px",
            }}>
            ${amount}
          </p>
        </div>
        <div className='col-10 justify-content-start text-left'>
          <h6 className='card-title m-0'>
            <div className='badge badge-danger p-1 m-0'>
              To{": "}
              {to}
            </div>
            {"           "}
            <div className='badge badge-success p-1 m-0'>
              From{": "}
              {from}
            </div>
            <br />
            Category{" "}
            <i
              className={categories[category].iconclass + ` imgIcon d-none`}
              aria-hidden='true'
              style={{ fontSize: "18px" }}></i>{" "}
            : {categories[category].title}
          </h6>
          <small className='card-text' style={{ lineHeight: "1.2" }}>
            Category Description : {categories[category].description}
          </small>
          <hr className='m-1' />

          <p className='p-0 m-0'>
            <b>Description : </b>
            {desc}
          </p>
          <hr className='m-1' />
          <p className='badge p-1 m-1 badge-info pull-right'>
            <i
              className='fa fa-calendar m-1'
              aria-hidden='true'
              style={{ fontSize: "18px" }}></i>
            {date.toDate().toLocaleString()}
          </p>
        </div>
      </div>
      <div className='card-footer m-0 p-0'>
        {filter === "PAY" ? (
          <div className='p-0 m-0 pull-right d-inline'>
            <button
              className={"btn btn-success m-0 mx-1 p-1 " + UIControls.approve}
              onClick={() => {
                updateStatus("APPROVED");
              }}>
              Approve
            </button>
            <button
              className={"btn btn-danger m-0 mx-1 p-1 " + UIControls.decline}
              onClick={() => {
                updateStatus("DECLINED");
              }}>
              Decline
            </button>
            <button
              className={"btn btn-warning m-0 mx-1 p-1 " + UIControls.paynow}
              onClick={() => {
                updateStatus("PAID");
              }}>
              Pay Now
            </button>
          </div>
        ) : (
          <div className='alert alert-warning p-0 w-100 px-2 m-0 pull-left'>
            Status : {status}
          </div>
        )}
      </div>
    </div>
  );
}
