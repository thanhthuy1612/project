import React from "react";
import { IRouter } from "./interface/IRouter";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout";
import { routes } from "./routers";
import CustomLayout from "./layouts/CustomLayout";
import "./App.css";
import ErrorExist from "./error/ErrorExist";

const App: React.FC = () => {

  return (
    <Router>
      <Routes>
        {routes.map((route: IRouter) => {
          const Layout = route.layout || DefaultLayout;
          const Page = route.component;
          return (
            <Route
              key={route.id}
              path={route.path}
              element={
                <CustomLayout
                  isPrivate={Boolean(route?.isPrivate)}
                  element={<Layout><Page /></Layout>}
                />
              }
            />
          );
        })}
        <Route path="*" element={<DefaultLayout><ErrorExist /></DefaultLayout>} />
      </Routes>
    </Router>
  );
};

export default App;
