import React from "react";
import styling from "./Home.module.css";
import Stock from "./Graphs/Stock/Stock";
import TopSellingProduct from "./Graphs/Top-Selling-Products/Top-Selling-Products";
// import {  } from "../../../../redux/actions/actions";
import Header from "./Header/Header";

function Home() {
  return (
    <div className={styling.Home}>
      <Header />
      <div className={styling.bars}>
        <Stock />
        <TopSellingProduct />
      </div>
    </div>
  );
}

export default Home;
