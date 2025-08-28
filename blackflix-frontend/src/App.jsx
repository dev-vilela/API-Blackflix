import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import Profiles from "./pages/Profiles";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movie/:id" element={<MovieDetails />} />
      <Route path="/profiles" element={<Profiles />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
