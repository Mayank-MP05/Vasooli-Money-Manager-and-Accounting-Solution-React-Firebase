import React, { useState, useEffect } from "react";
import Sidebar from "react-sidebar";
import FooterV from "./footer.component";
import NavbarV from "./navbar.component";
import SidebarV from "./sidebar.component";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

//Importing Pages
import DashboardV from "./../../pages/dashboard.page";
import ProfileV from "./../../pages/profile.page";
import TransactionsV from "./../../pages/transactions.page";
import VasooliV from "./../../pages/vasooli.page";

const mql = window.matchMedia(`(min-width: 800px)`);
export default function Main() {
  const [dock, setdock] = useState(mql.matches);
  const [Sidebaropen, setSidebaropen] = useState(false);

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

  return (
    <Router>
      <Sidebar
        sidebar={<SidebarV />}
        open={Sidebaropen}
        docked={dock}
        touch={true}
        onSetOpen={onSetSidebarOpen}>
        <NavbarV />

        <div>
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
