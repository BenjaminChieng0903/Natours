import { useEffect, useState } from "react";
import Card from "../Card/card";
import "./home.scss";
import AxiosApi from "../../../axiosApi/api";
import { useDispatch, useSelector } from "react-redux";
import { FetchToursSuccess } from "../../store/tours/tours.action";

// import "./../../css/styles.css";
// get all tour data from server
const Home = () => {
  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();
  // const tours = useSelector(selectorTours);
  useEffect(() => {
    const getAlltours = async () => {
      const res = await AxiosApi.get("/tours");
      const resData = res.data;
      // console.log(resData);
      dispatch(FetchToursSuccess(resData));
      setCategories(resData.data);
    };

    getAlltours();
  }, []);
  return (
    <main className="main">
      <div className="card-container">
        {categories.map((item) => (
          <Card categories={item} />
        ))}
      </div>
    </main>
  );
};

export default Home;
