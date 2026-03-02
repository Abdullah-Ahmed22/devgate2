import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface ContactMessage {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  created_at: string;
}

const ContactAdminPage: React.FC = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/");
    } else {
      fetchMessages();
    }
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await fetch(`${API_URL}/api/contactus`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json"
        }
      });

      const data = await response.json();
      setMessages(data.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteMessage = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this message?")) return;

    try {
      await fetch(`${API_URL}/api/contactus/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json"
        }
      });

      setMessages(messages.filter((msg) => msg.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container my-5">
      <h3 className="mb-4 text-center">Contact Messages</h3>

      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="card shadow-sm">
          <div className="card-body p-0">
            <table className="table table-striped mb-0">
              <thead className="table-dark">
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Message</th>
                  <th>Date</th>
                  <th className="text-end">Action</th>
                </tr>
              </thead>
              <tbody>
                {messages.length > 0 ? (
                  messages.map((msg) => (
                    <tr key={msg.id}>
                      <td>{msg.name}</td>
                      <td>{msg.email}</td>
                      <td>{msg.phone}</td>
                      <td style={{ maxWidth: "200px" }}>
                        {msg.message}
                      </td>
                      <td>{new Date(msg.created_at).toLocaleDateString()}</td>
                      <td className="text-end">
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => deleteMessage(msg.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center py-3">
                      No messages found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactAdminPage;