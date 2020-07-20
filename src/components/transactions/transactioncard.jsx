import React from "react";
import categories from "./../../data/categories";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./transactioncard.style.css";
export default function Transactioncard({
  trans: { amount, category, date, desc, type },
}) {
  return (
    <div
      className={
        "card text-center rounded-lg m-3 p-0 " +
        (type === "INC" ? "back-success" : "back-danger")
      }
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
            Category{" "}
            <i
              className={categories[category].iconclass}
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
            {date.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}
