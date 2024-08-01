import React, { useEffect, useRef } from "react";
import LoginButton from "../Components/LoginButton";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { user, loginUser } = useAuth();
  const navigate = useNavigate();

  const loginForm = useRef(null);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const email = loginForm.current.email.value;
    const password = loginForm.current.pass.value;

    const userInfo = { email, password };
    loginUser(userInfo);

    console.log(userInfo);
  };

  return (
    <div className="login-card-wrapper">
      <div className="login-card">
        <form ref={loginForm}>
          <div className="input-area">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id=""
              placeholder="Enter your email"
            />
            <label htmlFor="password">Password</label>
            <input type="password" name="pass" id="" />
            <LoginButton onSubmit={handleSubmit} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
