import { ProjectDataType } from "@/db/projectsOneData";
import { Link } from "react-router-dom";

type ProjectCardPropsType = {
    project: ProjectDataType;
    className?: string;
};

const ProjectCard = ({ project, className }: ProjectCardPropsType) => {
    const API_URL = import.meta.env.VITE_API_URL;
    return (
        <div className={`service-card ${className ?? ""}`}>
            <div className="service-image">
                <img
                    src={  `${API_URL}/storage/${project.image}`|| "/placeholder.jpg"}
                    alt={project.title}
                    className="img-fluid"
                />
            </div>

            <div className="service-content">
                <h4>{project.title}</h4>

                <p>
                    {project.description?.length > 120
                        ? project.description.slice(0, 120) + "..."
                        : project.description}
                </p>

                <Link
                    className="btn-read"
                    to={`/researchsurveys/${project.id}`}
                >
                    Read More
                </Link>
            </div>
        </div>
    );
};

export default ProjectCard;
