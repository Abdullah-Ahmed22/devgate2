import { useEffect, useState } from "react";

interface StatType {
    id: number;
    number: number;
    title: string;
}

const Statistics = () => {
    const [errors, setErrors] = useState<Record<string, string[]>>({});
    const [loading, setLoading] = useState(false);

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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!token) {
            alert("You are not logged in.");
            return;
        }

        setLoading(true);
        setErrors({});

        const newErrors: Record<string, string[]> = {};

        if (!form.number.trim()) {
            newErrors.number = ["Number is required."];
        }

        if (!form.title.trim()) {
            newErrors.title = ["Title is required."];
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setLoading(false);
            return;
        }

        const url = editingId
            ? `${API_URL}/api/statistics/${editingId}`
            : `${API_URL}/api/statistics`;

        const method = editingId ? "PUT" : "POST";

        try {
            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    number: Number(form.number),
                    title: form.title,
                }),
            });

            const data = await response.json().catch(() => null);

            if (!response.ok) {
                if (response.status === 422) {
                    setErrors(data?.errors || {});
                } else {
                    alert("Something went wrong.");
                }
                return;
            }

            setForm({ number: "", title: "" });
            setEditingId(null);
            fetchStats();
        } catch (error) {
            console.error(error);
            alert("Network error.");
        } finally {
            setLoading(false);
        }
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
                {errors.number && (
                    <small className="text-danger">{errors.number[0]}</small>
                )}
                <input
                    type="number"
                    name="number"
                    placeholder="Number"
                    value={form.number}
                    onChange={handleChange}
                    className="form-control mb-2"
                    required
                />
                {errors.title && (
                    <small className="text-danger">{errors.title[0]}</small>
                )}
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={form.title}
                    onChange={handleChange}
                    className="form-control mb-2"
                    required
                />
                <button className="btn btn-success" disabled={loading}>
                    {loading ? "Saving..." : editingId ? "Update" : "Add"}
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
