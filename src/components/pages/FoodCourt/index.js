import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";

import Header from "./Header";
import Promo from "../../promo/Promo";
import TenantLists from "./TenantList";
import SearchBar from "../../form/SearchBar";
import { setPromo } from "../../../redux/actions/promoAction";
import { setFoodcourt } from "../../../redux/actions/foodcourtAction";
import {
  clearTerms,
  setColor,
  setHomeUrl,
} from "../../../redux/actions/utilsAction";

export default function FoodcourtPage() {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchFoodcourt(id) {
      const response = await axios
        .get("https://backend.oasis-one.com/api/foodcourt/retrieve/" + id)
        .catch((err) => {
          console.log("Error: ", err);
        });
      const data = response.data.data;
      dispatch(setFoodcourt(data[0]));
      dispatch(setColor(data[0].foodcourt_color));
      dispatch(setHomeUrl("/foodcourt/" + data[0].foodcourt_id));
      localStorage.setItem("homeUrl", "/foodcourt/" + data[0].foodcourt_id);
      localStorage.setItem("color", data[0].foodcourt_color);
      const currFoodcourt = localStorage.getItem("currFoodcourt");
      if (currFoodcourt === null || currFoodcourt !== id) {
        localStorage.setItem("currFoodcourt", JSON.stringify({ id: id }));
      }
    }

    // FETCH PROMO DATA
    async function fetchPromo() {
      const response = await axios
        .get("https://backend.oasis-one.com/api/promo/retrieve/" + "T-rcIjD0zo")
        .catch((err) => {
          console.log("Error: ", err);
        });
      const data = response.data.data;
      dispatch(setPromo(data));
    }

    if (id && id !== "") fetchFoodcourt(id);

    fetchPromo();
    return () => {
      // dispatch(clearFoodcourt());
      dispatch(clearTerms());
    };
  }, [id, dispatch]);

  return (
    <React.Fragment>
      <Header />

      <div className="container-body">
        <SearchBar placeholder={"Search for any tenant . . ."} />
        <Promo />
        <TenantLists />
      </div>
    </React.Fragment>
  );
}
