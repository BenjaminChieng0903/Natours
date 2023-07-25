import { Routes, Route } from "react-router-dom";
import "./App.css";
import NavigationBar from "./components/routes/navigation/navigationBar";
import Home from "./components/routes/home/home";
import Signup from "./components/routes/authentication/signup";
import Login from "./components/routes/authentication/login";
import TourDetails from "./components/tourDetails/tourDetails";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<NavigationBar />}>
        <Route index element={<Home />}></Route>
        <Route path="signup" element={<Signup />}></Route>
        <Route path="login" element={<Login />}></Route>
        <Route path="details" element={<TourDetails />} />
      </Route>
    </Routes>
  );
};

export default App;
