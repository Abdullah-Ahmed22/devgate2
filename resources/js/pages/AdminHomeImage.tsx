import { useEffect, useState } from "react";

interface HomeImageType {
    id: number;
    image: string;
}

const AdminHomeImage = () => {
    const API_URL = import.meta.env.VITE_API_URL;

    const [items, setItems] = useState<HomeImageType[]>([]);
    const [image, setImage] = useState<File | null>(null);
    const [errors, setErrors] = useState<Record<string, string[]>>({});
    const [loading, setLoading] = useState(false);

    const token = localStorage.getItem("token");

    const fetchItems = async () => {
        const res = await fetch(`${API_URL}/api/homeimage`);
        const data = await res.json();
        setItems(data);
    };

    useEffect(() => {
        fetchItems();
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

            const response = await fetch(`${API_URL}/api/homeimage`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
                body: formData,
            });

            const data = await response.json();

            if (response.status === 422) {
                setErrors(data.errors || {});
                return;
            }

            if (!response.ok) {
                alert(data.message || "Failed to upload image.");
                return;
            }

            // ✅ Success
            setImage(null);
            fetchItems();
        } catch (error) {
            console.error(error);
            alert("Network error.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!token) return;

        try {
            const response = await fetch(`${API_URL}/api/homeimage/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
            });

            const data = await response.json();

            if (!response.ok) {
                alert(data.message || "Failed to delete image.");
                return;
            }

            fetchItems();
        } catch (error) {
            console.error(error);
            alert("Something went wrong.");
        }
    };

    return (
        <div className="container section-padding">
            <h2>Manage Home Images</h2>


            <form onSubmit={handleSubmit} className="mb-4">


                {errors.image && (
                    <small className="text-danger d-block mb-2">
                        {errors.image[0]}
                    </small>
                )}

                <input
                    type="file"
                    name="image"
                    className="form-control mb-3"
                    onChange={(e) =>
                        setImage(e.target.files?.[0] || null)
                    }
                />

                <button className="btn btn-success" disabled={loading}>
                    {loading ? "Uploading..." : "Upload Image"}
                </button>
            </form>

            {/* Images List */}
            <div className="row">
                {items.map((item) => (
                    <div key={item.id} className="col-md-4 mb-4">
                        <div className="p-3 border rounded text-center">
                            <img
                                src={`${API_URL}/storage/${item.image}`}
                                className="img-fluid mb-2"
                                alt=""
                            />

                            <button
                                onClick={() => handleDelete(item.id)}
                                className="btn btn-danger btn-sm mt-2"
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

export default AdminHomeImage;