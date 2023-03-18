import React, { useState } from "react";
import { useSelector } from "react-redux";
import TenantInfo from "./TenantInfo";

export default function Header() {
  const tenant = useSelector((state) => state.tenant);
  const [showInfo, setShowInfo] = useState(false);
  //   OpeningDays;
  const { profileImage, name, location, address } = tenant;

  let activeOrder = useSelector((state) => state.order);
  if (activeOrder.length > 0) {
    activeOrder = activeOrder.filter((item) => {
      return item.order_status < 5;
    });
  }
  return (
    <React.Fragment>
      <section className="header">
        <div className="row custom-gutter">
          <div className="col-2">
            <img className="rounded header-image" src={profileImage} alt="" />
          </div>
          <div className="col-10">
            <h6 className="header-title">{name}</h6>
            <div className="header-text">
              <i
                className="material-icons-outlined mr-1"
                style={{ fontSize: "14px" }}
              >
                location_on
              </i>
              {location}
              <br />
              {address}
            </div>

            <div>
              <button
                className="btn btn-outline-light header-btn mr-2"
                onClick={() => setShowInfo(true)}
              >
                Info
              </button>

              {/* <button
                className="btn btn-light header-btn mr-2"
                onClick={() => {
                  localStorage.clear();
                  localStorage.setItem(
                    "currFoodcourt",
                    JSON.stringify({
                      id: "F-Ha7dmTLi",
                      color: "#424242",
                    })
                  );
                  localStorage.setItem("cart", JSON.stringify([]));
                  window.location.reload();
                }}
              >
                Clear Cache
              </button> */}
            </div>
          </div>
        </div>
      </section>

      {Object.keys(tenant).length > 0 && (
        <TenantInfo
          openingDays={tenant.openingDays}
          show={showInfo}
          onHide={() => setShowInfo(false)}
        />
      )}
    </React.Fragment>
  );
}
