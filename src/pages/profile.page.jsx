import React , { Fragment } from "react";
import {
  user1,
  user2,
  user3,
  user4,
  user5,
  user6,
  user7,
  user8,
  user9,
} from './../data/userimages';
import Dropdown from 'react-bootstrap/Dropdown'

export default function ProfileV() {
  return (
    <Fragment>
    <div className="row p-2">
    {/* Profile pic Section */}
      <div className="col-md-4 d-flex flex-column">
          <img src={user4} alt="Profile Picture of the User" className='w-50 m-auto'/>
            <div className="form-group">
            <label>Selct the Profile Pic</label>
            <select className="form-control">
              <option>Man X</option>
              <option>Man X</option>
              <option>Man X</option>
              <option>Man X</option>
              <option>Man X</option>
              <option>Woman Y</option>
              <option>Woman Y</option>
              <option>Woman Y</option>
              <option>Woman Y</option>
            </select>
          </div>
      </div>
    {/* Card Details Section */}
      <div className="col-md-7">

      <div className="form-group row">
        <label className="col-sm-2 col-form-label">Email</label>
        <div className="col-sm-10">
          <input type="email" disabled className="form-control-plaintext" value="email@example.com"/>
        </div>
      </div>
      <div className="form-group row">
        <label className="col-sm-2 col-form-label">Name : </label>
        <div className="col-sm-10">
          <input type="text" className="form-control" placeholder="Mayankk Pachpande"/>
        </div>
      </div>      
      <div className="form-group row">
        <label className="col-sm-2 col-form-label">Address</label>
        <div className="col-sm-10">
          <input type="text" className="form-control" placeholder="780 Warke Wada Nhavi tal Yawal, Dist-Jalgaon,MH"/>
        </div>
      </div>

      </div>
    </div>    
    <div className="row text-center justify-content-center">
      <button className="btn btn-danger m-1">Reset</button>
      <button className="btn btn-success m-1">Save Changes</button>
    </div>
    </Fragment>
  );
}
