import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router-dom";
import * as cart from "../../../helper/cartHelper";
import { setCart } from "../../../redux/actions/cartAction";
import formatCurrency from "../../../utils/formatCurrency";
import { MenuCard } from "../../menu/MenuCard";
import HeaderBar from "../../navbar/HeaderBar";
import { toast, ToastContainer } from "react-toastify";

export default function DetailMenu() {
  const location = useLocation();
  const { menu } = location.state;
  const color = useSelector((state) => state.color);
  const history = useHistory();

  const recommend = useSelector((state) => state.menus);

  const dispatch = useDispatch();
  function incrementData() {
    const newCart = cart.IncreaseItemQuantity(menu.tenant_id, menu);
    dispatch(setCart(newCart));

    notify("Item Added to Cart");
    setTimeout(() => {
      history.goBack();
    }, 1500);
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
  return (
    <React.Fragment>
      <HeaderBar />
      <div>
        <img src={menu.menuImage} className="detail-menu-image" alt="" />
      </div>

      <div
        className="container-body pt-4"
        style={{
          marginTop: "-5px",
          position: "absolute",
          width: "414px",
          maxWidth: "100vw",
        }}
      >
        <ToastContainer />
        <section>
          <div className="mb-3">
            <h4 className="detail-title">{menu.name}</h4>
            <div className="detail-subtitle detail-subtitle-thin">
              {formatCurrency(menu.price)}
            </div>
          </div>

          <div className="mb-3">
            <div className="detail-subtitle d-flex align-items-center">
              <span
                className="material-icons-outlined mr-2"
                style={{ fontSize: "16px" }}
              >
                access_time
              </span>
              Cooking Time
            </div>
            <div className="detail-subtitle detail-subtitle-thin">
              {menu.duration} Minutes
            </div>
          </div>

          <div className="mb-3">
            <div className="detail-subtitle d-flex align-items-center">
              <span
                className="material-icons-outlined mr-2"
                style={{ fontSize: "16px" }}
              >
                receipt_long
              </span>
              Product Details
            </div>

            <div className="detail-description">{menu.description}</div>
          </div>
        </section>

        <section style={{ marginBottom: "300px" }}>
          <div className="section-title">Maybe you like this too!</div>
          <div className="row mt-3">
            {Object.keys(recommend).map((index) => {
              const item = recommend[index];
              return Object.values(item).map((post, index) => {
                return post.menu.map((data) => {
                  data.tenant_id = menu.tenant_id;
                  if (data.id !== menu.id && data.quantity > 15) {
                    return (
                      <MenuCard
                        menu={data}
                        tenant_id={menu.tenant_id}
                        key={data.id}
                      />
                    );
                  }
                  return [];
                });
              });
            })}
          </div>

          {menu.quantity > 0 && (
            <button
              type="submit"
              className="btn big-primary-button my-5 fixed-bottom"
              style={{
                background: color,
                width: "373px",
                marginLeft: "auto",
                marginRight: "auto",
              }}
              onClick={() => {
                if (menu.quantity > 0) incrementData();
                else return;
              }}
            >
              <span
                class="material-icons-outlined mr-2"
                style={{ fontSize: "16px" }}
              >
                receipt_long
              </span>
              {formatCurrency(menu.price)} | Tambahkan
            </button>
          )}
        </section>
      </div>
    </React.Fragment>
  );
}
