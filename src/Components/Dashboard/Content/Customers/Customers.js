import React, { useEffect, useState } from "react";
import styling from "./Customers.module.css";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineDelete } from "react-icons/ai";
import { deleteCustomer } from "../../../../redux/actions/actions";
import { notify, ToastContainer } from "../../../Notify/Notify";
import firebase from "../../../../firebase/firebase";

function Customers() {
  let customers = useSelector((state) => state.customers);
  let userInfo = useSelector((state) => state.user);
  let [totalCustomers, setTotalCustomers] = useState([]);
  let dispatch = useDispatch();

  useEffect(() => {
    let localArr = [];
    for (let item of Object.entries(customers)) {
      localArr.push(item);
    }
    localArr = localArr.sort((a, b) => {
      if (a[0] < b[0]) {
        return -1;
      }
      if (a[0] > b[0]) {
        return 1;
      }
      return 0;
    });
    setTotalCustomers(localArr);
  }, [customers]);

  let removeCustomer = (customer) => {
    if (window.confirm("Are you sure you want to delete customer")) {
      let key = customer[1].customerPhone;
      let filteredCustomers = { ...customers };
      delete filteredCustomers[key];

      const db = firebase.firestore();
      db.collection("shops")
        .doc(userInfo.shopName)
        .update({
          customers: filteredCustomers,
        })
        .then(() => {
          notify("error", "Deleted customer successfully");
          dispatch(deleteCustomer(filteredCustomers));
        })
        .catch((error) => {
          notify("error", "Something went wrong");
        });
    }
  };

  return (
    <>
      <div className={styling.Customers}>
        {totalCustomers.length ? (
          <table cellspacing="0">
            <thead>
              <tr>
                <th>S. No.</th>
                <th>Customer Name</th>
                <th>Phone</th>
                <th>Action</th>
              </tr>
              {totalCustomers.map((customer, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{customer[1].customerName}</td>
                  <td>{customer[1].customerPhone}</td>
                  <td>
                    {" "}
                    <AiOutlineDelete
                      onClick={(e) => {
                        e.preventDefault();
                        removeCustomer(customer);
                      }}
                      className={styling.deleteIcon}
                    />
                  </td>
                </tr>
              ))}
            </thead>
          </table>
        ) : (
          <h1>NO CUSTOMERS AVAILABLE</h1>
        )}
      </div>
      <ToastContainer />
    </>
  );
}

export default Customers;
