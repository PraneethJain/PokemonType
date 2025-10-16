import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

const useSignup = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  const { dispatch } = useAuthContext();

  const signup = async (email, password) => {
    setLoading(true);
    setError(null);

    const response = await fetch(
      "https://pokemontype.as.r.appspot.com/api/user/signup",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      }
    );

    const json = await response.json();

    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(json));
      dispatch({ type: "LOGIN", payload: json });
      setLoading(false);
    } else {
      setError(json.error);
      setLoading(false);
    }
  };

  return { signup, loading, error };
};

export { useSignup };
