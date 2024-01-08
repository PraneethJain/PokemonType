import { useState } from "react";
import { Link } from "react-router-dom";
import { useSignup } from "../hooks/useSignup";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, loading, error } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(email, password);
  };

  return (
    <div className="Screen">
      <form className="Form" onSubmit={handleSubmit}>
        <h1>Sign up</h1>
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
          Already have an account?
          <Link to="/login" className="link">
            Log in
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Signup;
