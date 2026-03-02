import SectionTitle from "@/components/ui/sectionTitle";
import { useEffect, useState } from "react";

const LogoMarquee = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [logos, setLogos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/api/ourclients`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch logos");
        }
        return response.json();
      })
      .then((data) => {
        setLogos(data?.data || []); 
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLogos([]);
        setLoading(false);
      });
  }, [API_URL]);

  if (loading) return <p>Loading logos...</p>;


  if (!logos.length) {
    return (
      <section className="logo-marquee mb-5">
        <SectionTitle className="text-center mb-5">
          <SectionTitle.SubTitle>Our Clients</SectionTitle.SubTitle>
          <SectionTitle.Title>Our Clients</SectionTitle.Title>
        </SectionTitle>
        <p className="text-center">No clients available.</p>
      </section>
    );
  }


  const displayLogos = logos.length < 7 ? [...logos, ...logos] : logos;

  return (
    <section className="logo-marquee mb-5">
      <SectionTitle className="text-center mb-5">
        <SectionTitle.SubTitle>Our Clients</SectionTitle.SubTitle>
        <SectionTitle.Title>Our Clients</SectionTitle.Title>
      </SectionTitle>

      <div className="logo-track">
        {[...displayLogos, ...displayLogos].map((logo, index) => (
          <div className="logo-item mb-5" key={`${logo.id}-${index}`}>
            <img
              src={`${API_URL}/storage/${logo.image}`}
              alt={logo.alt ?? "Client Logo"}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default LogoMarquee;