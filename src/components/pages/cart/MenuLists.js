import React, { useEffect, useState } from "react";
import axios from "axios";
import { MenuCard } from "../../menu/MenuCard";
import { useSelector } from "react-redux";

function SectionTitle({ tenant_id }) {
  const [tenant, setTenant] = useState([]);
  useEffect(() => {
    async function fetchTenant(id) {
      const response = await axios
        .get("https://backend.oasis-one.com/api/tenant/user/" + id)
        .catch((err) => {
          console.log("Error: ", err);
        });
      const data = response.data.data;
      setTenant(data);
    }
    fetchTenant(tenant_id);
  }, []);

  return <h4 className="section-title">{tenant.name}</h4>;
}

function MenuData({ tenant_id, menu_id }) {
  const [menu, setMenu] = useState([]);
  useEffect(() => {
    async function fetchMenu(tenant_id, menu_id) {
      const response = await axios
        .get(
          "https://backend.oasis-one.com/api/menu/" + tenant_id + "/" + menu_id
        )
        .catch((err) => {
          console.log("Error: ", err);
        });
      const data = response.data.data[0].category.menu;
      data.tenant_id = tenant_id;
      setMenu(data);
    }
    fetchMenu(tenant_id, menu_id);
  }, []);

  return <MenuCard menu={menu} tenant_id={tenant_id} />;
}

function MenuLists() {
  const cart = useSelector((state) => state.cart);

  return (
    <section className="my-3">
      {cart.map((item) => {
        return (
          <div className="my-3" key={item.tenant_id}>
            <SectionTitle tenant_id={item.tenant_id} />

            <div className="row">
              {item.order_data.map((menu) => {
                return (
                  <MenuData
                    tenant_id={item.tenant_id}
                    menu_id={menu.id}
                    key={menu.id}
                  />
                );
              })}
            </div>
          </div>
        );
      })}
    </section>
  );
}

export default MenuLists;
