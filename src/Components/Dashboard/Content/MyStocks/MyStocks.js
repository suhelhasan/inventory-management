import React, { useEffect, useState } from "react";
import styling from "./MyStocks.module.css";
import { useSelector, useDispatch } from "react-redux";
import { notify, ToastContainer } from "../../../Notify/Notify";
import { FiEdit2 } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import EditMyStock from "./EditMyStock/EditMyStock";
import firebase from "../../../../firebase/firebase";
import { salesItem } from "../../../../redux/actions/actions";

function MyStocks() {
  let [items, setItems] = useState([]);
  let [editStock, setEditStock] = useState(false);
  let [itemDetails, setItemDetails] = useState([]);
  let allItems = useSelector((state) => state.salesItem);
  let userInfo = useSelector((state) => state.user);
  let dispatch = useDispatch();

  let toggleEditScreen = (details) => {
    setEditStock(!editStock);

    if (details === "added") {
      notify("success", "Edited item successfully");
    } else if (details) {
      setItemDetails(details);
    }
  };

  useEffect(() => {
    let localArr = [];
    for (let item of Object.entries(allItems)) {
      localArr.push(item);
    }
    localArr = localArr.sort((a, b) => {
      if (a[0] < b[0]) {
        return -1;
      }
      if (a[0] > b[0]) {
        return 1;
      }
      return 0;
    });
    setItems(localArr);
  }, [allItems]);

  let deleteItem = (details) => {
    if (window.confirm("Are you sure you want to delete this item ?")) {
      delete allItems[details.itemName];
      let products = { ...allItems };

      const db = firebase.firestore();
      db.collection("shops")
        .doc(userInfo.shopName)
        .update({
          products,
        })
        .then(() => {
          dispatch(salesItem({ ...allItems }));
          notify("success", "Deleted item successfully");
          console.log("Deleted data successfully");
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
          notify("success", "Error occured");
        });
    }
  };

  return (
    <>
      <div className={styling.MyStocks}>
        {items.length ? (
          <table cellspacing="0">
            <thead>
              <tr>
                <th>S. No.</th>
                <th>Item Name</th>
                <th>Quantity</th>
                <th>Cost Price</th>
                <th>Selling Price</th>
                {userInfo.status === "admin" ? <th>Action</th> : null}
              </tr>
              {items.map((each, count) => (
                <tr>
                  <td>{count + 1}</td>
                  <td>{each[0]}</td>
                  <td>
                    {each[1].quantity} {each[1].measurment}
                  </td>
                  <td>{each[1].costPrice}</td>
                  <td>{each[1].sellingPrice}</td>
                  {userInfo.status === "admin" ? (
                    <td>
                      <FiEdit2
                        className={styling.editIcon}
                        onClick={() => {
                          toggleEditScreen(each[1]);
                        }}
                      />
                      <AiOutlineDelete
                        className={styling.deleteIcon}
                        onClick={() => deleteItem(each[1])}
                      />
                    </td>
                  ) : null}
                </tr>
              ))}
            </thead>
          </table>
        ) : (
          <h2>No Item is added</h2>
        )}
      </div>
      {editStock ? (
        <EditMyStock
          toggleEditScreen={toggleEditScreen}
          itemDetails={itemDetails}
        />
      ) : null}
      <ToastContainer />
    </>
  );
}

export default MyStocks;
