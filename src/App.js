import React, { useState, useEffect ,Fragment } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useLocation
} from "react-router-dom";
//CSS imports 
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

//Components imports
import Sidebar from "react-sidebar";
import FooterV from "./components/general/footer.component";
import NavbarV from "./components/general/navbar.component";
import SidebarV from "./components/general/sidebar.component";

//Importing Pages
import DashboardV from "./pages/dashboard.page";
import ProfileV from "./pages/profile.page";
import TransactionsV from "./pages/transactions.page";
import VasooliV from "./pages/vasooli.page";

//Image import 
import icon from './assets/img/icon.png'

const mql = window.matchMedia(`(min-width: 800px)`);
const App = () => {
  const [dock, setdock] = useState(mql.matches);
  const [Sidebaropen, setSidebaropen] = useState(false);
  //const [loc, setloc] = useState()
  const onSetSidebarOpen = (open) => {
    setSidebaropen(open);
  };
  const mediaQueryChanged = () => {
    setdock(mql.matches);
    setSidebaropen(false);
  };
  useEffect(() => {
    mql.addListener(mediaQueryChanged);
    return () => {
      mql.removeListener(mediaQueryChanged);
    };
  });

  // const btnClick = () => {
  //   console.log("Btn CLicked")
  //   setSidebaropen(true)
  // }

  return (
    <Router>
      <Sidebar
        sidebar={<SidebarV control={onSetSidebarOpen}/>}
        open={Sidebaropen}
        docked={dock}
        touch={true}
        onSetOpen={onSetSidebarOpen}>
        {/* Navbar Top Start Here */}
      <nav className='navbar navbar-light bg-primary text-white'>
        <i className="fa fa-bars" style={{fontSize:"30px"}} onClick={() => setSidebaropen(true)}></i>
        <a className='navbar-brand text-white d-flex' href='#'>
          <h3 className="m-2">Vasooli</h3>
          <img
            src={icon}
            width='50'
            height='50'
            className='d-inline-block align-top'
            alt='Vasooli App Icon'
            style={{ borderRadius: "50%" }}
          />
        </a>
      </nav>
        {/* Navbar Top Ends Here */}

        <div className='container p-3' style={{marginBottom:"80px"}}>
          <Switch>
            <Route path='/dashboard'>
              <DashboardV />
            </Route>
            <Route path='/transactions'>
              <TransactionsV />
            </Route>
            <Route path='/vasooli'>
              <VasooliV />
            </Route>
            <Route path='/profile'>
              <ProfileV />
            </Route>
            <Redirect from='/' to='/dashboard' />
            <Route path='/'>
              <DashboardV />
            </Route>
          </Switch>
        </div>

        <FooterV />
      </Sidebar>
    </Router>
  );
}

export default App;
