import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";
import "./Home.css";

function Home() {
  const { user } = useAuthContext();

  const { logout } = useLogout();

  const logoutHandler = () => {
    logout();
  };

  return (
    <div className="homeScreen">
      <div className="top">
        <h1>PokémonType!</h1>
        <h2>Guess the Pokemon&apos;s type(s)</h2>
      </div>

      {user && (
        <div className="links">
          <Link to="/casual">Casual</Link>
          <Link to="/ranked">Ranked</Link>
          <Link onClick={logoutHandler}>Logout</Link>
          {user.email}
        </div>
      )}

      {!user && (
        <div className="links">
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </div>
      )}
    </div>
  );
}

export default Home;
