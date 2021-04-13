import React from 'react';
import { useState } from 'react'
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useMediaQuery, Drawer, Button, makeStyles } from '@material-ui/core'
import MenuIcon from "@material-ui/icons/Menu";
import './Nav.css';
import { useSelector } from 'react-redux';

function Nav() {
  const user = useSelector((store) => store.user);
  const shrink = useMediaQuery("(min-width: 1200px)")
  const [drawer, setDrawer] = useState(true);
  let loginLinkData = {
    path: '/login',
    text: 'Login / Register',
  };

  if (user.id != null) {
    loginLinkData.path = '/user';
    loginLinkData.text = 'Home';
  }
  const useStyles = makeStyles((theme) => ({
    drawerLink: {
      color: "white",
      backgroundColor: "#3f51b5",
      borderRadius: 0,
      padding: "20px  5px 20px 5px",
    },
    drawerPaper: {
      backgroundColor: "#FF0000"
    }
  }));
  const classes = useStyles()
  return (
    <div className="nav">
      <Link to="/home">
        <h2 className="nav-title">The Game Exchange</h2>
      </Link>
      {shrink ?
        <div>
          <Link className="navLink" to='/homepage'>
            {/* to={loginLinkData.path}> {loginLinkData.text} */}
        Home
        </Link>
          <Link className="navLink" to="/profile">
            Profile
        </Link>

          {/* {user.id && (
          <>
            <Link className="navLink" to="/info">
              Info Page
            </Link>
          </>
        )} */}
          <Link className="navLink" to="/wishlist">
            In Demand
        </Link>
          <Link className="navLink" to="/about">
            About
        </Link>
          <LogOutButton className="navLink" />

        </div>
        :
        <>
          <Button style={{ color: "white" }} onClick={() => !drawer ? setDrawer(true) : setDrawer(false)} >
            Menu
            <MenuIcon />
          </Button>
          <Drawer
            anchor="top"
            open={drawer}
            onClick={() => setDrawer(false)}
          >
             <Button
                  className={classes.drawerLink}
                  component={Link}
                  to="/homepage"
              >
                Home
              </Button>
              <Button
                  className={classes.drawerLink}
                  component={Link}
                  to="/profile"
              >
                Profile
              </Button>
              <Button
                  className={classes.drawerLink}
                  component={Link}
                  to="/about"
              >
                About
              </Button>
              <LogOutButton className="navLink" />
          </Drawer></>}
    </div>
  );
}

export default Nav;
