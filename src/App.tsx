import { Routes, Route } from "react-router";
import "./App.css";
import Home from "./pages/Home";
import Details from "./pages/Details";
import Navbar from "./components/Navbar";

const App = () => (
  <div className="grid grid-cols-[auto_1fr] w-ful h-full">
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/book/:id/:coverId" element={<Details />} />
    </Routes>
  </div>
);

export default App;
