import React, { useState, useContext, useEffect } from 'react';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams, useHistory } from 'react-router-dom';
import axios from "axios";
import AuthContext from "../../../context/AuthContext";

function Navbar() {
  const history = useHistory();
  const [click, setClick] = useState(false);
  const { loggedIn } = useContext(AuthContext);
  const { getLoggedIn} = useContext(AuthContext);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const logoutHandler = async (e) => {
    console.log("Log out request");
    try {
      const res = await axios.get(`http://localhost:5000/auth/logout`);
      toast.success(res.data);
      await getLoggedIn();
     
      closeMobileMenu();
      history.push(`/register`);
    }
    catch (err) {
      console.log(err);
    }
  }
  return (
    <>
      <nav className='navbar'>
        <Link to='/login' className='navbar-logo' onClick={closeMobileMenu}>
          Pape trade
        </Link>
        <div className='menu-icon' onClick={handleClick}>
          <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
        </div>
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>

        {loggedIn === false && (

                    <>
                    <li className='nav-item'>
                    <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                    Home
                    </Link>
                    </li>

                    <li className='nav-item'>
                    <Link
                    to='/login'
                    className='nav-links'
                    onClick={closeMobileMenu}>
                    Login
                    </Link>
                    </li>

                    <li className='nav-item'>
                    <Link
                    to='/register'
                    className='nav-links'
                    onClick={closeMobileMenu}>
                    Register
                    </Link>
                    </li>
                    
                    </>

                    )}


            {loggedIn === true && (

                  <>
                  <li className='nav-item'>
                    <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                      Home
                    </Link>
                  </li>

                  <li className='nav-item'>
                    <Link
                      to='/mystocks'
                      className='nav-links'
                      onClick={closeMobileMenu}>
                      My Stocks
                    </Link>
                  </li>

                  <li className='nav-item'>
                    <Link
                      to='/profile'
                      className='nav-links'
                      onClick={closeMobileMenu}>
                      Profile
                    </Link>
                  </li>

                
                  <li className='nav-item'>
                  <Link
                    //to='/register'
                    className='nav-links'
                    onClick={logoutHandler}>
                    Logout
                    </Link>
                  </li>
                  </>

              )}
          
           
              {/* <li>
            {loggedIn === true && (
            <Link
              to='register'
              className='nav-links-mobile'
              onClick={logoutHandler}
            >
              Logout
            </Link>
             )}
          </li> */}
        </ul>
        {/* <Button /> */}
      </nav>
    </>
  );
}

export default Navbar;
