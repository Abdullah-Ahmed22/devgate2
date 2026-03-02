import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddService = () => {
  const API_URL = import.meta.env.VITE_API_URL;
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

  const handleChange = (e: any) => {
    if (e.target.files) {
      setForm({ ...form, [e.target.name]: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e: any) => {
  e.preventDefault();

  if (!token) {
    alert("You are not logged in.");
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
        Accept: "application/json"
      },
      body: formData,
    });

    console.log("Status:", response.status);

 
    if (response.redirected) {
      console.error("Redirected to:", response.url);
      alert("You were redirected. Possibly not authenticated or route is wrong.");
      return;
    }

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      console.error("Error response:", data);

      if (response.status === 401) {
        alert("Unauthorized. Please login again.");
      } else if (response.status === 422) {
        alert("Validation error: " + JSON.stringify(data.errors));
      } else {
        alert("Something went wrong.");
      }

      return;
    }

    alert("Service added successfully!");
    navigate("/dashboard/services");

  } catch (error) {
    console.error("Network error:", error);
    alert("Cannot connect to server.");
  }
};


  return (
    <div className="container section-padding">
      <h2>Add Service</h2>

      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Title" className="form-control mb-2" onChange={handleChange} />
        <textarea name="description" placeholder="Description" className="form-control mb-2" onChange={handleChange} />
        <textarea name="text1" placeholder="Text 1" className="form-control mb-2" onChange={handleChange} />
        <textarea name="text2" placeholder="Text 2" className="form-control mb-2" onChange={handleChange} />
        <textarea name="text3" placeholder="Text 3" className="form-control mb-2" onChange={handleChange} />

        <input type="file" name="image1" onChange={handleChange} className="form-control mb-2" />
        <input type="file" name="image2" onChange={handleChange} className="form-control mb-3" />

        <button className="btn btn-success">Save</button>
      </form>
    </div>
  );
};

export default AddService;
