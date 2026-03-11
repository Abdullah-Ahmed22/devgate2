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
    <h2 className="mb-5">Projects</h2>

    {projects.map((project: any) => (
        <div key={project.id} className="mb-5 pb-4 border-bottom">

            {/* Title */}
            <h3 className="mb-3">{project.title}</h3>

            {/* Description */}
            {project.description && (
                <p className="mb-3">{project.description}</p>
            )}

            {/* Text1 */}
            {project.text1 && (
                <p className="mb-3">{project.text1}</p>
            )}

            {/* Text2 */}
            {project.text2 && (
                <p className="mb-3">{project.text2}</p>
            )}

            {/* Text3 */}
            {project.text3 && (
                <p className="mb-3">{project.text3}</p>
            )}

        </div>
    ))}
</div>
        </>
    );
};

export default ProjectsByType;

