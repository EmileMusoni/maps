import React, { Component } from 'react'
import { Link } from 'react-router-dom';

import axios from 'axios';
import MapComponent from './MapComponent';

import FarmMap from './Maps';

export default class Dashboard extends Component {
    state = {
      totalFarmers: 0,
      totalFarms: 0,
      totalStakeholders: 0,
      totalActiveFarms: 0,
      farmLocations: [],
    };
  
    componentDidMount() {
      this.fetchData();
    }
  
    fetchData = () => {
      axios
        .get('http://vicenterc-001-site35.etempurl.com/API/D_totals.php')
        .then(response => {
          const {
            totalFarmers,
            totalFarms,
            totalStakeholders,
            totalActiveFarms
           // farmLocations,
          } = response.data;
  
          this.setState({
            totalFarmers: parseInt(totalFarmers),
            totalFarms: parseInt(totalFarms),
            totalStakeholders: parseInt(totalStakeholders),
            totalActiveFarms: parseInt(totalActiveFarms)
           // farmLocations: farmLocations,
          });
        })
        .catch(error => {
          console.error('Error:', error);
        });
    };
  
    render() {
      const {
        totalFarmers,
        totalFarms,
        totalStakeholders,
        totalActiveFarms
       // farmLocations,
      } = this.state;
  
      


    return (
      <div >
       {/* Content Wrapper. Contains page content */}
<div className="content-wrapper" >
  {/* Content Header (Page header) */}
  <div className="content-header">
    <div className="container-fluid">
      <div className="row mb-2">
        <div className="col-sm-6">
          <h1 className="m-0">BAA(Battle Area Assessment) System</h1>
        </div>{/* /.col 
        <div className="col-sm-6">
          <ol className="breadcrumb float-sm-right">
          
            
            <Link to="/Login" className="breadcrumb-item">
                   
                    <p>
                      Log Out
                    </p>
                  </Link>

          </ol>
        </div> */}
        {/* /.col */}
      </div>{/* /.row */}
    </div>{/* /.container-fluid */}
  </div>
  {/* /.content-header */}
  {/* Main content */}
  <section className="content">
    <div className="container-fluid">
      {/* Info boxes */}
      <div className="row">
        <div className="col-12 col-sm-6 col-md-3">
          <div className="info-box">
           
            <div className="info-box-content">
          
                                  <table>
                                    <tbody>
                                      <tr>
                                        <td>
                                          <img
                                            src="dist/img/carss.png"
                                            alt="location"
                                            height={60}
                                            width={60}
                                          />
                                        </td>
                                        <td>
                                          Active Devices
                                          <span className="info-box-number">
                                  {totalFarmers}
                            
                                  </span>
                                        </td>
                                      </tr>
                                    </tbody>
                                    
                                  </table>
                               
            </div>
            {/* /.info-box-content */}
          </div>
          {/* /.info-box */}
        </div>
        {/* /.col */}
        <div className="col-12 col-sm-6 col-md-3">
          <div className="info-box mb-3">
            <div className="info-box-content">
          
                                  <table>
                                    <tbody>
                                      <tr>
                                        <td>
                                          <img
                                            src="dist/img/companies.png" 
                                            alt="location"
                                            height={60}
                                            width={60}
                                          />
                                        </td>
                                        <td>
                                        Incidents Alerts
                                          <span className="info-box-number">
                                  {totalFarms}
                                  </span>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>     
            </div>
            {/* /.info-box-content */}
          </div>
          {/* /.info-box */}
        </div>
        {/* /.col */}
        {/* fix for small devices only */}
        <div className="clearfix hidden-md-up" />

        <div className="col-12 col-sm-6 col-md-3">
          <div className="info-box mb-3">
            <div className="info-box-content">
          <table>
            <tbody>
              <tr>
                <td>
                  <img
                    src="dist/img/stationss.png" 
                    alt="location"
                    height={60}
                    width={60}
                  />
                </td>
                <td>
                Total Stations
                  <span className="info-box-number">
          {totalStakeholders}
          </span>
                </td>
              </tr>
            </tbody>
          </table>
       
          </div>
            {/* /.info-box-content */}
          </div>
          {/* /.info-box */}
        </div>
        {/* /.col */}
        <div className="col-12 col-sm-6 col-md-3">
          <div className="info-box mb-3">
            <div className="info-box-content">
          <table>
            <tbody>
              <tr>
                <td>
                  <img
                    src="dist/img/acticecars.png" 
                    alt="location"
                    height={60}
                    width={60}
                  />
                </td>
                <td>
                Active Cars
                  <span className="info-box-number">
          {totalActiveFarms}
          </span>
                </td>
              </tr>
            </tbody>
          </table>
       
          </div>
            {/* /.info-box-content */}
          </div>
          {/* /.info-box */}
        </div>
        {/* /.col */}
      </div>
      {/* /.row */}
      <div className="row">
        <div className="col-md-12">
         
          <div className="card">
            <div className="card-header">
              <h5>  Location Monitoring on map </h5> 
             
            </div>
            {/* /.card-header */}
            {/* ./card-body */}
            {/* /.card-footer */}
          </div>
          {/* /.card */}
        </div>
        {/* /.card */}
      </div>
      {/* /.col */}
    </div>
    {/* /.row */}
    {/* /.row */}
  </section></div>{/*/. container-fluid */}
{/* /.content */}
{/* /.content-wrapper */}

      </div>
    )
  }
}
