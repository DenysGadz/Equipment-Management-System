import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Add from "./pages/AddEquipment";
import Edit from "./pages/EditEquipment";
import Navbar from "./components/Navbar";
import Notification from "./components/Notification";

type NotificationType = {
  message: string;
  type: "success" | "error" | "info";
};

export default function App() {
  const [notification, setNotification] = useState<NotificationType | null>(null);

  const notify = (message: string, type: NotificationType["type"] = "info") => {
    setNotification({ message, type });
    window.setTimeout(() => setNotification(null), 3500);
  };

  return (
    <>
      <Navbar />
      <Notification
        message={notification?.message}
        type={notification?.type}
        onClose={() => setNotification(null)}
      />

      <div style={{ maxWidth: 1100, margin: "30px auto" }}>
        <Routes>
          <Route path="/" element={<Home setNotification={notify} />} />
          <Route path="/add" element={<Add setNotification={notify} />} />
          <Route path="/edit/:id" element={<Edit setNotification={notify} />} />
        </Routes>
      </div>
    </>
  );
}
