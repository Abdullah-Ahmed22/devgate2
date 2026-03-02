type MenuLink = {
    title: string;
    link: string;
};

export type MegaMenuDataType = {
    image: string;
    title: string;
    links: MenuLink[];
};

export type SubMenuDataType = {
    title: string;
    link: string;
    submenu?: MenuLink[];
};

export type MenuItemDataType = {
    title: string;
    link: string;
    megamenu?: MegaMenuDataType[];
    submenu?: MenuLink[];
};

export const menuData: MenuItemDataType[] = [
    {
        title: "Home",
        link: "/",
    },
    {
        title: "about",
        link: "#",
        submenu: [
         
        ],
    },

    
    {
        title: "services",
        link: "#",
        submenu: [],
    },

    {
        title: "projects",
        link: "#",
        submenu: [],
    },
    {
        title: "Contact",
        link: "/contact",
    },
];
