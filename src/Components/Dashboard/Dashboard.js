import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import styling from "./Dashboard.module.css";
import Navbar from "./Navbar/Navbar";

import Home from "./Content/Home/Home";
import AddItem from "./Content/AddItem/AddItem";
import AddSuppliers from "./Content/AddSuppliers/AddSuppliers";
import MyStocks from "./Content/MyStocks/MyStocks";
import PurchaseItem from "./Content/PurchaseItem/PurchaseItem";
import SellItem from "./Content/SellItem/SellItem";
import Registration from "../RegisterShop/Registration/Registration";
// import { useEffect } from "react";
import { notify, ToastContainer } from "../Notify/Notify";

import AddChannel from "./AddChannels/AddChannels";

function Dashboard() {
  let shopDetails = useSelector((state) => state.user.shopDetails);
  let loggedIn = useSelector((state) => state.isLogged);

  let [viewComponent, setViewComponent] = useState(<Home />);
  let [activeStatus, setActiveStatus] = useState("Home");
  let [showSidebar, setShowSidebar] = useState(true);
  let [showAddChannel, setShowAddChannel] = useState(false);

  if (!loggedIn) {
    return <Redirect to="/signin" />;
  } else if (!shopDetails) {
    return <Redirect to="/register" />;
  }

  let toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  function changeComponent(key) {
    switch (key) {
      case "AddItem":
        setViewComponent(<AddItem />);
        setActiveStatus("AddItem");
        break;
      case "AddSuppliers":
        setViewComponent(<AddSuppliers />);
        setActiveStatus("AddSuppliers");
        break;
      case "MyStocks":
        setViewComponent(<MyStocks />);
        setActiveStatus("MyStocks");
        break;
      case "PurchaseItem":
        setViewComponent(<PurchaseItem />);
        setActiveStatus("PurchaseItem");
        break;
      case "SellItem":
        setViewComponent(<SellItem />);
        setActiveStatus("SellItem");
        break;
      case "Registration":
        setViewComponent(<Registration />);
        setActiveStatus("Registration");
        break;
      default:
        setViewComponent(<Home />);
        setActiveStatus("Home");
    }
  }
  function toggleAddChannel() {
    setShowAddChannel(!showAddChannel);
  }
  return (
    <>
      <div className={styling.Dashboard}>
        {showSidebar ? (
          <div className={styling.sidebarSection}>
            <Sidebar
              showAddChannel={() => toggleAddChannel()}
              toggleComponent={changeComponent}
              activeStatus={activeStatus}
            />
          </div>
        ) : null}
        <div
          className={
            showSidebar ? styling.mainSection : styling.mainSectionAddition
          }
        >
          <div
            className={
              showSidebar ? styling.mainNavbar : styling.mainNavbarAddition
            }
          >
            <Navbar toggleSidebar={toggleSidebar} />
          </div>

          <div className={styling.multipleComponents}>{viewComponent}</div>
        </div>
      </div>
      <ToastContainer />
      {showAddChannel ? <AddChannel toggleChannel={toggleAddChannel} /> : null}
    </>
  );
}

export default Dashboard;
