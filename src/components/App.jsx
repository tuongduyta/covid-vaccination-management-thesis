import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import _ from "lodash";

import AuthProvider from "../contexts/AuthContext";
import Layout from "./commons/layout";
import PrivateRoute from "./commons/PrivateRoute";
import { paths } from "../configs";
import ModalProvider from "../contexts/modal-context";

const App = () => {
  const renderPaths = () => {
    return _.map(_.values(paths), (item) => (
      <Route
        key={item.label}
        path={item.path}
        element={<PrivateRoute path={item.path}>{item.element}</PrivateRoute>}
      />
    ));
  };

  return (
    <AuthProvider>
      <ModalProvider>
        <BrowserRouter>
          <Layout>
            <Routes>{renderPaths()}</Routes>
          </Layout>
        </BrowserRouter>
      </ModalProvider>
    </AuthProvider>
  );
};

export default App;
