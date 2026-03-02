import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Admin {
  id: number;
  email: string;
  role: string;
}

interface ApiResponse<T> {
  status: string;
  message?: string;
  data?: T;
}

const Admins: React.FC = () => {
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const [admins, setAdmins] = useState<Admin[]>([]);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const token = localStorage.getItem("token");
  const adminData = localStorage.getItem("admin");
  const currentAdmin: Admin | null = adminData
    ? JSON.parse(adminData)
    : null;

  useEffect(() => {
    if (!token || currentAdmin?.role !== "superadmin") {
      navigate("/dashboard");
    } else {
      fetchAdmins();
    }
  }, [navigate]);


  const fetchAdmins = async (): Promise<void> => {
    try {
      const res = await fetch(`${API_URL}/api/admins`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      const data: ApiResponse<Admin[]> = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to fetch admins");
      }

      setAdmins(data.data || []);
    } catch (err: any) {
      setError(err.message);
      console.error(err);
    }
  };


  const createAdmin = async (): Promise<void> => {
    try {
      setError("");

      const res = await fetch(`${API_URL}/api/admins`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data: ApiResponse<Admin> = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to create admin");
      }

      setEmail("");
      setPassword("");
      fetchAdmins();
    } catch (err: any) {
      setError(err.message);
      console.error(err);
    }
  };


  const deleteAdmin = async (id: number): Promise<void> => {
    try {
      const res = await fetch(
        `${API_URL}/api/admins/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to delete admin");
      }

      fetchAdmins();
    } catch (err: any) {
      setError(err.message);
      console.error(err);
    }
  };

  return (
  <div className="container my-5">
  <div className="row justify-content-center">
    <div className="col-lg-8">

      <h3 className="mb-4 text-center">Manage Admins</h3>

      {error && (
        <div className="alert alert-danger text-center">
          {error}
        </div>
      )}

      {/* Create Admin Card */}
      <div className="card shadow-sm mb-4">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">Add New Admin</h5>
        </div>

        <div className="card-body">
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            className="btn btn-primary w-100"
            onClick={createAdmin}
          >
            Create Admin
          </button>
        </div>
      </div>

      {/* Admin List Card */}
      <div className="card shadow-sm">
        <div className="card-header bg-dark text-white">
          <h5 className="mb-0">All Admins</h5>
        </div>

        <div className="card-body p-0">
          <table className="table table-striped mb-0">
            <thead className="table-light">
              <tr>
                <th>Email</th>
                <th>Role</th>
                <th className="text-end">Action</th>
              </tr>
            </thead>
            <tbody>
              {admins.length > 0 ? (
                admins.map((item) => (
                  <tr key={item.id}>
                    <td>{item.email}</td>
                    <td>
                      <span className={`badge ${item.role === "superadmin" ? "bg-success" : "bg-secondary"}`}>
                        {item.role}
                      </span>
                    </td>
                    <td className="text-end">
                      {item.id !== currentAdmin?.id && (
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => deleteAdmin(item.id)}
                        >
                          Delete
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="text-center py-3">
                    No admins found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  </div>
</div>
  );
};

export default Admins;