import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Signup from "./Signup";
import ErrorPage from "./ErrorPage";
import Login from "./Login";

function Router() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      errorElement: <ErrorPage />,
    },
    {
      path: "signup",
      element: <Signup />,
    },
    {
      path: "login",
      element: <Login />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default Router;
