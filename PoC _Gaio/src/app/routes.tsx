import { createBrowserRouter } from "react-router";
import { Login } from "./components/Login";
import { Dashboard } from "./components/Dashboard";
import { AnimalRegistration } from "./components/AnimalRegistration";
import { AnimalProfile } from "./components/AnimalProfile";
import { ConsumerView } from "./components/ConsumerView";
import { Reports } from "./components/Reports";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Login,
  },
  {
    path: "/dashboard",
    Component: Dashboard,
  },
  {
    path: "/register",
    Component: AnimalRegistration,
  },
  {
    path: "/animal/:id",
    Component: AnimalProfile,
  },
  {
    path: "/consumer/:id",
    Component: ConsumerView,
  },
  {
    path: "/reports",
    Component: Reports,
  },
]);
