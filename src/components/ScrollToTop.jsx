// src/components/ScrollToTop.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // "0, 0" means Top-Left of the screen
    window.scrollTo(0, 0);
  }, [pathname]); // <--- This array means: "Run this every time the URL changes"

  return null; // This component doesn't render anything visible
}