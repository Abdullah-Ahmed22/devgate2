import { useEffect, useState } from "react";

interface HomeImageType {
    id: number;
    image: string;
}

const AdminHomeImage = () => {
    const API_URL = import.meta.env.VITE_API_URL;
    const [items, setItems] = useState<HomeImageType[]>([]);
    const [image, setImage] = useState<File | null>(null);

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

        if (!image) {
            alert("Image is required");
            return;
        }

        const formData = new FormData();
        formData.append("image", image);

        const response = await fetch(`${API_URL}/api/homeimage`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
            },
            body: formData,
        });

        if (!response.ok) {
            alert("Error occurred");
            return;
        }

        setImage(null);
        fetchItems();
    };

    const handleDelete = async (id: number) => {
        await fetch(`${API_URL}/api/homeimage/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        fetchItems();
    };

    return (
        <div className="container section-padding">
            <h2>Manage Home Images</h2>

            {/* Upload Form */}
            <form onSubmit={handleSubmit} className="mb-4">
                <input
                    type="file"
                    className="form-control mb-3"
                    onChange={(e) =>
                        setImage(e.target.files ? e.target.files[0] : null)
                    }
                />

                <button className="btn btn-success">Upload Image</button>
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