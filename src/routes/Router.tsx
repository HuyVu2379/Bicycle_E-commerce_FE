import { createBrowserRouter } from "react-router-dom";
import LoginTemplate from "@/pages/auth/Login";
import NotFoundTemplate from "@/pages/404";
import Banner from "@/components/Shared/Banner";
import Footer from "@/components/Shared/Footer/index";
import YourCart from "@/components/Shared/YourCart/index";
import Payment from "@/components/Shared/Payment/index";
import ProductDetail from "@/components/Shared/ProductDetail/index";
import ProductList from "@/components/Shared/ProductList/index";
import Service from "@/components/Shared/Service/index";
import RegisterTemplate from "@/pages/auth/Register";

import AuthLayout from "@/layouts/AuthLayout";
import HomeLayout from "@/layouts/HomeLayout";
import UserProfile from "@/components/Shared/Profile";
import ProductDetailTemplate from "@/pages/productDetail";
import HomeTemplate from "@/pages/home/index";
import CheckoutPage from "@/pages/YourCart";
const router = createBrowserRouter([
  {
    Component: AuthLayout,
    path: "/auth",
    children: [
      {
        path: "login",
        Component: LoginTemplate
      },
      {
        path: "register",
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
  {
    path: "/home",
    Component: HomeLayout,
    children: [
      {
        path: "home",
        Component: HomeTemplate
      },
      {
        path: 'yourCart',
        Component: CheckoutPage
      }
    ]
  }
]);

export default router;