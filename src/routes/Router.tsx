import { createBrowserRouter } from "react-router-dom";
import LoginTemplate from "@/pages/auth/Login";
import NotFoundTemplate from "@/pages/404";
import Banner from "@/components/Shared/Banner";
import Footer from "@/components/Shared/Footer/index";
import YourCart from "@/components/Shared/YourCart/index";
import Payment from "@/components/Shared/Payment/index";
import ProductDetail from "@/components/Shared/ProductDetail/index";
import Service from "@/components/Shared/Service/index";
import RegisterTemplate from "@/pages/auth/Register";
import AuthLayout from "@/layouts/AuthLayout";
import HomeLayout from "@/layouts/HomeLayout";

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
  {
    Component: HomeLayout,
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