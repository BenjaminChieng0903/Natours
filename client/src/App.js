import { Routes, Route } from "react-router-dom";
import "./App.css";
import TourCard from "./components/tourCard/tour-card.jsx";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<TourCard />}></Route>
    </Routes>
  );
};

export default App;
