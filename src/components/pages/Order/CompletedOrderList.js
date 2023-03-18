import { useSelector } from "react-redux";
import OrderCard from "./OrderCard";

export default function CompletedOrderList() {
  let orderData = useSelector((state) => state.order);
  if (orderData.length > 0) {
    orderData = orderData.filter((item) => {
      return item.order_status >= 5;
    });
  }

  const color = useSelector((state) => state.color);
  return (
    <section style={{ marginBottom: "100px" }}>
      <h4 className="section-title">Complete Order</h4>
      <div className="row">
        {orderData.length > 0 ? (
          orderData.map((order) => {
            return <OrderCard order={order} key={order.order_id} />;
          })
        ) : (
          <div className="col-12 text-center my-5">
            <div className="text-empty-state">
              Looks like you don’t have any Complete Order status
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
