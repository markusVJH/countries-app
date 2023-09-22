import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthState } from "react-firebase-hooks/auth"
import { auth, loginWithEmailAndPassword } from "../auth/firebase";
import { Button } from 'react-bootstrap';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (user) navigate('/countries')

  },[user, loading])

  return(
    <div>
      <input
      type= "email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      placeholder="Email"
      />
      <input
      type= "password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      placeholder="Password"
      />
      <Button onClick={() => loginWithEmailAndPassword}>Login</Button>
      <div>
        Don't have an account?
        <Link to="/register">Register</Link>
      </div>
    </div>
  )

};

export default Login;