import { createBrowserRouter, Navigate } from "react-router-dom";
import LoginTemplate from "@/pages/Auth/Login/index.tsx";
import RegisterTemplate from "@/pages/Auth/Register/index.tsx";
import AuthLayout from "@/layouts/AuthLayout";
import HomeLayout from "@/layouts/HomeLayout";
import UserProfile from "@/pages/Auth/Profile/index.tsx";
import HomeTemplate from "@/pages/home/index.tsx";
import ServiceLayout from "@/layouts/ServiceLayout";
import CheckoutPage from "@/components/Shared/YourCart";
import ServiceTemplate from "@/pages/service/index.tsx";
import PaymentLayout from "@/layouts/PaymentLayout";
import PaymentTemplate from "@/pages/payment/index.tsx";
import AboutLayout from "@/layouts/AboutLayout";
import AboutTemplate from "@/pages/about/index.tsx";
import ContactLayout from "@/layouts/ContactLayout";
import ContactTemplate from "@/pages/contact/index.tsx";
import ProductDetailLayout from "@/layouts/ProductDetailLayout";
import ProductDetailTemplate from "@/pages/productDetail/index.tsx";
import NewsLayout from "@/layouts/NewsLayout";
import NewsTemplate from "@/pages/news/index.tsx";
import NewsDetailsTemplate from "@/pages/news/NewsDetail/index.tsx";
import ShopLayout from "@/layouts/ShopLayout";
import ShopTemplate from "@/pages/shop/index.tsx";
import NotFoundPage from "@/pages/404/index.tsx";
import { APP_ROUTES } from "@/constants";
import AdminLayout from "@/layouts/Admin/AdminLayout";
import Dashboard from "@/pages/admin/Dashboard/index.tsx";
import PromotionTemplate from "@/pages/admin/Promotion/index.tsx";
import OrderList from "@/pages/admin/Order/index.tsx";
import SupplierList from "@/components/Shared/SupplierList";
import StatisticTemplate from "@/pages/admin/Statistics/index.tsx";
import ProductManagement from "@/pages/admin/Product/index.tsx";
import OrderLayout from "@/layouts/OrderLayout";
import OrderHistoryPage from "@/pages/order/index.tsx";
import GoogleCallbackLayout from "@/layouts/GoogleCallbackLayout";

const ErrorPage = () => (
  <div>
    <h1>Đã xảy ra lỗi</h1>
    <p>Vui lòng thử lại sau hoặc liên hệ hỗ trợ.</p>
  </div>
);

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
      {
        path: "login",
        element: <LoginTemplate />,
        errorElement: <ErrorPage />,
      },
      {
        path: "register",
        Component: RegisterTemplate,
      },
      {
        path: "profile",
        Component: UserProfile,
      },
      {
        path: "google-callback",
        element: <GoogleCallbackLayout />,
        errorElement: <ErrorPage />,
      },
    ],
  },

  // Product Routes
  {
    Component: ProductDetailLayout,
    path: APP_ROUTES.PRODUCT_ROUTE,
    children: [
      {
        path: "detail/:productId",
        Component: ProductDetailTemplate,
      },
    ],
  },

  // Home Routes
  {
    path: APP_ROUTES.DASHBOARD,
    Component: HomeLayout,
    children: [
      { path: "", Component: HomeTemplate },
      { path: APP_ROUTES.CART, Component: CheckoutPage },
    ],
  },

  {
    path: APP_ROUTES.USER_ORDER_HISTORY,
    Component: OrderLayout,
    children: [{ path: "", Component: OrderHistoryPage }],
  },

  // Service Route
  {
    path: APP_ROUTES.SERVICE,
    Component: ServiceLayout,
    children: [
      {
        path: "",
        Component: ServiceTemplate,
      },
    ],
  },

  // Payment Route
  {
    path: APP_ROUTES.PAYMENT,
    Component: PaymentLayout,
    children: [
      {
        path: "",
        Component: PaymentTemplate,
      },
    ],
  },

  // About Route
  {
    path: APP_ROUTES.ABOUT,
    Component: AboutLayout,
    children: [
      {
        path: "",
        Component: AboutTemplate,
      },
    ],
  },

  // Contact Route
  {
    path: APP_ROUTES.CONTACT,
    Component: ContactLayout,
    children: [
      {
        path: "",
        Component: ContactTemplate,
      },
    ],
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
        Component: ShopTemplate,
      },
    ],
  },
  // Admin Route
  {
    path: APP_ROUTES.ADMIN_ROUTE,
    Component: AdminLayout,
    children: [
      {
        path: APP_ROUTES.ADMIN.DASHBOARD,
        Component: Dashboard,
      },
      {
        path: APP_ROUTES.ADMIN.PROMOTION,
        Component: PromotionTemplate,
      },
      {
        path: APP_ROUTES.ADMIN.ORDER,
        Component: OrderList,
      },
      {
        path: APP_ROUTES.ADMIN.SUPLIER,
        Component: SupplierList,
      },
      {
        path: APP_ROUTES.ADMIN.STATISTIC,
        Component: StatisticTemplate,
      },
      {
        path: APP_ROUTES.ADMIN.PRODUCT,
        Component: ProductManagement,
      },
    ],
  },
  // 404 Route
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;
