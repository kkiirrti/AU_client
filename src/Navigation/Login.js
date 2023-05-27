import React from "react";
import "./style.css";
import { NavLink } from "react-router-dom";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import customAxios from "../axios";

import messages from '../constants/messages';

import "./login_css.css"

const Login = () => {

  const navigate = useNavigate();

  async function handleLoginSubmit(event) {

    event.preventDefault();

    try {

      const formTarget = event.target;
      const params = {
        email: formTarget.email.value,
        password: formTarget.password.value,
        reviewer_role: formTarget.role.value
      };

      const result = await customAxios.post('api/login/', params);

      if (result.response?.status === 401) {
        return alert(messages.invalidCredentials);
      }

      if (result.status === 200) {
        alert(messages.loginSuccessfully);
        return navigate('/usrgenerate');
      }

      alert(messages.somethingWentWrong);

    } catch (exception) {
      console.log(exception);
    }
  }

  // const handleLoginSubmit = event => {

  //   event.preventDefault();

  //   fetch('api/login/', {
  //     method: 'POST',
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({ "email": event.target.email.value, "password": event.target.password.value, 'reviewer_role': event.target.role.value })
  //   })
  //     .then(result => {
  //       if (result.status === 200) {
  //         alert("Login Successfully!");
  //         navigate('/usrgenerate');
  //       }
  //       else if (result.status === 201) {
  //         alert("Login Successfully!");
  //         navigate('/');
  //       }
  //       else if (result.status === 202) {
  //         alert("You are not a reviewer!");
  //         navigate('/login');
  //       }
  //       else if (result.status === 203) {
  //         alert("Login Successfully!");
  //         navigate('/usrgenerate');
  //       }
  //       else if (result.status === 401) {
  //         alert("Invalid credentials!");
  //       }
  //     })
  //     .then(result => console.log(JSON.stringify(result)))
  //     .catch(error => console.error(error));
  // }

  return (
    <div className="adcontent">
      <form onSubmit={handleLoginSubmit}>
        <div className="headname">
          <h1>LOGIN</h1>
        </div>
        <div className="field">
          <label for="email">Email</label>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <input type="text" name="email" id="email" required />
        </div>

        <div className="field">
          <label for="password">Password</label>
          <input type="password" name="password" id="password" />
        </div>

        <div className="radio">
          <input type="radio" id="a_role" name="role" value="author" />
          <label for="author">Author</label>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <input type="radio" id="r_role" name="role" value="reviewer" />
          <label for="reviewer">Reviewer</label>
        </div>

        <div className="adbutton">
          <input type="submit" value="LOG IN" />
        </div>
      </form>

      <p>
        Don't have any account?<NavLink to="/signup">SIGN UP</NavLink>
      </p>
      <br />
      <br />
    </div>
  );
};

export default Login;