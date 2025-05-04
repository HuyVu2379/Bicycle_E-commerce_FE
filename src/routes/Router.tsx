import { createBrowserRouter, Navigate } from "react-router-dom";
import LoginTemplate from "@/pages/auth/Login";
import RegisterTemplate from "@/pages/auth/Register";
import AuthLayout from "@/layouts/AuthLayout";
import HomeLayout from "@/layouts/HomeLayout";
import UserProfile from "@/pages/auth/Profile";
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
import NotFoundPage from "@/pages/404/index";
import { APP_ROUTES } from "@/constants";
import AdminLayout from "@/layouts/Admin/AdminLayout";

const router = createBrowserRouter([
  // Redirect root to dashboard
  {
    path: "/",
    element: <Navigate to={APP_ROUTES.DASHBOARD} replace />,
  },

  // Auth Routes
  {
    Component: AuthLayout,
    path: APP_ROUTES.AUTH_ROUTE,
    children: [
      { path: APP_ROUTES.USER.LOGIN, Component: LoginTemplate },
      { path: APP_ROUTES.USER.REGISTER, Component: RegisterTemplate },
      { path: APP_ROUTES.USER.PROFILE, Component: UserProfile },
    ],
  },

  // Product Routes
  {
    Component: ProductDetailLayout,
    path: APP_ROUTES.PRODUCT_ROUTE,
    children: [
      { path: APP_ROUTES.PRODUCT.DETAIL, Component: ProductDetailTemplate },
    ],
  },

  // Home Routes
  {
    path: APP_ROUTES.DASHBOARD,
    Component: HomeLayout,
    children: [
      { path: "", Component: HomeTemplate },
      { path: APP_ROUTES.CART, Component: CheckoutPage }, // Use constant
    ],
  },

  // Service Route
  {
    path: APP_ROUTES.SERVICE,
    Component: ServiceLayout,
    children: [
      {
        path: "",
        Component: ServiceTemplate
      }
    ]
  },

  // Payment Route
  {
    path: APP_ROUTES.PAYMENT,
    Component: PaymentLayout,
    children: [
      {
        path: "",
        Component: PaymentTemplate
      }
    ]
  },

  // About Route
  {
    path: APP_ROUTES.ABOUT,
    Component: AboutLayout,
    children: [
      {
        path: "",
        Component: AboutTemplate
      }
    ]
  },

  // Contact Route
  {
    path: APP_ROUTES.CONTACT,
    Component: ContactLayout,
    children: [
      {
        path: "",
        Component: ContactTemplate
      }
    ]
  },

  // News Routes
  {
    path: APP_ROUTES.NEWS,
    Component: NewsLayout,
    children: [
      { path: "", Component: NewsTemplate },
      { path: ":id", Component: NewsDetailsTemplate },
    ],
  },

  // Shop Route
  {
    path: APP_ROUTES.SHOP,
    Component: ShopLayout,
    children: [
      {
        path: "",
        Component: ShopTemplate
      }
    ]
  },

  // Admin Route
  {
    path: APP_ROUTES.ADMIN_ROUTE,
    Component: AdminLayout,
  },
  // 404 Route
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;