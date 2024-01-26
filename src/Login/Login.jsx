import React, { useState } from "react";
import app from "../firebase/firebase.init";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

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
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h1>This is log in</h1>
      {user && (
        <div>
          <h1> Name:{user.displayName}</h1>
          <img src={user.photoURL} alt="" />
        </div>
      )}
      {user ? (
        <button onClick={handleSignOut}>Sign OUt</button>
      ) : (
        <button onClick={handleGoogle}> Google </button>
      )}
    </div>
  );
};

export default Login;