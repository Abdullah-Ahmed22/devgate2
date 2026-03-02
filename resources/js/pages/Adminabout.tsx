import { useEffect, useState } from "react";

interface MainAbout {
  id?: number;
  image: string;
  header: string;
  header_description: string;
}

interface AboutTitle {
  id?: number;
  title: string;
  description: string;
  text: string;
}

const AdminAbout = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");

  const [main, setMain] = useState<MainAbout>({
    image: "",
    header: "",
    header_description: "",
  });

  const [mainExists, setMainExists] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [titles, setTitles] = useState<AboutTitle[]>([]);
  const [newTitle, setNewTitle] = useState<AboutTitle>({
    title: "",
    description: "",
    text: "",
  });

  const [loading, setLoading] = useState(true);


  useEffect(() => {
    Promise.all([
      fetch(`${API_URL}/api/about`),
      fetch(`${API_URL}/api/abouttitle`)
    ])
      .then(async ([mainRes, titlesRes]) => {
        const mainData = await mainRes.json();
        const titlesData = await titlesRes.json();

        if (mainData.length > 0) {
          setMain(mainData[0]);
          setMainExists(true);
        }

        setTitles(titlesData);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);


  const handleMainChange = (field: keyof MainAbout, value: string) => {
    setMain({ ...main, [field]: value });
  };

  const handleMainSubmit = async () => {
    const formData = new FormData();
    formData.append("header", main.header);
    formData.append("header_description", main.header_description);

    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      const url = mainExists
        ? `${API_URL}/api/about/${main.id}`
        : `${API_URL}/api/about`;

      const method = mainExists ? "POST" : "POST";

      if (mainExists) {
        formData.append("_method", "PUT");
      }

      const res = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) throw new Error();

      alert(mainExists ? "Updated ✅" : "Created ✅");
  
    } catch {
      alert("Operation failed ❌");
    }
  };


  const handleAddTitle = async () => {
    try {
      const res = await fetch(`${API_URL}/api/abouttitle`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newTitle),
      });

      if (!res.ok) throw new Error();

      alert("Added ✅");

    } catch {
      alert("Failed ❌");
    }
  };

  const handleUpdateTitle = async (item: AboutTitle) => {
    try {
      const res = await fetch(
        `${API_URL}/api/abouttitle/${item.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(item),
        }
      );

      if (!res.ok) throw new Error();

      alert("Updated ✅");
    } catch {
      alert("Failed ❌");
    }
  };


  const handleDeleteTitle = async (id?: number) => {
    if (!window.confirm("Delete this item?")) return;

    try {
      await fetch(`${API_URL}/api/abouttitle/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTitles(titles.filter((item) => item.id !== id));
    } catch {
      alert("Delete failed ❌");
    }
  };

  if (loading) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div className="container mt-5">

      <h2 className="mb-4">Manage About Section</h2>

      {/* ===================== MAIN ABOUT ===================== */}
      <div className="card p-4 mb-5 shadow-sm">
        <h4>{mainExists ? "Edit Main About" : "Create Main About"}</h4>

        <label className="fw-bold mt-3">Header</label>
        <input
          className="form-control"
          value={main.header}
          onChange={(e) => handleMainChange("header", e.target.value)}
        />

        <label className="fw-bold mt-3">Header Description</label>
        <textarea
          className="form-control"
          rows={3}
          value={main.header_description}
          onChange={(e) =>
            handleMainChange("header_description", e.target.value)
          }
        />

        <label className="fw-bold mt-3">Image</label>
        <input
          type="file"
          className="form-control"
          onChange={(e) =>
            setImageFile(e.target.files?.[0] || null)
          }
        />

        {mainExists && main.image && (
          <img
            src={`${API_URL}/storage/${main.image}`}
            alt=""
            style={{ maxWidth: "200px", marginTop: "15px" }}
          />
        )}

        <button
          className="btn btn-success mt-4"
          onClick={handleMainSubmit}
        >
          {mainExists ? "Update" : "Create"}
        </button>
      </div>

      {/* ===================== ADD TITLE ===================== */}
      <div className="card p-4 mb-5 shadow-sm">
        <h4>Add New About Section</h4>

        <input
          className="form-control mb-3"
          placeholder="Title"
          value={newTitle.title}
          onChange={(e) =>
            setNewTitle({ ...newTitle, title: e.target.value })
          }
        />

        <textarea
          className="form-control mb-3"
          placeholder="Short Description"
          value={newTitle.description}
          onChange={(e) =>
            setNewTitle({ ...newTitle, description: e.target.value })
          }
        />

        <textarea
          className="form-control mb-3"
          rows={4}
          placeholder="Full Text"
          value={newTitle.text}
          onChange={(e) =>
            setNewTitle({ ...newTitle, text: e.target.value })
          }
        />

        <button className="btn btn-primary" onClick={handleAddTitle}>
          Add Section
        </button>
      </div>

      {/* ===================== EDIT TITLES ===================== */}
      {titles.map((item) => (
        <div key={item.id} className="card p-4 mb-4 shadow-sm">
          <h5>Edit: {item.title}</h5>

          <input
            className="form-control mb-3"
            value={item.title}
            onChange={(e) =>
              setTitles(
                titles.map((t) =>
                  t.id === item.id
                    ? { ...t, title: e.target.value }
                    : t
                )
              )
            }
          />

          <textarea
            className="form-control mb-3"
            value={item.description}
            onChange={(e) =>
              setTitles(
                titles.map((t) =>
                  t.id === item.id
                    ? { ...t, description: e.target.value }
                    : t
                )
              )
            }
          />

          <textarea
            className="form-control mb-3"
            rows={4}
            value={item.text}
            onChange={(e) =>
              setTitles(
                titles.map((t) =>
                  t.id === item.id
                    ? { ...t, text: e.target.value }
                    : t
                )
              )
            }
          />

          <button
            className="btn btn-success me-2"
            onClick={() => handleUpdateTitle(item)}
          >
            Update
          </button>

          <button
            className="btn btn-danger"
            onClick={() => handleDeleteTitle(item.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default AdminAbout;