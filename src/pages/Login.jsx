import { useState } from "react";
import { Link } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading, error } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(email, password);
  };

  return (
    <div className="Screen">
      <form className="Form" onSubmit={handleSubmit}>
        <h1>Log in</h1>
        <label>Email?</label>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <label>Password?</label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button type="submit" disabled={loading}>
          Submit
        </button>
        {error && <div className="error">{error}</div>}
        <div className="other">
          Don&apos;t have an account?
          <Link to="/signup" className="link">
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
