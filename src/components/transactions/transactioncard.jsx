import React from "react";

export default function Transactioncard() {
  return (
    <div className='card text-center m-2'>
      <div className='card-body d-flex'>
        <a href='#' className='btn btn-primary'>
          Go somewhere
        </a>
        <div className='col-10 justify-content-start text-left'>
          <h6 className='card-title'>
            Category name : Special title treatment
          </h6>
          <p className='card-text'>
            Categody Description : With supporting text below as a natural
            lead-in to additional content.
          </p>
          <hr />
          <p className='card-text'>Date : {new Date().toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}
