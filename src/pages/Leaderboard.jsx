import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Leaderboard.css";

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch(
          "https://pokemontype.as.r.appspot.com/api/user/leaderboard?n=5"
        );
        const data = await response.json();
        setLeaderboard(data);
      } catch (error) {
        console.error("Failed to fetch leaderboard:", error);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="leaderboard-page">
      <h1>Leaderboard</h1>
      <ul>
        {leaderboard.map((entry, index) => (
          <li key={index}>
            {index + 1}. {entry.email}: {entry.highScore}
          </li>
        ))}
      </ul>
      <div className="bottom-lb">
        <div className="right">
          <Link to="/" className="homelink">
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
