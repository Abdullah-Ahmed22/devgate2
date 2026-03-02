import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProject = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const [form, setForm] = useState({
    title: "",
    text1: "",
    text2: "",
    text3: "",
    image1: null as File | null,
    image2: null as File | null,
    image3: null as File | null,
  });

  const [oldImages, setOldImages] = useState({
    image1: null as string | null,
    image2: null as string | null,
    image3: null as string | null,
  });

  const [preview, setPreview] = useState({
    image1: null as string | null,
    image2: null as string | null,
    image3: null as string | null,
  });

  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const token = localStorage.getItem("token");

  // 🔹 Fetch project
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await fetch(
          `${API_URL}/api/projects/${id}`
        );

        const data = await res.json();

        setForm({
          title: data.title || "",
          text1: data.text1 || "",
          text2: data.text2 || "",
          text3: data.text3 || "",
          image1: null,
          image2: null,
          image3: null,
        });

        setOldImages({
          image1: data.image1_url,
          image2: data.image2_url,
          image3: data.image3_url,
        });

      } catch (error) {
        console.error("Fetch error", error);
      } finally {
        setFetching(false);
      }
    };

    fetchProject();
  }, [id]);

  // 🔹 Handle input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (e.target instanceof HTMLInputElement && e.target.files) {
      const file = e.target.files[0];

      setForm({ ...form, [name]: file });

      setPreview({
        ...preview,
        [name]: URL.createObjectURL(file),
      });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // 🔹 Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      alert("Unauthorized");
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

      if (form.image1) formData.append("image1", form.image1);
      if (form.image2) formData.append("image2", form.image2);
      if (form.image3) formData.append("image3", form.image3);

      formData.append("_method", "PUT");

      const response = await fetch(
        `${API_URL}/api/projects/${id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 422) {
          setErrors(data.errors || {});
        } else {
          alert(data.message || "Update failed");
        }
        return;
      }

      navigate("/dashboard/projects");

    } catch (error) {
      console.error("Update error", error);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <p>Loading...</p>;

  return (
    <div className="container section-padding">
      <h2>Edit Project</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Enter project title"
          value={form.title}
          onChange={handleChange}
          className="form-control mb-2"
        />
        {errors.title && (
          <small className="text-danger">{errors.title[0]}</small>
        )}

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
            <img src={oldImages.image1} alt="Old1" width="180" />
          </div>
        )}
        {preview.image1 && (
          <div className="mb-2">
            <p>New Image 1 Preview:</p>
            <img src={preview.image1} alt="Preview1" width="180" />
          </div>
        )}
        <input type="file" name="image1" onChange={handleChange} className="form-control mb-3" />

        {/* 🔹 Image 2 */}
        {oldImages.image2 && !preview.image2 && (
          <div className="mb-2">
            <p>Current Image 2:</p>
            <img src={oldImages.image2} alt="Old2" width="180" />
          </div>
        )}
        {preview.image2 && (
          <div className="mb-2">
            <p>New Image 2 Preview:</p>
            <img src={preview.image2} alt="Preview2" width="180" />
          </div>
        )}
        <input type="file" name="image2" onChange={handleChange} className="form-control mb-3" />

        {/* 🔹 Image 3 */}
        {oldImages.image3 && !preview.image3 && (
          <div className="mb-2">
            <p>Current Image 3:</p>
            <img src={oldImages.image3} alt="Old3" width="180" />
          </div>
        )}
        {preview.image3 && (
          <div className="mb-2">
            <p>New Image 3 Preview:</p>
            <img src={preview.image3} alt="Preview3" width="180" />
          </div>
        )}
        <input type="file" name="image3" onChange={handleChange} className="form-control mb-3" />

        <button className="btn btn-primary" disabled={loading}>
          {loading ? "Updating..." : "Update Project"}
        </button>
      </form>
    </div>
  );
};

export default UpdateProject;