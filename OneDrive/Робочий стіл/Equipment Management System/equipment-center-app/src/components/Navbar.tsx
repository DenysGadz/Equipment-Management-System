import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav
      style={{
        background: "#2563eb",
        padding: "18px",
        display: "flex",
        justifyContent: "space-between",
        color: "white",
      }}
    >
      <h2>Equipment Center</h2>

      <div style={{ display: "flex", gap: 20 }}>
        <Link style={{ color: "white" }} to="/">
          Обладнання
        </Link>

        <Link style={{ color: "white" }} to="/add">
          Додати
        </Link>
      </div>
    </nav>
  );
}