import React, { useState } from "react";
import app from "../firebase/firebase.init";
import {
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import "./Logni.css";

const Login = () => {
  const [user, setUser] = useState(null);

  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const handleGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const logged = result.user;
        setUser(logged);
        console.log(logged);
      })
      .catch((error) => {
        console.log(error);
      });

    console.log("google is clicked");
  };
  const githubProvider = new GithubAuthProvider();
  const handleGithub = () => {
    signInWithPopup(auth, githubProvider)
      .then((result) => {
        const logged = result.user;
        setUser(logged);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);

    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const logged = result.user;
        console.log(logged);
        setUser(logged);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <div className='login-container'>
        <form onSubmit={handleLogin} className='login-form unique-login-form'>
          <h2 className='form-title'>Login</h2>
          <div className='form-group unique-form-group'>
            <label>Email:</label>
            <input type='text' id='username' name='email' required />
          </div>
          <div className='form-group unique-form-group'>
            <label>Password:</label>
            <input type='password' id='password' name='password' required />
          </div>
          <input type='submit' className='submit-button' />
        </form>
      </div>
      {user && (
        <div>
          <h1> Name:{user.email}</h1>
          <img src={user.photoURL} alt='' />
        </div>
      )}
      {user ? (
        <button onClick={handleSignOut}>Sign OUt</button>
      ) : (
        <div>
          <button onClick={handleGoogle}> Google </button>
          <button onClick={handleGithub}>GitHub</button>
        </div>
      )}
    </div>
  );
};

export default Login;
