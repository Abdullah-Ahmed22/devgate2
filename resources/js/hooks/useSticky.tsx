import { useEffect, useState } from "react";

const useSticky = (disableHide: boolean) => {
  const [isSticky, setIsSticky] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;


      setIsSticky(currentScrollY > 40);


      if (disableHide) {
        setIsVisible(true);
        return;
      }


      if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      } else if (currentScrollY > 250) {
        setIsVisible(false);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [disableHide]);

  return [isSticky, isVisible] as const;
};

export default useSticky;