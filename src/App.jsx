import React from "react";
import ImageConverter from "./ImageConverter";
import SplashCursor from "./SplashCursor";
import "./index.css";
import AboutSection from "./components/AboutSection";


function App() {
  return (
    <>
      <SplashCursor />
      <div className="app-content">
        <ImageConverter />
      </div>
      <div className="app-content">
        <AboutSection />
      </div>
    </>
  );
}

export default App;
