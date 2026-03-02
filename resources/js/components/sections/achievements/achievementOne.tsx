import { useEffect, useState } from "react";
import SectionTitle from "@/components/ui/sectionTitle";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import axios from "axios";

interface Achievement {
  id: number;
  title: string;
  number: number;
}

const AchievementOne = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [achievements, setAchievements] = useState<Achievement[]>([]);

  const { ref, inView } = useInView({
    threshold: 0.4,
    triggerOnce: true,
  });

  useEffect(() => {
    axios
      .get(`${API_URL}/api/statistics`)
      .then((response) => {
        setAchievements(response.data.data || []);
      })
      .catch((error) => {
        console.error("Error fetching statistics:", error);
      });
  }, []);

  return (
    <section className="achievement-section fix section-padding pt-0">
      <div className="container">
        <div className="achievement-wrapper">
          <SectionTitle className="mb-0 text-center">
            <SectionTitle.SubTitle className="text-white">
              Talk To Us
            </SectionTitle.SubTitle>
            <SectionTitle.Title className="text-white">
              Powering the Future
            </SectionTitle.Title>
          </SectionTitle>

          <div className="counter-area" ref={ref}>
            {achievements.map((item) => (
              <div className="counter-items" key={item.id}>
                <div className="content text-center">
                  {inView && (
                    <h2 className="text-white">
                      <span className="count">
                        <CountUp end={item.number} duration={2} />
                      </span>+
                    </h2>
                  )}
                  <p className="text-white">{item.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AchievementOne;