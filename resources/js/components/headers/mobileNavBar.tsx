import {
    MegaMenuDataType,
    menuData,
    MenuItemDataType,
    SubMenuDataType,
} from "@/db/menuData";
import { MouseEvent, useState, useEffect } from "react";
import AnimateHeight from "react-animate-height";
import { Link } from "react-router-dom";

const MobileNavBar = () => {
    const API_URL = import.meta.env.VITE_API_URL;
    const [openIndexes, setOpenIndexes] = useState<number[]>([]);
    const [dynamicMenu, setDynamicMenu] =
        useState<MenuItemDataType[]>(menuData);

    const toggleSubmenu = (e: MouseEvent, index: number) => {
        e.preventDefault();
        setOpenIndexes((prev) =>
            prev.includes(index)
                ? prev.filter((i) => i !== index)
                : [...prev, index],
        );
    };

    useEffect(() => {
        const fetchMenus = async () => {
            try {
                const [projectRes, serviceRes, aboutRes] = await Promise.all([
                    fetch(`${API_URL}/api/projects`),
                    fetch(`${API_URL}/api/services`),
                    fetch(`${API_URL}/api/abouttitle`),
                ]);

                const projectJson = await projectRes.json();
                const serviceJson = await serviceRes.json();
                const aboutJson = await aboutRes.json();

                const projects = projectJson.data || projectJson || [];
                const services = serviceJson.data || serviceJson || [];
                const about = aboutJson.data || aboutJson || [];

                const buildSubmenu = (items: any[], basePath: string) =>
                    items.map((item) => ({
                        title: item.title,
                        link: `/${basePath}/${item.id}`,
                    }));

                const updatedMenu = menuData.map((menu) => {
                    switch (menu.title.toLowerCase()) {
                        case "projects": {
                            const typeMap: Record<string, any[]> = {};

                            projects.forEach((project: any) => {
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
                                ([typeName, items]) => ({
                                    title: typeName,
                                    link: "#",
                                    submenu: items.map((project: any) => ({
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
                                submenu: buildSubmenu(services, "services"),
                            };

                        case "about":
                            return {
                                ...menu,
                                submenu: buildSubmenu(about, "about"),
                            };

                        default:
                            return menu;
                    }
                });

                setDynamicMenu(updatedMenu);
            } catch (error) {
                console.error("Mobile menu fetch error:", error);
            }
        };

        fetchMenus();
    }, []);

    return (
        <div className="mobile-menu d-lg-none">
            {dynamicMenu.map((item, index) => {
                const isOpen = openIndexes.includes(index);
                return (
                    <MenuItem
                        key={index}
                        item={item}
                        index={index}
                        toggleSubmenu={toggleSubmenu}
                        isOpen={isOpen}
                    />
                );
            })}
        </div>
    );
};

const MenuItem = ({
    item,
    index,
    toggleSubmenu,
    isOpen,
}: {
    item: MenuItemDataType;
    index: number;
    isOpen: boolean;
    toggleSubmenu: (e: MouseEvent, index: number) => void;
}) => {
    return (
        <div className="menu-item">
            <Link to={item.link}>
                {item.title}
                {item.submenu?.length && (
                    <i onClick={(e) => toggleSubmenu(e, index)}>+</i>
                )}
            </Link>

            {item.submenu?.length && (
                <Submenu submenu={item.submenu} isOpen={isOpen} index={index} />
            )}
        </div>
    );
};

const MegaMenu = ({
    megamenu,
    isOpen,
    index,
}: {
    megamenu: MegaMenuDataType[];
    isOpen: boolean;
    index: number;
}) => (
    <AnimateHeight
        id={`submenu-${index}`}
        duration={300}
        height={isOpen ? "auto" : 0}
    >
        <div className="mega-menu">
            {megamenu.map(({ image, links, title }) => (
                <div className="homemenu" key={title}>
                    <div className="homemenu-thumb">
                        <img src={image} alt={title} />
                        <div className="demo-button">
                            {links.map(({ link, title }) => (
                                <Link
                                    key={link}
                                    to={link}
                                    className="theme-btn"
                                >
                                    <span>{title}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div className="homemenu-content text-center">
                        <h4 className="homemenu-title">{title}</h4>
                    </div>
                </div>
            ))}
        </div>
    </AnimateHeight>
);

const Submenu = ({
    submenu,
    isOpen,
    index,
}: {
    submenu: SubMenuDataType[];
    isOpen: boolean;
    index: number;
}) => {
    const [openSubIndexes, setOpenSubIndexes] = useState<number[]>([]);

    const toggleNestedSubmenu = (e: MouseEvent, subIndex: number) => {
        e.preventDefault();
        setOpenSubIndexes((prev) =>
            prev.includes(subIndex)
                ? prev.filter((i) => i !== subIndex)
                : [...prev, subIndex],
        );
    };

    return (
        <AnimateHeight
            id={`submenu-${index}`}
            duration={400}
            height={isOpen ? "auto" : 0}
        >
            <div className="has-submenu">
                {submenu.map((item, subIndex) => {
                    const nestedIsOpen = openSubIndexes.includes(subIndex);

                    return (
                        <div key={subIndex}>
                            <Link to={item.link}>
                                {item.title}
                                {item.submenu?.length && (
                                    <i
                                        onClick={(e) =>
                                            toggleNestedSubmenu(e, subIndex)
                                        }
                                    >
                                        +
                                    </i>
                                )}
                            </Link>

                            {item.submenu?.length && (
                                <Submenu
                                    submenu={item.submenu}
                                    isOpen={nestedIsOpen}
                                    index={subIndex}
                                />
                            )}
                        </div>
                    );
                })}
            </div>
        </AnimateHeight>
    );
};

export default MobileNavBar;
