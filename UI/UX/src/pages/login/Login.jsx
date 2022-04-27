import { useContext, useRef } from "react";
import "./login.css";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";

export default function Login() {
  const email = useRef();
  const password = useRef();
  const { user, isFetching, dispatch } = useContext(AuthContext);

  const handleOnClick = (e) => {
    // On summiting a form the page refreshes this will prevent that.
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
    console.log(user);
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">FaceKon</h3>
          <span className="loginDesc">FaceKon, A Better Social Media App</span>
        </div>
        <div className="loginRight" onSubmit={handleOnClick}>
          <form className="loginBox">
            <input
              placeholder="Email"
              type="email"
              required
              className="loginInput"
              ref={email}
            />
            <input
              placeholder="Password"
              className="loginInput"
              required
              minLength="8"
              type="password"
              ref={password}
            />
            <button className="loginButton" type="submit" disabled={isFetching}>
              {isFetching ? "Thinking.... 🤔" : "Log In"}
              {/*The circularProgress isn't a icon it's a component, that's why it's defined like this*/}
            </button>
            <span className="loginForgot">Forgot Password?</span>
            <Link to="/register">
              <button className="RegisterButton">
                {isFetching ? "Preparing.... 😃" : "Create a Account"}
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
