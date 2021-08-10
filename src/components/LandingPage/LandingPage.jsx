import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';
import { useMediaQuery } from '@material-ui/core'
// CUSTOM COMPONENTS
//import RegisterForm from '../RegisterForm/RegisterForm';
import LoginForm from '../LoginForm/LoginForm'

function LandingPage() {
  
  const shrink = useMediaQuery("(min-width: 1200px)")
  const history = useHistory();

  const onLogin = (event) => {
    history.push('/registration');
  };

  return (
    <div className="container">


      <div className="grid">
        <div className= {shrink?"grid-col grid-col_8" : "mobileWelcomeText"}>
          <h2>Welcome To The Game Exchange!</h2>
          {/* ¡!¡! THIS STILL NEEDS A TON OF WORK ¡!¡!*/}
          <p>
            Here at The Game Exchange, we know that regardless of how much you treasure your game collection,
            there's always some outliers that you just dont play anymore. Maybe you've even set aside a dark corner
            of closet to store such games, and have forget what all is back there.
          </p>

          <p>
            We would like to provide a platform to not only catalog all your games, but also get excess games out of your closet,
            and exchange them for games you'll get more playtime out of.
          </p>

          <p>
            If you do not have an account, please click the "Create Account" button to get started. Please keep in mind that the email you register with will be
            the email given to other users to contanct you. Once you've created an account, you can navigate to the homepage. Here you will find a list all the games users
            are willing to trade away. On the In Demand page, you will find a list of all the games users would like to recive in a trade.
            If you would like to add games to you collection, and your wishlist navigate to "My Profile". here you will find buttons to add games to you collection and wishlist. If a game
            is marked tradeable, users will see your game on the homepage.
            To mark a game as "tradeable", simply click the edit button in your collection section. This will allow you to mark the game as tradeable, as well as edit the games description.
           
          </p>
        </div>
        <div className={ shrink ? "grid-col grid-col_4" : "mobileLoginForm"}>
          {/* <RegisterForm /> */}
          <LoginForm />
          <center>
            <h4>Don't Have An Account?</h4>
            <button className="btn btn_sizeSm" onClick={onLogin}>
              Create Account
            </button>
          </center>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
