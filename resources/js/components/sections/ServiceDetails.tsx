import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import PageTitle from "./pageTitle";

interface ServiceType {
    id: number;
    title: string;
    description: string;
    image1: string;
    image2: string;
    text1: string;
    text2: string;
    text3: string;
}

const ServiceDetails = () => {
    const { id } = useParams();

    const [service, setService] = useState<ServiceType | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const API_URL = import.meta.env.VITE_API_URL;
    useEffect(() => {
        if (!id) {
            setError("Invalid service ID");
            setLoading(false);
            return;
        }

        const fetchService = async () => {
            try {
                const response = await fetch(`${API_URL}/api/services/${id}`);

                const result = await response.json();

                if (!response.ok) {
                    throw new Error(result.message || "Service not found");
                }

                setService(result.data || result);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchService();
    }, [id]);

    if (loading) {
        return (
            <div style={{ textAlign: "center", padding: "60px" }}>
                <h4>Loading service...</h4>
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ textAlign: "center", padding: "60px", color: "red" }}>
                <h4>{error}</h4>
            </div>
        );
    }

    if (!service) {
        return (
            <div style={{ textAlign: "center", padding: "60px" }}>
                <h4>Service not found.</h4>
            </div>
        );
    }

    return (
        <>
            <PageTitle currentPage={service.title} title={service.title} />
            <section className="service-details-section section-padding">
                <div className="container">
                    <h2 className="mb-4">{service.title}</h2>

                    {/* Image 1 */}
                    {service.image1 && (
                        <div className="mb-4">
                            <img
                                src={`${API_URL}/storage/${service.image1}`}
                                alt={service.title}
                                className="project-image"
                            />
                        </div>
                    )}

                    {/* Text 1 */}
                    {service.text1 && (
                        <p
                            className="mb-3"
                            style={{
                                whiteSpace: "pre-line",
                                textAlign: "left",
                            }}
                        >
                            {service.text1}
                        </p>
                    )}

                    {/* Text 2 */}
                    {service.text2 && (
                        <p
                            className="mb-3"
                            style={{
                                whiteSpace: "pre-line",
                                textAlign: "left",
                            }}
                        >
                            {service.text2}
                        </p>
                    )}

                    {/* Image 2 */}
                    {service.image2 && (
                        <div className="mb-4">
                            <img
                                src={`${API_URL}/storage/${service.image2}`}
                                alt=""
                                className="project-image"
                            />
                        </div>
                    )}

                    {/* Text 3 */}
                    {service.text3 && (
                        <p
                            className="mb-3"
                            style={{
                                whiteSpace: "pre-line",
                                textAlign: "left",
                            }}
                        >
                            {service.text3}
                        </p>
                    )}
                </div>
            </section>
        </>
    );
};

export default ServiceDetails;
