import React, { useContext } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

// import Navbar from "./components/layout/Navbar";
import AuthContext from "./context/AuthContext";
// import Navbar from "./components/layout/newNavbar";
import Navbar from "./components/layout/Navbar/Navbar";

//import Home from "./components/home/home";
import Home from "./components/home/Home";
import Profile from "./components/User/profile";

import Dashboard from "./components/dashboard/Dashboard";

import Footer from "./components/Footer/footer";

import Mystocks from "./components/mystocks/Mystocks";
import Myprofile from "./components/profile/Myprofile";

function Router() {
  const { loggedIn } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
     
        {loggedIn === false && (
          <>
            <Route exact path="/">
              <Dashboard />
            </Route>
            <Route exact path="/register">
              <Register />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
          </>
        )}
        {loggedIn === true && (
          <>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/profile">
            <Myprofile />
            
            </Route>
            <Route exact path="/mystocks">
            <Mystocks />
            </Route>
            <Route exact path="/register">
              <Register />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Footer />
          </>
        )}
      </Switch>
      
    </BrowserRouter>
  );
}

export default Router;
