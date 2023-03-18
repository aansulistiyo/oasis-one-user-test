import React from "react";
import CategoryButton from "./CategoryButton";

import { MenuCard, MenuCardDisabled } from "../../menu/MenuCard";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function MenuLists() {
  const menus = useSelector((state) => state.menus);
  const { id } = useParams();

  return (
    <section className="mt-3" style={{ marginBottom: "200px" }}>
      <h4 className="section-title">Menu</h4>

      {/* Button Kategori */}
      <CategoryButton />

      {/* Menu List With Category */}
      {Object.keys(menus).length >= 1 ? (
        Object.keys(menus).map((index) => {
          const item = menus[index].category;
          return (
            <div className="my-3" id={"category-" + item.id} key={item._id}>
              <h4 className="section-title">{item.name}</h4>

              <div className="row">
                {item.menu.map((menu) => {
                  menu.tenant_id = id;
                  if (menu.isAvailable) {
                    if (
                      (!menu.isUnlimited && menu.quantity > 0) ||
                      menu.isUnlimited
                    ) {
                      return (
                        <MenuCard menu={menu} tenant_id={id} key={menu._id} />
                      );
                    } else {
                      return (
                        <MenuCardDisabled
                          menu={menu}
                          tenant_id={id}
                          key={menu.id}
                        />
                      );
                    }
                  } else {
                    return;
                  }
                })}
              </div>
            </div>
          );
        })
      ) : (
        <div className="d-flex justify-content-center mt-5">
          <div className="spinner-grow text-success mr-3" role="status">
            <span className="sr-only">Loading...</span>
          </div>
          <div className="spinner-grow text-success mr-3" role="status">
            <span className="sr-only">Loading...</span>
          </div>
          <div className="spinner-grow text-success mr-3" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}
    </section>
  );
}

export default MenuLists;
