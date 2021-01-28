import React, { useEffect, useState } from "react";
import { Line, Bar } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import styling from "./Stock.module.css";

export default function Stock() {
  let salesItem = useSelector((state) => state.salesItem);

  let [totalItems, setTotalItems] = useState([]);
  let [totalItemsValue, setTotalItemsValue] = useState([]);

  useEffect(() => {
    if (Object.keys(salesItem).length) {
      setTotalItems(Object.keys(salesItem));
      let itemsQuantity = Object.values(salesItem).map((item) => item.quantity);
      setTotalItemsValue(itemsQuantity);
      console.log(itemsQuantity);
    }
  }, [salesItem]);
  console.log("ITEMS", totalItems);

  return (
    <div className={styling.bar}>
      <Bar
        data={{
          labels: totalItems,
          datasets: [
            {
              label: "Quantity",
              backgroundColor: "#5f6dda",
              data: totalItemsValue,
            },
          ],
        }}
        options={{
          legend: { display: false },
          title: { display: true, text: `Current Stock` },
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
        }}
      />
    </div>
  );
}
