import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import ContentWrapper from "@/components/ContentWrapper";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <ContentWrapper>
      <Navigation isBar/>
      
      <div className="text-center">
        <h1 className="text-4xl text-white font-bold mb-4">404</h1>
        <p className="text-xl text-white mb-4">Oops! Page not found</p>
      </div>
    </ContentWrapper>
  );
};

export default NotFound;
