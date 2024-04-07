import { Outlet, createBrowserRouter } from "react-router-dom";
import ProtectedLayout from "./components/protected-layout";
import { AuthProvider } from "./contexts/AuthContext";
import AuthLayout from "./modules/auth/aut-layout";
import AuthPage from "./modules/auth/auth-page";
import TodoPage from "./modules/todo/todo-page";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthProvider>
        <Outlet />
      </AuthProvider>
    ),
    children: [
      {
        path: "/auth",
        element: <AuthLayout />,
        children: [{ index: true, element: <AuthPage /> }],
      },
      {
        path: "/",
        element: <ProtectedLayout />,
        children: [
          {
            path: "/",
            element: <Outlet />,
            children: [
              {
                path: "/",
                element: <TodoPage />,
              },
            ],
          },
        ],
      },
    ],
  },
]);
