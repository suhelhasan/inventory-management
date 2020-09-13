import React from "react";
import styling from "./Sidebar.module.css";
import { BsGraphUp, BsBuilding } from "react-icons/bs";
import { VscHome } from "react-icons/vsc";
import { BiCart, BiRupee } from "react-icons/bi";
// import { BiPurchaseTagAlt} from "react-icons/bi";
// import { FiUserPlus } from "react-icons/fi";
import { AiOutlineStock } from "react-icons/ai";
import { Link } from "react-router-dom";
import { MdAdd } from "react-icons/md";
// import AddChannel from "./AddChannels/AddChannels";

function Sidebar({ toggleComponent, activeStatus, showAddChannel }) {
  return (
    <>
      <div className={styling.Sidebar}>
        <div className={styling.productName}>
          <Link to="/">
            ShopManager <BsGraphUp className={styling.logoIcon} />
          </Link>
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
          {/* <div
          onClick={() => toggleComponent("PurchaseItem")}
          className={
            activeStatus === "PurchaseItem" ? styling.activeClass : null
          }
        >
          <BiPurchaseTagAlt className={styling.sidebarIcons} /> Purchase Item
        </div> */}
          {/* <div
          onClick={() => toggleComponent("AddSuppliers")}
          className={
            activeStatus === "AddSuppliers" ? styling.activeClass : null
          }
        >
          <FiUserPlus className={styling.sidebarIcons} /> Add suppliers
        </div> */}

          <div
            onClick={() => toggleComponent("Registration")}
            className={
              activeStatus === "Registration" ? styling.activeClass : null
            }
          >
            <BsBuilding className={styling.sidebarIcons} />
            Update Details
          </div>
        </div>
        <div className={styling.salesChannel} onClick={() => showAddChannel()}>
          <MdAdd className={styling.sidebarIcons} /> Sales Channel
        </div>
      </div>
      {/* <AddChannel /> */}
    </>
  );
}

export default Sidebar;
