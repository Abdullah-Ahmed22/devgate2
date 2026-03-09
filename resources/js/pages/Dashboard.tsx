import PageTitle from "@/components/sections/pageTitle";
import SectionTitle from "@/components/ui/sectionTitle";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface Admin {
  id: number;
  email: string;
  role: string;
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState<Admin | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const adminData = localStorage.getItem("admin");

    if (!token) {
      navigate("/");
    } else if (adminData) {
      setAdmin(JSON.parse(adminData));
    }
  }, [navigate]);

  const menuItems = [
    { title: "Home images", link: "/dashboard/editimg" },
    { title: "About Us", link: "/dashboard/about" },
    { title: "Projects", link: "/dashboard/projects" },
     { title: "Add Project Types", link: "/dashboard/edittypes" },
    { title: "Services", link: "/dashboard/services" },
    { title: "Statistics", link: "/dashboard/statistics" },
    { title: "Our Clients", link: "/dashboard/clients" },
    { title: "Testimonials", link: "/dashboard/testimonials" },
    { title: "Contact Messages", link: "/dashboard/contact" }, 
  ];

  if (admin?.role === "superadmin") {
    menuItems.unshift({ title: "Admins", link: "/dashboard/admins" });
  }

  return (
    <>
      <PageTitle title="Dashboard" currentPage="Dashboard" />

      <section
        id="dashboard"
        className="about-section section-padding fix bg-cover"
        style={{ backgroundImage: 'url("/img/service/service-bg-2.jpg")' }}
      >
        <div className="container">
          <div className="about-wrapper style-2">
            <div className="row justify-content-center">
              <div className="col-lg-12">
                <div className="about-content text-center">
                  <SectionTitle>
                    <SectionTitle.SubTitle>
                      Admin Panel
                    </SectionTitle.SubTitle>
                    <SectionTitle.Title>
                      Manage Your <span>Website</span>
                    </SectionTitle.Title>
                  </SectionTitle>

                  <p className="mt-3">
                    Select a section to manage content and update your website.
                  </p>
                </div>

                <div className="row mt-5">
                  {menuItems.map((item, index) => (
                    <div
                      key={index}
                      className="col-lg-3 col-md-4 col-sm-6 mb-4"
                    >
                      <Link to={item.link}>
                        <div className="p-4 bg-white rounded shadow text-center admin-card">
                          <h5>{item.title}</h5>
                          <p className="mt-2 text-muted">
                            Manage {item.title}
                          </p>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;