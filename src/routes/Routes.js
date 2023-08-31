import Dashboard from "../components/Dashboard";
import SignInSide from "../components/SignInSide";
import SignUp from "../components/SignUp";

const publicroutes = [
  {
    path: "/login",
    component: <SignInSide />,
  },
  {
    path: "/signup",
    component: <SignUp />,
  },
];

const addminRoutes = [
  {
    path: "/",
    component: <Dashboard />,
  },
];

export { publicroutes, addminRoutes };
