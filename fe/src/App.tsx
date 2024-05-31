import React from "react";
import { privateRoutes, publicRoutes } from "./routers";
import { IRouter } from "./interface/IRouter";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout";
import "./App.css";
import { useAppSelector } from "./lib/hooks";

const App: React.FC = () => {
  const [routers, setRouters] = React.useState<IRouter[]>([]);
  const { username } = useAppSelector(state => state.user)

  const getRouters = React.useCallback(() => {
    const isLogin: boolean = Boolean(localStorage.getItem('token'))
    if (!isLogin) {
      return publicRoutes;
    }
    return [...publicRoutes, ...privateRoutes];
  }, [username]);

  React.useEffect(() => {
    setRouters(getRouters());
  }, [getRouters])

  return (
    <Router>
      <Routes>
        {routers.map((route: IRouter) => {
          const Layout = route.layout || DefaultLayout;
          const Page = route.component;
          return (
            <Route
              key={route.id}
              path={route.path}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            />
          );
        })}
      </Routes>
    </Router>
  );
};

export default App;
