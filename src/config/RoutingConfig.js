import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";
import { addminRoutes, publicroutes } from "../routes/Routes";
import { AddminAuthMiddleware } from "../middleware/Authmiddleware";

const RoutingConfig = () => {
  return (
    <>
      <Router>
        <Routes>
          {publicroutes.map((route, idx) => {
            return (
              <>
                <Route path={route.path} element={route.component} key={idx} />
              </>
            );
          })}
          <Route element={<AppLayout />}>
            {/* Addmin Routes */}
            {addminRoutes.map((route, idx) => {
              return (
                <>
                  <Route element={<AddminAuthMiddleware />} key={idx}>
                    <Route
                      path={route.path}
                      element={route.component}
                      key={idx}
                    />
                  </Route>
                </>
              );
            })}
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default RoutingConfig;
