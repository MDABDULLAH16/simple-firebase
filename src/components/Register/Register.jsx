import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import React, { useState } from "react";
import app from "../../firebase/firebase.init";

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
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type='email'
          name='email'
          id='email'
          placeholder='Enter Your Email'
        />
        <br />
        <input
          type='password'
          name='password'
          id='password'
          placeholder='Enter Your Password'
        />
        <br />
        <input type='submit' name='submit' id='submit' />
      </form>
      <p>
        {error}
        {success}
      </p>
    </div>
  );
};

export default Register;
