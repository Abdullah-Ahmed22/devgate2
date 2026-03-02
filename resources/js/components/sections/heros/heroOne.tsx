import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import { motion } from "framer-motion";

const HeroOne = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [slides, setSlides] = useState<string[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      const res = await fetch(`${API_URL}/api/homeimage`);
      const data = await res.json();

      if (!data || !data.length) return;

      const images = data
        .filter((item: any) => item.image)
        .map((item: any) => `${API_URL}/storage/${item.image}`);

      setSlides(images);
    };

    fetchImages();
  }, []);

  return (
    <section className="hero-section hero-1">
      <Swiper
        modules={[Navigation, Autoplay, EffectFade]}
        slidesPerView={1}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        loop={slides.length > 1}
        speed={1000}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        navigation={slides.length > 1}
      >
        {slides.map((image, index) => (
          <SwiperSlide key={index}>
            <div
              className="hero-image w-100"
              style={{
                backgroundImage: `url(${image})`,
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default HeroOne;

const Card = ({ image, isActive }: { image: string; isActive: boolean }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isActive ? 1 : 0 }}
            transition={{ duration: 0.8 }}
        >
            <div
                className="hero-image bg-cover"
                style={{
                    backgroundImage: `url(${image})`,
                    height: "100vh",
                }}
            />

            <div className="container">
                <div className="row g-4">
                    <div className="col-lg-8">
                        <div className="hero-content">
                            <motion.h6
                                initial={{ x: 100, opacity: 0 }}
                                animate={{
                                    x: isActive ? 0 : 100,
                                    opacity: isActive ? 1 : 0,
                                }}
                                transition={{ duration: 0.6 }}
                            >
                                WELCOME
                            </motion.h6>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};
