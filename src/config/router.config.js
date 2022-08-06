import Loadable from "react-loadable";
// import loadable from "@loadable/component";

import Loading from "../components/Loading";

const routes = [
  {
    path: "/demo",
    icon: "apple",
    // component: "../layouts/DemoLayout",
    component: Loadable({
      loader: () => import("../layouts/DemoLayout"),
      loading: Loading,
    }),
    // Routes: [loadable(() => import("../pages/Authorized"))],
    Routes: [
      Loadable({
        loader: () => import("../pages/Authorized"),
        loading: Loading,
      }),
    ],
    routes: [
      { path: "/demo", redirect: "/demo/workplace" },
      {
        name: "DemoWorkplace",
        icon: "chrome",
        path: "/demo/workplace",
        // component: "./Demo/Workplace",
        component: Loadable({
          loader: () => import("../pages/Demo/Workplace"),
          loading: Loading,
        }),
      },
      {
        name: "DemoView",
        icon: "slack",
        path: "/demo/viewlist",
        // component: "./Demo/ViewList",
        component: Loadable({
          loader: () => import("../pages/Demo/ViewList"),
          loading: Loading,
        }),
      },
      {
        // component: "404",
        component: Loadable({
          loader: () => import("../pages/404"),
          loading: Loading,
        }),
      },
    ],
  },
  // path: /
  {
    path: "/",
    // component: "../layouts/BasicLayout",
    component: Loadable({
      loader: () => import("../layouts/BasicLayout"),
      loading: Loading,
    }),
    routes: [
      // { path: "/", redirect: "/demo" },
      // { path: "/", redirect: "/dashboard" },
      {
        name: "Home",
        icon: "bank",
        path: "/",
        // component: "./Home",
        component: Loadable({
          loader: () => import("../pages/Home"),
          loading: Loading,
        }),
      },
      // path: /dashboard
      // {
      //   name: "Dashboard",
      //   icon: "google",
      //   path: "/dashboard",
      //   component: "./Dashboard",
      //   // component: Loadable({
      //   //   loader: () => import("../pages/Dashboard"),
      //   //   loading: Loading,
      //   // }),
      //   routes: [
      //     {
      //       path: "/dashboard/analysis",
      //       name: "analysis",
      //       component: "./Dashboard/Analysis",
      //       // component: Loadable({
      //       //   loader: () => import("../pages/Dashboard/Analysis"),
      //       //   loading: Loading,
      //       // }),
      //     },
      //     {
      //       path: "/dashboard/center",
      //       name: "center",
      //       icon: "setting",
      //       hideInMenu: true,
      //       component: "./Dashboard/Center",
      //       // component: Loadable({
      //       //   loader: () => import("../pages/Dashboard/Center"),
      //       //   loading: Loading,
      //       // }),
      //     },
      //   ],
      // },
      // // path: /montiro
      // {
      //   name: "Monitor",
      //   icon: "twitter",
      //   path: "/monitor",
      //   component: "./Monitor",
      //   // component: Loadable({
      //   //   loader: () => import("../pages/Monitor"),
      //   //   loading: Loading,
      //   // }),
      //   hideChildrenInMenu: true,
      //   routes: [
      //     {
      //       path: "/monitor/aa",
      //       name: "ma",
      //       icon: "youtube",
      //       component: "./Monitor/AA",
      //       // component: Loadable({
      //       //   loader: () => import("../pages/Monitor/AA"),
      //       //   loading: Loading,
      //       // }),
      //     },
      //     {
      //       path: "/monitor/bb",
      //       name: "mb",
      //       component: "./Monitor/BB",
      //       // component: Loadable({
      //       //   loader: () => import("../pages/Monitor/BB"),
      //       //   loading: Loading,
      //       // }),
      //     },
      //   ],
      // },
      {
        // component: "404",
        component: Loadable({
          loader: () => import("../pages/404"),
          loading: Loading,
        }),
      },
    ],
  },
];

export default routes;
