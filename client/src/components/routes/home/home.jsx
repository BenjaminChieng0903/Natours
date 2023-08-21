import { useEffect, useState } from "react";
import Card from "../Card/card";
import "./home.scss";
import AxiosApi from "../../../axiosApi/api";
import { useDispatch, useSelector } from "react-redux";
import {
  FetchToursSuccess,
  setCurrentCardDetailsIndex,
} from "../../store/tours/tours.action";
import { removeCardDetailsIndex } from "../../store/tours/tours.action";
import { SetTourReviews } from "../../store/reviews/reviews.action";
import { useNavigate } from "react-router-dom";

// import "./../../css/styles.css";
// get all tour data from server
const Home = () => {
  const [categories, setCategories] = useState([]);
  const [querySize, setQuerySize] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    //the query size originally was set to 0 for normal rendering, once the
    //query size changed to 3(query info), the useEffect will re-render and then
    //store the checkout info to db. After done that, we change query size to 0 again so that
    //this component will render again to get tour data as usual.
    setQuerySize(query.size);
    const getAlltours = async () => {
      if (querySize === 0) {
        const res = await AxiosApi.get("/tours");
        const resData = res.data;
        dispatch(FetchToursSuccess(resData));
        setCategories(resData.data);
      } else {
        //when checkout is successfull, we send query to store the checkout info to db
        await AxiosApi.get(
          `/tours?tour=${query.get("tour")}&user=${query.get(
            "user"
          )}&price=${query.get("price")}`
        ).then((res) => {
          console.log(res);
          //after store data, we don't want to expose sensitive data with query, so we do redirect to root url without query
          setQuerySize(0);
          navigate("/");
        });
      }
    };

    getAlltours();
    //remove card index for specific card details
    dispatch(setCurrentCardDetailsIndex(null));
    //remove corresponding tour's reviews
    dispatch(SetTourReviews(null));
  }, [querySize]);
  return (
    <main className="main">
      <div className="card-container">
        {categories.map((item, index) => (
          <Card key={item.name} categories={item} index={index} />
        ))}
      </div>
    </main>
  );
};

export default Home;
