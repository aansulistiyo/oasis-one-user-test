import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { SocketContext } from "../../../context/socketContext";

export default function CallForBill({ currOrder }) {
  const [order, setOrder] = useState({});
  const history = useHistory();
  const socket = useContext(SocketContext);

  useEffect(() => {
    if (socket) {
      socket.on("add order", (data) => handleOrderAdded(data));
      socket.on("update order", (data) => handleOrderUpdated(data));
    }
  });

  function handleOrderAdded(data) {
    console.log("SOCKET", data);
  }

  function handleOrderUpdated(data) {
    data = data.filter((item) => {
      return item.order_id === order.order_id;
    });
    if (data.length !== 0) {
      setOrder(data[0]);
    }
  }

  const notify = (message) =>
    toast(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      className: "toast-message",
    });

  if (order.order_status >= 3) {
    notify("Payment success...");
    setInterval(() => {
      window.location = "/PaymentSuccess";
    }, 1000);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      // FETCH ORDER DATA
      async function fetchOrder(id) {
        const response = await axios
          .get("https://backend.oasis-one.com/api/order/" + id)
          .catch((err) => {
            console.log("Error: ", err);
          });
        const data = response.data.data[0];
        setOrder(data);
      }

      fetchOrder(currOrder.order_id);
      // dispatch(setColor(currFoodcourt["color"]));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // async function callForBill() {
  //   const url = `https://backend.oasis-one.com/api/order/edit/${order.tenant_id}/${order.order_id}`;
  //   try {
  //     const response = await axios.post(
  //       url,
  //       JSON.stringify({
  //         order_status: order.order_status + 1,
  //         order_table: order.order_table,
  //       }),
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );
  //     const result = response.data;

  //     if (result.status === "SUCCESS") {
  //       if (socket) {
  //         socket.emit("update order", result.data);
  //       }
  //     }
  //   } catch (error) {
  //     console.log("ERROR", error.message);
  //   }
  // }

  return (
    <React.Fragment>
      <section className="my-5">
        <h4 className="section-title">Complete the Payment</h4>

        <div className="row">
          <div className="col-12 payment-text">
            <p>
              Payment at cashier we accept payments via cash or by card ( Debit
              or Credit card ).
            </p>
            <p>
              To make a payment, press the button below to ask our staff for a
              bill, after this you will only be able to make payments at the
              cashier
            </p>

            {/* <div className="text-center my-5">
              <button
                className={`btn btn-payment${
                  order.order_status > 2 ? "-waiting" : ""
                }`}
                onClick={(e) => {
                  // requestPayment(e);
                  console.log("Call Waiter For Bill");
                }}
                disabled={order.order_status > 2 ? true : false}
              >
                {order.order_status > 2 ? "Waiting for Bills" : "Call for Bill"}
              </button>
            </div> */}
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}
