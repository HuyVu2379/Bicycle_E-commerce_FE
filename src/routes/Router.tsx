// import App from "@/App";
import { createBrowserRouter } from "react-router-dom";
import LoginTemplate from "@/pages/auth/Login";
import NotFoundTemplate from "@/pages/404";
import Banner from "@/components/Shared/Banner";
import Footer from "@/components/Shared/Footer/index";
import YourCart from "@/components/Shared/YourCart/index";
const router = createBrowserRouter([
  {
    path: "/",
    Component: YourCart,
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
  {
    path: "banner",
    Component: (props) => <Banner PageName="Home" PlaceHolder="Register" {...props} />
  }
]);

export default router;
