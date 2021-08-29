import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">NIXIN Calender</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav justify-content-end w-100">
            <a className="nav-link" href="/">Home</a>
            <Link className="nav-link" to="/create-new-calendar">Create new calendar</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;