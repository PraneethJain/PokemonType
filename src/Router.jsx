import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

import Home from "./pages/Home";
import Casual from "./pages/Casual";
import Ranked from "./pages/Ranked";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ErrorPage from "./pages/ErrorPage";

function Router() {
  const { user } = useAuthContext();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      errorElement: <ErrorPage />,
    },
    {
      path: "casual",
      element: user ? <Casual /> : <Navigate to="/" />,
    },
    {
      path: "ranked",
      element: user ? <Ranked /> : <Navigate to="/" />,
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
