import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

import { auth } from "../firebase/firebase.init";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import axios from "axios";

const provider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);
  //create user
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  // create login
  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  //handle logout
  // singout
  const userLogOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  // update user
  const updateUser = (dataUpdat) => {
    setLoading(true);
    return updateProfile(auth.currentUser, dataUpdat);
  };

  // google login

  const googleLogin = () => {
    return signInWithPopup(auth, provider);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      if (currentUser?.email) {
        const userData = { email: currentUser.email };

        axios
          .post("http://localhost:3000/jwt", userData, {
            withCredentials: true,
          })
          .then((res) => {
            console.log("Token after jwt", res.data);
          })
          .catch((error) => console.log("something went wrong"));
      }
    });
    return () => {
      unSubscribe();
    };
  }, []);

  const userInfo = {
    user,
    setUser,
    createUser,
    loginUser,
    userLogOut,
    updateUser,
    setLoading,
    loading,
    googleLogin,
  };

  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
