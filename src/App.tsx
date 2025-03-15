import { Routes, Route } from "react-router";
import { BookProvider } from "./store";
import "./App.css";
import Home from "./pages/Home";
import Details from "./pages/Details";
import Navbar from "./components/Navbar";

import NotFound from "./pages/NotFound";

const App = () => (
  <div className="grid grid-cols-[auto_1fr] w-ful h-screen">
    <BookProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book/:id/:coverId" element={<Details />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BookProvider>
  </div>
);

export default App;
