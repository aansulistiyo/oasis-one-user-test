import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import Recommendicon from "../../../assets/icons/Recommend.png";
function TenantCard({ tenant_id }) {
  const color = useSelector((state) => state.color);

  const [detail, setDetail] = useState([]);
  useEffect(() => {
    const fetchDetailTenant = async () => {
      const data = await fetch(
        "https://backend.oasis-one.com/api/tenant/user/" + tenant_id
      );

      const items = await data.json();

      setDetail(items.data);
    };
    fetchDetailTenant();
  }, [tenant_id]);

  return (
    <div className="col-12">
      <div
        className="card tenant-card d-flex flex-row"
        style={{ opacity: detail.isOperational ? "1" : "0.5" }}
      >
        <div className="align-self-center">
          <img className="tenant-image" src={detail.profileImage} alt="" />
        </div>
        <div className="ml-2 flex-grow-1 align-self-center">
          <img src={Recommendicon} alt="" />
          <h4 className="tenant-title">{detail.name}</h4>
          <span className="tenant-time">08:30 - 20:30</span>
        </div>

        {detail.isOperational ? (
          <div className="align-self-center ">
            <Link
              to={"/tenant/" + detail.tenant_id}
              style={{
                textDecoration: "none",
              }}
            >
              <button
                className="btn btn-danger btn-sm tenant-card-btn"
                style={{ background: color, borderColor: color }}
              >
                <i className="material-icons-outlined">keyboard_arrow_right</i>
              </button>
            </Link>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default TenantCard;
