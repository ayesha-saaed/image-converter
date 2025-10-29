import React, { useEffect, useRef, useState } from "react";
import "./ImageConverter.css";

export default function ImageConverter() {
  const [files, setFiles] = useState([]);
  const [toFormat, setToFormat] = useState("webp");
  const [fromFormat, setFromFormat] = useState("png");
  const fileInputRef = useRef(null);

  // ✅ Load particles.js dynamically
  useEffect(() => {
    const loadParticles = () => {
      if (window.particlesJS) {
        window.particlesJS("particles-js", {
          particles: {
            number: { value: 100, density: { enable: true, value_area: 900 } },
            color: { value: ["#ffffff", "#b68c02", "#000000"] },
            shape: { type: "circle" },
            opacity: { value: 0.6, random: true },
            size: { value: 3, random: true },
            line_linked: {
              enable: true,
              distance: 130,
              color: "#b68c02",
              opacity: 0.3,
              width: 1,
            },
            move: { enable: true, speed: 1.8 },
          },
          interactivity: {
            detect_on: "canvas",
            events: {
              onhover: { enable: true, mode: "repulse" },
              onclick: { enable: true, mode: "push" },
            },
            modes: { repulse: { distance: 100 }, push: { particles_nb: 4 } },
          },
          retina_detect: true,
        });
      }
    };

    if (!window.particlesJS) {
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js";
      script.async = true;
      script.onload = loadParticles;
      document.body.appendChild(script);
    } else {
      loadParticles();
    }
  }, []);

  const detectFormat = (fileName) => {
    const ext = fileName.split(".").pop().toLowerCase();
    return ext === "jpg" ? "jpeg" : ext;
  };

  const handleFileSelect = (selected) => {
    const newFiles = Array.from(selected).map((file) => ({
      file,
      name: file.name,
      preview: URL.createObjectURL(file),
      fromFormat: detectFormat(file.name),
      downloadUrl: "",
      progress: 0,
      isConverting: false,
    }));
    setFiles((prev) => [...prev, ...newFiles]);
    if (newFiles.length > 0) setFromFormat(newFiles[0].fromFormat);
  };

  const convertFile = async (index) => {
    const item = files[index];
    if (!item) return;

    const img = new Image();
    const url = URL.createObjectURL(item.file);
    const updated = [...files];
    updated[index].isConverting = true;
    updated[index].progress = 0;
    setFiles(updated);

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);

      const mime =
        toFormat === "jpeg" || toFormat === "jpg"
          ? "image/jpeg"
          : toFormat === "png"
          ? "image/png"
          : "image/webp";

      canvas.toBlob(
        (blob) => {
          if (!blob) return;
          const convertedUrl = URL.createObjectURL(blob);
          const base = item.name.split(".").slice(0, -1).join(".");
          updated[index] = {
            ...updated[index],
            isConverting: false,
            progress: 100,
            downloadUrl: convertedUrl,
            name: `${base}.${toFormat}`,
          };
          setFiles([...updated]);
          setTimeout(() => URL.revokeObjectURL(url), 2000);
        },
        mime,
        0.9
      );
    };

    img.onerror = () => {
      updated[index].isConverting = false;
      setFiles([...updated]);
      URL.revokeObjectURL(url);
    };

    img.src = url;
  };

  const handleConvertAll = () => {
    if (files.length > 0) convertFile(0);
  };

  const handleClear = () => {
    files.forEach((f) => URL.revokeObjectURL(f.preview));
    setFiles([]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="converter-container">
      <div id="particles-js"></div>

      {/* Header */}
      <header className="header">
        <div className="logo-area">
          <img
            src="https://brainhub.uk/wp-content/uploads/2025/04/cropped-Brain-Hub-favicon-1-192x192.png"
            alt="Brainhub logo"
          />
          <span>
            <a href="https://www.brainhub.uk" target="_blank" rel="noopener noreferrer">
              Brainhub
            </a>
          </span>
        </div>
        <nav>
          <a href="https://brainhub.uk/about-us/" target="_blank" rel="noopener noreferrer">
            About Us
          </a>
          <a href="https://brainhub.uk/contact-us/" target="_blank" rel="noopener noreferrer">
            Contact Us
          </a>
        </nav>
      </header>

      {/* Main Card */}
      <div className="converter-card">
        <h1 className="title">Image Converter</h1>
        <p className="byline-under-title">
          By{" "}
          <a href="https://www.brainhub.uk" target="_blank" rel="noopener noreferrer">
            Brainhub
          </a>
        </p>

        {/* Dropdowns */}
        <div className="formats-row">
          <select value={fromFormat} onChange={(e) => setFromFormat(e.target.value)}>
            <option value="png">PNG</option>
            <option value="jpeg">JPEG</option>
            <option value="webp">WEBP</option>
          </select>
          <span className="arrow">→</span>
          <select value={toFormat} onChange={(e) => setToFormat(e.target.value)}>
            <option value="webp">WEBP</option>
            <option value="png">PNG</option>
            <option value="jpeg">JPEG</option>
          </select>
        </div>

        {/* Drop Zone */}
        <div
          className="drop-zone"
          onClick={() => fileInputRef.current.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            handleFileSelect(e.dataTransfer.files);
          }}
        >
          <p>
            <i className="fa-solid fa-upload"></i> Choose Images
          </p>
        </div>

        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          multiple
          style={{ display: "none" }}
          onChange={(e) => handleFileSelect(e.target.files)}
        />

        {/* File List */}
        <div className="file-list">
          {files.map((item, index) => (
            <div key={index} className="file-item">
              <img src={item.preview} alt="preview" className="preview-thumb-small" />
              <span className="file-name">{item.name}</span>
              {!item.downloadUrl ? (
                <button
                  className="convert-btn"
                  onClick={() => convertFile(index)}
                  disabled={item.isConverting}
                >
                  Convert
                </button>
              ) : (
                <a href={item.downloadUrl} download={item.name} className="download-btn">
                  Download
                </a>
              )}
            </div>
          ))}
        </div>

        {files.length > 0 && (
          <div className="bottom-buttons">
            <button className="convert-btn" onClick={handleConvertAll}>
              Convert All
            </button>
            <button className="clear-btn" onClick={handleClear}>
              Clear All
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="footer">© 2025 All rights reserved by Brainhub.uk</footer>
    </div>
  );
}
