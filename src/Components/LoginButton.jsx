import React from "react";
import { Link } from "react-router-dom";

function LoginButton(props) {
  return (
    <Link onClick={props.onSubmit} className="login-button">
      Login
    </Link>
  );
}

export default LoginButton;
