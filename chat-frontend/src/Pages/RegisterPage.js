import React from "react";
import axios from "axios";
import {useHistory} from 'react-router-dom'
import makeToast from "../Toaster";

export default function RegisterPage() {
  const nameRef = React.createRef();
  const emailRef = React.createRef();
  const passwordRef = React.createRef();
  const history = useHistory()

  React.useEffect(() => { //This is for not going Login & Register for logined  user
    const token = localStorage.getItem("CC_Token");
    if (!token) history.push("/login")
    else history.push("/dashboard")
  }, [0]);

  const registerUser = (props) => {
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    axios
      .post("/user/register", { name, email, password })
      .then((response) => {
        console.log(response.data);
        makeToast("success", response.data.message);
        history.push("/login");
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
      <div className="cardHeader">Registration</div>
      <div className="cardBody">
        <div className="inputGroup">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="John Doe"
            ref={nameRef}
          />
        </div>
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
      <button onClick={registerUser}>Register</button>
    </div>
  );
}
