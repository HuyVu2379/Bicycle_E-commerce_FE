import { createBrowserRouter, Navigate } from "react-router-dom";
import LoginTemplate from "@/pages/Auth/Login";
import RegisterTemplate from "@/pages/Auth/Register";
import AuthLayout from "@/layouts/AuthLayout";
import HomeLayout from "@/layouts/HomeLayout";
import UserProfile from "@/pages/Auth/Profile";
import HomeTemplate from "@/pages/Home/index";
import ServiceLayout from "@/layouts/ServiceLayout";
import ServiceTemplate from "@/pages/Service/index";
import PaymentLayout from "@/layouts/PaymentLayout";
import PaymentTemplate from "@/pages/Payment/index";
import AboutLayout from "@/layouts/AboutLayout";
import AboutTemplate from "@/pages/About/index";
import ContactLayout from "@/layouts/ContactLayout";
import ContactTemplate from "@/pages/contact";
import ProductDetailLayout from "@/layouts/ProductDetailLayout";
import ProductDetailTemplate from "@/pages/ProductDetail/index";
import NewsLayout from "@/layouts/NewsLayout";
import NewsTemplate from "@/pages/news";
import NewsDetailsTemplate from "@/pages/news/NewsDetail";
import ShopLayout from "@/layouts/ShopLayout";
import ShopTemplate from "@/pages/shop";
import NotFoundPage from "@/pages/404/index";
import { APP_ROUTES } from "@/constants";
import AdminLayout from "@/layouts/Admin/AdminLayout";
import Dashboard from "@/pages/admin/Dashboard";
import PromotionTemplate from "@/pages/admin/Promotion";
import OrderList from "@/pages/admin/Order";
import SupplierList from "@/components/Shared/SupplierList";
import StatisticTemplate from "@/pages/admin/Statistics";
import ProductManagement from "@/pages/Admin/Product";
import CartLayout from "@/layouts/CartLayout";
import CartTemplate from "@/pages/cart/index";
import OrderLayout from "@/layouts/OrderLayout";
import OrderHistoryPage from "@/pages/order";
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
        Component: LoginTemplate,
      },
      {
        path: "register",
        Component: RegisterTemplate,
      },
      {
        path: "profile",
        Component: UserProfile,
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
    ],
  },

  {
    path: APP_ROUTES.USER_ORDER_HISTORY,
    Component: OrderLayout,
    children: [
      { path: "", Component: OrderHistoryPage }
    ]
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
  {
    path: APP_ROUTES.CART,
    Component: CartLayout,
    children: [
      {
        path: "",
        Component: CartTemplate
      }
    ]
  },
  // Admin Route
  {
    path: APP_ROUTES.ADMIN_ROUTE,
    Component: AdminLayout,
    children: [
      {
        path: APP_ROUTES.ADMIN.DASHBOARD,
        Component: Dashboard
      },
      {
        path: APP_ROUTES.ADMIN.PROMOTION,
        Component: PromotionTemplate
      },
      {
        path: APP_ROUTES.ADMIN.ORDER,
        Component: OrderList
      },
      {
        path: APP_ROUTES.ADMIN.SUPLIER,
        Component: SupplierList
      },
      {
        path: APP_ROUTES.ADMIN.STATISTIC,
        Component: StatisticTemplate
      },
      {
        path: APP_ROUTES.ADMIN.PRODUCT,
        Component: ProductManagement
      }
    ]
  },
  // 404 Route
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;
