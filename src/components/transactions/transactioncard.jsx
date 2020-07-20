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
        <div className='btn' style={categories[category].style}>
          <i className={categories[category].iconclass} aria-hidden='true'></i>
          <i className='fa fa-plus mx-1'></i>
          {amount} : {type}
        </div>
        <div className='col-10 justify-content-start text-left'>
          <h6 className='card-title'>
            <i
              className={categories[category].iconclass}
              aria-hidden='true'></i>
            Category name : {categories[category].title}
          </h6>
          <p className='card-text'>
            Categody Description : {categories[category].description}
          </p>
          <hr />
          <p className='card-text p-0 m-0'>Date : {date.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}
