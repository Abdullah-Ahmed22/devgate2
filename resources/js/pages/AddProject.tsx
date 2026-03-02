import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProject = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  const [form, setForm] = useState({
    title: "",
    text1: "",
    text2: "",
    text3: "",
    image1: null as File | null,
    image2: null as File | null,
    image3: null as File | null,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (e.target instanceof HTMLInputElement && e.target.files) {
      setForm((prev) => ({ ...prev, [name]: e.target.files![0] }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("You are not authenticated.");
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

      const response = await fetch(
        `${API_URL}/api/projects`,
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

        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="form-control mb-2"
        />
        {errors.title && (
          <small className="text-danger">{errors.title[0]}</small>
        )}

        <textarea
          name="text1"
          placeholder="Text 1"
          value={form.text1}
          onChange={handleChange}
          className="form-control mb-2"
        />
        {errors.text1 && (
          <small className="text-danger">{errors.text1[0]}</small>
        )}

        <textarea
          name="text2"
          placeholder="Text 2"
          value={form.text2}
          onChange={handleChange}
          className="form-control mb-2"
        />

        <textarea
          name="text3"
          placeholder="Text 3"
          value={form.text3}
          onChange={handleChange}
          className="form-control mb-2"
        />

        <input
          type="file"
          name="image1"
          onChange={handleChange}
          className="form-control mb-2"
        />

        <input
          type="file"
          name="image2"
          onChange={handleChange}
          className="form-control mb-2"
        />

        <input
          type="file"
          name="image3"
          onChange={handleChange}
          className="form-control mb-3"
        />

        <button className="btn btn-success" disabled={loading}>
          {loading ? "Saving..." : "Save Project"}
        </button>

      </form>
    </div>
  );
};

export default AddProject;
