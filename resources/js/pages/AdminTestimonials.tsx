import { useEffect, useState } from "react";

interface TestimonialType {
    id: number;
    image: string;
    description: string;
    name: string;
    position: string;
}

const AdminTestimonials = () => {
    const [errors, setErrors] = useState<Record<string, string[]>>({});
    const [loading, setLoading] = useState(false);
    const API_URL = import.meta.env.VITE_API_URL;
    const [items, setItems] = useState<TestimonialType[]>([]);
    const [form, setForm] = useState({
        description: "",
        name: "",
        position: "",
        image: null as File | null,
    });

    const [editingId, setEditingId] = useState<number | null>(null);

    const token = localStorage.getItem("token");

    const fetchItems = async () => {
        const res = await fetch(`${API_URL}/api/teammates`);
        const data = await res.json();
        setItems(data.data);
    };

    useEffect(() => {
        fetchItems();
    }, []);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const target = e.target;

        if (target instanceof HTMLInputElement && target.type === "file") {
            setForm((prev) => ({
                ...prev,
                image: target.files?.[0] ?? null,
            }));
        } else {
            setForm((prev) => ({
                ...prev,
                [target.name]: target.value,
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!token) {
            alert("You are not logged in.");
            return;
        }

        setLoading(true);
        setErrors({});

        // ✅ Frontend validation
        const newErrors: Record<string, string[]> = {};

        if (!form.description.trim()) {
            newErrors.description = ["Description is required."];
        }

        if (!form.name.trim()) {
            newErrors.name = ["Name is required."];
        }

        if (!form.position.trim()) {
            newErrors.position = ["Position is required."];
        }

        // Image required only when creating
        if (!editingId && !form.image) {
            newErrors.image = ["Image is required."];
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setLoading(false);
            return;
        }

        const formData = new FormData();
        formData.append("description", form.description);
        formData.append("name", form.name);
        formData.append("position", form.position);

        if (form.image) {
            formData.append("image", form.image);
        }

        if (editingId) {
            formData.append("_method", "PUT");
        }

        const url = editingId
            ? `${API_URL}/api/teammates/${editingId}`
            : `${API_URL}/api/teammates`;

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
                body: formData,
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

            setEditingId(null);
            setForm({
                description: "",
                name: "",
                position: "",
                image: null,
            });

            fetchItems();
        } catch (error) {
            console.error(error);
            alert("Network error.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        await fetch(`${API_URL}/api/teammates/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        fetchItems();
    };

    const handleEdit = (item: TestimonialType) => {
        setEditingId(item.id);
        setForm({
            description: item.description,
            name: item.name,
            position: item.position,
            image: null,
        });
    };

    return (
        <div className="container section-padding">
            <h2>Manage Testimonials</h2>

            <form onSubmit={handleSubmit} className="mb-4">
                {errors.description && (
                    <small className="text-danger">
                        {errors.description[0]}
                    </small>
                )}
                <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    className="form-control mb-2"
                    placeholder="Description"
                />
                {errors.name && (
                    <small className="text-danger">{errors.name[0]}</small>
                )}

                <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="form-control mb-2"
                    placeholder="Name"
                />
                {errors.position && (
                    <small className="text-danger">{errors.position[0]}</small>
                )}

                <input
                    name="position"
                    value={form.position}
                    onChange={handleChange}
                    className="form-control mb-2"
                    placeholder="Position"
                />

                {errors.image && (
                    <small className="text-danger">{errors.image[0]}</small>
                )}

                <input
                    type="file"
                    onChange={handleChange}
                    className="form-control mb-3"
                />

                <button className="btn btn-success" disabled={loading}>
                    {loading ? "Saving..." : editingId ? "Update" : "Add"}
                </button>
            </form>

            <div className="row">
                {items.map((item) => (
                    <div key={item.id} className="col-md-4 mb-4">
                        <div className="p-3 border rounded">
                            <img
                                src={`${API_URL}/storage/${item.image}`}
                                className="img-fluid mb-2"
                                alt=""
                            />
                            <h5>{item.name}</h5>
                            <p>{item.position}</p>

                            <button
                                onClick={() => handleEdit(item)}
                                className="btn btn-primary btn-sm me-2"
                            >
                                Edit
                            </button>

                            <button
                                onClick={() => handleDelete(item.id)}
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

export default AdminTestimonials;
