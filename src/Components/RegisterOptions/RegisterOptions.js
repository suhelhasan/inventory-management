import React, { useEffect, useState } from "react";
import styling from "./RegisterOptions.module.css";
import image from "../../assets/RegisterOptions1.svg";
import { Link, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import firebase from "../../firebase/firebase";
import { notify, ToastContainer } from "../Notify/Notify";
import {
  isLoggedIn,
  userDetails,
  salesChannelAction,
  salesItem,
  allCustomers,
  shopDetails,
} from "../../redux/actions/actions";

function RegisterOptions() {
  let [passcode, setPasscode] = useState("");
  let [shops, setShops] = useState([]);
  let [shopName, setShopName] = useState("");
  let shopDetailsLocal = useSelector((state) => state.shopDetails);
  let loggedIn = useSelector((state) => state.isLogged);
  let userDetailsLocal = useSelector((state) => state.user);

  let dispatch = useDispatch();

  useEffect(() => {
    // GET ALL SHOPS NAME
    const db = firebase.firestore();
    db.collection("shops")
      .get()
      .then((res) => {
        let ans = res.docs.map((doc) => {
          return `${doc.data().shopDetails.shopName}, ${
            doc.data().shopDetails.shopPhone
          }`;
        });
        setShops(ans);
      })
      .catch((err) => {
        alert("ERROR");
      });
  }, []);

  if (!loggedIn) {
    return <Redirect to="signin" />;
  } else if (Object.keys(shopDetailsLocal).length != 0) {
    return <Redirect to="/dashboard" />;
  }

  let checkPasscode = () => {
    if (shopName && passcode) {
      // CHECKING PASSCODE
      const db = firebase.firestore();
      db.collection("shops")
        .doc(shopName)
        .get()
        .then((doc) => {
          if (doc.data().shopDetails.shopOwnerPasscode === passcode) {
            notify("success", "user login successfully");
            console.log("LOGIN SUCCES AS A EMPLOYEE");
            // dispatch(userDetails());
            dispatch(shopDetails(doc.data().shopDetails));
            dispatch(salesChannelAction(doc.data().userSalesChannels));
            dispatch(salesItem(doc.data().products));
            dispatch(allCustomers(doc.data().customers));
          } else {
            console.log("fail");
          }
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
      // UPDATE USER STATUS
      db.collection("users")
        .doc(userDetailsLocal.id)
        .update({
          ...userDetailsLocal,
          status: "employee",
          shopName,
        })
        .then(() => {
          dispatch(
            userDetails({
              ...userDetailsLocal,
              status: "employee",
              shopName,
            })
          );
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
    } else {
      notify("error", "Please select shop name and enter passcode");
    }
  };

  return (
    <>
      <div className={styling.RegisterOptions}>
        <div className={styling.RegisterOptionsContent}>
          <img src={image} alt="loginOptions" />
        </div>
        <div className={styling.RegisterOptionsTextArea}>
          <h2>
            Click Admin to register your shop or Enter the passcode to access
            the Inventory Management
          </h2>
          <Link to="/register">
            <div className={styling.buttonDiv}>
              <p>Admin (Owner)</p>
            </div>
          </Link>

          <p>Or</p>
          <div className={styling.inputDiv}>
            {/* select data */}
            <select
              value={shopName}
              onChange={(e) => setShopName(e.target.value)}
            >
              <option value="" disabled defaultValue>
                Select Shop
              </option>
              {shops.map((eachItem) => (
                <option value={eachItem.split(",")[0]} key={eachItem[0]}>
                  {eachItem}
                </option>
              ))}
            </select>

            <input
              type="text"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              placeholder="Enter Passkey"
              autoFocus="true"
            />
            <button autoFocus onClick={checkPasscode}>
              Enter as Employee
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default RegisterOptions;
