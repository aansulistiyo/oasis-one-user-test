import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { setColor } from "../../../redux/actions/utilsAction";
import HeaderBar from "../../navbar/HeaderBar";
import CallForBill from "./CallForBill";

import cashierPayment from "../../../assets/images/cashierPayment.png";
import onlinePayment from "../../../assets/images/onlinePayment.png";
import OnlinePayment from "./OnlinePayment";

export default function Payment() {
  const dispatch = useDispatch();
  const currColor = localStorage.getItem("color");
  const color = useSelector((state) => state.color);
  const location = useLocation();
  const { tenant, order } = location.state;

  useEffect(() => {
    dispatch(setColor(currColor));
  }, []);

  const [paymentMethod, setPaymentMethod] = useState("cashier");

  return (
    <React.Fragment>
      <HeaderBar />

      <div
        className="container-body"
        style={{ position: "absolute", width: "414px", maxWidth: "100vw" }}
      >
        <section>
          <h4 className="section-title">Payment Method</h4>

          <div className="row">
            <div className="col-6">
              <div
                className={`card card-payment-button ${
                  paymentMethod === "cashier" ? "active" : ""
                }`}
                onClick={() => setPaymentMethod("cashier")}
              >
                <div className="card-body">
                  <img width={41} height={41} src={cashierPayment} alt="" />
                  <div className="my-3">Pay at Cashier</div>
                </div>
              </div>
            </div>

            <div className="col-6">
              <div
                className={`card card-payment-button ${
                  paymentMethod === "online" ? "active" : ""
                }`}
              >
                <div className="card-body">
                  <img width={41} height={41} src={onlinePayment} alt="" />
                  <div className="my-3">Online Payment</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {paymentMethod === "cashier" ? (
          <CallForBill currOrder={order} />
        ) : (
          <OnlinePayment currOrder={order} />
        )}
      </div>
      <ToastContainer limit={1} />
    </React.Fragment>
  );
}
