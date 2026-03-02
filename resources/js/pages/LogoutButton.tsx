import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const API_URL = import.meta.env.VITE_API_URL;
  if (!token) return null; 

  const handleLogout = async () => {
    try {
      const response = await fetch(
        `${API_URL}/api/admin/logout`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        alert("Logout failed.");
        return;
      }

      localStorage.removeItem("token");

      alert("Logged out successfully!");
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      alert("Network error.");
    }
  };

  return (
    <div className="w-72 mt-4">
      <div
        onClick={handleLogout}
        className="w-30 theme-btn text-center"
        style={{ cursor: "pointer" }}
      >
        <span>
          Log Out
          <i className="fa-solid fa-arrow-right-long ms-2" />
        </span>
      </div>
    </div>
  );
};

export default LogoutButton;