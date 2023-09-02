import "./../routes/Card/card.scss";
import "./../routes/home/home.scss";
import Card from "./../routes/Card/card";
import { useEffect, useState } from "react";
import AxiosApi from "./../../axiosApi/api";
import { useDispatch, useSelector } from "react-redux";
import { selectorCurrentUser } from "../store/user/user.selector";
import {
  SetMyBooking,
  SetMyBookingReview,
} from "../store/booking/booking.action";

const MyBooking = () => {
  const currentUser = useSelector(selectorCurrentUser);
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const myBooking = async () => {
      await AxiosApi.get(`/booking/mybooking/${currentUser._id}`).then(
        (res) => {
          //   console.log(res.data.data);
          const tourList = res.data.data.map((item) => item.tour);
          //   console.log(tourList);
          setCategories(tourList);
          dispatch(SetMyBooking(tourList));
          dispatch(SetMyBookingReview(null));
        }
      );
      //   console.log(bookingList);
    };
    myBooking();
  }, []);
  return (
    <main className="main">
      {/* <h1>this is my booking page</h1> */}
      <div className="card-container">
        {categories.length === 0 ? (
          <h1>No Booking</h1>
        ) : (
          categories.map((item, index) => (
            <Card key={item.name} categories={item} index={index} />
          ))
        )}
      </div>
    </main>
  );
};

export default MyBooking;
