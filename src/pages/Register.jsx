import { Link } from "react-router-dom";
import { useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const registerForm = useRef(null);
  const navigate = useNavigate();

  const { registerUser, user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault;
    const name = registerForm.current.name.value;
    const email = registerForm.current.email.value;
    const pass1 = registerForm.current.password1.value;
    const pass2 = registerForm.current.password2.value;

    if (pass2 != pass1) {
      alert("passwords do not match!");
    }

    const userInfo = { name, email, pass1, pass2 };

    registerUser(userInfo);
  };

  return (
    <div className="register-card-wrapper">
      <div className="register-card">
        <form ref={registerForm} onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="name">Name:</label>
            <input type="text" name="name" id="" />
          </div>
          <div className="form-field">
            <label htmlFor="name">Email:</label>
            <input type="email" name="email" id="" />
          </div>
          <div className="form-field">
            <label htmlFor="name">Password:</label>
            <input type="password" name="password1" id="" />
          </div>
          <div className="form-field">
            <label htmlFor="name">Confirm Password:</label>
            <input type="password" name="password2" id="" />
          </div>
          <div className="form-btn">
            <input type="submit" value="Register" />
          </div>
        </form>

        <span>
          Already have an account? <Link to={"/login"}>login</Link>
        </span>
      </div>
    </div>
  );
};

export default Register;
