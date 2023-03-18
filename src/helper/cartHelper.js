import { useSelector } from "react-redux";

export function GetItemQuantity(tenant_id, menu_id) {
  const cart = useSelector((state) => state.cart);
  let qty = 0;
  if (cart.length > 0) {
    let tenantCartKey = getTenantCartID(cart, tenant_id);
    if (tenantCartKey >= 0) {
      let menuCartKey = getMenuCartID(cart[tenantCartKey].order_data, menu_id);
      if (menuCartKey >= 0) {
        qty = cart[tenantCartKey].order_data[menuCartKey].quantity;
      }
    }
  }
  return qty;
  // return 0;
}

export function GetAllItemQuantity() {
  const cart = useSelector((state) => state.cart);
  let qty = 0;

  if (cart !== null && Object.keys(cart).length !== 0) {
    cart.map((tenant) => {
      tenant.order_data.map((item) => {
        qty += item.quantity;
      });
    });
  }

  return qty;
  // return 0;
}

export function RecapCart() {
  const carts = useSelector((state) => state.cart);
  let recap = carts.map((tenant) => {
    return {
      ...tenant,
      order_data: tenant.order_data.map((menu) => {
        return {
          menu_id: menu.id,
          order_qty: menu.quantity,
        };
      }),
    };
  });

  return recap;
}

export function GetTotalCost() {
  const carts = useSelector((state) => state.cart);
  return carts
    .map((tenant) => {
      return tenant.order_total;
    })
    .reduce((a, b) => a + b, 0);
}

// export function IncreaseItemQuantity(tenant_id, menu) {
//   let cart = JSON.parse(localStorage.getItem("cart"));

//   if (cart !== null && Object.keys(cart).length !== 0) {
//     let tenantCartKey = getTenantCartID(cart, tenant_id);

//     if (tenantCartKey !== undefined) {
//       let menuCartKey = getMenuCartID(cart[tenantCartKey].order_data, menu.id);

//       if (menuCartKey !== undefined) {
//         let newMenuCart = cart[tenantCartKey].order_data[menuCartKey];
//         newMenuCart.quantity =
//           newMenuCart.quantity < menu.quantity
//             ? newMenuCart.quantity + 1
//             : newMenuCart.quantity;
//         cart[tenantCartKey].order_data[menuCartKey] = newMenuCart;
//       } else {
//         let newMenuCart = {
//           id: menu.id,
//           quantity: 1,
//           menuImage: menu.menuImage,
//           name: menu.name,
//           price: menu.price.replace(",", ""),
//           isRecommended: menu.isRecommended,
//         };
//         const newKey = Object.keys(cart[tenantCartKey].order_data).length;
//         cart[tenantCartKey].order_data[newKey] = newMenuCart;
//       }
//     } else {
//       let newMenuCart = {
//         tenant_id: tenant_id,
//         order_data: {
//           0: {
//             id: menu.id,
//             quantity: 1,
//             menuImage: menu.menuImage,
//             name: menu.name,
//             price: menu.price.replace(",", ""),
//             isRecommended: menu.isRecommended,
//           },
//         },
//       };

//       const newKey = Object.keys(cart).length;
//       cart[newKey] = newMenuCart;
//     }
//   } else {
// let newData = {
//   0: {
//     tenant_id: tenant_id,
//     order_data: {
//       0: {
//         id: menu.id,
//         quantity: 1,
//         menuImage: menu.menuImage,
//         name: menu.name,
//         price: menu.price.replace(",", ""),
//         isRecommended: menu.isRecommended,
//       },
//     },
//   },
// };
// cart = newData;
//   }

//   localStorage.setItem("cart", JSON.stringify(cart));
//   return cart;
// }

export function IncreaseItemQuantity(tenant_id, menu) {
  let cart = JSON.parse(localStorage.getItem("cart"));
  if (cart.length !== 0) {
    const tenantCartID = getTenantCartID(cart, tenant_id);

    if (tenantCartID >= 0) {
      const tenantCart = cart[tenantCartID];
      const menuCartID = getMenuCartID(tenantCart.order_data, menu.id);

      if (menuCartID >= 0) {
        let menuCart = tenantCart.order_data[menuCartID];
        const check =
          (!menu.isUnlimited && menuCart.quantity < menu.quantity) ||
          menu.isUnlimited;
        menuCart.quantity = check ? menuCart.quantity + 1 : menuCart.quantity;
        cart[tenantCartID].order_data[menuCartID] = menuCart;
      } else {
        const newData = {
          id: menu.id,
          quantity: 1,
          menuImage: menu.menuImage,
          name: menu.name,
          price: menu.price.replaceAll(",", ""),
          isRecommended: menu.isRecommended,
        };

        cart[tenantCartID].order_data.push(newData);
      }
    } else {
      const newData = {
        tenant_id: tenant_id,
        order_total: 0,
        order_item: 0,
        order_servicecharge: 0,
        order_taxcharge: 0,
        order_data: [
          {
            id: menu.id,
            quantity: 1,
            menuImage: menu.menuImage,
            name: menu.name,
            price: menu.price.replaceAll(",", ""),
            isRecommended: menu.isRecommended,
          },
        ],
      };
      cart.push(newData);
    }
  } else {
    const newData = [
      {
        tenant_id: tenant_id,
        order_total: 0,
        order_item: 0,
        order_servicecharge: 0,
        order_taxcharge: 0,
        order_data: [
          {
            id: menu.id,
            quantity: 1,
            menuImage: menu.menuImage,
            name: menu.name,
            price: menu.price.replaceAll(",", ""),
            isRecommended: menu.isRecommended,
          },
        ],
      },
    ];
    cart = newData;
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  return cart;
}

export function DecreaseItemQuantity(tenant_id, menu) {
  let cart = JSON.parse(localStorage.getItem("cart"));

  if (cart.length !== 0) {
    const tenantCartID = getTenantCartID(cart, tenant_id);

    if (tenantCartID >= 0) {
      const tenantCart = cart[tenantCartID];
      const menuCartID = getMenuCartID(tenantCart.order_data, menu.id);

      if (menuCartID >= 0) {
        let menuCart = tenantCart.order_data[menuCartID];
        menuCart.quantity = menuCart.quantity - 1;

        if (menuCart.quantity <= 0) {
          cart[tenantCartID].order_data.splice(menuCartID, 1);

          if (cart[tenantCartID].order_data.length === 0) {
            cart.splice(tenantCartID, 1);
          }
        } else {
          cart[tenantCartID].order_data[menuCartID] = menuCart;
        }
      }
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    return cart;
  }
}

function getTenantCartID(cart, tenant_id) {
  return cart
    .map(function (tenant) {
      return tenant.tenant_id;
    })
    .indexOf(tenant_id);
}

function getMenuCartID(order_data, menu_id) {
  return order_data
    .map(function (menu) {
      return menu.id;
    })
    .indexOf(menu_id);
}
