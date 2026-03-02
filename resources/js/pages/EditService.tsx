import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditService = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const { id } = useParams();
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

  const [oldImages, setOldImages] = useState({
    image1: null as string | null,
    image2: null as string | null,
  });

  const [preview, setPreview] = useState({
    image1: null as string | null,
    image2: null as string | null,
  });

  // 🔹 Fetch service data
  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await fetch(
          `${API_URL}/api/services/${id}`,
          {
            headers: {
              Accept: "application/json",
            },
          }
        );

        if (!response.ok) {
          alert("Failed to load service.");
          return;
        }

        const data = await response.json();
        const service = data.data;

        setForm({
          title: service.title || "",
          description: service.description || "",
          text1: service.text1 || "",
          text2: service.text2 || "",
          text3: service.text3 || "",
          image1: null,
          image2: null,
        });

        setOldImages({
          image1: service.image1_url,
          image2: service.image2_url,
        });

      } catch (error) {
        console.error("Network error:", error);
        alert("Cannot connect to server.");
      }
    };

    fetchService();
  }, [id]);

  // 🔹 Handle input changes
  const handleChange = (e: any) => {
    const { name, value, files } = e.target;

    if (files) {
      const file = files[0];

      setForm({ ...form, [name]: file });

      setPreview({
        ...preview,
        [name]: URL.createObjectURL(file),
      });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // 🔹 Submit update
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!token) {
      alert("You are not logged in.");
      return;
    }

    const formData = new FormData();

    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("text1", form.text1);
    formData.append("text2", form.text2);
    formData.append("text3", form.text3);

    if (form.image1) formData.append("image1", form.image1);
    if (form.image2) formData.append("image2", form.image2);

    formData.append("_method", "PUT");

    try {
      const response = await fetch(
        `${API_URL}/api/services/${id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
          body: formData,
        }
      );

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        if (response.status === 401) {
          alert("Unauthorized. Please login again.");
        } else if (response.status === 422) {
          alert("Validation error: " + JSON.stringify(data?.errors));
        } else if (response.status === 404) {
          alert("Service not found.");
        } else {
          alert("Something went wrong.");
        }
        return;
      }

      alert("Service updated successfully!");
      navigate("/dashboard/services");

    } catch (error) {
      console.error("Network error:", error);
      alert("Cannot connect to server.");
    }
  };

  return (
    <div className="container section-padding">
      <h2>Edit Service</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Enter service title"
          value={form.title}
          onChange={handleChange}
          className="form-control mb-2"
        />

        <textarea
          name="description"
          placeholder="Enter short description"
          value={form.description}
          onChange={handleChange}
          className="form-control mb-2"
        />

        <textarea
          name="text1"
          placeholder="Enter first content section"
          value={form.text1}
          onChange={handleChange}
          className="form-control mb-2"
        />

        <textarea
          name="text2"
          placeholder="Enter second content section"
          value={form.text2}
          onChange={handleChange}
          className="form-control mb-2"
        />

        <textarea
          name="text3"
          placeholder="Enter third content section"
          value={form.text3}
          onChange={handleChange}
          className="form-control mb-3"
        />

        {/* 🔹 Image 1 */}
        {oldImages.image1 && !preview.image1 && (
          <div className="mb-2">
            <p>Current Image 1:</p>
            <img
              src={oldImages.image1}
              alt="Old 1"
              style={{ width: "180px", borderRadius: "8px" }}
            />
          </div>
        )}

        {preview.image1 && (
          <div className="mb-2">
            <p>New Image 1 Preview:</p>
            <img
              src={preview.image1}
              alt="Preview 1"
              style={{ width: "180px", borderRadius: "8px" }}
            />
          </div>
        )}

        <input
          type="file"
          name="image1"
          onChange={handleChange}
          className="form-control mb-3"
        />

        {/* 🔹 Image 2 */}
        {oldImages.image2 && !preview.image2 && (
          <div className="mb-2">
            <p>Current Image 2:</p>
            <img
              src={oldImages.image2}
              alt="Old 2"
              style={{ width: "180px", borderRadius: "8px" }}
            />
          </div>
        )}

        {preview.image2 && (
          <div className="mb-2">
            <p>New Image 2 Preview:</p>
            <img
              src={preview.image2}
              alt="Preview 2"
              style={{ width: "180px", borderRadius: "8px" }}
            />
          </div>
        )}

        <input
          type="file"
          name="image2"
          onChange={handleChange}
          className="form-control mb-3"
        />

        <button className="btn btn-primary">Update</button>
      </form>
    </div>
  );
};

export default EditService;