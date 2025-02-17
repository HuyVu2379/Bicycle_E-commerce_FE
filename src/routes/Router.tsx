// import App from "@/App";
import { createBrowserRouter } from "react-router-dom";
import LoginTemplate from "@/pages/auth/Login";
import NotFoundTemplate from "@/pages/404";
const router = createBrowserRouter([
  {
    path: "/",
    Component: NotFoundTemplate,
    children: [
      {
        path: "/auth",
        children: [
          {
            path: "login",
            Component: LoginTemplate,
          },
        ],
      },
    ],
  },
]);

export default router;
