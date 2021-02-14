import React, { useEffect } from "react";
import styling from "./Home.module.css";
import Header from "./Header/Header";
import Info from "./Info/Info";
import { useSelector } from "react-redux";

function Home() {
  let currentSalesRecord = useSelector((state) => state.salesRecord);

  useEffect(() => {
    console.log("CURRENT SALES RECORDS", currentSalesRecord);
  }, [currentSalesRecord]);

  return (
    <div className={styling.Home}>
      <Header />
      <Info />
    </div>
  );
}

export default Home;
