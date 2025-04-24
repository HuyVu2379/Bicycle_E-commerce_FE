import { createBrowserRouter } from "react-router-dom";
import LoginTemplate from "@/pages/auth/Login";
import RegisterTemplate from "@/pages/auth/Register";
import AuthLayout from "@/layouts/AuthLayout";
import HomeLayout from "@/layouts/HomeLayout";
import UserProfile from "@/components/Shared/Profile";
import ProductDetailTemplate from "@/pages/ProductDetail";
const router = createBrowserRouter([
  {
    Component: AuthLayout,
    path: "/auth",
    children: [
      {
        path: "login", // Bỏ dấu / ở đầu
        Component: LoginTemplate
      },
      {
        path: "register", // Bỏ dấu / ở đầu
        Component: RegisterTemplate
      },
      {
        path: 'profile',
        Component: UserProfile
      }
    ]
  },
  {
    Component: HomeLayout,
    path: "/product",
    children: [
      {
        path: "detail",
        Component: ProductDetailTemplate
      },
    ]
  },
]);

export default router;