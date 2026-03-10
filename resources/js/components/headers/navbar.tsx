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
                const [typeRes, serviceRes, aboutRes] = await Promise.all([
                    fetch(`${API_URL}/api/projects`),
                    fetch(`${API_URL}/api/services`),
                    fetch(`${API_URL}/api/abouttitle`),
                ]);

                const typeJson = await typeRes.json();
                const serviceJson = await serviceRes.json();
                const aboutJson = await aboutRes.json();

                const types = typeJson.data || typeJson || [];
                console.log(types);
                const services = serviceJson.data || serviceJson || [];
                const about = aboutJson.data || aboutJson || [];

                const updatedMenu = menuData.map((menu) => {
                    switch (menu.title.toLowerCase()) {
                        case "projects": {
                            const typeMap: Record<string, any[]> = {};

                            types.forEach((project: any) => {
                                if (!project.types?.length) {
                                    if (!typeMap["Other"])
                                        typeMap["Other"] = [];
                                    typeMap["Other"].push(project);
                                }

                                project.types.forEach((type: any) => {
                                    const typeName = type.project_type;

                                    if (!typeMap[typeName]) {
                                        typeMap[typeName] = [];
                                    }

                                    typeMap[typeName].push(project);
                                });
                            });

                            const projectMenu = Object.entries(typeMap).map(
                                ([typeName, projects]) => ({
                                    title: typeName,
                                    link: "#",
                                    submenu: projects.map((project: any) => ({
                                        title: project.title,
                                        link: `/projects/${project.id}`,
                                    })),
                                }),
                            );

                            return {
                                ...menu,
                                submenu: projectMenu,
                            };
                        }

                        case "services":
                            return {
                                ...menu,
                                submenu: services.map((service: any) => ({
                                    title: service.title,
                                    link: `/services/${service.id}`,
                                })),
                            };

                        case "about":
                            return {
                                ...menu,
                                submenu: about.map((item: any) => ({
                                    title: item.title,
                                    link: `/about/${item.id}`,
                                })),
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
            {dynamicMenu.map(({ link, title, submenu }, index) => (
                <li
                   
                    key={index}
                    className={`${submenu?.length ? "has-dropdown" : ""}`}
                >
                    <Link to={link}>
                        {title}{" "}
                        {submenu?.length && <i className="fas fa-angle-down" />}
                    </Link>

                    {submenu?.length && (
                        <ul className="submenu">
                            {submenu.map((dropdown, ind) => (
                                <li
                                    key={ind}
                                    className={
                                        dropdown.submenu?.length
                                            ? "has-dropdown"
                                            : ""
                                    }
                                >
                                    <Link to={dropdown.link}>
                                        {dropdown.title}
                                    </Link>

                                    {dropdown.submenu && (
                                        <ul className="submenu">
                                            {dropdown.submenu.map((sub, i) => (
                                                <li key={i}>
                                                    <Link to={sub.link}>
                                                        {sub.title}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </li>
                            ))}
                        </ul>
                    )}
                </li>
            ))}
        </ul>
    );
}

export default Navbar;
