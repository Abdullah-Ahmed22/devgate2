import PageTitle from "@/components/sections/pageTitle";
import SectionTitle from "@/components/ui/sectionTitle";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

interface AboutItem {
  id: number;
  title: string;
  description: string;
}

interface MainContent {
  text1: string;
  text2: string;
  text3: string;
}

const AboutDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const API_URL = import.meta.env.VITE_API_URL;
  const [aboutItem, setAboutItem] = useState<AboutItem | null>(null);
  const [main, setMain] = useState<MainContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [titlesRes, aboutRes] = await Promise.all([
          fetch(`${API_URL}/api/abouttitle`),
          fetch(`${API_URL}/api/about`)
        ]);

        const titlesData: AboutItem[] = await titlesRes.json();
        const aboutData = await aboutRes.json();

        const foundItem = titlesData.find(
          (item) => item.id === Number(id)
        );

        if (!foundItem) {
          setError("Content not found");
          return;
        }

        setAboutItem(foundItem);
        setMain(aboutData[0]);
      } catch (err) {
        setError("Server error");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchData();
  }, [id]);

  // Decide which extra text to show
  const getExtraText = () => {
    if (!main || !aboutItem) return "";

    if (aboutItem.id === 1) return main.text1;
    if (aboutItem.id === 3) return main.text2;
    return main.text3;
  };

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
                  {error && <p className="text-danger">{error}</p>}

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

                      <p className="mt-4">
                        {aboutItem.description}
                      </p>

                      {/* Extra Dynamic Text */}
                      <p className="mt-4">
                        {getExtraText()}
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