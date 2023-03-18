import React from "react";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setColor } from "../../../redux/actions/utilsAction";
import HeaderBar from "../../navbar/HeaderBar";
import successIcon from "../../../assets/icons/OrderPlaced.png";
import { Link } from "react-router-dom";

export default function OrderPlaced() {
  const dispatch = useDispatch();
  const currFoodcourt = JSON.parse(localStorage.getItem("currFoodcourt"));
  const color = useSelector((state) => state.color);

  useEffect(() => {
    // dispatch(setColor(currFoodcourt["color"]));
  }, []);

  const homeUrl = useSelector((state) => state.homeUrl);
  return (
    <React.Fragment>
      <HeaderBar />

      <div className="container-body">
        <div className="row h-100 justify-content-center align-items-center">
          <div className="col-12 text-center">
            <img src={successIcon} alt="" className="w-75 p-5" />
            <div className="mb-4">Order Placed Successfully.</div>
            <Link to={homeUrl}>
              <button
                className="btn big-primary-button w-75"
                style={{ background: color }}
              >
                Back To Home Page
              </button>
            </Link>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
