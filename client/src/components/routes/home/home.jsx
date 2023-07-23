import Card from "../Card/card";
import "./home.scss";

// get all tour data from server
const Home = () => {
  return (
    <div className="card-container">
      <Card categories={categories} />
    </div>
  );
};

export default Home;
