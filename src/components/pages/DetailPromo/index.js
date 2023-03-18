import moment from "moment";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import HeaderBar from "../../navbar/HeaderBar";

export default function DetailPromo() {
  const location = useLocation();
  const { promo } = location.state;
  return (
    <React.Fragment>
      <HeaderBar />

      <div
        className="container-body pt-4"
        style={{
          marginTop: "-5px",
          position: "absolute",
          width: "414px",
          maxWidth: "100vw",
        }}
      >
        <div className="row">
          <div className="col-12">
            <img src={promo.promoImage} className="w-100 rounded" alt="" />
          </div>
        </div>

        <section>
          <div className="my-4">
            <h4 className="detail-title">{promo.name}</h4>

            <div className="mb-3">
              <small>
                <b>Promo Period</b>
              </small>
              <div className="d-flex justify-content-between">
                <div>
                  <small>
                    <span style={{ color: "#C4C4C4" }}>Start : </span>
                    {moment(promo.startingPeriod).format("dd, DD MMMM")}
                  </small>
                </div>
                <div>
                  <small>
                    <span style={{ color: "#C4C4C4" }}>Start : </span>
                    {moment(promo.endingPeriod).format("dd, DD MMMM")}
                  </small>
                </div>
              </div>
            </div>

            <div className="mb-3">
              <small>
                <b>Promo Detail</b>
              </small>

              <p>{promo.details}</p>
            </div>
          </div>
        </section>
      </div>
    </React.Fragment>
  );
}
