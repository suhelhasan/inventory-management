import React, { useState } from "react";
import styling from "./Sidebar.module.css";
import { BsGraphUp } from "react-icons/bs";
import { VscHome } from "react-icons/vsc";
import { BiPurchaseTagAlt, BiCart, BiRupee } from "react-icons/bi";
import { FiUserPlus } from "react-icons/fi";
import { AiOutlineStock, AiFillTag } from "react-icons/ai";
import { GiReceiveMoney } from "react-icons/gi";
import { FaHandHoldingUsd } from "react-icons/fa";

function Sidebar({ toggleComponent, activeStatus }) {
  return (
    <div className={styling.Sidebar}>
      <div className={styling.productName}>
        ShopManager <BsGraphUp className={styling.logoIcon} />
      </div>
      <div className={styling.SidebarOptions}>
        <div
          onClick={() => toggleComponent()}
          className={activeStatus === "Home" ? styling.activeClass : null}
        >
          <VscHome className={styling.sidebarIcons} /> Home
        </div>
        <div
          onClick={() => toggleComponent("SellItem")}
          className={activeStatus === "SellItem" ? styling.activeClass : null}
        >
          <BiRupee className={styling.sidebarIcons} /> Sell Item
        </div>
        <div
          onClick={() => toggleComponent("AddItem")}
          className={activeStatus === "AddItem" ? styling.activeClass : null}
        >
          <BiCart className={styling.sidebarIcons} /> Add Items
        </div>
        <div
          onClick={() => toggleComponent("MyStocks")}
          className={activeStatus === "MyStocks" ? styling.activeClass : null}
        >
          <AiOutlineStock className={styling.sidebarIcons} /> My Stocks
        </div>
        <div
          onClick={() => toggleComponent("PurchaseItem")}
          className={
            activeStatus === "PurchaseItem" ? styling.activeClass : null
          }
        >
          <BiPurchaseTagAlt className={styling.sidebarIcons} /> Purchase Item
        </div>
        <div
          onClick={() => toggleComponent("AddSuppliers")}
          className={
            activeStatus === "AddSuppliers" ? styling.activeClass : null
          }
        >
          <FiUserPlus className={styling.sidebarIcons} /> Add suppliers
        </div>
      </div>
    </div>
  );
}

export default Sidebar;