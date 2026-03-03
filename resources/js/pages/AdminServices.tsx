import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DashTitle from "./DashTitle";

interface ServiceType {
    id: number;
    title: string;
    description: string;
    image1: string;
    image2: string;
}

const AdminServices = () => {
    const API_URL = import.meta.env.VITE_API_URL;
    const [items, setItems] = useState<ServiceType[]>([]);
    const token = localStorage.getItem("token");

    const fetchItems = async () => {
        const res = await fetch(`${API_URL}/api/services`);
        const data = await res.json();
        setItems(data.data);
    };

    useEffect(() => {
        fetchItems();
    }, []);

    const handleDelete = async (id: number) => {
        if (!window.confirm("Delete this service?")) return;

        await fetch(`${API_URL}/api/services/${id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
        });

        fetchItems();
    };

    return (
        <>
            <DashTitle currentPage="Services" title="Services"/>

        <div className="container section-padding">
            <h2>Manage Services</h2>

            <Link to="/dashboard/services/add" className="btn btn-success mb-3">
                Add New Service
            </Link>

            <div className="row">
                {items.map((item) => (
                    <div key={item.id} className="col-md-4 mb-4">
                        <div className="p-3 border rounded">
                            {item.image1 && (
                                <img
                                    src={`${API_URL}/storage/${item.image1}`}
                                    className="img-fluid mb-2"
                                />
                            )}

                            <h5>{item.title}</h5>
                            <p>{item.description}</p>

                            <Link
                                to={`/dashboard/services/edit/${item.id}`}
                                className="btn btn-primary btn-sm me-2"
                            >
                                Edit
                            </Link>

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
        </>
    );
};

export default AdminServices;
