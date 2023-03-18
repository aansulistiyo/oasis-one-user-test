import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setColor } from "../../../redux/actions/utilsAction";
import HeaderBar from "../../navbar/HeaderBar";
import { setOrder } from "../../../redux/actions/orderAction";
import CurrentOrderList from "./CurrentOrderList";
import CompletedOrderList from "./CompletedOrderList";

export default function Order() {
  const dispatch = useDispatch();
  const currFoodcourt = JSON.parse(localStorage.getItem("currFoodcourt"));
  const orderData = useSelector((state) => state.order);
  const color = useSelector((state) => state.color);

  const [isLoading, setIsLoading] = useState(true);
  const user_id = localStorage.getItem("user_id");
  // console.log("USERR", user_id);
  useEffect(() => {
    // FETCH ORDER DATA
    const interval = setInterval(() => {
      async function fetchOrder(user_id) {
        const response = await axios
          .get("https://backend.oasis-one.com/api/order/user/" + user_id)
          .catch((err) => {
            console.log("Error: ", err);
          });
        const data = response.data.data;
        dispatch(setOrder(data));
        setIsLoading(false);
      }
      fetchOrder(user_id);
      // dispatch(setColor(currFoodcourt["color"]));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <React.Fragment>
      <HeaderBar />

      <div className="container-body">
        {!isLoading ? (
          <div>
            <CurrentOrderList />
            <CompletedOrderList />
          </div>
        ) : (
          <div className="d-flex justify-content-center mt-5">
            <div className="spinner-grow text-success mr-3" role="status">
              <span className="sr-only">Loading...</span>
            </div>
            <div className="spinner-grow text-success mr-3" role="status">
              <span className="sr-only">Loading...</span>
            </div>
            <div className="spinner-grow text-success mr-3" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )}
      </div>
    </React.Fragment>
  );
}
