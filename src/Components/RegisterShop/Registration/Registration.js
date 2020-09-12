import React, { useState, useEffect, useRef } from "react";
import styling from "./Registration.module.css";
import firebase from "../../../firebase/firebase";
import { useSelector, useDispatch } from "react-redux";
import { userDetails } from "../../../redux/actions/actions";

function Registration() {
  let dispatch = useDispatch();

  let [shopName, setShopName] = useState("");
  let [shopAddress, setShopAddress] = useState("");
  let [shopPhone, setShopPhone] = useState("");
  let [shopMail, setShopMail] = useState("");
  let [shopOwnerName, setShopOwnerName] = useState("");
  let [shopOwnerPhone, setShopOwnerPhone] = useState("");
  let [updateUser, setUpdateUser] = useState(false);

  let userInfo = useSelector((state) => state.user);

  useEffect(() => {
    if (userInfo.shopDetails) {
      console.log("ALL DATA", userInfo);
      setShopName(userInfo.shopDetails.shopName);
      setShopAddress(userInfo.shopDetails.shopAddress);
      setShopPhone(userInfo.shopDetails.shopPhone);
      setShopMail(userInfo.shopDetails.shopMail);
      setShopOwnerName(userInfo.shopDetails.shopOwnerName);
      setShopOwnerPhone(userInfo.shopDetails.shopOwnerPhone);
      setUpdateUser(true);
    }
  }, [userInfo]);

  let updateUserProfile = () => {
    if (
      shopName.length > 3 &&
      shopAddress.length > 3 &&
      shopPhone.length > 3 &&
      shopMail.length > 3 &&
      shopOwnerName.length > 3 &&
      shopOwnerPhone.length > 3
    ) {
      let shopDetails = {
        shopName,
        shopAddress,
        shopPhone,
        shopMail,
        shopOwnerName,
        shopOwnerPhone,
      };
      const db = firebase.firestore();
      db.collection("users")
        .doc(userInfo.id)
        .update({
          shopDetails,
        })
        .then(() => {
          dispatch(userDetails({ ...userInfo, shopDetails }));
          alert("Updated data Successfully ");
          console.log("Update data successfully");
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
    } else {
      alert("You probably missing something");
    }
  };

  let registerCompany = () => {
    if (
      shopName.length > 3 &&
      shopAddress.length > 3 &&
      shopPhone.length > 3 &&
      shopMail.length > 3 &&
      shopOwnerName.length > 3 &&
      shopOwnerPhone.length > 3
    ) {
      let shopDetails = {
        shopName,
        shopAddress,
        shopPhone,
        shopMail,
        shopOwnerName,
        shopOwnerPhone,
      };
      const db = firebase.firestore();
      db.collection("users")
        .doc(userInfo.id)
        .set(
          {
            shopDetails,
          },
          { merge: true }
        )
        .then(() => {
          dispatch(userDetails({ ...userInfo, shopDetails }));
          alert("Added data successfully");
          console.log("Added data successfully");
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
    } else {
      alert("You probably missing something");
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
    <div className={styling.Registration}>
      <form>
        <h2>
          {" "}
          Please fill the right and complete information. This information will
          reflect into your bills.
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
            <p>Owner Phone</p>
            <input
              ref={inputRef6}
              type="tel"
              placeholder="phone"
              value={shopOwnerPhone}
              onChange={(e) => setShopOwnerPhone(e.target.value)}
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
  );
}

export default Registration;
