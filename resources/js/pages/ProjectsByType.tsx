import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import PageTitle from "@/components/sections/pageTitle";

const ProjectsByType = () => {
    const { id } = useParams();
    const API_URL = import.meta.env.VITE_API_URL;

    const [projects, setProjects] = useState<any[]>([]);
    const [typeName, setTypeName] = useState("");

    useEffect(() => {
        fetch(`${API_URL}/api/types/${id}`)
            .then((res) => res.json())
            .then((data) => setTypeName(data.project_type));

        fetch(`${API_URL}/api/types/${id}/projects`)
            .then((res) => res.json())
            .then((data) => setProjects(data));
    }, [id]);

    return (
        <>
            <PageTitle currentPage={typeName} title={typeName} />

            <div className="container section-padding">
                <h2>Projects</h2>

                <div className="row">
                    {projects.map((project: any) => (
                        <div
                            className="col-xl-3 col-lg-4 col-md-6 col-sm-12 mb-4"
                            key={project.id}
                        >
                            <div className="card h-100 shadow-sm border-0">
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title text-truncate">
                                        {project.title}
                                    </h5>

                                    <p className="card-text">
                                        {project.text1?.length > 120
                                            ? project.text1.substring(0, 120) +
                                              "..."
                                            : project.text1}
                                    </p>

                                    <div className="mt-auto">
                                        <Link
                                            className="btn btn-primary btn-read btn-sm"
                                            to={`/projects/${project.id}`}
                                        >
                                            Read More
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default ProjectsByType;

