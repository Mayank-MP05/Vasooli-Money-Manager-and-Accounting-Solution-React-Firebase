import React, { useState, useEffect } from "react";
import Sidebar from "react-sidebar";
import FooterV from "./footer.component";
import NavbarV from "./navbar.component";
import SidebarV from "./sidebar.component";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

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
        <button
          className='btn btn-success'
          onClick={() => onSetSidebarOpen(true)}>
          Call
        </button>
        <NavbarV />

        <div>
          <nav>
            <ul>
              <li>
                <Link to='/'>Home</Link>
              </li>
              <li>
                <Link to='/about'>About</Link>
              </li>
              <li>
                <Link to='/users'>Users</Link>
              </li>
            </ul>
          </nav>

          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route path='/about'>
              <About />
            </Route>
            <Route path='/users'>
              <Users />
            </Route>
            <Route path='/'>
              <Home />
            </Route>

            {/* Actual Paths of the Vasooli app */}
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
          </Switch>
        </div>

        <FooterV />
      </Sidebar>
    </Router>
  );
}
function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}
