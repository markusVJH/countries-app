import React, { useEffect, useState } from 'react';
import { useAuthState } from "react-firebase-hooks/auth"
import { Link, useNavigate } from 'react-router-dom';
import { auth, registerWithEmailAndPassword } from "../auth/firebase";
import { Button } from 'react-bootstrap';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  const register = () => {
    if(!name) alert("Enter name please")
    registerWithEmailAndPassword(name, email, password)
  }

  useEffect(() => {
    if (loading) return;
    if (user) navigate('/countries')

  },[user, loading, navigate])

  return (
    <div className="container mt-5 full-height">
    <div className="row justify-content-center">
      <div className="col-md-4">
        <div className="card">
          <div className="card-body">
            <div>
              <form>
                <div style={{textAlign:'center'}}>
                  <h4>Countries App - Register</h4>
                  <div className="form-group mt-3">
                  <input
                  className="form-control mt-1"
                  type= "text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full name"
                  />
                  </div>
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
                  <p>Already have an account? <Link to="/login">Login</Link></p>
                  </div>

                  <div className="d-grid gap-2 mt-3">
                  <Button variant='dark'onClick={register}>Register</Button>
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

export default Register;