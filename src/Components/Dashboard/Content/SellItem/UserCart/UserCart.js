import React from "react";
import styling from "./UserCart.module.css";
import { useDispatch, useSelector } from "react-redux";
import { removeCustomerItems } from "../../../../../redux/actions/actions";
import { AiOutlineDelete } from "react-icons/ai";
import { notify, ToastContainer } from "../../../../Notify/Notify";

function UserCart() {
  let userCart = useSelector((state) => state.userCart);

  let dispatch = useDispatch();
  let deleteItem = (details) => {
    if (window.confirm("Are you sure you want to delete this item ?")) {
      dispatch(removeCustomerItems(details));
      notify("error", "Item Removed");
    }
  };

  return (
    <>
      {userCart.length ? (
        <>
          <table className={styling.UserCart} cellspacing="0">
            <tr>
              <th>S. No.</th>
              <th>Item Name</th>
              <th>Quantity</th>
              <th>Price/kg</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
            {userCart.map((each, count) => (
              <tr>
                <td>{count + 1}</td>
                <td>{each.itemName}</td>
                <td>
                  {each.quantity} {each.measurment}
                </td>
                <td>{each.sellingPrice}</td>
                <td>{each.price}</td>
                <td>
                  <AiOutlineDelete
                    onClick={() => deleteItem(each)}
                    className={styling.deleteIcon}
                  />
                </td>
              </tr>
            ))}
          </table>
        </>
      ) : null}
      <ToastContainer />
    </>
  );
}
export default UserCart;
