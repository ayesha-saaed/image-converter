import React from "react";
import "./AboutSection.css";

const AboutSection = () => {
  return (
    <section className="about-section">
      <div className="about-box">
        <h1>Image Converter by Brain — Fast, Secure & Free Online Image Conversion Tool</h1>

        <p>
          In today’s digital world, image size and format can make or break your website’s performance.
          Large images slow down loading times, hurt SEO rankings, and frustrate users. Whether you’re
          a web designer, blogger, or eCommerce owner, having the right image format is crucial for speed
          and quality.
        </p>

        <p>
          That’s where <strong>Image Converter by Brain</strong> comes in — a simple, secure, and lightning-fast
          image conversion tool built for everyone. With support for PNG, JPEG, and WebP, you can convert
          your images in just seconds — all directly from your browser, with no data uploads.
        </p>

        <h2>What Is Image Converter by Brain?</h2>
        <p>
          Image Converter by Brain is an easy-to-use online tool that lets you convert images between
          popular formats like PNG, JPEG, and WebP instantly. Unlike traditional converters that upload
          your files to external servers, this tool performs all conversions locally within your browser,
          ensuring complete data privacy and security.
        </p>

        <ul>
          <li>Convert JPEG or PNG to WebP for better web performance</li>
          <li>Change WebP back to PNG or JPEG for editing or compatibility</li>
        </ul>

        <h2>Why You Need an Online Image Converter</h2>
        <ul>
          <li><strong>Faster Loading Speed:</strong> WebP reduces file size by up to 35% compared to PNG or JPEG.</li>
          <li><strong>Better SEO:</strong> Google prioritizes faster websites with optimized media.</li>
          <li><strong>Mobile Optimization:</strong> Smaller image sizes mean faster loading on mobile data.</li>
          <li><strong>Cross-Format Flexibility:</strong> Easily switch between PNG, JPEG, and WebP formats.</li>
        </ul>

        <h2>Supported Image Formats</h2>
        <table>
          <thead>
            <tr>
              <th>Convert From</th>
              <th>Convert To</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>PNG</td><td>WebP, JPEG</td></tr>
            <tr><td>JPEG</td><td>WebP, PNG</td></tr>
            <tr><td>WebP</td><td>PNG, JPEG</td></tr>
          </tbody>
        </table>

        <h2>Key Features of Image Converter by Brain</h2>
        <ul>
          <li><strong>Browser-Based Conversion:</strong> All processing happens locally — 100% private.</li>
          <li><strong>Drag & Drop Simplicity:</strong> Add images instantly and convert in one click.</li>
          <li><strong>Batch Conversion:</strong> Process multiple images at once.</li>
          <li><strong>Cross-Platform Compatibility:</strong> Works on all devices and browsers.</li>
          <li><strong>Advanced Compression:</strong> Choose quality, resize, and optimize easily.</li>
          <li><strong>24/7 Support:</strong> Our expert team responds within 2 hours.</li>
        </ul>

        <h2>How to Use Image Converter by Brain</h2>
        <ol>
          <li>Go to Image Converter by Brain and select your target format (WebP, PNG, or JPEG).</li>
          <li>Click “Add Files” or drag and drop your images — conversion happens instantly.</li>
          <li>Click “Download” to save files individually or as a ZIP archive.</li>
        </ol>

        <h2>Who Can Benefit</h2>
        <ul>
          <li>Web Developers & SEO Experts</li>
          <li>Graphic Designers</li>
          <li>Photographers</li>
          <li>Bloggers & eCommerce Owners</li>
        </ul>

        <h2>FAQs</h2>
        <ul className="faq-list">
          <li><strong>What is WebP?</strong> It’s a next-gen image format by Google — smaller size, same quality.</li>
          <li><strong>Why convert to WebP?</strong> It speeds up websites and boosts SEO.</li>
          <li><strong>Does conversion affect quality?</strong> No, our tool keeps your images crisp and clear.</li>
          <li><strong>Can I convert multiple images?</strong> Yes, batch conversion supports 50+ files.</li>
          <li><strong>Is my data secure?</strong> Absolutely — all processing stays on your device.</li>
          <li><strong>Does it work on mobile?</strong> Yes, directly in your browser.</li>
        </ul>

        <h2>Conclusion</h2>
        <p>
          If you’re tired of heavy, slow-loading images or complicated conversion tools,
          <strong> Image Converter by Brain</strong> is your all-in-one solution. It’s fast, private,
          and perfect for everyone — from beginners to professionals.
        </p>

        <p className="cta">Try Image Converter by Brain now and experience effortless image conversion!</p>
      </div>
    </section>
  );
};

export default AboutSection;
