import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { menuData, MenuItemDataType } from "@/db/menuData";

interface ApiItem {
  id: number;
  title: string;
}

function Navbar() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [dynamicMenu, setDynamicMenu] =
    useState<MenuItemDataType[]>(menuData);

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const [
       
          projectRes,
          serviceRes,
          aboutRes
        ] = await Promise.all([
   
          fetch(`${API_URL}/api/projects`),
          fetch(`${API_URL}/api/services`),
          fetch(`${API_URL}/api/abouttitle`),
        ]);


        const projectJson = await projectRes.json();
        const serviceJson = await serviceRes.json();
        const aboutJson = await aboutRes.json();

   
        const projects: ApiItem[] =
          projectJson.data || projectJson || [];
        const services: ApiItem[] =
          serviceJson.data || serviceJson || [];
        const about: ApiItem[] =
          aboutJson.data || aboutJson || [];

        const buildSubmenu = (
          items: ApiItem[],
          basePath: string
        ) =>
          items.map((item) => ({
            title: item.title,
            link: `/${basePath}/${item.id}`,
          }));

        const updatedMenu = menuData.map((menu) => {
          switch (menu.title.toLowerCase()) {
           

            case "projects":
              return {
                ...menu,
                submenu: buildSubmenu(
                  projects,
                  "projects"
                ),
              };

            case "services":
              return {
                ...menu,
                submenu: buildSubmenu(
                  services,
                  "services"
                ),
              };

            case "about":
              return {
                ...menu,
                submenu: buildSubmenu(
                  about,
                  "about"
                ),
              };

            default:
              return menu;
          }
        });

        setDynamicMenu(updatedMenu);
      } catch (error) {
        console.error("Navbar fetch error:", error);
      }
    };

    fetchMenus();
  }, []);

  return (
    <ul>
      {dynamicMenu.map(
        ({ link, title, megamenu, submenu }, index) => (
          <li
            key={index}
            className={`${
              submenu?.length ? "has-dropdown" : ""
            }`}
          >
            <Link to={link}>
              {title}{" "}
              {(submenu?.length || megamenu) && (
                <i className="fas fa-angle-down" />
              )}
            </Link>

            {submenu?.length && (
              <ul className="submenu">
                {submenu.map((dropdown, ind) => (
                  <li key={ind}>
                    <Link to={dropdown.link}>
                      {dropdown.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        )
      )}
    </ul>
  );
}

export default Navbar;