import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { checkIfTokenIsValid } from "../helper";

function HomePage() {
  const nav = useNavigate();
  function handleLogout() {
    localStorage.removeItem("token");
    nav("/login");
  }

  useEffect(() => {
    if (checkIfTokenIsValid() === false) {
      nav("/login");
    }
  }, [nav]);

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default HomePage;
