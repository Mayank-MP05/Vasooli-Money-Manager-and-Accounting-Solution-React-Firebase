import React, { useState, useEffect, Fragment } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useLocation,
} from "react-router-dom";
//CSS imports
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "font-awesome/css/font-awesome.min.css";

//Components imports
import Sidebar from "react-sidebar";
import FooterV from "./components/general/footer.component";
import NavbarV from "./components/general/navbar.component";
import SidebarV from "./components/general/sidebar.component";
import Addtransaction from "./components/transactions/addtransaction";
import Addvasooli from "./components/vasooli/addvasooli";

//Importing Pages
import DashboardV from "./pages/dashboard.page";
import ProfileV from "./pages/profile.page";
import TransactionsV from "./pages/transactions.page";
import VasooliV from "./pages/vasooli.page";
import LoginV from "./pages/login.page";
import SignupV from "./pages/signup.page";
import Notifpage from "./pages/notif.page";

//Firebase import
import fire from "./firebase/fire";
const mql = window.matchMedia(`(min-width: 800px)`);
const App = () => {
  const [dock, setdock] = useState(mql.matches);
  const [Sidebaropen, setSidebaropen] = useState(false);
  const [user, setuser] = useState({});
  const [Balance, setBalance] = useState(0);

  const [loggedin, setloggedin] = useState(false);

  const onSetSidebarOpen = (open) => {
    setSidebaropen(open);
  };
  const mediaQueryChanged = () => {
    setdock(mql.matches);
    setSidebaropen(false);
  };

  const show = () => {
    console.log(user);
  };

  const cleanuser = () => {
    setloggedin(false);
    setuser({});
  };

  useEffect(() => {
    //Sidebar logic
    mql.addListener(mediaQueryChanged);
    fire.auth().onAuthStateChanged(function (user) {
      if (user) {
        setuser(user);
        setloggedin(true);
        //        console.log(user);
        //Checkins for Balance Realtime
        fire
          .firestore()
          .collection("users")
          .doc(user.uid)
          .onSnapshot((snap) => {
            if (snap.data()) setBalance(snap.data().balance);
          });
      } else {
        console.log("NO user AUth Change");
      }
    });

    //Firebase User Checkin

    return () => {
      mql.removeListener(mediaQueryChanged);
    };
  }, []);

  // const btnClick = () => {
  //   console.log("Btn CLicked")
  //   setSidebaropen(true)
  // }

  return (
    <Router>
      <Sidebar
        sidebar={
          <SidebarV
            control={onSetSidebarOpen}
            user={user}
            cleanuser={cleanuser}
            loggedin={loggedin}
          />
        }
        open={Sidebaropen}
        docked={dock}
        touch={true}
        onSetOpen={onSetSidebarOpen}>
        <NavbarV onSetSidebarOpen={onSetSidebarOpen} balance={Balance} />
        {/*<button className='btn btn-info' onClick={show}>
          Show
  </button>*/}
        <div className='container p-3' style={{ marginBottom: "80px" }}>
          <Switch>
            {loggedin ? (
              <Fragment>
                <Route path='/dashboard' component={DashboardV} />

                <Route path='/addtransaction' component={Addtransaction} />
                <Route path='/addvasooli' component={Addvasooli} />
                <Route path='/notif' component={Notifpage} />
                <Route path='/transactions'>
                  <TransactionsV user={user} loggedin={loggedin} />
                </Route>
                <Route path='/vasooli' component={VasooliV} />
                <Route path='/profile' component={ProfileV} />
                <Redirect from='/' to='/dashboard' />
              </Fragment>
            ) : (
              <Fragment>
                <Route path='/dashboard'>
                  <Redirect from='/profile' to='/login' />
                </Route>
                <Route path='/addtransaction'>
                  <Redirect from='/addtransaction' to='/login' />
                </Route>
                <Route path='/addvasooli'>
                  <Redirect from='/addvasooli' to='/login' />
                </Route>
                <Route path='/vasooli'>
                  <Redirect from='/vasooli' to='/login' />
                </Route>
                <Route path='/transactions'>
                  <Redirect from='/transactions' to='/login' />
                </Route>
                <Route path='/notif'>
                  <Redirect from='/notif' to='/login' />
                </Route>
                <Route path='/profile'>
                  <Redirect from='/profile' to='/login' />
                </Route>
                <Route path='/login' component={LoginV} />
                <Route path='/signup' component={SignupV} />
                <Redirect from='/' to='/login' />
              </Fragment>
            )}
          </Switch>
        </div>

        <FooterV />
      </Sidebar>
    </Router>
  );
};

export default App;
