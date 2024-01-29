import React, { useRef, useState } from "react";
import app from "../firebase/firebase.init";
import {
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import "./Logni.css";
import { Link } from "react-router-dom";

const Login = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const emailRef = useRef();

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
    setError("");
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const logged = result.user;
        console.log(logged);
        if (!logged.emailVerified) {
          alert("email vaified first!!");
          return;
        }
        setError("");
        setUser(logged);
      })
      .catch((error) => {
        setError(error.message);
      });
    event.target.email.value = "";
    event.target.password.value = "";
  };
  const handleResetPassword = (event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("please cheek you email");
      })
      .catch((error) => {
        setError(error.message);
      });
    console.log("reff email:", email);
  };

  return (
    <div>
      <div className='login-container'>
        <form onSubmit={handleLogin} className='login-form unique-login-form'>
          <h2 className='form-title'>Login</h2>
          <div className='form-group unique-form-group'>
            <label>Email:</label>
            <input
              type='text'
              id='username'
              name='email'
              ref={emailRef}
              required
            />
          </div>
          <div className='form-group unique-form-group'>
            <label>Password:</label>
            <input type='password' id='password' name='password' required />
          </div>
          <p>{error}</p>
          <input type='submit' className='submit-button' />
          <button onClick={handleResetPassword} className='submit-button form'>
            Reset Password
          </button>
          <p>
            Have'n You any Account ? <Link to='/register'>Register</Link>
          </p>
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
