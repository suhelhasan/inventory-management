import React, { useState, useEffect } from "react";
import styling from "./AddItem.module.css";
import { useDispatch, useSelector } from "react-redux";
import { salesItem } from "../../../../redux/actions/actions";
import firebase from "../../../../firebase/firebase";
import { notify, ToastContainer } from "../../../Notify/Notify";

function AddItem() {
  let [itemName, setItemName] = useState("");
  let [quantity, setQuantity] = useState("");
  let [measurment, setMeasurment] = useState("pieces");
  let [costPrice, setCostPrice] = useState("");
  let [sellingPrice, setSellingPrice] = useState("");
  // let [totalItems, setTotalItems] = useState("");
  let [itemsArray, setItemsArray] = useState([]);

  let userInfo = useSelector((state) => state.user);
  let allItems = useSelector((state) => state.salesItem);
  let dispatch = useDispatch();

  useEffect(() => {
    // setTotalItems(allItems);

    let localArr = [];
    for (let item of Object.entries(allItems)) {
      localArr.push(item);
    }
    setItemsArray(localArr);
  }, [allItems]);

  let addItemToDB = () => {
    if (
      itemName.length > 2 &&
      parseInt(quantity) &&
      measurment &&
      parseInt(costPrice) &&
      parseInt(sellingPrice)
    ) {
      let itemDetails = {
        itemName,
        quantity: parseInt(quantity) + (allItems[itemName]?.quantity || 0),
        measurment: measurment,
        costPrice: parseInt(costPrice) + (allItems[itemName]?.costPrice || 0),
        sellingPrice: parseInt(sellingPrice),
      };
      let products = {};
      products[itemName] = itemDetails;

      const db = firebase.firestore();
      db.collection("users")
        .doc(userInfo.id)
        .set(
          {
            products,
          },
          { merge: true }
        )
        .then(() => {
          setItemName("");
          setQuantity("");
          setMeasurment("pieces");
          setCostPrice("");
          setSellingPrice("");
          dispatch(salesItem({ ...products }));
          notify("success", "Added data successfully");
          console.log("Added data successfully");
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
    } else {
      notify("error", "All fields are required");
    }
  };

  return (
    <>
      <div className={styling.AddItem}>
        <form className={styling.AddItemContent}>
          <div className={styling.formHeading}>Item Details</div>
          <div className={styling.row}>
            <p>Item Name</p>
            <input
              type="text"
              value={itemName}
              placeholder="enter item name"
              list="items"
              onChange={(e) => setItemName(e.target.value.toLowerCase())}
            />
            <datalist id="items">
              {itemsArray.map((eachItem) => (
                <option key={eachItem[0]}>{eachItem[0]}</option>
              ))}
            </datalist>
          </div>
          <div className={styling.row}>
            <p>Quantity</p>
            <input
              type="number"
              value={quantity}
              placeholder="enter quantity"
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          <div className={styling.row}>
            <p>Measurment</p>
            <select
              value={measurment}
              onChange={(e) => setMeasurment(e.target.value)}
            >
              <option value="pieces">pieces</option>
              <option value="kg">kg</option>
              <option value="liter">liter</option>
            </select>
          </div>
          <div className={styling.row}>
            <p>Cost Price(total items)</p>
            <input
              type="number"
              value={costPrice}
              placeholder="enter cost price"
              onChange={(e) => setCostPrice(e.target.value)}
            />
          </div>
          <div className={styling.row}>
            <p>Selling Price(each item)</p>
            <input
              type="number"
              value={sellingPrice}
              placeholder="enter selling price"
              onChange={(e) => setSellingPrice(e.target.value)}
            />
          </div>

          <button
            className={styling.updateButton}
            onClick={(e) => {
              e.preventDefault();
              addItemToDB();
            }}
          >
            Add Item to Stock
          </button>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}

export default AddItem;
