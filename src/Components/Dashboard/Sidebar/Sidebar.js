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
import ChannelLinks from "./ChannelLinks/ChannelLinks";
import { FiUsers } from "react-icons/fi";
import { useSelector } from "react-redux";

function Sidebar({ toggleComponent, activeStatus, showAddChannel }) {
  let userDetails = useSelector((state) => state.user);

  return (
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
        {userDetails.status === "admin" ? (
          <div
            onClick={() => toggleComponent("AddItem")}
            className={activeStatus === "AddItem" ? styling.activeClass : null}
          >
            <BiCart className={styling.sidebarIcons} /> Add Items
          </div>
        ) : null}

        <div
          onClick={() => toggleComponent("MyStocks")}
          className={activeStatus === "MyStocks" ? styling.activeClass : null}
        >
          <AiOutlineStock className={styling.sidebarIcons} /> My Stocks
        </div>
        <div
          onClick={() => toggleComponent("Customers")}
          className={activeStatus === "Customers" ? styling.activeClass : null}
        >
          <FiUsers className={styling.sidebarIcons} /> Customers
        </div>
        {userDetails.status === "admin" ? (
          <div
            onClick={() => toggleComponent("Registration")}
            className={
              activeStatus === "Registration" ? styling.activeClass : null
            }
          >
            <BsBuilding className={styling.sidebarIcons} />
            Update Details
          </div>
        ) : null}
      </div>
      <div className={styling.salesChannel}>
        <p>Sales Channel</p>
        <div className={styling.channelDiv}>
          <ChannelLinks />
        </div>
      </div>
      {userDetails.status === "admin" ? (
        <div
          className={styling.AddSalesChannel}
          onClick={() => showAddChannel()}
        >
          <MdAdd className={styling.sidebarIcons} /> Add Channel
        </div>
      ) : null}
    </div>
  );
}

export default Sidebar;
