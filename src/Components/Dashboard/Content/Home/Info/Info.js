import React, { useEffect, useState } from "react";
import styling from "./Info.module.css";
import { useSelector } from "react-redux";

export default function Info() {
  let [todaysSell, setTodaysSell] = useState([]);
  let [allSell, setAllSell] = useState([]);
  let entireHistory = useSelector((state) => state.salesHistory);
  var today = new Date();
  let date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

  useEffect(() => {
    if (Object.keys(entireHistory).length) {
      let todaysTOTAL = 0;
      if (entireHistory[date]) {
        let todaysData = Object.values(entireHistory[date]);
        for (let i = 0; i < todaysData.length; i++) {
          for (let j = 0; j < todaysData[i].length; j++) {
            todaysTOTAL += todaysData[i][j].price;
          }
        }
      }

      setTodaysSell(todaysTOTAL);
    }
  }, [entireHistory]);
  return (
    <div>
      <h1>Today's Sell: {todaysSell} ₹</h1>
    </div>
  );
}
