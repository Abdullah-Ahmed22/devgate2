import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddService = () => {
    const API_URL = import.meta.env.VITE_API_URL;
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<Record<string, string[]>>({});
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const [form, setForm] = useState({
        title: "",
        description: "",
        text1: "",
        text2: "",
        text3: "",
        image1: null as File | null,
        image2: null as File | null,
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const { name } = e.target;

        if (e.target instanceof HTMLInputElement && e.target.type === "file") {
            const files = e.target.files;
            setForm((prev) => ({
                ...prev,
                [name]: files && files.length > 0 ? files[0] : null,
            }));
        } else {
            setForm((prev) => ({
                ...prev,
                [name]: e.target.value,
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

        const newErrors: Record<string, string[]> = {};

        if (!form.title.trim()) {
            newErrors.title = ["Title is required."];
        }

        if (!form.description.trim()) {
            newErrors.description = ["Description is required."];
        }

        if (!form.text1.trim()) {
            newErrors.text1 = ["Text 1 is required."];
        }

        if (!form.image1) {
            newErrors.image1 = ["Image 1 is required."];
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setLoading(false);
            return;
        }

        const formData = new FormData();
        Object.entries(form).forEach(([key, value]) => {
            if (value) formData.append(key, value as any);
        });

        try {
            const response = await fetch(`${API_URL}/api/services`, {
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
                } else if (response.status === 401) {
                    alert("Unauthorized. Please login again.");
                } else {
                    alert("Something went wrong.");
                }
                return;
            }

            navigate("/dashboard/services");
        } catch (error) {
            console.error("Network error:", error);
            alert("Cannot connect to server.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container section-padding">
            <h2>Add Service</h2>

            <form onSubmit={handleSubmit}>
                {errors.title && (
                    <small className="text-danger">{errors.title[0]}</small>
                )}
                <input
                    name="title"
                    placeholder="Title"
                    className="form-control mb-2"
                    onChange={handleChange}
                />

                {errors.description && (
                    <small className="text-danger">
                        {errors.description[0]}
                    </small>
                )}
                <textarea
                    name="description"
                    placeholder="Description"
                    className="form-control mb-2"
                    onChange={handleChange}
                />
                {errors.text1 && (
                    <small className="text-danger">{errors.text1[0]}</small>
                )}
                <textarea
                    name="text1"
                    placeholder="Text 1"
                    className="form-control mb-2"
                    onChange={handleChange}
                />
                {errors.text2 && (
                    <small className="text-danger">{errors.text2[0]}</small>
                )}
                <textarea
                    name="text2"
                    placeholder="Text 2"
                    className="form-control mb-2"
                    onChange={handleChange}
                />

                {errors.text3 && (
                    <small className="text-danger">{errors.text3[0]}</small>
                )}
                <textarea
                    name="text3"
                    placeholder="Text 3"
                    className="form-control mb-2"
                    onChange={handleChange}
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
                    className="form-control mb-3"
                />

                <button className="btn btn-success" disabled={loading}>
                    {loading ? "Saving..." : "Save"}
                </button>
            </form>
        </div>
    );
};

export default AddService;
