import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import styling from "./Stock.module.css";

export default function Stock() {
  let salesItem = useSelector((state) => state.salesItem);

  let [totalItems, setTotalItems] = useState([]);
  let [totalItemsValue, setTotalItemsValue] = useState([]);
  let [colorsArray, setColorsArray] = useState([]);

  useEffect(() => {
    if (Object.keys(salesItem).length) {
      setTotalItems(Object.keys(salesItem));
      let itemsQuantity = Object.values(salesItem).map((item) => item.quantity);
      setTotalItemsValue(itemsQuantity);
      let colors = [];
      for (let i = 0; i < itemsQuantity.length; i++) {
        function r() {
          return Math.floor(Math.random() * 255);
        }
        var color = `rgba(${r()},${r()},${r()},0.7)`;
        colors.push(color);
      }
      setColorsArray(colors);
    }
  }, [salesItem]);
  console.log("ITEMS", totalItems);

  return (
    <div className={styling.bar}>
      <Doughnut
        data={{
          labels: totalItems,
          datasets: [
            {
              label: "Quantity",
              data: totalItemsValue,
              backgroundColor: colorsArray,
            },
          ],
        }}
        options={{
          legend: { display: false },
          title: { display: false, text: `Current Stock` },
        }}
      />
    </div>
  );
}
