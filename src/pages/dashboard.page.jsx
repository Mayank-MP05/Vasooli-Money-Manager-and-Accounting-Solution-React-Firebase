import React, { Fragment, useState, useEffect } from "react";
import { getTransactionByFilter } from "./../firebase/transaction";
import fire from "./../firebase/fire";
import { useLocation } from "react-router-dom";
import categories from "./../data/categories";
import { PieChart, Pie, Legend, Tooltip } from "recharts";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid } from "recharts";
import loadingImg from "./../assets/img/dashboard-loading.gif";
import Empty from "./../components/general/empty.component";
import "./dashboard.style.css";
export default function DashboardV() {
  const [TransactionsArr, setTransactionsArr] = useState([]);
  const [IncomePieData, setIncomePieData] = useState([]);
  const [ExpensePieData, seExpensePieData] = useState([]);
  const [netIncome, setnetIncome] = useState(0);
  const [netExpense, setnetExpense] = useState(0);
  const [monthdata, setmonthdata] = useState([]);
  const [categorywise, setcategorywise] = useState([]);
  const [PieDim, setPieDim] = useState({
    width: 0,
    height: 0,
  });
  const [BarDim, setBarDim] = useState({
    width: 0,
    height: 0,
  });
  const [loading, setloading] = useState(true);
  const [user, setuser] = useState({});
  let loc = useLocation();

  const BarDataMaking = (TransactionsArr) => {
    let inc = [0, 0, 0, 0, 0, 0];
    let exp = [0, 0, 0, 0, 0, 0];
    const monthArr = [
      "Jan-Feb",
      "Mar-Apr",
      "May-Jun",
      "Jul-Aug",
      "Sep-Oct",
      "Nov-Dec",
    ];
    TransactionsArr.map((trans) => {
      if (trans.type === "INC") {
        let dt = new Date(trans.date);
        let month = dt.getMonth();
        inc[parseInt(month / 2)] += parseInt(trans.amount);
      } else if (trans.type === "EXP") {
        let dt = new Date(trans.date);
        let month = dt.getMonth();
        exp[parseInt(month / 2)] += parseInt(trans.amount);
      }
    });
    //    console.log(inc, exp);
    let bardata = [];
    for (let i in inc) {
      bardata.push({
        Months: monthArr[i],
        Income: inc[i],
        Expense: exp[i],
      });
    }
    setmonthdata(bardata);
  };

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
      expObjArr = [],
      incSum = 0,
      expSum = 0;
    inc.map((d, index) => {
      let obj = {
        name: categories[index].title,
        value: d,
      };
      incSum += d;
      //console.log(obj);
      incObjArr.push(obj);
    });
    exp.map((d, index) => {
      expObjArr.push({
        name: categories[index + 3].title,
        value: d,
      });
      expSum += d;
    });
    //console.log(incObjArr, expObjArr);
    setIncomePieData(incObjArr);
    seExpensePieData(expObjArr);
    setnetIncome(incSum);
    setnetExpense(expSum);
    setcategorywise(inc.concat(exp));
  };

  useEffect(() => {
    setloading(true);
    if (window.innerWidth > 800) {
      //Desktop
      setPieDim({
        width: window.innerWidth / 4,
        height: window.innerHeight / 2,
      });
      setBarDim({
        width: window.innerWidth * 0.7,
        height: window.innerHeight * 0.4,
      });
    } else {
      setPieDim({
        width: window.innerWidth * 0.8,
        height: window.innerHeight / 2,
      });
      setBarDim({
        width: window.innerWidth * 0.98,
        height: window.innerHeight * 0.3,
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
            //            console.log(Arr);

            setTransactionsArr(Arr);
            PieDataMaking(Arr);
            BarDataMaking(Arr);
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
      {loading ? (
        <img src={loadingImg} className='w-100 m-auto' />
      ) : (
        <Fragment>
          <div className='row'>
            <div className='col-6 card alert-success'>
              <h5>Net Income : {netIncome}</h5>
            </div>
            <div className='col-6 card alert-danger'>
              <h5>Net Expenses : {netExpense}</h5>
            </div>
          </div>
          {TransactionsArr.length === 0 ? (
            <Empty />
          ) : (
            <div className='row p-2 d-flex flex-col justify-content-center'>
              <h5>Monthwise Income and Expenses</h5>
              <BarChart
                width={BarDim.width}
                height={BarDim.height}
                data={monthdata}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='Months' />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey='Income' fill='	#5cb85c' />
                <Bar dataKey='Expense' fill='#d9534f' />
              </BarChart>
            </div>
          )}
          <div className='row'>
            <div className='col-md-6 card p-2'>
              <h5 className=''>Category Wise Spends</h5>
              <ul className='list-group'>
                {categories.map((cat, i) => (
                  <li key={i} className='list-group-item d-flex flex-row p-1'>
                    <i
                      className={`${cat.iconclass} mx-2`}
                      style={{ fontSize: "25px" }}></i>

                    <h6 className='para-width'>{cat.title} - </h6>
                    <div
                      className={`badge-width badge justify-selff-end p-2 badge-${
                        i > 3 ? "danger" : "success"
                      }`}>
                      ${categorywise[i]}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            {TransactionsArr.length !== 0 ? (
              <div className='col-md-6 card p-2'>
                <PieChart width={PieDim.width + 20} height={PieDim.height + 20}>
                  <Pie
                    data={IncomePieData}
                    dataKey='value'
                    cx={PieDim.width / 2}
                    cy={PieDim.height / 2}
                    outerRadius={75}
                    fill='	#5cb85c'
                  />
                  <Pie
                    data={ExpensePieData}
                    dataKey='value'
                    cx={PieDim.width / 2}
                    cy={PieDim.height / 2}
                    innerRadius={95}
                    outerRadius={120}
                    fill='#d9534f'
                    label
                  />
                  <Tooltip />
                </PieChart>
              </div>
            ) : (
              ""
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}
