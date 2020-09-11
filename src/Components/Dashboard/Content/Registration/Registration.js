import React, { useState, useEffect } from "react";
import styling from "./Registration.module.css";

function Registration() {
  return (
    <div className={styling.Registration}>
      <form>
        <label htmlFor="shopname"></label>
        <input type="text" />
      </form>
    </div>
  );
}

export default Registration;
