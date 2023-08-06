import { useEffect, useState } from "react";
import AxiosApi from "./../../../axiosApi/api";
import "./login.css";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../../store/user/user.action";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  let [errMessage, setErrMessage] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const login = async (e) => {
    e.preventDefault();
    console.log(email, password);
    await AxiosApi.post("/users/login", {
      email,
      password,
    })
      .then((res) => {
        const { role, name, email, photo } = res.data.user;

        alert("login successfully");
        dispatch(setCurrentUser({ role, name, email, photo }));
        navigate("/");
      })
      .catch((err) => {
        console.log(err.response.data);
        setErrMessage(err.response.data.message);
      });
  };
  useEffect(() => {
    console.log("errMessage:" + errMessage + typeof errMessage);
    if (errMessage !== null)
      document.getElementById("errMessage").style.display = "inline-block";

    setTimeout(() => {
      document.getElementById("errMessage").style.display = "none";
      setErrMessage(null);
    }, 2000);
  }, [errMessage]);
  return (
    <main className="main">
      <div className="login-form">
        <h2 className="heading-secondary ma-bt-lg">Log into your account</h2>
        <form className="form">
          <div className="form__group">
            <label className="form__label" for="email">
              Email address
            </label>
            <input
              className="form__input"
              id="email"
              type="email"
              placeholder="you@example.com"
              required="required"
              autoComplete="off"
              onChange={(e) => {
                setEmailAddress(e.target.value);
              }}
            />
          </div>
          <div className="form__group ma-bt-md">
            <label className="form__label" for="password">
              Password
            </label>
            <input
              className="form__input"
              id="password"
              type="password"
              placeholder="••••••••"
              required="required"
              minlength="8"
              autoComplete="off"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div className="form__group">
            <button className="btn btn--green" onClick={login}>
              Login
            </button>
            <p className="errMessage" id="errMessage">
              {errMessage}
            </p>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Login;
