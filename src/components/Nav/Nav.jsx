import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import {useSelector} from 'react-redux';

function Nav() {
  const user = useSelector((store) => store.user);

  let loginLinkData = {
    path: '/login',
    text: 'Login / Register',
  };

  if (user.id != null) {
    loginLinkData.path = '/user';
    loginLinkData.text = 'Home';
  }

  return (
    <div className="nav">
      <Link to="/home">
        <h2 className="nav-title">The Game Exchange</h2>
      </Link>
      <div>
        <Link className="navLink" to = '/homepage'> 
        {/* to={loginLinkData.path}> {loginLinkData.text} */}
        Home
        </Link>
        <Link className="navLink" to="/profile">
              Profile 
        </Link>

        {user.id && (
          <>
            <Link className="navLink" to="/info">
              Info Page
            </Link>
          </>
        )}
        <Link className="navLink" to="/wishlist">
          Wish List
        </Link>
        <Link className="navLink" to="/about">
          About
        </Link>
        <LogOutButton className="navLink" />
        
      </div>
    </div>
  );
}

export default Nav;
