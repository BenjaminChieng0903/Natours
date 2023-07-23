const Login = () => {
  return (
    <main class="main">
      <div class="login-form">
        <h2 class="heading-secondary ma-bt-lg">Log into your account</h2>
        <form class="form">
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
            />
          </div>
          <div class="form__group">
            <button class="btn btn--green">Login</button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Login;
