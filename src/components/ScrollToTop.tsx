import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { scrollToTopInstant } from "../utils/scrolls";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top when route changes
    scrollToTopInstant();
  }, [pathname]);

  return null;
};

export default ScrollToTop;
