import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

import App from "./pages/App";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ErrorPage from "./pages/ErrorPage";

function Router() {
  const { user } = useAuthContext();

  const router = createBrowserRouter([
    {
      path: "/",
      element: user ? <App /> : <Navigate to="/login" />,
      errorElement: <ErrorPage />,
    },
    {
      path: "signup",
      element: user ? <Navigate to="/" /> : <Signup />,
    },
    {
      path: "login",
      element: user ? <Navigate to="/" /> : <Login />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default Router;
