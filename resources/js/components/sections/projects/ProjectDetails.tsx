import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ProjectType } from "./projects";
import PageTitle from "../pageTitle";

const ProjectDetails = () => {
    const { id } = useParams();
    const API_URL = import.meta.env.VITE_API_URL;

    const [project, setProject] = useState<ProjectType | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) {
            setError("Invalid project ID");
            setLoading(false);
            return;
        }

        const fetchProject = async () => {
            try {
                const response = await fetch(`${API_URL}/api/projects/${id}`);

                const result = await response.json();

                if (!response.ok) {
                    throw new Error(
                        result.message || "Failed to fetch project",
                    );
                }

                setProject(result);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProject();
    }, [id]);

    if (loading) {
        return (
            <div
                className="d-flex justify-content-center align-items-center"
                style={{ minHeight: "100vh" }}
            >
                <div className="text-center">
                    <div className="spinner-border" role="status"></div>
                    <p className="mt-3 mb-0">Loading...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div
                className="d-flex justify-content-center align-items-center"
                style={{ minHeight: "100vh" }}
            >
                <p className="text-danger">{error}</p>
            </div>
        );
    }

    if (!project) {
        return (
            <div
                className="d-flex justify-content-center align-items-center"
                style={{ minHeight: "100vh" }}
            >
                <p>Project not found.</p>
            </div>
        );
    }

    return (
        <>
            <PageTitle currentPage={project.title} title={project.title} />

            <section className="service-details-section section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="service-details-content">
                                {project.image1 && (
                                    <div className="service-details-image mb-4">
                                        <img
                                            src={`${API_URL}/storage/${project.image1}`}
                                            alt="project"
                                            className="project-image"
                                        />
                                    </div>
                                )}

                                {project.text1 && (
                                    <p
                                        className="mb-3"
                                        style={{
                                            whiteSpace: "pre-line",
                                            textAlign: "left",
                                        }}
                                    >
                                        {project.text1}
                                    </p>
                                )}

                                {project.text2 && (
                                    <p
                                        className="mb-3"
                                        style={{
                                            whiteSpace: "pre-line",
                                            textAlign: "left",
                                        }}
                                    >
                                        {project.text2}
                                    </p>
                                )}

                                {project.text3 && (
                                    <p
                                        className="mb-3"
                                        style={{
                                            whiteSpace: "pre-line",
                                            textAlign: "left",
                                        }}
                                    >
                                        {project.text3}
                                    </p>
                                )}

                                {project.image2 && (
                                    <div className="service-details-image mb-4">
                                        <img
                                            src={`${API_URL}/storage/${project.image2}`}
                                            alt="project"
                                            className="project-image"
                                        />
                                    </div>
                                )}

                                {project.image3 && (
                                    <div className="service-details-image mb-4">
                                        <img
                                            src={`${API_URL}/storage/${project.image3}`}
                                            alt="project"
                                            className="project-image"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ProjectDetails;
