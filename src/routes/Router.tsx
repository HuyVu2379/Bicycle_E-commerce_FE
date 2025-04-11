import { createBrowserRouter } from "react-router-dom";
import LoginTemplate from "@/pages/auth/Login";
import RegisterTemplate from "@/pages/auth/Register";
import AuthLayout from "@/components/Shared/AuthLayout";

const router = createBrowserRouter([
  {
    Component: AuthLayout,
    path: "/auth",
    children: [
      // {
      //   path: "forgot-password", // Bỏ dấu / ở đầu
      //   Component: ForgotPasswordTemplate
      // },
      // {
      //   path: "reset-password", // Bỏ dấu / ở đầu
      //   Component: ResetPasswordTemplate
      // },
      {
        path: "login", // Bỏ dấu / ở đầu
        Component: LoginTemplate
      },
      {
        path: "register", // Bỏ dấu / ở đầu
        Component: RegisterTemplate
      }
    ]
  },
]);

export default router;