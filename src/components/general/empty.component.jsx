import React from "react";
import emptyImg from "./../../assets/img/empty.jpg";
export default function Empty() {
  return (
    <div className='w-100 m-auto p-2 d-flex flex-column'>
      <img src={emptyImg} alt='' className='w-75 m-auto' />
      <h3 className='alert alert-warning m-1 p-1 m-auto'>
        Nothing to show here ! Add some content first
      </h3>
    </div>
  );
}
