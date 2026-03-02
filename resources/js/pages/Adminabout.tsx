import { useEffect, useState, ChangeEvent } from "react";

interface AboutTitle {
  id: number;
  title: string;
  description: string;
}

interface MainAbout {
  id: number;
  image: string;
  header: string;
  header_description: string;
  text1: string;
  text2: string;
  text3: string;
}

const AdminAbout: React.FC = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [titles, setTitles] = useState<AboutTitle[]>([]);
  const [main, setMain] = useState<MainAbout | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    Promise.all([
      fetch(`${API_URL}/api/abouttitle`),
      fetch(`${API_URL}/api/about`)
    ])
      .then(async ([titlesRes, mainRes]) => {
        const titlesData = await titlesRes.json();
        const mainData = await mainRes.json();

        setTitles(titlesData);
        setMain(mainData[0]); // about returns array
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // ----------------------------
  // TITLE UPDATE
  // ----------------------------
  const handleTitleChange = (
    id: number,
    field: keyof AboutTitle,
    value: string
  ) => {
    setTitles((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const handleTitleSave = async (id: number, item: AboutTitle) => {
    try {
      await fetch(`${API_URL}/api/abouttitle/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(item),
      });

      alert("Title updated ✅");
    } catch {
      alert("Update failed ❌");
    }
  };

  // ----------------------------
  // MAIN UPDATE
  // ----------------------------
  const handleMainChange = (
    field: keyof MainAbout,
    value: string
  ) => {
    if (!main) return;
    setMain({ ...main, [field]: value });
  };

  const handleMainSave = async () => {
  if (!main) return;

  const formData = new FormData();

  // Laravel method spoofing
  formData.append("_method", "PUT");

  formData.append("header", main.header);
  formData.append("header_description", main.header_description);
  formData.append("text1", main.text1);
  formData.append("text2", main.text2);
  formData.append("text3", main.text3);

  if (imageFile) {
    formData.append("image", imageFile);
  }

  try {
    const response = await fetch(
      `${API_URL}/api/about/${main.id}`,
      {
        method: "POST", 
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error("Update failed");
    }

    alert("Main content updated ✅");
  } catch (error) {
    console.error(error);
    alert("Update failed ❌");
  }
};

  if (loading) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Manage About Section</h2>


      {/* MAIN CONTENT EDIT */}
      {main && (
  <div className="card p-4 mb-5 shadow-sm">
    <h4 className="mb-4">Main Content</h4>

    {/* Header */}
    <label className="form-label fw-bold">Header</label>
    <input
      type="text"
      className="form-control mb-3"
      value={main.header}
      onChange={(e) =>
        handleMainChange("header", e.target.value)
      }
    />

    {/* Header Description */}
    <label className="form-label fw-bold">
      Header Description
    </label>
    <textarea
      className="form-control mb-4"
      rows={3}
      value={main.header_description}
      onChange={(e) =>
        handleMainChange("header_description", e.target.value)
      }
    />

    {/* Dynamic Text Fields Based On Titles */}
    {titles.map((title, index) => {
      const fieldName =
        index === 0
          ? "text1"
          : index === 1
          ? "text2"
          : "text3";

      const value =
        index === 0
          ? main.text1
          : index === 1
          ? main.text2
          : main.text3;

      return (
        <div key={title.id} className="mb-4">
          <label className="form-label fw-bold">
            {title.title} → Content
          </label>

          <textarea
            className="form-control"
            rows={4}
            value={value}
            onChange={(e) =>
              handleMainChange(
                fieldName as keyof MainAbout,
                e.target.value
              )
            }
          />
        </div>
      );
    })}

    {/* Image Upload */}
    <label className="form-label fw-bold">Upload Image</label>
    <input
      type="file"
      className="form-control mb-3"
      onChange={(e) =>
        setImageFile(e.target.files?.[0] || null)
      }
    />

    {/* Image Preview */}
    <img
      src={`${API_URL}/storage/${main.image}`}
      alt="preview"
      style={{
        maxWidth: "200px",
        marginBottom: "15px",
        borderRadius: "8px",
      }}
    />

    <button
      className="btn btn-success"
      onClick={handleMainSave}
    >
      Save Main Content
    </button>
  </div>
)}



      {/* TITLES EDIT */}
    
      {titles.map((item) => (
        <div key={item.id} className="card p-4 mb-4 shadow-sm">
          <h4>Edit {item.title}</h4>

          <input
            type="text"
            className="form-control mb-3"
            value={item.title}
            onChange={(e) =>
              handleTitleChange(item.id, "title", e.target.value)
            }
          />

          <textarea
            className="form-control mb-3"
            rows={4}
            value={item.description}
            onChange={(e) =>
              handleTitleChange(item.id, "description", e.target.value)
            }
          />

          <button
            className="btn btn-primary"
            onClick={() => handleTitleSave(item.id, item)}
          >
            Save
          </button>
        </div>
      ))}
    </div>
  );
};

export default AdminAbout;