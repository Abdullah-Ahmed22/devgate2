import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AddProject = () => {
    const API_URL = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<Record<string, string[]>>({});

    const [types, setTypes] = useState<any[]>([]);
    const [selectedTypes, setSelectedTypes] = useState<number[]>([]);

    const [form, setForm] = useState({
        title: "",
        text1: "",
        text2: "",
        text3: "",
        image1: null as File | null,
        image2: null as File | null,
        image3: null as File | null,
    });

    useEffect(() => {
        fetchTypes();
    }, []);

    const fetchTypes = async () => {
        try {
            const res = await fetch(`${API_URL}/api/types`);
            const data = await res.json();
            setTypes(data);
        } catch (error) {
            console.error("Failed to fetch types:", error);
        }
    };

    const toggleType = (id: number) => {
        setSelectedTypes((prev) =>
            prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id],
        );
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const target = e.target;
        const name = target.name;

        if (target instanceof HTMLInputElement && target.type === "file") {
            setForm((prev) => ({
                ...prev,
                [name]:
                    target.files && target.files.length > 0
                        ? target.files[0]
                        : null,
            }));
        } else {
            setForm((prev) => ({
                ...prev,
                [name]: target.value,
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        if (!token) {
            alert("You are not authenticated.");
            return;
        }

        if (selectedTypes.length === 0) {
            setErrors({
                types: ["Please select at least one project type."],
            });
            return;
        }

        setLoading(true);
        setErrors({});

        try {
            const formData = new FormData();

            formData.append("title", form.title);
            formData.append("text1", form.text1);
            formData.append("text2", form.text2);
            formData.append("text3", form.text3);

            if (form.image1 instanceof File)
                formData.append("image1", form.image1);

            if (form.image2 instanceof File)
                formData.append("image2", form.image2);

            if (form.image3 instanceof File)
                formData.append("image3", form.image3);

            // send types[]
            selectedTypes.forEach((id) => {
                formData.append("types[]", String(id));
            });

            const response = await fetch(`${API_URL}/api/projects`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
                body: formData,
            });

            const data = await response.json();

            if (!response.ok) {
                if (response.status === 422) {
                    setErrors(data.errors || {});
                } else {
                    alert(data.message || "Failed to add project.");
                }
                return;
            }

            navigate("/dashboard/projects");
        } catch (error) {
            console.error("Network error:", error);
            alert("Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container section-padding">
            <h2>Add Project</h2>

            <form onSubmit={handleSubmit}>
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
                />

                {errors.text1 && (
                    <small className="text-danger">{errors.text1[0]}</small>
                )}
                <textarea
                    name="text1"
                    placeholder="Text 1"
                    value={form.text1}
                    onChange={handleChange}
                    className="form-control mb-2"
                />

                {errors.text2 && (
                    <small className="text-danger">{errors.text2[0]}</small>
                )}
                <textarea
                    name="text2"
                    placeholder="Text 2"
                    value={form.text2}
                    onChange={handleChange}
                    className="form-control mb-2"
                />

                {errors.text3 && (
                    <small className="text-danger">{errors.text3[0]}</small>
                )}
                <textarea
                    name="text3"
                    placeholder="Text 3"
                    value={form.text3}
                    onChange={handleChange}
                    className="form-control mb-2"
                />

                {errors.image1 && (
                    <small className="text-danger">{errors.image1[0]}</small>
                )}
                <input
                    type="file"
                    name="image1"
                    onChange={handleChange}
                    className="form-control mb-2"
                />

                {errors.image2 && (
                    <small className="text-danger">{errors.image2[0]}</small>
                )}
                <input
                    type="file"
                    name="image2"
                    onChange={handleChange}
                    className="form-control mb-2"
                />

                {errors.image3 && (
                    <small className="text-danger">{errors.image3[0]}</small>
                )}
                <input
                    type="file"
                    name="image3"
                    onChange={handleChange}
                    className="form-control mb-3"
                />

                {/* TYPES CHECKBOX */}
{errors.types && (
                                <small className="text-danger">
                                    {errors.types[0]}
                                </small>
                            )}
                <div className="mb-3">
                    <label className="form-label">Project Types</label>

                    {types.map((type) => (
                        <div key={type.id} className="form-check">
                            
                            <input
                                type="checkbox"
                                className="form-check-input"
                                checked={selectedTypes.includes(type.id)}
                                onChange={() => toggleType(type.id)}
                            />

                            <label className="form-check-label">
                                {type.project_type}
                            </label>
                        </div>
                    ))}
                </div>

                <button className="btn btn-success" disabled={loading}>
                    {loading ? "Saving..." : "Save Project"}
                </button>
            </form>
        </div>
    );
};

export default AddProject;
