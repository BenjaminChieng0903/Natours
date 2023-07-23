import { Routes, Route } from "react-router-dom";
import "./App.css";
import NavigationBar from "./components/routes/navigation/navigationBar";
import Home from "./components/routes/home/home";
import Signup from "./components/routes/authentication/signup";
import Login from "./components/routes/authentication/login";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<NavigationBar />}>
        <Route index element={<Home />}></Route>
        <Route path="signin" element={<Signup />}></Route>
        <Route path="login" element={<Login />}></Route>
      </Route>
    </Routes>
  );
};

export default App;
