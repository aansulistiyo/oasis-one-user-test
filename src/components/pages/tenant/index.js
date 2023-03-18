import React, { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Header from "./Header";
import SearchBar from "../../form/SearchBar";
import FilteredMenu from "./FilteredMenu";
import * as tenant from "../../../redux/actions/tenantAction";
import {
  clearTerms,
  setColor,
  setHomeUrl,
} from "../../../redux/actions/utilsAction";
import { clearPromo, setPromo } from "../../../redux/actions/promoAction";
import Promo from "../../promo/Promo";
import MenuLists from "./MenuLists";
import { Alert } from "react-bootstrap";

export default function TenantPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const term = useSelector((state) => state.search);
  const tenantData = useSelector((state) => state.tenant);

  useEffect(() => {
    // FETCH TENANT DATA
    async function fetchTenant(id) {
      const response = await axios
        .get("https://backend.oasis-one.com/api/tenant/user/" + id)
        .catch((err) => {
          console.log("Error: ", err);
        });
      const data = response.data.data;
      localStorage.setItem("color", data.profileColor);
      dispatch(tenant.setTenant(data));
      dispatch(setColor(localStorage.getItem("color")));

      if (data.foodcourt_id === "-") {
        dispatch(setHomeUrl("/tenant/" + data.tenant_id));
        localStorage.setItem("homeUrl", "/tenant/" + data.tenant_id);
      } else {
        dispatch(setHomeUrl("/foodcourt/" + data.foodcourt_id));
        localStorage.setItem("homeUrl", "/foodcourt/" + data.foodcourt_id);
      }
    }

    // FETCH MENU DATA
    async function fetchMenus(id) {
      const response = await axios
        .get("https://backend.oasis-one.com/api/menu/category/" + id)
        .catch((err) => {
          console.log("Error: ", err);
        });
      const data = response.data.data;
      dispatch(tenant.setMenus(data));
    }

    // FETCH PROMO DATA
    async function fetchPromo(id) {
      const response = await axios
        .get("https://backend.oasis-one.com/api/promo/retrieve/" + id)
        .catch((err) => {
          console.log("Error: ", err);
        });
      const data = response.data.data;
      dispatch(setPromo(data));
    }

    if (id && id !== "") {
      fetchTenant(id);
      fetchMenus(id);
      fetchPromo(id);
    }

    return () => {
      dispatch(tenant.clearTenant());
      dispatch(clearTerms());
      // dispatch(tenant.clearMenus());

      dispatch(clearPromo());
    };
  }, [id, dispatch]);

  return (
    <React.Fragment>
      <Header />
      <div className="container-body">
        <SearchBar placeholder={"Search for any menus . . ."} />

        {tenantData.isOperational ? (
          term !== "" ? (
            <FilteredMenu />
          ) : (
            <React.Fragment>
              <Promo />

              <MenuLists />
            </React.Fragment>
          )
        ) : (
          <Alert variant="danger">Tenant is Closed</Alert>
        )}
      </div>
    </React.Fragment>
  );
}
