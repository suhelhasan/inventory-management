import React, { useState, useEffect, useRef } from "react";
import styling from "./Registration.module.css";
import firebase from "../../../firebase/firebase";
import { useSelector, useDispatch } from "react-redux";
import { shopDetails, userDetails } from "../../../redux/actions/actions";
import { notify, ToastContainer } from "../../Notify/Notify";

function Registration() {
  let dispatch = useDispatch();

  let [shopName, setShopName] = useState("");
  let [shopAddress, setShopAddress] = useState("");
  let [shopPhone, setShopPhone] = useState("");
  let [shopMail, setShopMail] = useState("");
  let [shopOwnerName, setShopOwnerName] = useState("");
  let [shopOwnerPasscode, setShopOwnerPasscode] = useState("");
  let [updateUser, setUpdateUser] = useState(false);

  let ourShop = useSelector((state) => state.shopDetails);
  let userDetailsLocal = useSelector((state) => state.user);

  console.log(ourShop);
  console.log(userDetailsLocal);
  useEffect(() => {
    if (ourShop.shopName && userDetailsLocal) {
      // alert("hello");
      setShopName(ourShop.shopName);
      setShopAddress(ourShop.shopAddress);
      setShopPhone(ourShop.shopPhone);
      setShopMail(ourShop.shopMail);
      setShopOwnerName(ourShop.shopOwnerName);
      setShopOwnerPasscode(ourShop.shopOwnerPasscode);
      setUpdateUser(true);
    }
  }, [ourShop, userDetailsLocal]);

  let updateUserProfile = () => {
    if (
      shopName.length > 3 &&
      shopAddress.length > 3 &&
      shopPhone.length > 3 &&
      shopMail.length > 3 &&
      shopOwnerName.length > 3 &&
      shopOwnerPasscode.length > 3
    ) {
      let myShopDetails = {
        shopName,
        shopAddress,
        shopPhone,
        shopMail,
        shopOwnerName,
        shopOwnerPasscode,
      };
      const db = firebase.firestore();
      db.collection("shops")
        .doc(ourShop.shopName)
        .update({
          shopDetails: myShopDetails,
        })
        .then(() => {
          dispatch(shopDetails(myShopDetails));
          notify("success", "Updated data successfully");
          console.log("Update data successfully");
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
    } else {
      notify("error", "Fill the form completely");
    }
  };

  let registerCompany = () => {
    if (
      shopName.length > 3 &&
      shopAddress.length > 3 &&
      shopPhone.length > 3 &&
      shopMail.length > 3 &&
      shopOwnerName.length > 3 &&
      shopOwnerPasscode.length > 3
    ) {
      let myShopDetails = {
        shopName,
        shopAddress,
        shopPhone,
        shopMail,
        shopOwnerName,
        shopOwnerPasscode,
      };
      const db = firebase.firestore();
      db.collection("shops")
        .doc(myShopDetails.shopName)
        .set(
          {
            shopDetails: myShopDetails,
          },
          { merge: true }
        )
        .then(() => {
          dispatch(shopDetails(myShopDetails));
          notify("success", "Added data successfully");
          console.log("Added data successfully");
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });

      db.collection("users")
        .doc(userDetailsLocal.id)
        .update({
          ...userDetailsLocal,
          shopOwnerPasscode,
          shopName,
          status: "admin",
        })
        .then(() => {
          dispatch(
            userDetails({
              ...userDetailsLocal,
              shopOwnerPasscode,
              shopName,
              status: "admin",
            })
          );
          notify("success", "Passcode added successfully");
          console.log("Added data successfully");
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
    } else {
      notify("error", "Fill the form completely");
    }
  };
  const inputRef1 = useRef(null);
  const inputRef2 = useRef(null);
  const inputRef3 = useRef(null);
  const inputRef4 = useRef(null);
  const inputRef5 = useRef(null);
  const inputRef6 = useRef(null);
  useEffect(() => {
    inputRef1.current.focus();
  }, []);

  let firstKeyDown = (e) => {
    if (e.key === "Enter") {
      inputRef2.current.focus();
    }
  };
  let secondKeyDown = (e) => {
    if (e.key === "Enter") {
      inputRef3.current.focus();
    }
  };
  let thirdKeyDown = (e) => {
    if (e.key === "Enter") {
      inputRef4.current.focus();
    }
  };
  let forthKeyDown = (e) => {
    if (e.key === "Enter") {
      inputRef5.current.focus();
    }
  };
  let fifthKeyDown = (e) => {
    if (e.key === "Enter") {
      inputRef6.current.focus();
    }
  };
  return (
    <>
      <div className={styling.Registration}>
        <form>
          <h2>
            {" "}
            Please fill the right and complete information. This information
            will reflect into your bills.
          </h2>
          <div className={styling.inputsRow}>
            <div className={styling.row}>
              <p>Shop Name</p>
              <input
                ref={inputRef1}
                onKeyDown={firstKeyDown}
                type="text"
                placeholder="shop name"
                value={shopName}
                onChange={(e) => setShopName(e.target.value)}
              />
            </div>
            <div className={styling.row}>
              <p>Shop Address</p>
              <input
                ref={inputRef2}
                onKeyDown={secondKeyDown}
                type="address"
                placeholder="enter shop address"
                value={shopAddress}
                onChange={(e) => setShopAddress(e.target.value)}
              />
            </div>
          </div>
          <div className={styling.inputsRow}>
            <div className={styling.row}>
              <p>Phone</p>
              <input
                ref={inputRef3}
                onKeyDown={thirdKeyDown}
                type="tel"
                placeholder="phone"
                value={shopPhone}
                onChange={(e) => setShopPhone(e.target.value)}
              />
            </div>
            <div className={styling.row}>
              <p>E mail</p>
              <input
                ref={inputRef4}
                onKeyDown={forthKeyDown}
                type="email"
                placeholder="email"
                value={shopMail}
                onChange={(e) => setShopMail(e.target.value)}
              />
            </div>
          </div>
          <div className={styling.inputsRow}>
            <div className={styling.row}>
              <p>Owner Name</p>
              <input
                ref={inputRef5}
                onKeyDown={fifthKeyDown}
                type="text"
                placeholder="owner name"
                value={shopOwnerName}
                onChange={(e) => setShopOwnerName(e.target.value)}
              />
            </div>
            <div className={styling.row}>
              <p>Passcode for employees</p>
              <input
                ref={inputRef6}
                type="password"
                placeholder="passcode"
                value={shopOwnerPasscode}
                onChange={(e) => setShopOwnerPasscode(e.target.value)}
              />
            </div>
          </div>
          <div className={styling.submitDiv}>
            {updateUser ? (
              <div
                className={styling.submitButton}
                onClick={() => updateUserProfile()}
              >
                Update Profile
              </div>
            ) : (
              <div
                className={styling.submitButton}
                onClick={() => registerCompany()}
              >
                Submit
              </div>
            )}
          </div>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}

export default Registration;
