import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function Resetp() {
  const [error, setError] = useState('');
  const [utype, setUtype] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const form = event.target;
      const username = form.username.value;

      const response = await axios.get('http://159.223.208.160/ResetPwd.php', {
        params: {
          username
        }
      });

      const { data } = response;
      setUtype(data); // Assuming the server sends the response message directly, without nested objects

      setLoading(false); // Set loading state to false after the request is completed
    } catch (error) {
      console.error('Error submitting form:', error);
      setError('Error submitting form');
      setUtype('');
      setLoading(false); // Set loading state to false in case of an error
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div className="login-box" style={{ width: '350px' }}>
        <div className="card">
          <div className="card-body login-card-body">
            <br />
            <center>
              <img
                src="dist/img/faramoja.png"
                alt="AdminLTE Logo"
                className="brand-image elevation-3"
                style={{ opacity: '.8', width: '150px', height: 'auto' }}
              />
            </center>
            <br />
            <p className="login-box-msg">Reset password</p>

            <form onSubmitCapture={handleSubmit}>
              <div className="input-group mb-3">
                <input
                  type="email"
                  className="form-control"
                  name="username"
                  placeholder="Enter your email"
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-envelope" />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-4">
                  <button type="submit" name="submit" value="Submit" className="btn btn-primary btn-block">
                    Reset
                  </button>
                </div>
              </div>
            </form>

            <br />

            <p className="mb-1">
              <Link to="/Login">Back to login</Link>
            </p>

            <br />

            {loading ? <p>Sending...</p> : utype && <p className="mb-1">{utype}</p>}
            {error && <p className="mb-1">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
