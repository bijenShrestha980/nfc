import React, { useEffect, useState, lazy, Suspense } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Outlet } from "react-router-dom";
import Cookies from "universal-cookie";
// REDUCERS
import { setUser } from "../features/appSlice/appSlice";
import { useGetUserMutation } from "../features/api/userApiSlice";
// Component
import Header from "../layout/Header";
import Sidebar from "../layout/Sidebar";
import Loader from "../components/layout/Loader";

const Dashboard = () => {
  const cookies = new Cookies();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showSidebar, setShowSidebar] = useState(false);
  const [showSubMenu, setShowSubMenu] = useState(false);
  const [rotates, setRotates] = useState(false);
  const token = cookies.get("nfcToken");
  const user_id = cookies.get("nfcUid");
  const [getUser, { isSuccess, data: userResponse }] = useGetUserMutation();

  useEffect(() => {
    getUser({ user_id });
  }, []);

  useEffect(() => {
    if (isSuccess) {
      dispatch(setUser(userResponse.data));
    }
  }, [isSuccess]);

  const setSidebarOpen = (data) => {
    setShowSidebar(data);
  };

  const handleClick = (e) => {
    if (showSubMenu) {
      setShowSubMenu(!showSubMenu);
    }
    if (rotates) {
      setRotates(!rotates);
    }
  };
  // redirect if there is no token and userid
  useEffect(() => {
    if (!token || !user_id) {
      navigate("/");
    }
  }, [token, user_id]);

  if (!isSuccess) {
    return <Loader />;
  }
  return (
    <>
      <div
        className={`dashboard-outer-container ${
          showSidebar === true ? "dashboard-outer-container-onClick" : ""
        }`}
        onClick={(e) => handleClick(e)}
      >
        <div className="sidebar">
          <Sidebar />
        </div>

        <div className="dashboard-inner-container">
          <Header
            sidebarOpen={(e) => setSidebarOpen(e)}
            isOpen={showSidebar}
            rotates={rotates}
            setRotates={setRotates}
            showSubMenu={showSubMenu}
            setShowSubMenu={setShowSubMenu}
          />
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
