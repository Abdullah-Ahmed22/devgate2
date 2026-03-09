import { useEffect, useState } from "react";

const AdminTypes = () => {
    const API_URL = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem("token");

    const [types, setTypes] = useState<any[]>([]);
    const [newType, setNewType] = useState("");
    const [loading, setLoading] = useState(false);

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
        fetchTypes();
    }, []);

    const addType = async (e: any) => {
        e.preventDefault();

        if (!newType.trim()) return;

        try {
            const res = await fetch(`${API_URL}/api/types`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    project_type: newType,
                }),
            });

            if (!res.ok) {
                alert("Failed to add type");
                return;
            }

            setNewType("");
            fetchTypes();
        } catch (err) {
            console.error(err);
        }
    };

    const deleteType = async (id: number) => {
        if (!window.confirm("Delete this type?")) return;

        try {
            const res = await fetch(`${API_URL}/api/types/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
            });

            if (!res.ok) {
                alert("Failed to delete type");
                return;
            }

            fetchTypes();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="container section-padding">
            <h2 className="mb-4">Manage Types</h2>

            {/* ADD TYPE */}

            <form onSubmit={addType} className="mb-4 d-flex">
                <input
                    type="text"
                    className="form-control me-2"
                    placeholder="New type..."
                    value={newType}
                    onChange={(e) => setNewType(e.target.value)}
                />

                <button className="btn btn-success">Add Type</button>
            </form>

            {/* TYPES LIST */}

            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Type</th>
                        <th style={{ width: "120px" }}>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {types.map((type) => (
                        <tr key={type.id}>
                            <td>{type.id}</td>

                            <td>{type.project_type}</td>

                            <td>
                                <button
                                    onClick={() => deleteType(type.id)}
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

export default AdminTypes;
