import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { useEffect, useState } from "react";
import { TestimonialType } from "@/db/testimonialsOneData";


const TestimonialOne = () => {
const API_URL = import.meta.env.VITE_API_URL;

  const [testimonials, setTestimonials] = useState<TestimonialType[]>([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch(`${API_URL}/api/teammates`);
        const result = await response.json();

        if (response.ok) {
          setTestimonials(result.data || []);
        }
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      }
    };

    fetchTestimonials();
  }, []);

  const getImageUrl = (image: string | null | undefined) => {
    if (!image) return null;

    if (image.startsWith("http")) return image;

    return `${API_URL}/storage/${image}`;
  };

  return (
    <section className="testimonial-section section-padding fix">
      <div className="container">
        <div className="testimonial-wrapper">
          {testimonials.length > 0 && (
            <Swiper
              speed={1500}
              loop={testimonials.length > 1}
              autoplay={{
                delay: 1500,
                disableOnInteraction: false,
              }}
              pagination={{
                el: ".dot-2",
                clickable: true,
              }}
              modules={[Pagination, Autoplay]}
            >
              {testimonials.map((testimonial) => {
                const imageUrl = getImageUrl(testimonial.image);

                return (
                  <SwiperSlide key={testimonial.id}>
                    <div className="testimonial-items">
                      <div
                        className="tesimonial-image bg-cover"
                        style={{
                          backgroundImage: imageUrl
                            ? `url(${imageUrl})`
                            : "none",
                          minHeight: "350px", // 
                        }}
                      >
                        <div className="star">
                          {[...Array(5)].map((_, i) => (
                            <i className="fas fa-star" key={i} />
                          ))}
                        </div>
                      </div>

                      <div className="testimonial-content">
                        <div className="section-title">
                          <span>Testimonials</span>
                          <h2>What Our Partners Say</h2>
                        </div>

                        <p className="mt-3 mt-md-0">
                          {testimonial.description}
                        </p>

                        <div className="author-details">
                          <h5>{testimonial.name}</h5>
                          <span>{testimonial.position}</span>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          )}

          <div className="swiper-dot-2">
            <div className="dot-2" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialOne;