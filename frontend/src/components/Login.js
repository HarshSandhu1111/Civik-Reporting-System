import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import './Login.css'
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleSubmit(){

  }


  
  return (
    <div className="Login-container">
 <h2>Login</h2>
      <form onSubmit={handleSubmit}>

        <div className="form-group">
        <input
  type="email"
  id="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  placeholder="Enter your email"
  required
  pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
  title="Please enter a valid email address"
/>

        </div>

        <div className="form-group">
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>

       

        <button type="submit" id="btn2" > Submit</button>
      </form>

    </div>
  )
}

export default Login;