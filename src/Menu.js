import React, { Component } from 'react'

import { Link } from 'react-router-dom';


export default class Menu extends Component {
  
  render() {

    
    
    return (
     
      
      <div className="wrapper" style={{ backgroundColor: '#4B5320' }}>
        {/* Main Sidebar Container */}
<aside className="main-sidebar sidebar-dark-primary elevation-4 " style={{ backgroundColor: '#454B1B' }}  >
  {/* Brand Logo */}
 
      
  {/* Sidebar */}
  <div className="sidebar" style={{ backgroundColor: '#454B1B' }}>
    <div className="user-panel mt-3 pb-3 mb-3 d-flex">
      <div className="image"> 
        <img src="dist/img/usersi.png" className="img-circle elevation-2" alt="User Image" />
      </div>
      <div className="info">
        <a href="#" className="d-block">Admin</a>
      </div>
    </div>
    {/* Sidebar Menu */}
    <nav className="mt-2">
      <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
        {/* Add icons to the links using the .nav-icon class
           with font-awesome or any other icon font library */}
          
       

        <li className="nav-item menu-open">
                  {/* Update the link to use the React Router's Link component */}
                  <Link to="/Dashboard" className="nav-link active">
                    <i className="nav-icon fas fa-tachometer-alt" />
                    <p>
                      Dashboard
                    </p>
                  </Link>
                </li>
                <li className="nav-item menu-open">
                  {/* Update the link to use the React Router's Link component */}
                 

                  <Link to="/Maps" className="nav-link">
                  <img src="dist/img/Monintor.png" alt="Monitoring" className="nav-icon" />
                  <p>Monitoring</p>
                </Link>

                </li> 

                <li className="nav-item menu-open">
                  {/* Update the link to use the React Router's Link component */}
                  <Link to="/Stakeholders" className="nav-link ">
                  <img src="dist/img/planning.png" alt="Planning" className="nav-icon" />
                    <p>
                      Planning
                    </p>
                  </Link>
                </li> 


                
                
                 <li className="nav-item menu-open">
                  {/* Update the link to use the React Router's Link component */}
                  <Link to="/Cars" className="nav-link ">
                  <img src="dist/img/viewplans.png" alt="plans" className="nav-icon" /> 
                    <p>
                      View Plans
                    </p>
                  </Link>
                </li>   <li className="nav-item menu-open">
                  {/* Update the link to use the React Router's Link component */}
                  <Link to="/Stations" className="nav-link ">
                  <img src="dist/img/analysis1.png" alt="Monitoring" className="nav-icon" /> 
                    <p>
                      Analysis
                    </p>
                  </Link>
                </li> 
                
                <li className="nav-item menu-open">
                  {/* Update the link to use the React Router's Link component */}
                  <Link to="/Stations" className="nav-link ">
                  <img src="dist/img/livevideo.png" alt="feeds" className="nav-icon" /> 
                    <p>
                      Video Feeds
                    </p>
                  </Link>
                </li> 

    


        
  


      </ul>
    </nav>
    {/* /.sidebar-menu */}
  </div>
  {/* /.sidebar */}
</aside>

      </div>

      
    )
  }
}
