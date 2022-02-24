import React, { useRef, useState } from "react";
import validator from "validator";

import Model from "../UI/Model";

import classes from "./Login.module.css";

const isEmail = (value) => validator.isEmail(value);
const isPassword = (value) => value.trim().length >= 8;

const Login = ({ onLogin }) => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const newemailInputRef = useRef();
  const newpasswordInputRef = useRef();
  const confirmpasswordInputRef = useRef();
  const nameInputRef = useRef();

  const [isRegister, setIsRegister] = useState(false);
  const [isLoginFailed, setIsLoginFailed] = useState(false);
  const [isUserAlreadyExists, setIsUserAlreadyExists] = useState(false);
  const [formInputValidity, setformInputValidity] = useState({
    email: true,
    password: true,
  });

  const [registerFormValidity, setRegisterFormValidity] = useState({
    name: true,
    email: true,
    password: true,
    confirmPassword: true,
  });

  const loginHandler = async (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    const enteredEmailIsValid = isEmail(enteredEmail);
    const enteredPasswordIsValid = isPassword(enteredPassword);

    setformInputValidity({
      email: enteredEmailIsValid,
      password: enteredPasswordIsValid,
    });

    const formIsVaild = enteredEmailIsValid && enteredPasswordIsValid;

    if (!formIsVaild) {
      return;
    }
    const userData = {
      email: enteredEmail,
      password: enteredPassword,
    };

    try {
      const response = await fetch(
        "https://cloud-kitchen-gk.herokuapp.com/api/user/login",
        {
          method: "POST",
          body: JSON.stringify(userData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 401) {
        setIsLoginFailed(true);
      }

      if (response.ok) {
        const data = await response.json();
        window.sessionStorage.setItem("accessToken", data.token);
        window.sessionStorage.setItem("isLogin", true);
        window.sessionStorage.setItem("userName", data.userName);
        onLogin();
      }
    } catch (err) {}
  };

  const RegisterHandler = async (event) => {
    event.preventDefault();
    const name = nameInputRef.current.value;
    const newEmail = newemailInputRef.current.value;
    const newpassword = newpasswordInputRef.current.value;
    const confirmPassword = confirmpasswordInputRef.current.value;

    const nameValid = name.length > 4;
    const newEmailValid = isEmail(newEmail);
    const newPasswordValid = isPassword(newpassword);
    const confirmPasswordValid = newpassword === confirmPassword;

    setRegisterFormValidity({
      name: nameValid,
      email: newEmailValid,
      password: newPasswordValid,
      confirmPassword: confirmPasswordValid,
    });

    const RegisterFormIsValid =
      nameValid && newEmailValid && newPasswordValid && confirmPasswordValid;

    if (!RegisterFormIsValid) return;

    const userData = {
      name: name,
      email: newEmail,
      password: newpassword,
      passwordConfirm: confirmPassword,
    };

    try {
      const response = await fetch(
        "https://cloud-kitchen-gk.herokuapp.com/api/user/signup",
        {
          method: "POST",
          body: JSON.stringify(userData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 403) {
        setIsUserAlreadyExists(true);
      }

      if (response.ok) {
        const data = await response.json();
        window.sessionStorage.setItem("accessToken", data.token);
        window.sessionStorage.setItem("isLogin", true);
        window.sessionStorage.setItem("userName", data.userName);
        onLogin();
      }
    } catch (err) {}
  };

  const LoginModel = (
    <form className={classes.form} onSubmit={loginHandler}>
      <div
        className={`${classes.control} ${
          formInputValidity.email ? "" : classes.invalid
        }`}
      >
        <label htmlFor="email">Email</label>
        <input type="text" id="email" ref={emailInputRef} />
        {!formInputValidity.email && <p>Please Enter A Valid Email!</p>}
      </div>

      <div
        className={`${classes.control} ${
          formInputValidity.password ? "" : classes.invalid
        }`}
      >
        <label htmlFor="password">Password</label>
        <input type="password" id="password" ref={passwordInputRef} />
        {!formInputValidity.password && <p>Please Enter A Valid Password!</p>}
        {isLoginFailed && (
          <p style={{ color: "red" }}>Invalid Email or Password</p>
        )}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={() => setIsRegister(true)}>
          New User
        </button>
        <button className={classes.submit}>Login</button>
      </div>
    </form>
  );

  const RegisterModel = (
    <form className={classes.form} onSubmit={RegisterHandler}>
      <div
        className={`${classes.control} ${
          registerFormValidity.email ? "" : classes.invalid
        }`}
      >
        <label htmlFor="newemail">Email</label>
        <input type="text" id="newemail" ref={newemailInputRef} />
        {!registerFormValidity.email && <p>Please Enter A Valid Email!</p>}
        {registerFormValidity.email && isUserAlreadyExists && (
          <p style={{ color: "red" }}>Email Already Exists</p>
        )}
      </div>

      <div
        className={`${classes.control} ${
          registerFormValidity.name ? "" : classes.invalid
        }`}
      >
        <label htmlFor="name">Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!registerFormValidity.name && <p>Enter a Valid Name</p>}
      </div>
      <div
        className={`${classes.control} ${
          registerFormValidity.password ? "" : classes.invalid
        }`}
      >
        <label htmlFor="newPassword">Password</label>
        <input type="password" id="newPassword" ref={newpasswordInputRef} />
        {!registerFormValidity.password && <p>Minimum 8 characters!</p>}
      </div>
      <div
        className={`${classes.control} ${
          registerFormValidity.confirmPassword ? "" : classes.invalid
        }`}
      >
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          ref={confirmpasswordInputRef}
        />
        {!registerFormValidity.confirmPassword && (
          <p>Passwords does not match!</p>
        )}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={() => setIsRegister(false)}>
          Already Have an Account
        </button>
        <button className={classes.submit}>Register</button>
      </div>
    </form>
  );

  return (
    <Model>
      {!isRegister && LoginModel}
      {isRegister && RegisterModel}
    </Model>
  );
};

export default Login;
