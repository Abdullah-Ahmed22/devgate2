import { useState } from "react";
import PageTitle from "@/components/sections/pageTitle";

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const Contact = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });

    // Clear error when typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ""
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      const response = await fetch(`${API_URL}/api/contactus`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.errors) {
          const formattedErrors: Record<string, string> = {};
          Object.keys(data.errors).forEach((key) => {
            formattedErrors[key] = data.errors[key][0];
          });
          setErrors(formattedErrors);
        }
        return;
      }

      alert("Message sent successfully!");

      setFormData({
        name: "",
        email: "",
        phone: "",
        message: ""
      });

    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageTitle currentPage="Contact Us" title="Contact Us" />

      <section className="contact-section section-padding">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="contact-form-wrapper">

                <form onSubmit={handleSubmit}>

                  {/* Name */}
                  <div className="mb-3">
                    <label className={`form-label ${errors.name ? "text-danger" : ""}`}>
                      {errors.name ? errors.name : "Your Name (required)"}
                    </label>
                    <input
                      type="text"
                      name="name"
                      className={`form-control ${errors.name ? "is-invalid" : ""}`}
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                    />
                  </div>

                  {/* Email */}
                  <div className="mb-3">
                    <label className={`form-label ${errors.email ? "text-danger" : ""}`}>
                      {errors.email ? errors.email : "Your Email (required)"}
                    </label>
                    <input
                      type="email"
                      name="email"
                      className={`form-control ${errors.email ? "is-invalid" : ""}`}
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                    />
                  </div>

                  {/* Phone */}
                  <div className="mb-3">
                    <label className={`form-label ${errors.phone ? "text-danger" : ""}`}>
                      {errors.phone ? errors.phone : "Your Phone (required)"}
                    </label>
                    <input
                      type="text"
                      name="phone"
                      className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter your phone"
                    />
                  </div>

                  {/* Message */}
                  <div className="mb-4">
                    <label className={`form-label ${errors.message ? "text-danger" : ""}`}>
                      {errors.message ? errors.message : "Your Message"}
                    </label>
                    <textarea
                      name="message"
                      rows={6}
                      className={`form-control ${errors.message ? "is-invalid" : ""}`}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Enter your message"
                    />
                  </div>

                  <button
                    type="submit"
                    className="theme-btn"
                    disabled={loading}
                  >
                    {loading ? "Sending..." : "Send"}
                  </button>

                </form>

              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;