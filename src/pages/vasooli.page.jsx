import React, { Fragment, useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import { Link, useLocation } from "react-router-dom";
import { getVasooliByFilter } from "./../firebase/vasooli";
import fire from "./../firebase/fire";
import Vasoolicard from "./../components/vasooli/vasoolicard";
import Empty from "./../components/general/empty.component";
export default function VasooliV() {
  const [filter, setfilter] = useState("ALL");
  const [SendToCardFilter, setSendToCardFilter] = useState("ALL");
  const [VasooliArr, setVasooliArr] = useState([]);
  const [loading, setloading] = useState(true);
  const [user, setuser] = useState({});
  let loc = useLocation();
  const getDataFromFB = () => {
    let email = user.email;
    setloading(true);
    setSendToCardFilter(filter);
    getVasooliByFilter(
      email,
      filter,
      (res) => {
        let Arr = [];
        res.forEach((item) => {
          //console.log(item);
          Arr.push({ ...item.data(), ["id"]: item.id });
        });
        console.log(Arr);
        setVasooliArr(Arr);
        setloading(false);
      },
      (err) => console.log(err)
    );
  };

  useEffect(() => {
    setloading(true);
    fire.auth().onAuthStateChanged(function (user) {
      if (user) {
        setuser(user);
        getVasooliByFilter(
          user.email,
          "ALL",
          (res) => {
            console.log(res);
            setVasooliArr(res);
            setloading(false);
          },
          (err) => console.log(err)
        );
      } else {
        console.log("NO user AUth Change");
      }
    });
  }, [loc.pathname]);
  return (
    <Fragment>
      <div className='row' style={{ marginBottom: "7px" }}>
        <div className='col-6 col-sm-6 col-md-6'>
          <select
            className='custom-select w-100'
            value={filter}
            onChange={(e) => setfilter(e.target.value)}>
            <option value='ALL'>All</option>
            <option value='PAY'>Pay your Debt</option>
            <option value='ASK'>Ask for Vasooli</option>
          </select>
        </div>
        <div className='col-6 col-sm-6 col-md-6 d-flex flex-row'>
          <button className='btn btn-outline-info mx-1' onClick={getDataFromFB}>
            Apply
          </button>
          <Link to='/addvasooli' className='btn btn-success mx-1'>
            New
            <i className='fa fa-plus mx-1'></i>
          </Link>
        </div>
      </div>
      {!loading ? (
        VasooliArr.length > 0 ? (
          VasooliArr.map((single, index) => (
            <Vasoolicard key={index} data={single} filter={SendToCardFilter} />
          ))
        ) : (
          <Empty />
        )
      ) : (
        <div className='w-100 d-flex justify-content-center'>
          <Spinner
            animation='border'
            role='status'
            style={{ width: "70px", height: "70px", margin: "auto" }}>
            <span className='sr-only'>Loading...</span>
          </Spinner>
        </div>
      )}
    </Fragment>
  );
}
