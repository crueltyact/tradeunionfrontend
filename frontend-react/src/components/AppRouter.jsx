import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home.jsx"
import Error from "./pages/Error.jsx"
import { appRoutes } from "./router/routes.js";

const AppRouter = () => {
  return (
    <Routes>
        {appRoutes.map(route => 
            <Route
                Component={route.component}
                path={route.path}
                key={route.path}
            />
        )}
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Error />} />
    </Routes>
  );
};

export default AppRouter;