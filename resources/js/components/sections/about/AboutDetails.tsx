import PageTitle from "@/components/sections/pageTitle";
import SectionTitle from "@/components/ui/sectionTitle";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

interface AboutItem {
    id: number;
    title: string;
    description: string;
    text: string;
}

const AboutDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const API_URL = import.meta.env.VITE_API_URL;

    const [aboutItem, setAboutItem] = useState<AboutItem | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`${API_URL}/api/abouttitle`);
                const data: AboutItem[] = await res.json();

                const foundItem = data.find((item) => item.id === Number(id));

                if (!foundItem) {
                    setError("Content not found");
                    return;
                }

                setAboutItem(foundItem);
            } catch (err) {
                setError("Server error");
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchData();
    }, [id]);

    return (
        <>
            <PageTitle
                title={aboutItem?.title || "About"}
                currentPage={aboutItem?.title || "About"}
            />

            <section
                className="about-section section-padding fix bg-cover"
                style={{
                    backgroundImage: 'url("/img/service/service-bg-2.jpg")',
                }}
            >
                <div className="container">
                    <div className="about-wrapper style-2">
                        <div className="row justify-content-center">
                            <div className="col-lg-10">
                                <div className="about-content text-center">
                                    {loading && <p>Loading content...</p>}
                                    {error && (
                                        <p className="text-danger">{error}</p>
                                    )}

                                    {!loading && !error && aboutItem && (
                                        <>
                                            <SectionTitle>
                                                <SectionTitle.SubTitle>
                                                    {aboutItem.title}
                                                </SectionTitle.SubTitle>
                                                <SectionTitle.Title>
                                                    {aboutItem.title}
                                                </SectionTitle.Title>
                                            </SectionTitle>

                                            <p
                                                className="mt-4"
                                                style={{
                                                    whiteSpace: "pre-line",
                                                    textAlign: "left",
                                                }}
                                            >
                                                {aboutItem.text}
                                            </p>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default AboutDetails;
