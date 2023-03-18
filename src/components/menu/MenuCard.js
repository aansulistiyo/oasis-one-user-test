import React from "react";
import { useSelector } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import Recommendicon from "../../../src/assets/icons/Recommend.png";
import formatCurrency from "../../utils/formatCurrency";
import MenuCartContent from "../cart/MenuCartContent";

export function MenuCard({ menu }) {
  const color = useSelector((state) => state.color);
  const history = useHistory();
  return (
    <div className="col-12">
      <div className="card menu-card d-flex flex-row  align-items-center">
        <div
          className="d-flex flex-row  align-items-center flex-grow-1 text-decoration-none"
          style={{ cursor: "pointer" }}
          onClick={() => {
            history.push({
              pathname: `/Menu/${menu.id}`,
              state: {
                menu,
              },
            });
          }}
        >
          <div className="align-self-center">
            <img className="menu-card-image" src={menu.menuImage} alt="" />
          </div>
          <div className="ml-2 flex-grow-1 align-self-center">
            <h4 className="menu-card-title mb-0">{menu.name}</h4>
            {menu.isRecommended ? (
              <div>
                <img src={Recommendicon} alt="" />
              </div>
            ) : (
              ""
            )}
            <span className="menu-card-price">
              {formatCurrency(menu.price)}
            </span>
          </div>
        </div>
        <div
          className="d-flex align-items-center justify-content-center p-2"
          style={{
            gap: ".5em",
            borderRadius: "100px",
            height: "30px",
            backgroundColor: color,
          }}
        >
          <MenuCartContent menu={menu} />
        </div>
      </div>
    </div>
  );
}

export function MenuCardDisabled({ menu }) {
  const color = useSelector((state) => state.color);
  const history = useHistory();
  return (
    <div className="col-12">
      <div className="card menu-card menu-card-disabled d-flex flex-row align-items-center">
        <div
          to={`/Menu/${menu.id}`}
          className="d-flex flex-row  align-items-center flex-grow-1 text-decoration-none"
          onClick={() => {
            history.push({
              pathname: `/Menu/${menu.id}`,
              state: {
                menu,
              },
            });
          }}
        >
          <div className="align-self-center">
            <img className="menu-card-image" src={menu.menuImage} alt="" />
          </div>

          <div className="ml-2 flex-grow-1 align-self-center">
            <h4 className="menu-card-title mb-0">{menu.name}</h4>
            {menu.isRecommended ? (
              <div>
                <img src={Recommendicon} alt="" />
              </div>
            ) : (
              ""
            )}
            <span className="menu-card-price">Sold Out</span>
          </div>
        </div>
        <div
          className="d-flex align-items-center justify-content-center p-2"
          style={{
            gap: ".5em",
            borderRadius: "100px",
            height: "30px",
            backgroundColor: color,
          }}
        >
          <MenuCartContent menu={menu} />
        </div>
      </div>
    </div>
  );
}
