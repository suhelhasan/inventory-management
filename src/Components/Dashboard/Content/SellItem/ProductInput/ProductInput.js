import React, { useEffect, useState } from "react";
import styling from "./ProductInput.module.css";
import { useDispatch, useSelector } from "react-redux";
import { customerItems } from "../../../../../redux/actions/actions";

function ProductInput() {
  let allItems = useSelector((state) => state.salesItem);

  let [itemsArray, setItemsArray] = useState([]);
  let [itemName, setItemName] = useState("");
  let [quantity, setQuantity] = useState("");
  let [measurment, setMeasurment] = useState("");
  let [price, setPrice] = useState(0);

  useEffect(() => {
    let localArr = [];
    for (let item of Object.entries(allItems)) {
      localArr.push(item);
    }
    setItemsArray(localArr);
  }, [allItems]);

  useEffect(() => {
    if (itemName) {
      setMeasurment(allItems[itemName].measurment);
      setPrice(allItems[itemName].sellingPrice);
      setQuantity(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemName]);

  useEffect(() => {
    if (itemName) {
      setPrice(allItems[itemName].sellingPrice * quantity);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quantity]);

  let dispatch = useDispatch();

  let addItem = () => {
    let item = {
      itemName,
      quantity,
      measurment,
      price,
      sellingPrice: allItems[itemName].sellingPrice,
    };
    dispatch(customerItems([item]));
    setItemName("");
    setQuantity(0);
    setMeasurment("");
    setPrice(0);
  };
  let removeItem = () => {
    setItemName("");
    setQuantity(0);
    setMeasurment("");
    setPrice(0);
  };
  return (
    <form className={styling.ProductInput}>
      <table cellspacing="0">
        <tr>
          <th>Product</th>
          <th>Quantity</th>
          <th>Measurment</th>
          <th>Price</th>
          <th>Action</th>
        </tr>
        <tr>
          <td>
            {" "}
            <select
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            >
              <option value="" disabled selected>
                Select Product
              </option>
              {itemsArray.map((eachItem) => (
                <option value={eachItem[0]} key={eachItem[0]}>
                  {eachItem[0]}
                </option>
              ))}
            </select>
          </td>
          <td>
            {" "}
            <input
              type="number"
              value={quantity}
              list="items"
              onChange={(e) => setQuantity(e.target.value)}
            />
          </td>
          <td>{measurment ? measurment : "---"}</td>
          <td>{price ? price : "--"}</td>
          <td>
            <button
              onClick={(e) => {
                e.preventDefault();
                addItem();
              }}
            >
              ADD
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                removeItem();
              }}
            >
              DEL
            </button>
          </td>
        </tr>
      </table>
    </form>
  );
}

export default ProductInput;
