import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthState } from "react-firebase-hooks/auth"
import { auth, loginWithEmailAndPassword } from "../auth/firebase";
import { Button } from 'react-bootstrap';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (user) navigate('/countries')

  },[user, loading, navigate])

  return(
    <div className="container full-height pt-5 loggedout">
    <div className="row justify-content-center">
      <div className="col-md-4">
        <div className="card">
          <div className="card-body">
            <div>
              <form>
                <div style={{textAlign:'center'}}>
                  <h4>Countries App - Login</h4>
                  <div className="form-group mt-3">
                  <input
                  className="form-control mt-1"
                  type= "email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  />
                  </div>
                  <div className="form-group mt-3">
                  <input
                  className="form-control mt-1"
                  type= "password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  />
                  </div>
                  <div className="form-group mt-2">
                    <p>Don't have an account?  <Link to="/register">Register</Link></p>
                  </div>

                  <div className="d-grid gap-2 mt-3">
                  <Button variant='dark' onClick={() => loginWithEmailAndPassword(email, password)}>Login</Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )

};

export default Login;