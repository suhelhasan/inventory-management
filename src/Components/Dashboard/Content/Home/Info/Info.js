import React, { useEffect, useState } from "react";
import styling from "./Info.module.css";
import TopSellingProducts from "../Graphs/Top-Selling-Products/Top-Selling-Products";
import Stock from "../Graphs/Stock/Stock";
import { useSelector, useDispatch } from "react-redux";
import { Line } from "react-chartjs-2";
import { MdFavoriteBorder } from "react-icons/md";
import { BiCart } from "react-icons/bi";
import { AiOutlineStock } from "react-icons/ai";
import { salesRecord } from "../../../../../redux/actions/actions";

export default function Info() {
  let [todaysSell, setTodaysSell] = useState(0);
  let [monthlyTotalSell, setMonthlyTotalSell] = useState(0);
  let [previousMonthSell, setPreviousMonthSell] = useState(0);
  let [lastMonthSell, setLastMonthSell] = useState(0);
  let [oneDayVisits, setOneDayVisits] = useState(0);
  let [monthlyVisits, setMonthlyVisits] = useState(0);
  // let [colors, setColors] = useState([]);
  let entireHistory = useSelector((state) => state.salesHistory);
  // let salesHistoryRecord = useSelector((state) => state.salesRecord);
  const dispatch = useDispatch();
  var today = new Date();
  let date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

  useEffect(() => {
    if (Object.keys(entireHistory).length) {
      console.log("ENDKFOFJNFIG HISTORY;;;;", entireHistory);
      let todaysTOTAL = 0;
      if (entireHistory[date]) {
        let todaysData = Object.values(entireHistory[date]);
        setOneDayVisits(todaysData.length);
        dispatch(salesRecord({ todaysCustomersVisit: oneDayVisits }));
        for (let i = 0; i < todaysData.length; i++) {
          for (let j = 0; j < todaysData[i].length; j++) {
            todaysTOTAL += todaysData[i][j].price;
          }
        }
      } else {
        dispatch(salesRecord({ todaysCustomersVisit: oneDayVisits }));
      }
      setTodaysSell(todaysTOTAL);
      dispatch(salesRecord({ todaysSellTotal: todaysTOTAL }));

      let randomColors = [];
      let everyMonthTotal = (specificMonth) => {
        let monthlyTotal = [];

        const filtered = Object.keys(entireHistory) // eslint-disable-next-line
          .filter((key) => key[5] == today.getMonth() + specificMonth)
          .reduce((obj, key) => {
            obj[key] = entireHistory[key];
            return obj;
          }, {});
        let monthly = 0;
        for (let oneDay in filtered) {
          let oneDayCollection = 0;
          monthly += Object.keys(filtered[oneDay]).length;

          for (let eachSell in filtered[oneDay]) {
            let something = filtered[oneDay][eachSell];
            for (let i = 0; i < something.length; i++) {
              oneDayCollection += something[i].price;
            }
          }
          monthlyTotal.push(oneDayCollection);
        }
        setMonthlyVisits(monthly);
        dispatch(salesRecord({ monthlyVisits: monthly }));

        if (specificMonth === 1) {
          let currentMonth = monthlyTotal.reduce((a, b) => a + b, 0);
          setMonthlyTotalSell(currentMonth);
          dispatch(salesRecord({ currentMonthSales: currentMonth }));
        } else if (specificMonth === 0) {
          let previousMonth = monthlyTotal.reduce((a, b) => a + b, 0);
          setPreviousMonthSell(previousMonth);
          dispatch(salesRecord({ previousMonthSales: previousMonth }));
        } else if (specificMonth === -1) {
          let lastMonth = monthlyTotal.reduce((a, b) => a + b, 0);
          setLastMonthSell(lastMonth);
          dispatch(salesRecord({ lastMonthSales: lastMonth }));
        }

        function r() {
          return Math.floor(Math.random() * 255);
        }
        var color = `rgba(${r()},${r()},${r()},0.7)`;
        randomColors.push(color);
      };
      everyMonthTotal(-1);
      everyMonthTotal(0);
      everyMonthTotal(1);
    }
    // eslint-disable-next-line
  }, [entireHistory]);

  return (
    <div className={styling.info}>
      <div className={styling.cards}>
        <div className={styling.card}>
          <h2>Today's Sell</h2>
          <h2>{todaysSell} ₹</h2>
        </div>
        <div className={styling.card}>
          <h2>Today's Visit</h2>
          <h2>{oneDayVisits} </h2>
        </div>
        <div className={styling.card}>
          <h2>This month Sell</h2>
          <h2>{monthlyTotalSell} ₹</h2>
        </div>
        <div className={styling.card}>
          <h2>This month Visits</h2>
          <h2>{monthlyVisits} </h2>
        </div>
      </div>
      <div className={styling.TopSellingProducts}>
        <div className={styling.sellingText}>
          <h1>
            Top Selling Items &nbsp; <MdFavoriteBorder />
          </h1>
          <h3>According to last 3 months data</h3>
        </div>
        <div className={styling.productsGraphs}>
          <TopSellingProducts />
        </div>
      </div>
      <div className={styling.Stock}>
        <div className={styling.stockBar}>
          <Stock />
        </div>
        <div className={styling.stockText}>
          <h1>
            Items in Stock &nbsp; <BiCart />
          </h1>
          <h3>Hower over the chart to see the data</h3>
        </div>
      </div>

      <div className={styling.monthlyGrowth}>
        <div className={styling.monthlyText}>
          <h1>
            Monthly Progress &nbsp; <AiOutlineStock />
          </h1>
          <h3>Last three month progress in INR</h3>
        </div>
        <div className={styling.monthlyBar}>
          <Line
            data={{
              labels: ["Apr", "May", "Jun"],
              datasets: [
                {
                  label: "Quantity",
                  backgroundColor: "rgba(28, 33, 68, 0.3)",
                  borderColor: "#1c2144",
                  borderWidth: 1,
                  data: [lastMonthSell, previousMonthSell, monthlyTotalSell],
                },
              ],
            }}
            options={{
              legend: { display: false },
              title: { display: false, text: `3 month growth` },
            }}
          />
        </div>
      </div>
    </div>
  );
}
