import AddClient from "../components/AddClient";
import Dashboard from "../components/Dashboard";
import SignInSide from "../components/SignInSide";

const publicroutes = [
  {
    path: "/login",
    component: <SignInSide />,
  },
];

const addminRoutes = [
  {
    path: "/",
    component: <Dashboard />,
  },
  {
    path: "/addclient",
    component: <AddClient />,
  },
];

export { publicroutes, addminRoutes };
