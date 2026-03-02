import { Navigation, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ServiceCard from "./serviceCard";
import SectionTitle from "@/components/ui/sectionTitle";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

interface ServiceType {
  id: number;
  title: string;
  description: string;
  image1: string;
  text1: string;
}

const ServicesOne = () => {
const API_URL = import.meta.env.VITE_API_URL;
  const [services, setServices] = useState<ServiceType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(
          `${API_URL}/api/services`
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || "Failed to fetch services");
        }

        setServices(result.data || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return (
    <section
      id="services"
      className="service-section fix section-padding bg-cover"
      style={{ backgroundImage: 'url("/img/service/service-bg.jpg")' }}
    >
      <div className="container">
        <div className="section-title-area">
          <SectionTitle>
            <SectionTitle.SubTitle>Services We Offer</SectionTitle.SubTitle>
            <SectionTitle.Title>
              <br /> Service
            </SectionTitle.Title>
          </SectionTitle>
          <div className="array-button">
            <button className="array-prev"><i className="fa fa-arrow-right" /></button>
            <button className="array-next"><i className="fa fa-arrow-left" /></button>
          </div>
        </div>

        <div className="service-wrapper">

         
          {loading && (
            <div style={{ textAlign: "center", padding: "40px" }}>
              <h5>Loading services...</h5>
            </div>
          )}

      
          {!loading && error && (
            <div style={{ textAlign: "center", padding: "40px", color: "red" }}>
              <h5>{error}</h5>
            </div>
          )}

      
          {!loading && !error && services.length === 0 && (
            <div style={{ textAlign: "center", padding: "40px" }}>
              <h5>No services available.</h5>
            </div>
          )}

    
          {!loading && !error && services.length > 0 && (
            <Swiper
              key={services.length}
              spaceBetween={30}
              speed={1500}
              loop={services.length > 1}
              autoplay={
                services.length > 1
                  ? { delay: 1500, disableOnInteraction: false }
                  : false
              }
              navigation={{
                nextEl: ".array-prev",
                prevEl: ".array-next",
              }}
              breakpoints={{
                1199: { slidesPerView: Math.min(services.length, 4) },
                991: { slidesPerView: Math.min(services.length, 2) },
                767: { slidesPerView: 2 },
                575: { slidesPerView: 1 },
                0: { slidesPerView: 1 },
              }}
              modules={[Navigation, Autoplay]}
            >
              {services.map((service) => (
                <SwiperSlide key={service.id}>
                  <ServiceCard
                    service={{
                      ...service,
                      image: `${API_URL}/storage/${service.image1}`,
                      link: `/services/${service.id}`
                    }}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          )}

          

        </div>
      </div>
    </section>
  );
};

export default ServicesOne;
