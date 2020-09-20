import React, { useState, useEffect } from "react";
import styling from "./EditMyStock.module.css";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import firebase from "../../../../../firebase/firebase";
import { salesItem } from "../../../../../redux/actions/actions";
import { notify, ToastContainer } from "../../../../Notify/Notify";

function EditMyStock({ toggleEditScreen, itemDetails }) {
  let [itemName, setItemName] = useState("");
  let [quantity, setQuantity] = useState("");
  let [measurment, setMeasurment] = useState("pieces");
  let [costPrice, setCostPrice] = useState("");
  let [sellingPrice, setSellingPrice] = useState("");
  let userInfo = useSelector((state) => state.user);
  let dispatch = useDispatch();

  useEffect(() => {
    if (itemDetails) {
      setItemName(itemDetails.itemName);
      setQuantity(itemDetails.quantity);
      setMeasurment(itemDetails.measurment);
      setCostPrice(itemDetails.costPrice);
      setSellingPrice(itemDetails.sellingPrice);
    }
  }, [itemDetails]);

  let updateItemToDB = () => {
    if (
      itemName.length > 2 &&
      parseInt(quantity) &&
      measurment &&
      parseInt(costPrice) &&
      parseInt(sellingPrice)
    ) {
      let itemDetails = {
        itemName,
        quantity: parseInt(quantity),
        measurment: measurment,
        costPrice: parseInt(costPrice),
        sellingPrice: parseInt(sellingPrice),
      };
      // let products = { ...allItems };
      // let products = { ...allItems };
      // products[itemName] = itemDetails;

      const db = firebase.firestore();
      db.collection("users")
        .doc(userInfo.id)
        .update({
          [`products.${itemName}`]: itemDetails,
        })
        .then(() => {
          toggleEditScreen("added");
          dispatch(salesItem({ [`${itemName}`]: itemDetails }));
          console.log("Added data successfully");
        })
        .catch((error) => {
          notify("error", "Something went wrong");
          console.error("Error adding document: ", error);
        });
    } else {
      notify("error", "All fields are required");
      console.log("error", "All fields are required");
    }
  };

  return (
    <>
      <div className={styling.EditMyStock}>
        <div className={styling.innerScreen}>
          <div className={styling.closeIconDiv}>
            <MdClose
              className={styling.closeIcon}
              onClick={() => toggleEditScreen()}
            />
          </div>
          <div className={styling.formContent}>
            <h2 className={styling.formHeading}>Edit Item</h2>

            <div>
              <div>Item Name</div>
              <input
                type="text"
                placeholder="edit item name"
                value={itemName}
              />
            </div>
            <div>
              <div>Quantity</div>
              <input
                type="number"
                placeholder="edit quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div>
              <div>Measurment</div>
              <select
                value={measurment}
                onChange={(e) => setMeasurment(e.target.value)}
              >
                <option value="pieces">pieces</option>
                <option value="kg">kg</option>
                <option value="liter">liter</option>
              </select>
            </div>
            <div>
              <div>Cost Price</div>
              <input
                type="number"
                placeholder="edit cost price"
                value={costPrice}
                onChange={(e) => setCostPrice(e.target.value)}
              />
            </div>
            <div>
              <div>Selling Price</div>
              <input
                type="text"
                placeholder="edit selling price"
                value={sellingPrice}
                onChange={(e) => setSellingPrice(e.target.value)}
              />
            </div>
            <button
              className={styling.updateButton}
              onClick={() => {
                updateItemToDB();
              }}
            >
              Update
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default EditMyStock;
