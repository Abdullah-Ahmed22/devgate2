import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DashTitle from "./DashTitle";

const AdminProjects = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const API_URL = import.meta.env.VITE_API_URL;

  const [projects, setProjects] = useState<any[]>([]);
  const [types, setTypes] = useState<any[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<number[]>([]);
  const [currentProject, setCurrentProject] = useState<any>(null);

  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

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

  const fetchTypes = async () => {
    try {
      const res = await fetch(`${API_URL}/api/types`);
      const data = await res.json();
      setTypes(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProjects();
    fetchTypes();
  }, []);

  const handleDelete = async (id: number) => {
    if (!token) {
      alert("You are not logged in.");
      return;
    }

    if (!window.confirm("Delete this project?")) return;

    try {
      const response = await fetch(`${API_URL}/api/projects/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        alert("Failed to delete project.");
        return;
      }

      alert("Project deleted successfully!");
      fetchProjects();
    } catch (error) {
      console.error("Network error:", error);
      alert("Cannot connect to server.");
    }
  };

  const openTypeModal = (project: any) => {
    setCurrentProject(project);

    const existingTypes =
      project.types?.map((t: any) => t.id) || [];

    setSelectedTypes(existingTypes);

    setShowModal(true);
  };

  const toggleType = (id: number) => {
    setSelectedTypes((prev) =>
      prev.includes(id)
        ? prev.filter((t) => t !== id)
        : [...prev, id]
    );
  };

  const saveTypes = async () => {
    if (!currentProject) return;

    try {
      const res = await fetch(
        `${API_URL}/api/projects/${currentProject.id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            types: selectedTypes,
          }),
        }
      );

      if (!res.ok) {
        alert("Failed to update project types.");
        return;
      }

      setShowModal(false);
      fetchProjects();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <DashTitle currentPage="Projects" title="Projects" />

      <div className="container section-padding">
        <h2 className="mb-4">Manage Projects</h2>

        <Link to="/dashboard/projects/add" className="btn btn-primary mb-4">
          Add New Project
        </Link>

        <div className="row">
          {projects.map((project) => (
            <div
              className="col-md-6 col-lg-4 mb-4"
              key={project.id}
            >
              <div className="card h-100 shadow-sm border-0">

                {project.image1 && (
                  <img
                    src={`${API_URL}/storage/${project.image1}`}
                    className="card-img-top"
                    alt={project.title}
                    style={{
                      height: "200px",
                      objectFit: "cover",
                    }}
                  />
                )}

                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">
                    {project.title}
                  </h5>

                  
                  {project.types?.length > 0 && (
                    <div className="mb-2">
                      {project.types.map((type: any) => (
                        <span
                          key={type.id}
                          className="badge bg-primary me-1"
                        >
                          {type.project_type}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="mt-auto">
                    <Link
                      to={`/dashboard/projects/edit/${project.id}`}
                      className="btn btn-warning btn-sm me-2"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() =>
                        openTypeModal(project)
                      }
                      className="btn btn-info btn-sm me-2"
                    >
                      Add Types
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(project.id)
                      }
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

    

      {showModal && (
        <div
          className="modal d-block"
          style={{
            background: "rgba(0,0,0,0.5)",
          }}
        >
          <div className="modal-dialog">
            <div className="modal-content p-4">

              <h5 className="mb-3">
                Select Project Types
              </h5>

              {types.map((type) => (
                <div
                  key={type.id}
                  className="form-check"
                >
                  <input
                    type="checkbox"
                    className="form-check-input"
                    checked={selectedTypes.includes(
                      type.id
                    )}
                    onChange={() =>
                      toggleType(type.id)
                    }
                  />

                  <label className="form-check-label">
                    {type.project_type}
                  </label>
                </div>
              ))}

              <div className="mt-4">
                <button
                  className="btn btn-success me-2"
                  onClick={saveTypes}
                >
                  Save
                </button>

                <button
                  className="btn btn-secondary"
                  onClick={() =>
                    setShowModal(false)
                  }
                >
                  Cancel
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminProjects;