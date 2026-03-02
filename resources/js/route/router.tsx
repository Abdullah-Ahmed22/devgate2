import RootLayout from "@/layout/root";
import Error from "@/pages/404";
import Contact from "@/pages/contact";
import Home from "@/pages/home";
import Dashboard from "@/pages/Dashboard";
import { createBrowserRouter } from "react-router-dom";
import Login from "@/pages/login";
import ProjectDetails from "@/components/sections/projects/ProjectDetails";
import ServiceDetails from "@/components/sections/ServiceDetails";
import AdminProjects from "@/pages/AdminProjects";
import AddProject from "@/pages/AddProject";
import AdminClients from "@/pages/AdminClients";
import UpdateProject from "@/pages/UpdateProject";
import Statistics from "@/pages/Statistics";
import AdminTestimonials from "@/pages/AdminTestimonials";
import AdminServices from "@/pages/AdminServices";
import AddService from "@/pages/AddService";
import EditService from "@/pages/EditService";
import AboutDetails from "@/components/sections/about/AboutDetails";
import Adminabout from "@/pages/Adminabout";
import Admins from "@/pages/Admins";
import ContactAdminPage from "@/pages/ContactAdminPage";
import AdminHomeImage from "@/pages/AdminHomeImage";
import Careers from "@/pages/Careers";
export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            {
                path: "/",
                element: <Home />,
            },

            {
                path: "/services/:id",
                element: <ServiceDetails />,
            },

            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/dashboard",
                element: <Dashboard />,
            },
            {
                path: "/dashboard/admins",
                element: <Admins />,
            },
            {
                path: "/dashboard/statistics",
                element: <Statistics />,
            },

            {
                path: "/dashboard/projects",
                element: <AdminProjects />,
            },
            {
                path: "/dashboard/projects/add",
                element: <AddProject />,
            },
            {
                path: "/dashboard/editimg",
                element: <AdminHomeImage />,
            },

            {
                path: "/dashboard/projects/edit/:id",
                element: <UpdateProject />,
            },

            {
                path: "/dashboard/testimonials",
                element: <AdminTestimonials />,
            },
            {
                path: "/about/:id",
                element: <AboutDetails />,
            },
            {
                path: "/dashboard/about",
                element: <Adminabout />,
            },

            {
                path: "/dashboard/clients",
                element: <AdminClients />,
            },

           
            {
                path: "/dashboard/services",
                element: <AdminServices />,
            },
            {
                path: "/dashboard/services/edit/:id",
                element: <EditService />,
            },

            {
                path: "/dashboard/services/add",
                element: <AddService />,
            },
            

            {
                path: "/projects/:id",
                element: <ProjectDetails />,
            },

            {
                path: "/news",
                element: <Error />,
            },
            {
                path: "/contact",
                element: <Contact />,
            },
            {
                path: "/dashboard/contact",
                element: <ContactAdminPage />,
            },
            {
                path: "/careers",
                element: <Careers />,
            },
        ],
    },
    {
        path: "*",
        element: <Error />,
    },
]);
