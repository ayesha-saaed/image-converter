import React from "react";
import ImageConverter from "./ImageConverter";
import SplashCursor from "./SplashCursor";
import "./index.css";

function App() {
  return (
    <>
      <SplashCursor />
      <div className="app-content">
        <ImageConverter />
      </div>
    </>
  );
}

export default App;
