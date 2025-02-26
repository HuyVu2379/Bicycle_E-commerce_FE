// // import App from "@/App";
// import { createBrowserRouter } from "react-router-dom";
// import LoginTemplate from "@/pages/auth/Login";
// import NotFoundTemplate from "@/pages/404";
// const router = createBrowserRouter([
//   {
//     path: "/",
//     Component: NotFoundTemplate,
//     children: [
//       {
//         path: "/auth",
//         children: [
//           {
//             path: "login",
//             Component: LoginTemplate,
//           },
//         ],
//       },
//     ],
//   },
// ]);

// export default router;
import { createBrowserRouter } from "react-router-dom";
import App from "@/App"; // Đừng quên import App.tsx
import LoginTemplate from "@/pages/auth/Login";
import NotFoundTemplate from "@/pages/404";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "auth/login",
        element: <LoginTemplate />,
      },
      {
        path: "*",
        element: <NotFoundTemplate />,
      },
    ],
  },
]);

export default router;
