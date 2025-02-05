import React, { useRef, useState } from "react";
import {  FaEyeSlash, FaEye } from "react-icons/fa";
// import { TbHexagon3D } from "react-icons/tb";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css"

const Login = () => {
  const open_eye = useRef(null);
  const close_eye = useRef(null);
  const navigate = useNavigate(); 

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordType, setPasswordType] = useState(true);
  const [formType, setFormType] = useState(true); 

  const API_BASE_URL = `https://ezystay-backend.onrender.com/auth`; 

  const formTypeToggle = () => {
    setFormType((prev) => !prev);
  };

  const passwordTypeChange = () => {
    setPasswordType((prev) => !prev);
    if (open_eye.current && close_eye.current) {
      if (passwordType) {
        open_eye.current.style.display = "none";
        close_eye.current.style.display = "block";
      } else {
        open_eye.current.style.display = "block";
        close_eye.current.style.display = "none";
      }
    }
  };

 
  const handleSignin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/signin`, {
        email,
        password,
      });
      const { token, name } = response.data; // Fetch username from the response
      localStorage.setItem("token", token); // Store JWT token for authentication
      localStorage.setItem("username", name); 
      localStorage.setItem("useremail", email);// Store username
      alert("Signin successful!");
      navigate("/Home"); // Redirect to /Home route
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const errorMessage = error.response.data.message;
        if (errorMessage === "User not found") {
          alert("Error: The email address you entered is not registered.");
        } else if (errorMessage === "Incorrect password") {
          alert("Error: The password you entered is incorrect.");
        } else {
          alert(`Error: ${errorMessage}`);
        }
      } else {
        console.error("Signin error:", error.message);
        alert("An unexpected error occurred. Please try again.");
      }
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/signup`, {
        name,
        email,
        password,
      });
      alert("Signup successful! You can now log in.");
      
      formTypeToggle(); 
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert(`Error: ${error.response.data.message}`);
      } else {
        console.error("Signup error:", error.message);
        alert("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="Login">
      {formType ? (
        <form className="login-form" onSubmit={handleSignin}>
          <div
            className="title login_title"
            style={{ color: "black"}}
          >
            <h1 className="login_h1">
            EzyStay
            </h1>
            <p>Sign in to begin your journey</p>
          </div>
          <input
            type="text"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="login-input"
          />
          <span className="login_password_span">
            <input
              type={passwordType ? "password" : "text"}
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login_password_input"
            />
            <FaEye
              ref={open_eye}
              onClick={passwordTypeChange}
              className="login-eye"
              style={{ display: passwordType ? "block" : "none" }}
            />
            <FaEyeSlash
              ref={close_eye}
              onClick={passwordTypeChange}
              className="login-eye"
              style={{ display: passwordType ? "none" : "block" }}
            />
          </span>
          <button className="login-button" type="submit">
            Sign in
          </button>
          <div className="form_change_div">
            <p>
              Don't have an account?&nbsp;
              <button type="button" className="register" onClick={formTypeToggle}>
                REGISTER
              </button>
            </p>
          </div>
        </form>
      ) : (
        <form className="login-form" onSubmit={handleSignup}>
          <div
            className="title login_title"
            style={{color: "black" }}
          >
            <h1  className="login_h1">
            EzyStay
            </h1>
            <p>Sign in to begin your journey</p>
          </div>
          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="login-input"
          />
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="login-input"
          />
          <span className="login_password_span">
            <input
              type={passwordType ? "password" : "text"}
              placeholder="Enter New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login_password_input"
            />
            <FaEye
              ref={open_eye}
              onClick={passwordTypeChange}
              className="login-eye"
              style={{ display: passwordType ? "block" : "none" }}
            />
            <FaEyeSlash
              ref={close_eye}
              onClick={passwordTypeChange}
              className="login-eye"
              style={{ display: passwordType ? "none" : "block" }}
            />
          </span>
          <button className="login-button" type="submit">
            Sign up
          </button>
          <div className="form_change_div">
            <p className="change_p">
              Already have an account?&nbsp;
              <button className="register" onClick={formTypeToggle}>
                LOG IN
              </button>
            </p>
          </div>
        </form>
      )}
    </div>
  );
};

export default Login;
