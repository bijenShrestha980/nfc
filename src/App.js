import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StateContext from "./context/StateContext";
import DispatchContext from "./context/DispatchContext";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Loader from "./components/layout/Loader";
import DashboardMain from "./components/DashboardMain";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Announcement = lazy(() => import("./components/Announcement"));
const Settings = lazy(() => import("./components/setting/Settings"));
const ChangePassword = lazy(() =>
  import("./components/setting/ChangePassword")
);
const Profile = lazy(() => import("./components/profile/Profile"));
const Page = lazy(() => import("./components/page/Page"));
const CreatePage = lazy(() => import("./components/page/CreatePage"));
const EditPage = lazy(() => import("./components/page/EditPage"));
const ManagePage = lazy(() => import("./components/page/ManagePage"));

function App() {
  return (
    // <StateContext.Provider value={state}>
    // <DispatchContext.Provider value={dispatch}>

    <BrowserRouter>
      <Routes>
        <Route path="dashboard" element={<Dashboard />}>
          <Route index element={<DashboardMain />} />
          <Route
            path="settings"
            element={
              <Suspense fallback={<Loader />}>
                <Settings />
              </Suspense>
            }
          />
          <Route
            path="changePassword"
            element={
              <Suspense fallback={<Loader />}>
                <ChangePassword />
              </Suspense>
            }
          />
          <Route
            path="profile"
            element={
              <Suspense fallback={<Loader />}>
                <Profile />
              </Suspense>
            }
          />
          <Route
            path="page"
            element={
              <Suspense fallback={<Loader />}>
                <Page />
              </Suspense>
            }
          />
          <Route
            path="announcement"
            element={
              <Suspense fallback={<Loader />}>
                <Announcement />
              </Suspense>
            }
          />
          <Route
            path="page/create"
            element={
              <Suspense fallback={<Loader />}>
                <CreatePage />
              </Suspense>
            }
          />
          <Route
            path="page/edit/:id"
            element={
              <Suspense fallback={<Loader />}>
                <EditPage />
              </Suspense>
            }
          />
          <Route
            path="page/manage/:id"
            element={
              <Suspense fallback={<Loader />}>
                <ManagePage />
              </Suspense>
            }
          />
        </Route>
        <Route path="*" element={<Login />} />
        <Route path="signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
    // </DispatchContext.Provider>
    // </StateContext.Provider>
  );
}

export default App;
