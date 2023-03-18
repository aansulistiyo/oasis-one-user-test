import { useSelector } from "react-redux";
import CartReceiptTable from "./CartReceiptTable";
export default function CartReceipts() {
  const carts = useSelector((state) => state.cart);
  return (
    <section>
      <div className="row scrolling-wrapper-x flex-row flex-nowrap pt-0 mt-0">
        {carts.map((cart) => {
          return <CartReceiptTable cart={cart} key={cart.tenant_id} />;
        })}
      </div>
    </section>
  );
}
