import { Routes, Route, Router } from "react-router-dom";
import "./App.css";
import NavigationBar from "./components/routes/navigation/navigationBar";
import Home from "./components/routes/home/home";
import Signup from "./components/routes/authentication/signup";
import Login from "./components/routes/authentication/login";
import TourDetails from "./components/tourDetails/tourDetails";
import AccountDetails from "./components/account/accountDetails";
import MyBooking from "./components/account/myBooking";
import CustomerReview from "./components/customerReview/customerReview";
import MyReivew from "./components/account/myReview";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<NavigationBar />}>
        <Route index element={<Home />}></Route>
        <Route path="signup" element={<Signup />}></Route>
        <Route path="login" element={<Login />}></Route>
        <Route path="account" element={<AccountDetails />}></Route>
        <Route path="users">
          <Route path="mybooking" element={<MyBooking />} />
          <Route path="customerReview" element={<CustomerReview />} />
          <Route path="myReview" element={<MyReivew />}></Route>
        </Route>
        {/* <Route path="errorPage" element={<ErrorPage />}></Route> */}
        {/* <Route path="/users/signup" element={<Signup />}></Route>
        <Route path="/users/login" element={<Login />}></Route>
        <Route path="/users/account" element={<AccountDetails />}></Route> */}
        <Route path="details" element={<TourDetails />} />
      </Route>
    </Routes>
  );
};

export default App;
