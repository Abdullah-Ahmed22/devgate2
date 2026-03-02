import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DashTitle from "./DashTitle";

const AdminProjects = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL;
  const fetchProjects = async () => {
    if (!token) {
      alert("You are not logged in.");
      navigate("/login");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/projects`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      if (response.redirected) {
        alert("You were redirected. Possibly not authenticated.");
        return;
      }

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        if (response.status === 401) {
          alert("Unauthorized. Please login again.");
          navigate("/login");
        } else {
          console.error("Fetch error:", data);
          alert("Failed to fetch projects.");
        }
        return;
      }

      setProjects(data);
    } catch (error) {
      console.error("Network error:", error);
      alert("Cannot connect to server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id: number) => {
    if (!token) {
      alert("You are not logged in.");
      return;
    }

    if (!window.confirm("Delete this project?")) return;

    try {
      const response = await fetch(
        `${API_URL}/api/projects/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      if (response.redirected) {
        alert("You were redirected. Possibly not authenticated.");
        return;
      }

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        console.error("Delete error:", data);

        if (response.status === 401) {
          alert("Unauthorized. Please login again.");
          navigate("/login");
        } else {
          alert("Failed to delete project.");
        }

        return;
      }

      alert("Project deleted successfully!");
      fetchProjects();
    } catch (error) {
      console.error("Network error:", error);
      alert("Cannot connect to server.");
    }
  };

  return (
    <>
    <DashTitle currentPage="Projects" title="Projects"/>
  <div className="container section-padding">
    <h2 className="mb-4">Manage Projects</h2>

    <Link to="/dashboard/projects/add" className="btn btn-primary mb-4">
      Add New Project
    </Link>

    <div className="row">
      {projects.map((project) => (
        <div className="col-md-6 col-lg-4 mb-4" key={project.id}>
          <div className="card h-100 shadow-sm border-0">

            {project.image1 && (
              <img
                src={`${API_URL}/storage/${project.image1}`}
                className="card-img-top"
                alt={project.title}
                style={{ height: "200px", objectFit: "cover" }}
              />
            )}

            <div className="card-body d-flex flex-column">
              <h5 className="card-title">{project.title}</h5>

              <div className="mt-auto">
                <Link
                  to={`/dashboard/projects/edit/${project.id}`}
                  className="btn btn-warning btn-sm me-2"
                >
                  Edit
                </Link>

                <button
                  onClick={() => handleDelete(project.id)}
                  className="btn btn-danger btn-sm"
                >
                  Delete
                </button>
              </div>
            </div>

          </div>
        </div>
      ))}
    </div>
  </div>
  </>
);
};

export default AdminProjects;