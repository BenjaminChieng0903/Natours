import { useEffect, useState } from "react";
import Card from "../Card/card";
import "./home.scss";
// get all tour data from server
const Home = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:8000/api/v1/tours`)
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="card-container">
      <Card categories={categories} />
    </div>
  );
};

export default Home;
