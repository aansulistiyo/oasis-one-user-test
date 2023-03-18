import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import formatCurrency from "../../../utils/formatCurrency";
import DetailCurrentOrder from "./DetailCurrentOrder";
import { useDispatch } from "react-redux";
import { setSocket } from "../../../redux/actions/utilsAction";

export default function CurrentOrderCard({ order }) {
  const [tenant, setTenant] = useState([]);
  const [showDetail, setShowDetail] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchTenant = async (id) => {
      const response = await axios
        .get("https://backend.oasis-one.com/api/tenant/user/" + id)
        .catch((err) => {
          console.log("Error: ", err);
        });
      const data = response.data.data;
      setTenant(data);
    };
    fetchTenant(order.tenant_id);
  }, [order]);

  return (
    <div className="col-12">
      <div className="card order-card mb-3">
        <div className="card-body p-2">
          <table className="table table-order table-borderless">
            <thead className="p-0">
              <tr>
                <th className="text-orange" colSpan={3}>
                  {order.order_id}
                </th>
              </tr>
              <tr>
                <th colSpan={2}>Store: {tenant.name}</th>
                <td
                  className="btn-detail"
                  onClick={() => {
                    dispatch(setSocket({ tenant_id: tenant.tenant_id }));
                    setShowDetail(true);
                  }}
                >
                  View Details
                </td>
              </tr>
              <tr>
                <th colSpan={3}>
                  Time:&nbsp;
                  {moment(order.order_time).format("MMMM, Do YYYY; h:mm:ss a")}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-top">
                <td>Bill Amount :</td>
                <td colSpan={2} className="order-bills">
                  {formatCurrency(order.order_total)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {showDetail ? (
        <DetailCurrentOrder
          order={order}
          tenant={tenant}
          show={showDetail}
          onHide={() => setShowDetail(false)}
        />
      ) : (
        ""
      )}
    </div>
  );
}
