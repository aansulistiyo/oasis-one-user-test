import { useSelector } from "react-redux";
import { MenuCard, MenuCardDisabled } from "../../menu/MenuCard";
import { useParams } from "react-router-dom";

export default function FilteredMenu() {
  const menus = useSelector((state) => state.menus);
  const term = useSelector((state) => state.search);
  const { id } = useParams();

  return Object.keys(menus).map((index) => {
    const item = menus[index];
    return Object.values(item).map((post, index) => {
      return post.menu.map((menu) => {
        if (menu.name.toLowerCase().includes(term.toLowerCase())) {
          if (menu.quantity > 0) {
            return <MenuCard menu={menu} tenant_id={id} key={menu.id} />;
          } else {
            return (
              <MenuCardDisabled menu={menu} tenant_id={id} key={menu.id} />
            );
          }
        }
        return [];
      });
    });
  });
}
