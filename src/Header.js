import React, { Component } from 'react'
import { Link } from 'react-router-dom';
export default class Header extends Component {

  
  render() {
    return (
      <div style={{ backgroundColor: '#454B1B' }}>
         

  {/* Navbar */}
  <nav className="main-header navbar navbar-expand navbar-dark" style={{ backgroundColor: '#454B1B' }}>
    {/* Left navbar links */}
    <ul className="navbar-nav">
      <li className="nav-item">
        <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars" /></a>
      </li>
     
      <li className="nav-item d-none d-sm-inline-block">
      <Link to="/Login" className="nav-link">
                   
                   <p>
                     Log Out
                   </p>
                 </Link>
      </li>
    </ul>
    {/* Right navbar links */}
    <ul className="navbar-nav ml-auto">
      {/* Navbar Search */}

      <li className="nav-item d-none d-sm-inline-block">
      <Link to="/Dashboard" className="nav-link">
                   
                   <p>
                     Alerts
                   </p>
                 </Link>
      </li>

      

      <li className="nav-item">
        <a className="nav-link" data-widget="navbar-search" href="#" role="button">
          <i className="fas fa-search" />
        </a>
        <div className="navbar-search-block">
          <form className="form-inline">
            <div className="input-group input-group-sm">
              <input className="form-control form-control-navbar" type="search" placeholder="Search" aria-label="Search" />
              <div className="input-group-append">
                <button className="btn btn-navbar" type="submit">
                  <i className="fas fa-search" />
                </button>
                <button className="btn btn-navbar" type="button" data-widget="navbar-search" >
                  <i className="fas fa-times" />
                </button>
              </div>
            </div>
          </form>
        </div>
      </li>
      {/* Messages Dropdown Menu */}
      {/* Notifications Dropdown Menu */}
      <li className="nav-item">
        <a className="nav-link" data-widget="fullscreen" href="#" role="button">
          <i className="fas fa-expand-arrows-alt" />
        </a>
      </li>
     
    </ul>
  </nav>
</div>

    )
  }
}
