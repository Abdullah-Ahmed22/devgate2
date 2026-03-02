"use client";

import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import SectionTitle from "@/components/ui/sectionTitle";
import CardsProjects from "./CardsProjects";

export interface ProjectType {
    id: number;
    image1: string;
    image2: string;
    image3: string;
    title: string;
    text1: string;
    text2: string;
    text3: string;
}

export default function Projects() {
    const API_URL = import.meta.env.VITE_API_URL;
    const [projects, setProjects] = useState<ProjectType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `${API_URL}/api/projects`
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch projects");
                }

                const result = await response.json();
                setProjects(result);
            } catch (err) {
                setError("Something went wrong while fetching projects.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="text-center py-5">
                <div className="spinner-border" role="status"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-5 text-danger">
                {error}
            </div>
        );
    }

    if (!projects.length) {
        return (
            <div className="text-center py-5">
                No projects available.
            </div>
        );
    }

    return (
        <section
            id="projects"
            className="project-section section-padding pt-0 fix"
        >
            <SectionTitle className="text-center mb-5">
                <SectionTitle.SubTitle>
                    Projects
                </SectionTitle.SubTitle>
                <SectionTitle.Title>
                    Our Projects
                </SectionTitle.Title>
            </SectionTitle>

            <Swiper
    spaceBetween={30}
    speed={1000}
    loop
    autoplay={{
        delay: 2500,
        disableOnInteraction: false,
    }}
    pagination={{
        el: ".custom-pagination",
        clickable: true,
    }}
    breakpoints={{
        1199: { slidesPerView: 4 },
        991: { slidesPerView: 3 },
        767: { slidesPerView: 2 },
        575: { slidesPerView: 1 },
        0: { slidesPerView: 1 },
    }}
    modules={[Autoplay, Pagination]}
>
    {projects.map((project) => (
        <SwiperSlide key={project.id}>
            <CardsProjects project={project} />
        </SwiperSlide>
    ))}
</Swiper>

<div className="custom-pagination"></div>

        </section>
    );
}
