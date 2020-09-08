import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
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

function Dashboard() {
  // let loggedIn = useSelector((state) => state.isLogged);
  // if (!loggedIn) {
  //   return <Redirect to="signin" />;
  // }
  let [viewComponent, setViewComponent] = useState(<Home />);
  let [activeStatus, setActiveStatus] = useState("Home");
  let [showSidebar, setShowSidebar] = useState(true);

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
      default:
        setViewComponent(<Home />);
        setActiveStatus("Home");
    }
  }

  return (
    <div className={styling.Dashboard}>
      {showSidebar ? (
        <div className={styling.sidebarSection}>
          <Sidebar
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
        <div className={styling.mainNavbar}>
          <Navbar toggleSidebar={toggleSidebar} />
        </div>

        <div className={styling.multipleComponents}>{viewComponent}</div>
      </div>
    </div>
  );
}

export default Dashboard;
