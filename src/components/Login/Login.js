import React, { Fragment, useContext, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { UserContext } from '../../App';
import './Login.css';
import Navbar from '../Shared/Navbar/Navbar';

import firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from './firebase.config';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

const Login = () => {
  // Use History Hook
  const history = useHistory();
  // Use Location Hook
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };

  // Getting data from parent component
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  // This useState stored users data
  const [user, setUser] = useState({
    error: ''
  });
  // Destructuring from user useState
  const {error} = user;

  
  const handleGoogleSignIn = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();

    // Created a function for simplicity
    firebaseAuth(googleProvider);
  }

  // Firebase Authentication Function
  const firebaseAuth = (providers) => {
    firebase
    .auth()
    .signInWithPopup(providers)
    .then((result) => {
      const getUser = result.user;
      const {displayName, photoURL, email} = getUser;
      const signedInUser = {name: displayName, photo: photoURL, email};
      setLoggedInUser(signedInUser);
      history.replace(from);
    }).catch((error) => {
      const errorMessage = error.message;
      const newUserInfo = {...user};
      newUserInfo.error = errorMessage;
      setUser(newUserInfo);
    });
  }
  
  console.log(loggedInUser);
  return (
    <Fragment>
      <Navbar />

      <div className="container">
        <div className="m-3 border rounded border-color">
          <div className="p-5">
            <div className="div-input">
              <div className="login-brand-icon d-flex justify-content-center">
                <Link className="navbar-brand" to="/">NIXIN Calender</Link>
              </div>
              <div className="text-center text-blue pt-5"><h3>Login</h3></div>
            </div>
          </div>

          {/* Show error messages */}
          <p className="text-center text-danger">{error}</p>
          {/* Show error messages */}
          
          <div className="d-flex justify-content-center my-3 pb-5">
            <div className="rounded-pill google-box" onClick={handleGoogleSignIn}>
              <div className="p-2 d-flex align-items-center">
                <div className="d-inline-block rounded-circle icon-style google-icon">
                  <FontAwesomeIcon icon={faGoogle}></FontAwesomeIcon>
                </div>
                <div className="d-inline-block mx-3 px-3 text-size google-text">Continue with Google</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;