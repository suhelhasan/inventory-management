import React, { useEffect, useState } from "react";
import { Line, Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";
import styling from "./Top-Selling-Products.module.css";

export default function TopSellingProducts() {
  let entireHistory = useSelector((state) => state.salesHistory);
  let [totalItems, setTotalItems] = useState([]);
  let [totalItemsValue, setTotalItemsValue] = useState([]);
  let [colorsArray, setColorsArray] = useState([]);

  useEffect(() => {
    if (Object.keys(entireHistory).length) {
      let all = {};
      for (let oneDay in entireHistory) {
        for (let eachSell in entireHistory[oneDay]) {
          // console.log(entireHistory[oneDay][eachSell]);
          for (let i = 0; i < entireHistory[oneDay][eachSell].length; i++) {
            let itemName = entireHistory[oneDay][eachSell][i].itemName;
            all[itemName] = all[itemName]
              ? all[itemName] + entireHistory[oneDay][eachSell][i].quantity
              : entireHistory[oneDay][eachSell][i].quantity;
          }
        }
      }
      setTotalItems(Object.keys(all));
      setTotalItemsValue(Object.values(all));
      let colors = [];
      for (let i = 0; i < Object.keys(all).length; i++) {
        function r() {
          return Math.floor(Math.random() * 255);
        }
        var color = `rgba(${r()},${r()},${r()},0.7)`;
        colors.push(color);
      }
      setColorsArray(colors);
    }
  }, [entireHistory]);

  return (
    // <div className={styling.bar}>
    <Bar
      className={styling.myGraph}
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
        title: { display: false, text: `Top Selling Products` },
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
    // </div>
  );
}
