import axios from "axios";
import DOMPurify from "dompurify";
import { useEffect, useState } from "react";

export default function OnlinePayment({ currOrder }) {
  const [paymentSignature, setPaymentSignature] = useState({});

  useEffect(() => {
    // REQUEST PAYMENT SIGNATURE
    async function fetchPaymentSignature(order) {
      const payload = {
        order_id: order.order_id,
        amount:
          order.order_total + order.order_taxcharge + order.order_servicecharge,
      };
      const url =
        "https://backend.oasis-one.com/api/payment/signature/payment-operations";

      try {
        const response = await axios.post(url, payload);
        const data = response.data.data;
        setPaymentSignature(data);
      } catch (error) {
        console.log("ERROR: ", error.message);
      }
    }

    fetchPaymentSignature(currOrder);
  }, []);

  if (Object.keys(paymentSignature).length !== 0) {
    window.location.href = paymentSignature.url;
  }

  // return paymentPage === "" ? "Test" : PaymentPage(paymentPage);
  return "";
}
