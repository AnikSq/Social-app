import "./register.css";
import { useRef } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordConfirm = useRef();

  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordConfirm.current.value !== password.current.value) {
      return password.current.setCustomValidity("Passwords must match!");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        const res = await axios({
          method: "POST",
          url: "http://localhost:8000/api/auth/register",
          user,
        });
        if (res.username === username) console.log("success");
      } catch (err) {
        console.log(err, "Server Error");
      }
    }
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">FaceKon</h3>
          <span className="loginDesc">FaceKon, A Better Social Media App</span>
        </div>
        <div className="loginRight">
          <form className="registerBox" onSubmit={handleClick}>
            <input
              placeholder="Username"
              required
              ref={username}
              className="loginInput"
            />
            <input
              placeholder="Email"
              required
              ref={email}
              className="loginInput"
              type="email"
            />
            <input
              placeholder="Password"
              required
              ref={password}
              className="loginInput"
              type="password"
              minLength="8"
            />
            <input
              placeholder="Password Confirm"
              required
              ref={passwordConfirm}
              className="loginInput"
              type="password"
              minLength="8"
            />
            <button className="signup-signup">Sign Up</button>
            <Link to="/login">
              <button className="signup-login">Have an Account?</button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
