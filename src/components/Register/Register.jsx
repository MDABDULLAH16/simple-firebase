import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
} from "firebase/auth";
import React, { useState } from "react";
import app from "../../firebase/firebase.init";
import { Link } from "react-router-dom";

const auth = getAuth(app);
const Register = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    const email = event.target.email.value;
    const password = event.target.password.value;
    // Check if email or password is empty
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    // Password validation regex
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (!passwordRegex.test(password)) {
      setError(
        "Password must contain at least one capital letter and one number, and be at least 8 characters long."
      );
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const loggedUser = result.user;
        sendVarificationEmail(result.user);
        console.log(loggedUser);
        setSuccess("User Register Done");
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
      });
    event.target.email.value = "";
    event.target.password.value = "";
  };
  const sendVarificationEmail = (email) => {
    sendEmailVerification(email)
      .then((result) => {
        console.log(result);
        alert("verify your email");
      })
      .catch((error) => {
        setError(error.message);
      });
  };
  return (
    <div>
      <div className='login-container'>
        <form onSubmit={handleSubmit} className='login-form unique-login-form'>
          <h2 className='form-title'>Register</h2>
          <div className='form-group unique-form-group'>
            <label>Email:</label>
            <input type='text' id='username' name='email' required />
          </div>
          <div className='form-group unique-form-group'>
            <label>Password:</label>
            <input type='password' id='password' name='password' required />
          </div>
          <input type='submit' className='submit-button' />
          <p>
            Have you Account already? <Link to='/login'>Login</Link>{" "}
          </p>
        </form>
      </div>

      <p>
        {error}
        {success}
      </p>
    </div>
  );
};

export default Register;
