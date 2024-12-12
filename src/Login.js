import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


export default function Login() {
  const [error, setError] = useState('');
  const [utype, setUtype] = useState('');
  const [ownerid, setOwnerid] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const form = event.target;
      const username = form.username.value;
      const password = form.password.value;
    
      //const response = await axios.get('http://localhost/faramoja/API/Login.php', {
      const response = await axios.get('http://vicenterc-001-site35.etempurl.com/API/Login.php', {
        params: {
          username,
          password
        }
      });

      const { utype, ownerid } = response.data;
      console.log('Owner ID:', ownerid); // Check the value of ownerid before navigation

      if (utype === 'transport') {
        setUtype(utype);
        setError('');
        navigate('/Dashboard');
      } 
      
      else {
        setUtype('');
        setError('User not found');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setUtype('');
      setError('Error submitting form');
    }
  };

  return (
    <div style={{ backgroundColor: '#4B5320',display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>

      <div className="login-box" style={{ width: '350px' }}>
        <div className="card">
          <div className="card-body login-card-body">
            <br />
            <center>
             BAA(Battle Area Assessment System)
            </center>
            <br></br>
            <p className="login-box-msg">Sign in to start your session</p>
            <form onSubmitCapture={handleSubmit}>
              <div className="input-group mb-3">
                <input
                  type="email"
                  className="form-control"
                  name="username"
                  placeholder="Email"
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-envelope" />
                  </div>
                </div>
              </div>
              <div className="input-group mb-3">
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Password"
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock" />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-8">
                  <div className="icheck-primary">
                    <input type="checkbox" id="remember" />
                    <label htmlFor="remember">Remember Me</label>
                  </div>
                </div>
                <div className="col-4">
                  <button type="submit" name="submit" value="Submit" className="btn btn-primary btn-block">
                    Sign In
                  </button>
                </div>
              </div>
            </form>

            <br></br>

            <p className="mb-1">
              <Link to="/Resetp">
                Forget password
              </Link>
            </p>

            <p className="mb-1">{error}</p>
           
            {/* Render Fdashboard component if ownerid exists */}
          
          </div>
        </div>
      </div>
     
    </div>
  );
}

