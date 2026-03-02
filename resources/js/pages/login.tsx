import { useEffect, useState } from "react";
import PageTitle from "@/components/sections/pageTitle";
import { useNavigate } from "react-router-dom";
import SectionTitle from "@/components/ui/sectionTitle";
function Login() {
    const API_URL = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");
  
    const [error, setError] = useState("");
    const [showDialog, setShowDialog] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

     useEffect(() => {
        const token = localStorage.getItem("token");
    
        if (token) {
          navigate("/dashboard");
        } 
      }, [navigate]);
    

    const handleLogin = async (e:any) => {
        e.preventDefault();
        setError("");
        setShowDialog(false);

        try {
            const response = await fetch(
                `${API_URL}/api/admin/login`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                    body: JSON.stringify({ email, password }),
                },
            );

            const data = await response.json();

            if (!response.ok) {
                setError("Invalid email or password.");
                setShowDialog(true);
                return;
            }

            localStorage.setItem("token", data.token);
            localStorage.setItem("admin", JSON.stringify(data.admin));
            navigate("/dashboard");
        } catch (error) {
            setError("Network error. Please try again.");
            setShowDialog(true);
        }
    };

    return (
        <>
            <PageTitle title="Login" currentPage="Login" />

            <section
                id="login"
                className="about-section section-padding fix bg-cover"
                style={{
                    backgroundImage: 'url("/img/service/service-bg-2.jpg")',
                }}
            >
                <div className="container">
                    <div className="about-wrapper style-2">
                        <div className="row justify-content-center">
                            <div className="col-lg-6">
                                <div className="about-content text-center">
                                    <SectionTitle>
                                        <SectionTitle.SubTitle>
                                            Welcome Back
                                        </SectionTitle.SubTitle>
                                        <SectionTitle.Title>
                                            Login To <span>Your Account</span>
                                        </SectionTitle.Title>
                                    </SectionTitle>
                                    {showDialog && (
                                        <div
                                            className="alert alert-danger alert-dismissible fade show"
                                            role="alert"
                                        >
                                            {error}
                                            <button
                                                type="button"
                                                className="btn-close"
                                                onClick={() =>
                                                    setShowDialog(false)
                                                }
                                            ></button>
                                        </div>
                                    )}

                                    <form
                                        onSubmit={handleLogin}
                                        className="mt-4 wow slideUp"
                                        data-delay=".3"
                                    >
                                        <div className="mb-3">
                                            <input
                                                type="email"
                                                className="form-control"
                                                placeholder="Email Address"
                                                required
                                                onChange={(e) =>
                                                    setEmail(e.target.value)
                                                }
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <input
                                                type="password"
                                                className="form-control"
                                                placeholder="Password"
                                                required
                                                onChange={(e) =>
                                                    setPassword(e.target.value)
                                                }
                                            />
                                        </div>

                                        <div className="d-grid">
                                            <button
                                                type="submit"
                                                className="theme-btn"
                                            >
                                                Login
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Login;
