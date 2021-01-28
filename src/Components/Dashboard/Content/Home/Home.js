import React, { useEffect, useState } from "react";
import styling from "./Home.module.css";
import Stock from "./Graphs/Stock/Stock";
// import {  } from "../../../../redux/actions/actions";
import Header from "./Header/Header";

function Home() {
  return (
    <div className={styling.Home}>
      <Header />
      <div className={styling.bars}>
        <Stock />
      </div>
    </div>
  );
}

export default Home;
