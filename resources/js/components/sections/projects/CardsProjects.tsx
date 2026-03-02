import { Link } from "react-router-dom";
import { ProjectType } from "./projects";

type ProjectCardPropsType = {
    project: ProjectType;
    className?: string;
};

const CardsProjects = ({ project, className }: ProjectCardPropsType) => {
    const API_URL = import.meta.env.VITE_API_URL;
    return (
        <div className={`service-card ${className ?? ""}`}>
            <div className="service-image">
                <img
                    src={`${API_URL}/storage/${project.image1}`}
                    alt="project"
                />
            </div>

            <div className="service-content">
                <h4>{project.title}</h4>

                <p>
                    {project.text1?.length > 120
                        ? project.text1.slice(0, 120) + "..."
                        : project.text1}
                </p>

                <Link className="btn-read" to={`/projects/${project.id}`}>
                    Read More
                </Link>
            </div>
        </div>
    );
};

export default CardsProjects;
