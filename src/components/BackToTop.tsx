import React, { useState, useEffect } from "react";

const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset;
    setIsVisible(currentScrollPos > 300);
  };

  useEffect(() => {
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <button
          className="fixed bottom-16 right-8 p-3 bg-gray-600 text-white focus:outline-none hover:bg-gray-400 transition-colors  duration-300 w-12 h-12 flex items-center justify-center"
          onClick={scrollToTop}
          aria-label="Back to Top"
        >
          ↑
        </button>
      )}
    </>
  );
};

export default BackToTop;
