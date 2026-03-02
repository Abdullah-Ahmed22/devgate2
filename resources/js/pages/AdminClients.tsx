import { useEffect, useState } from "react";

interface ClientType {
  id: number;
  image: string;
}

const AdminClients = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [clients, setClients] = useState<ClientType[]>([]);
  const [image, setImage] = useState<File | null>(null);

  const token = localStorage.getItem("token");

  const fetchClients = async () => {
    const res = await fetch(`${API_URL}/api/ourclients`);
    const data = await res.json();
    setClients(data.data);
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!image) return alert("Select image");

    const formData = new FormData();
    formData.append("image", image);

    await fetch(`${API_URL}/api/ourclients`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      body: formData,
    });

    setImage(null);
    fetchClients();
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Delete this client?")) return;

    await fetch(`${API_URL}/api/ourclients/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    fetchClients();
  };

  return (
    <div className="container section-padding">
      <h2>Manage Our Clients</h2>


      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="file"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
          className="form-control mb-3"
        />

        <button className="btn btn-success">
          Add Client Logo
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
