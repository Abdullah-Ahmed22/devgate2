import { useEffect, useState } from "react";

interface StatType {
  id: number;
  number: number;
  title: string;
}

const Statistics = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [stats, setStats] = useState<StatType[]>([]);
  const [form, setForm] = useState({ number: "", title: "" });
  const [editingId, setEditingId] = useState<number | null>(null);

  const token = localStorage.getItem("token");

  const fetchStats = async () => {
    const res = await fetch(`${API_URL}/api/statistics`);
    const data = await res.json();
    setStats(data.data);
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const url = editingId
      ? `${API_URL}/api/statistics/${editingId}`
      : `${API_URL}/api/statistics`;

    const method = editingId ? "PUT" : "POST";

    await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });

    setForm({ number: "", title: "" });
    setEditingId(null);
    fetchStats();
  };

  const handleEdit = (stat: StatType) => {
    setForm({
      number: stat.number.toString(),
      title: stat.title,
    });
    setEditingId(stat.id);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Delete this item?")) return;

    await fetch(`${API_URL}/api/statistics/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchStats();
  };

  return (
    <div className="container section-padding">
      <h2>Manage Statistics</h2>

      {/* Add / Edit Form */}
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="number"
          name="number"
          placeholder="Number"
          value={form.number}
          onChange={handleChange}
          className="form-control mb-2"
          required
        />

        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="form-control mb-2"
          required
        />

        <button className="btn btn-success">
          {editingId ? "Update" : "Add"}
        </button>
      </form>

      {/* List */}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Number</th>
            <th>Title</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {stats.map((stat) => (
            <tr key={stat.id}>
              <td>{stat.id}</td>
              <td>{stat.number}</td>
              <td>{stat.title}</td>
              <td>
                <button
                  onClick={() => handleEdit(stat)}
                  className="btn btn-primary btn-sm me-2"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(stat.id)}
                  className="btn btn-danger btn-sm"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Statistics;
