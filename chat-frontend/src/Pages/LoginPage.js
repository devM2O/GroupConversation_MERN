import React from "react";
import {useHistory} from 'react-router-dom'
import makeToast from "../Toaster";
import axios from "axios";
import DontGo from "./DontGo";

export default function LoginPage(props) {
  const emailRef = React.createRef();
  const passwordRef = React.createRef();
  const history = useHistory()

  DontGo()  //This is for not going Login & Register for being logined user

  const loginUser = (props) => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    axios
      .post("/user/login", { email, password })
      .then((response) => {
        // console.log(response);
        makeToast("success", response.data.message);
        localStorage.setItem("Token", response.data.token);
        history.push("/dashboard");
      })
      .catch((err) => {
        // console.log(err);
        if (
          err &&
          err.response &&
          err.response.data &&
          err.response.data.message
        )
          makeToast("error", err.response.data.message);
      });
  };

  return (
    <div className="card">
      <div className="cardHeader">Login</div>
      <div className="cardBody">
        <div className="inputGroup">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="abc@example.com"
            ref={emailRef}
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Your Password"
            ref={passwordRef}
          />
        </div>
        <button onClick={loginUser}>Login</button>
      </div>
    </div>
  );
}
