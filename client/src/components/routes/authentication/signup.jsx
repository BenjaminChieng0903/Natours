import { useEffect, useState } from "react";
import AxiosApi from "../../../axiosApi/api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../../store/user/user.action";
const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const signUp = async (e) => {
    e.preventDefault();
    await AxiosApi.post("/users", {
      name,
      email,
      password,
      passwordConfirm,
    })
      .then((res) => {
        console.log(res.data.data.user);
        const { role, name, email, photo } = res.data.data.user;
        dispatch(setCurrentUser({ role, name, email, photo }));
        navigate("/");
      })
      .catch((err) => console.log(err));
  };
  // useEffect(() => {}, [email, password, passwordConfirm]);
  return (
    <main class="main">
      <div class="login-form">
        <h2 class="heading-secondary ma-bt-lg">CREATE YOUR ACCOUNT</h2>
        <form class="form">
          <div class="form__group">
            <label class="form__label" for="name">
              Name
            </label>
            <input
              class="form__input"
              id="name"
              type="name"
              placeholder="Your Name"
              required="required"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div class="form__group">
            <label class="form__label" for="email">
              Email address
            </label>
            <input
              class="form__input"
              id="email"
              type="email"
              placeholder="you@example.com"
              required="required"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div class="form__group ma-bt-md">
            <label class="form__label" for="password">
              Password
            </label>
            <input
              class="form__input"
              id="password"
              type="password"
              placeholder="••••••••"
              required="required"
              minlength="8"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div class="form__group ma-bt-md">
            <label class="form__label" for="password">
              PasswordConfirm
            </label>
            <input
              class="form__input"
              id="password"
              type="password"
              placeholder="••••••••"
              required="required"
              minlength="8"
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
          </div>
          <div class="form__group">
            <button class="btn btn--green" onClick={signUp}>
              SIGNUP
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Signup;
