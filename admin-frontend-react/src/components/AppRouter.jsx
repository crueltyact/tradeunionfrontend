import { useContext } from "react"
import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home.jsx"
import Error from "./pages/Error.jsx"
import AuthContext from "./context/AuthContext.jsx";
import { appRoutes, publicRoutes } from "./router/routes.js";
import Loader from "./Loader/Loader.jsx";
import Auth from "./pages/Auth.jsx";

const AppRouter = () => {
  const { isAuth, isLoading } = useContext(AuthContext);
    if (isLoading) {
        return <Loader />;
  }
  return (
    isAuth
    ?
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
    :
      <Routes>
        {publicRoutes.map(route => 
            <Route
                Component={route.component}
                path={route.path}
                key={route.path}
            />
        )}
        <Route path="*" element={<Auth />} />
      </Routes>
  );
};

export default AppRouter;