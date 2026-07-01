import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Add from "./pages/AddEquipment";
import Edit from "./pages/EditEquipment";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <>
      <Navbar />

      <div style={{ maxWidth: 1100, margin: "30px auto" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<Add />} />
          <Route path="/edit/:id" element={<Edit />} />
        </Routes>
      </div>
    </>
  );
}