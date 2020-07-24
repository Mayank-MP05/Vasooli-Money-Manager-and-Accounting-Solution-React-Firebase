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
  const [dp, setdp] = useState(0);
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
        setdp(parseInt(user.photoURL));
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
        //console.log("NO user AUth Change");
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
            dp={dp}
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
            <Route path='/dashboard'>
              {loggedin ? (
                <Route path='/dashboard' component={DashboardV} />
              ) : (
                <Redirect from='/dashboard' to='/login' />
              )}
            </Route>
            <Route path='/addtransaction'>
              {loggedin ? (
                <Route path='/addtransaction' component={Addtransaction} />
              ) : (
                <Redirect from='/addtransaction' to='/login' />
              )}
            </Route>
            <Route path='/addvasooli'>
              {loggedin ? (
                <Route path='/addvasooli' component={Addvasooli} />
              ) : (
                <Redirect from='/addvasooli' to='/login' />
              )}
            </Route>
            <Route path='/notif'>
              {loggedin ? (
                <Route path='/notif' component={Notifpage} />
              ) : (
                <Redirect from='/notif' to='/login' />
              )}
            </Route>
            <Route path='/transactions'>
              {loggedin ? (
                <Route path='/transactions' component={TransactionsV} />
              ) : (
                <Redirect from='/transactions' to='/login' />
              )}
            </Route>
            <Route path='/vasooli'>
              {loggedin ? (
                <Route path='/vasooli' component={VasooliV} />
              ) : (
                <Redirect from='/vasooli' to='/login' />
              )}
            </Route>
            <Route path='/profile'>
              {loggedin ? (
                <Route path='/profile' component={ProfileV} />
              ) : (
                <Redirect from='/profile' to='/login' />
              )}
            </Route>
            <Route path='/login'>
              {!loggedin ? (
                <Route path='/login' component={LoginV} />
              ) : (
                <Redirect from='/login' to='/dashboard' />
              )}
            </Route>
            <Route path='/signup'>
              {!loggedin ? (
                <SignupV setdp={setdp} />
              ) : (
                <Redirect from='/signup' to='/dashboard' />
              )}
            </Route>
            <Route path='/'>
              {loggedin ? (
                <Redirect from='/' to='/dashboard' />
              ) : (
                <Redirect from='/' to='/login' />
              )}
            </Route>
          </Switch>
        </div>

        <FooterV />
      </Sidebar>
    </Router>
  );
};

export default App;
