import React, { useEffect, useRef, useState } from "react";
import "./ImageConverter.css";

export default function ImageConverter() {
  const [files, setFiles] = useState([]);
  const [toFormat, setToFormat] = useState("webp");
  const [fromFormat, setFromFormat] = useState("png");
  const fileInputRef = useRef(null);

  // Blue & White Particles Background
  useEffect(() => {
    const loadParticles = () => {
      if (window.particlesJS) {
        window.particlesJS("particles-js", {
          particles: {
            number: { value: 90, density: { enable: true, value_area: 900 } },
            color: { value: ["#0048ff", "#ffffff"] },
            shape: { type: "circle" },
            opacity: { value: 0.7, random: true },
            size: { value: 3, random: true },
            line_linked: {
              enable: true,
              distance: 130,
              color: "#0048ff",
              opacity: 0.35,
              width: 1,
            },
            move: { enable: true, speed: 1.6 },
          },
          interactivity: {
            detect_on: "canvas",
            events: {
              onhover: { enable: true, mode: "repulse" },
              onclick: { enable: true, mode: "push" },
            },
            modes: { repulse: { distance: 120 }, push: { particles_nb: 4 } },
          },
          retina_detect: true,
        });
      }
    };

    if (!window.particlesJS) {
      const script = document.createElement("script");
      script.src =
        "https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js";
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

    setFiles((prev) => {
      const updated = [...prev];
      updated[index].isConverting = true;
      updated[index].progress = 0;
      return updated;
    });

    let progress = 0;
    const simulateProgress = setInterval(() => {
      if (progress < 90) {
        progress += 10;
        setFiles((prev) => {
          const updated = [...prev];
          updated[index].progress = progress;
          return updated;
        });
      } else {
        clearInterval(simulateProgress);
      }
    }, 100);

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
          clearInterval(simulateProgress);
          if (!blob) return;
          const convertedUrl = URL.createObjectURL(blob);
          const base = item.name.split(".").slice(0, -1).join(".");

          setFiles((prev) => {
            const updated = [...prev];
            updated[index] = {
              ...updated[index],
              isConverting: false,
              progress: 100,
              downloadUrl: convertedUrl,
              name: `${base}.${toFormat}`,
            };
            return updated;
          });

          setTimeout(() => URL.revokeObjectURL(url), 2000);
        },
        mime,
        0.8
      );
    };

    img.onerror = () => {
      clearInterval(simulateProgress);
      setFiles((prev) => {
        const updated = [...prev];
        updated[index].isConverting = false;
        return updated;
      });
      URL.revokeObjectURL(url);
    };

    img.src = url;
  };

  const handleConvertAll = () => {
    if (files.length > 0) files.forEach((_, i) => convertFile(i));
  };

  const handleClear = () => {
    files.forEach((f) => {
      URL.revokeObjectURL(f.preview);
      if (f.downloadUrl) URL.revokeObjectURL(f.downloadUrl);
    });
    setFiles([]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="converter-wrapper">
      <div id="particles-js"></div>

      {/* Header */}
      <header className="header">
        <div className="logo-area">
          <img
            src="logo.jpg"
            alt="Brainhub logo"
          />
          <span>
            <a
              href="https://www.brainhub.uk"
              target="_blank"
              rel="noopener noreferrer"
            >
              Brainhub
            </a>
          </span>
        </div>
        <nav>
          <a
            href="https://brainhub.uk/about-us/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>About Us</span>
          </a>
          <a
            href="https://brainhub.uk/contact-us/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Contact Us</span>
          </a>
        </nav>
      </header>

      {/* Main Content */}
      <main className="converter-main">
        <div className="converter-card">
          <h1 className="title">Image Converter</h1>
          <p className="byline-under-title">
            Powered by{" "}
            <a
              href="https://www.brainhub.uk"
              target="_blank"
              rel="noopener noreferrer"
            >
              Brainhub
            </a>
          </p>

          {/* Format Selection */}
          <div className="formats-row">
            <select
              value={fromFormat}
              onChange={(e) => setFromFormat(e.target.value)}
              className="format-select"
            >
              <option value="png">PNG</option>
              <option value="jpeg">JPEG</option>
              <option value="webp">WEBP</option>
            </select>
            <span className="arrow">→</span>
            <select
              value={toFormat}
              onChange={(e) => setToFormat(e.target.value)}
              className="format-select"
            >
              <option value="webp">WEBP</option>
              <option value="png">PNG</option>
              <option value="jpeg">JPEG</option>
            </select>
          </div>

          {/* Upload Area */}
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
              <i className="fa-solid fa-upload"></i> Choose Images or Drag & Drop
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
          {files.length > 0 && (
            <div className="file-list">
              {files.map((item, index) => (
                <div key={index} className="file-item">
                  <img
                    src={item.preview}
                    alt="preview"
                    className="preview-thumb-small"
                  />
                  <span className="file-name">{item.name}</span>

                  {item.isConverting && (
                    <div className="progress-container">
                      <div
                        className="progress-bar"
                        style={{ width: `${item.progress}%` }}
                      ></div>
                      <span className="progress-text">
                        {item.progress}%
                      </span>
                    </div>
                  )}

                  {!item.downloadUrl ? (
                    <button
                      className="convert-btn btn-animated"
                      onClick={() => convertFile(index)}
                      disabled={item.isConverting}
                    >
                      <span>
                        {item.isConverting ? `${item.progress}%` : "Convert"}
                      </span>
                    </button>
                  ) : (
                    <a
                      href={item.downloadUrl}
                      download={item.name}
                      className="download-btn btn-animated"
                    >
                      <span>Download</span>
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}

          {files.length > 0 && (
            <div className="bottom-buttons">
              <button
                className="convert-btn btn-animated"
                onClick={handleConvertAll}
              >
                <span>Convert All</span>
              </button>
              <button
                className="clear-btn btn-animated"
                onClick={handleClear}
              >
                <span>Clear All</span>
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        © 2025 All rights reserved by Brainhub.uk
      </footer>
    </div>
  );
}