import React, { Fragment, useState, useEffect } from "react";
import { getTransactionByFilter } from "./../firebase/transaction";
import fire from "./../firebase/fire";
import { useLocation } from "react-router-dom";
import categories from "./../data/categories";
import { PieChart, Pie, Legend, Tooltip } from "recharts";

export default function DashboardV() {
  const [TransactionsArr, setTransactionsArr] = useState([]);
  const [IncomePieData, setIncomePieData] = useState([]);
  const [ExpensePieData, seExpensePieData] = useState([]);
  const [PieDim, setPieDim] = useState({
    width: 0,
    height: 0,
  });
  const [loading, setloading] = useState(true);
  const [user, setuser] = useState({});
  let loc = useLocation();

  const PieDataMaking = (TransactionsArr) => {
    let inc = [0, 0, 0],
      exp = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    //console.log(TransactionsArr);
    TransactionsArr.map((trans) => {
      if (trans.type === "INC") {
        let catIndex = parseInt(trans.category);
        inc[catIndex] += parseInt(trans.amount);
      } else if (trans.type === "EXP") {
        let catIndex = parseInt(trans.category) - 3;
        exp[catIndex] += parseInt(trans.amount);
      }
    });
    //console.log(inc, exp);
    let incObjArr = [],
      expObjArr = [];
    inc.map((d, index) => {
      let obj = {
        name: categories[index].title,
        value: d,
      };
      //console.log(obj);
      incObjArr.push(obj);
    });
    exp.map((d, index) => {
      expObjArr.push({
        name: categories[index + 3].title,
        value: d,
      });
    });
    //console.log(incObjArr, expObjArr);
    setIncomePieData(incObjArr);
    seExpensePieData(expObjArr);
  };

  useEffect(() => {
    setloading(true);
    if (window.innerWidth > 800) {
      //Desktop
      setPieDim({
        width: window.innerWidth / 4,
        height: window.innerHeight / 2,
      });
    } else {
      setPieDim({
        width: window.innerWidth * 0.8,
        height: window.innerHeight / 2,
      });
    }
    fire.auth().onAuthStateChanged(function (user) {
      if (user) {
        setuser(user);
        getTransactionByFilter(
          user.uid,
          "ALL",
          (res) => {
            let Arr = [];
            res.forEach((item) => {
              Arr.push(item.data());
            });
            console.log(Arr);
            setTransactionsArr(Arr);
            PieDataMaking(Arr);
            setloading(false);
          },
          (err) => console.log(err)
        );
      } else {
        //console.log("NO user AUth Change");
      }
    });
  }, [loc.pathname]);
  return (
    <Fragment>
      <div className='row'>
        <div className='col-md-6 card p-2'>
          <PieChart width={PieDim.width + 20} height={PieDim.height + 20}>
            <Pie
              data={IncomePieData}
              dataKey='value'
              cx={PieDim.width / 2}
              cy={PieDim.height / 2}
              outerRadius={75}
              fill='#8884d8'
            />
            <Pie
              data={ExpensePieData}
              dataKey='value'
              cx={PieDim.width / 2}
              cy={PieDim.height / 2}
              innerRadius={95}
              outerRadius={120}
              fill='#82ca9d'
              label
            />
            <Tooltip />
          </PieChart>
        </div>
        <div className='col-md-6 card p-2'>
          <h4 className=''>Categories</h4>
          <ul className='list-group'>
            {categories.map((cat, i) => (
              <li key={i} className='list-group-item d-flex flex-row p-1'>
                <i className={`${cat.iconclass} mx-2`}></i>
                <h6>{cat.title}</h6>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Fragment>
  );
}
