import { useEffect, useState } from "react";
import SectionTitle from "@/components/ui/sectionTitle";
import { Link } from "react-router-dom";

interface MainContent {
    id: number;
    image: string;
    header: string;
    header_description: string;
    text1: string;
    text2: string;
    text3: string;
}

interface AboutItem {
    id: number;
    title: string;
    description: string;
}

const AboutOne = () => {
    const API_URL = import.meta.env.VITE_API_URL;
    const [main, setMain] = useState<MainContent | null>(null);
    const [items, setItems] = useState<AboutItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([
            fetch(`${API_URL}/api/about`).then((res) => res.json()),
            fetch(`${API_URL}/api/abouttitle`).then((res) =>
                res.json(),
            ),
        ])
            .then(([aboutData, titleData]) => {
                setMain(aboutData[0]);
                setItems(titleData);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    const truncateWords = (text: string, wordLimit: number) => {
        const words = text.split(" ");
        if (words.length <= wordLimit) return text;
        return words.slice(0, wordLimit).join(" ") + "...";
    };

    if (loading) return <div>Loading...</div>;
    if (!main) return <div>No data found</div>;

    return (
        <section id="about" className="about-section section-padding fix">
            <div className="container">
                <div className="about-wrapper">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="about-image-items">
                                {/* Main Image */}
                                <div
                                    className="about-image-1 bg-cover"
                                    style={{
                                        backgroundImage: `url(${API_URL}/storage/${main.image})`,
                                        minHeight: "450px",
                                        borderRadius: "10px",
                                    }}
                                />
                            </div>
                        </div>

                        {/* RIGHT SIDE CONTENT */}
                        <div className="col-lg-6 mt-4 mt-lg-0">
                            <div className="about-content">
                                <SectionTitle>
                                    <SectionTitle.SubTitle>
                                        About Us
                                    </SectionTitle.SubTitle>
                                    <SectionTitle.Title>
                                        {main.header}
                                    </SectionTitle.Title>
                                </SectionTitle>

                                <p className="mt-3">
                                    {truncateWords(main.header_description, 25)}
                                </p>

                                <div className="about-icon-items mt-4">
                                    <div className="row">
                                        {items.map((item) => (
                                            <div
                                                key={item.id}
                                                className="col-md-4 mb-4 d-flex"
                                            >
                                                <div className="card w-100 shadow-sm h-100">
                                                    <div className="card-body d-flex flex-column">
                                                        <h5 className="card-title mb-3">
                                                            <Link
                                                                to={`/about/${item.id}`}
                                                                className="text-decoration-none text-dark"
                                                            >
                                                                {item.title}
                                                            </Link>
                                                        </h5>

                                                        <p className="card-text flex-grow-1 text-break">
                                                            {truncateWords(
                                                                item.description,
                                                                20,
                                                            )}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="about-button mt-4">
                                    <Link to="/about/1" className="theme-btn">
                                        Explore More
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutOne;
