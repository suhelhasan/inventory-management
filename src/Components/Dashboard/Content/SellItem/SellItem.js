import React, { useState } from "react";
import styling from "./SellItem.module.css";
import { notify, ToastContainer } from "../../../Notify/Notify";
import ProductInput from "./ProductInput/ProductInput";
import UserCart from "./UserCart/UserCart";
import { useDispatch, useSelector } from "react-redux";
import firebase from "../../../../firebase/firebase";
import {
  allCustomers,
  salesItem,
  removeAllCustomerItems,
} from "../../../../redux/actions/actions";

function SellItem() {
  let [customerName, setCustomerName] = useState("");
  let [customerPhone, setCustomerPhone] = useState("");
  let userCart = useSelector((state) => state.userCart);
  let userInfo = useSelector((state) => state.user);
  let allItems = useSelector((state) => state.salesItem);
  let dispatch = useDispatch();

  let doTask = () => {
    if (customerName.length > 2 && customerPhone.length > 4) {
      // Add customer to DB
      let customers = {};
      customers[customerPhone] = { customerName, customerPhone };
      const db = firebase.firestore();
      db.collection("shops")
        .doc(userInfo.shopName)
        .set(
          {
            customers,
          },
          { merge: true }
        )
        .then(() => {
          notify("success", "Customer Info Added");
          dispatch(allCustomers(customers));
        })
        .catch((error) => {
          notify("error", "Customer not added");
          console.error("Error adding document: ", error);
        });

      // Updating stock

      let products = { ...allItems };
      for (let i = 0; i < userCart.length; i++) {
        products[userCart[i].itemName].quantity -= userCart[i].quantity;
      }
      db.collection("shops")
        .doc(userInfo.shopName)
        .update({
          products,
        })
        .then(() => {
          setCustomerName("");
          setCustomerPhone("");
          notify("success", "Updated Stock successfully");
          dispatch(salesItem({ ...products }));
          dispatch(removeAllCustomerItems([]));
          console.log("Added data successfully");
        })
        .catch((error) => {
          notify("error", "error updating stocks");
          console.error("Error adding document: ", error);
        });

      // let updateSellingHistory = () => {
      var today = new Date();
      let date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();

      let todaysSell = {};
      todaysSell[today] = userCart;
      let sellingHistory = {};
      sellingHistory[date] = { ...todaysSell };
      // putMyData[today] = userCart;

      db.collection("shops")
        .doc(userInfo.shopName)
        .set(
          {
            sellingHistory,
          },
          { merge: true }
        )
        .then(() => {
          notify("success", "Added");
        })
        .catch((error) => {
          notify("error", "Customer not added");
          console.error("Error adding document: ", error);
        });

      //
      // };
    } else {
      notify("error", "Enter valid user name and phone number");
    }
  };

  return (
    <>
      <div className={styling.SellItem}>
        <table cellSpacing="0">
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Customer Phone</th>
            </tr>
            <tr>
              <td>
                <input
                  type="text"
                  placeholder="customer name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                />
              </td>
              <td>
                <input
                  type="number"
                  placeholder="customer phone"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                />
              </td>
            </tr>
          </thead>
        </table>

        <ProductInput />

        <UserCart doTask={doTask} />
        {userCart.length ? (
          <div className={styling.buttonsDiv}>
            <button
              onClick={(e) => {
                e.preventDefault();
                alert("Printed");
              }}
            >
              Print
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                doTask();
              }}
            >
              Done
            </button>
          </div>
        ) : null}
      </div>
      <ToastContainer />
    </>
  );
}

export default SellItem;
