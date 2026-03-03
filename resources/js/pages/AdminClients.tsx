import { useEffect, useState } from "react";

interface ClientType {
  id: number;
  image: string;
}

const AdminClients = () => {
  const API_URL = import.meta.env.VITE_API_URL;

  const [clients, setClients] = useState<ClientType[]>([]);
  const [image, setImage] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const fetchClients = async () => {
    const res = await fetch(`${API_URL}/api/ourclients`);
    const data = await res.json();
    setClients(data.data);
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      alert("You are not authenticated.");
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      const formData = new FormData();

      if (image instanceof File) {
        formData.append("image", image);
      }

      const response = await fetch(`${API_URL}/api/ourclients`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        body: formData,
      });

      const data = await response.json();

      // ✅ Validation errors
      if (response.status === 422) {
        setErrors(data.errors || {});
        return;
      }

      // ❌ Other server errors
      if (!response.ok) {
        alert(data.message || "Failed to add client.");
        return;
      }

      // ✅ Success
      setImage(null);
      fetchClients();
    } catch (error) {
      console.error(error);
      alert("Network error.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Delete this client?")) return;

    if (!token) return;

    try {
      const response = await fetch(`${API_URL}/api/ourclients/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to delete client.");
        return;
      }

      fetchClients();
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="container section-padding">
      <h2>Manage Our Clients</h2>

      <form onSubmit={handleSubmit} className="mb-4">
        {/* ✅ Image Validation Error */}
        {errors.image && (
          <small className="text-danger d-block mb-2">
            {errors.image[0]}
          </small>
        )}

        <input
          type="file"
          name="image"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
          className="form-control mb-3"
        />

        <button className="btn btn-success" disabled={loading}>
          {loading ? "Saving..." : "Add Client Logo"}
        </button>
      </form>

      <div className="row">
        {clients.map((client) => (
          <div key={client.id} className="col-md-3 mb-4 text-center">
            <div className="p-3 bg-white shadow rounded">
              <img
                src={`${API_URL}/storage/${client.image}`}
                alt="client"
                className="img-fluid mb-3"
                style={{ height: "80px", objectFit: "contain" }}
              />

              <button
                onClick={() => handleDelete(client.id)}
                className="btn btn-danger btn-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminClients;