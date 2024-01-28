import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import React from "react";
import app from "../../firebase/firebase.init";

const auth = getAuth(app);
const Register = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
      })
      .catch((error) => {
        console.log(error);
      });
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
    </div>
  );
};

export default Register;
