import { createBrowserRouter, Navigate } from "react-router-dom";
import LoginTemplate from "@/pages/auth/Login";
// import NotFoundTemplate from "@/pages/404";
// import Banner from "@/components/Shared/Banner";
// import Footer from "@/components/Shared/Footer/index";
// import YourCart from "@/components/Shared/YourCart/index";
// import Payment from "@/components/Shared/Payment/index";
// import ProductDetail from "@/components/Shared/ProductDetail/index";
// import ProductList from "@/components/Shared/ProductList/index";
import RegisterTemplate from "@/pages/auth/Register";

import AuthLayout from "@/layouts/AuthLayout";
import HomeLayout from "@/layouts/HomeLayout";
import UserProfile from "@/components/Shared/Profile";
import HomeTemplate from "@/pages/home/index";
import ServiceLayout from "@/layouts/ServiceLayout";
import CheckoutPage from "@/components/Shared/YourCart/index";
import ServiceTemplate from "@/pages/service/index";
import PaymentLayout from "@/layouts/PaymentLayout";
import PaymentTemplate from "@/pages/payment/index";
import AboutLayout from "@/layouts/AboutLayout";
import AboutTemplate from "@/pages/about/index";
import ContactLayout from "@/layouts/ContactLayout";
import ContactTemplate from "@/pages/contact/index";
import ProductDetailLayout from "@/layouts/ProductDetailLayout";
import ProductDetailTemplate from "@/pages/productDetail/index";
import NewsLayout from "@/layouts/NewsLayout";
import NewsTemplate from "@/pages/news";
import NewsDetailsTemplate from "@/pages/news/NewsDetail";
import ShopLayout from "@/layouts/ShopLayout";
import ShopTemplate from "@/pages/shop";
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
    Component: ProductDetailLayout,
    path: "/product",
    children: [
      {
        path: "detail",
        Component: ProductDetailTemplate
      },
    ]
  },
  {
    path: "/",
    Component: HomeLayout,
    children: [
      {
        path: "", // Bỏ dấu / ở đầu
        Component: HomeTemplate
      },
      {
        path: 'yourCart',
        Component: CheckoutPage
      }
    ]
  },
  
  {
    path: "/service",
    Component: ServiceLayout,
    children: [
      {
        path: '',
        Component: ServiceTemplate
      }
    ]
  },
  {
    path: "/payment",
    Component: PaymentLayout,
    children: [
      {
        path: '',
        Component: PaymentTemplate
      }
    ]
  },
  {
    path: "/about",
    Component: AboutLayout,
    children: [
      {
        path: '',
        Component: AboutTemplate
      }
    ]
  },
  {
    path: "/contact",
    Component: ContactLayout,
    children: [
      {
        path: '',
        Component: ContactTemplate  
      }
    ]
  },
  {
    path: "/news",
    Component: NewsLayout,
    children: [
      {
        path: '',
        Component: NewsTemplate
      },
      {
        path: ":id" ,
        Component: NewsDetailsTemplate
      }
    ]
  },
  {
    path: "/shop",
    Component: ShopLayout,
    children: [
      {
        path: '',
        Component: ShopTemplate
      },
    ]
  },
  {
    path: "/notfound",
    Component: NotFoundTemplate,
  }

]);

export default router;