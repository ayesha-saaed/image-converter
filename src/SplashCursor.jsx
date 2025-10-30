'use client';
import { useEffect, useRef } from 'react';

export default function SplashCursor({
  SIM_RESOLUTION = 128,
  DYE_RESOLUTION = 1440,
  CAPTURE_RESOLUTION = 512,
  DENSITY_DISSIPATION = 3.5,
  VELOCITY_DISSIPATION = 2,
  PRESSURE = 0.1,
  PRESSURE_ITERATIONS = 20,
  CURL = 3,
  SPLAT_RADIUS = 0.2,
  SPLAT_FORCE = 6000,
  SHADING = true,
  COLOR_UPDATE_SPEED = 10,
  BACK_COLOR = { r: 0.5, g: 0, b: 0 },
  TRANSPARENT = true
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const pointers = [
      {
        id: -1,
        texcoordX: 0,
        texcoordY: 0,
        prevTexcoordX: 0,
        prevTexcoordY: 0,
        deltaX: 0,
        deltaY: 0,
        down: false,
        moved: false,
        color: { r: 0, g: 0, b: 0 }
      }
    ];

    let colorUpdateTimer = 0;
    let lastUpdateTime = Date.now();

    function scaleByPixelRatio(input) {
      const pixelRatio = window.devicePixelRatio || 1;
      return Math.floor(input * pixelRatio);
    }

    function wrap(value, min, max) {
      const range = max - min;
      if (range === 0) return min;
      return ((value - min) % range) + min;
    }

    function generateColor() {
      const h = Math.random();
      const s = 1.0;
      const v = 1.0;
      let r, g, b;
      const i = Math.floor(h * 6);
      const f = h * 6 - i;
      const p = v * (1 - s);
      const q = v * (1 - f * s);
      const t = v * (1 - (1 - f) * s);
      switch (i % 6) {
        case 0:
          r = v; g = t; b = p; break;
        case 1:
          r = q; g = v; b = p; break;
        case 2:
          r = p; g = v; b = t; break;
        case 3:
          r = p; g = q; b = v; break;
        case 4:
          r = t; g = p; b = v; break;
        case 5:
          r = v; g = p; b = q; break;
      }
      return { r: r * 0.15, g: g * 0.15, b: b * 0.15 };
    }

    function updatePointerDown(pointer, x, y) {
      pointer.down = true;
      pointer.moved = false;
      pointer.texcoordX = scaleByPixelRatio(x) / canvas.width;
      pointer.texcoordY = 1 - scaleByPixelRatio(y) / canvas.height;
      pointer.prevTexcoordX = pointer.texcoordX;
      pointer.prevTexcoordY = pointer.texcoordY;
      pointer.deltaX = 0;
      pointer.deltaY = 0;
      pointer.color = generateColor();
    }

    function updatePointerMove(pointer, x, y) {
      pointer.prevTexcoordX = pointer.texcoordX;
      pointer.prevTexcoordY = pointer.texcoordY;
      pointer.texcoordX = scaleByPixelRatio(x) / canvas.width;
      pointer.texcoordY = 1 - scaleByPixelRatio(y) / canvas.height;
      pointer.deltaX = pointer.texcoordX - pointer.prevTexcoordX;
      pointer.deltaY = pointer.texcoordY - pointer.prevTexcoordY;
      pointer.moved = Math.abs(pointer.deltaX) > 0 || Math.abs(pointer.deltaY) > 0;
    }

    function updatePointerUp(pointer) {
      pointer.down = false;
    }

    // Mouse and touch events
    window.addEventListener('mousedown', e => {
      updatePointerDown(pointers[0], e.clientX, e.clientY);
    });

    window.addEventListener('mousemove', e => {
      updatePointerMove(pointers[0], e.clientX, e.clientY);
    });

    window.addEventListener('mouseup', () => {
      updatePointerUp(pointers[0]);
    });

    window.addEventListener('touchstart', e => {
      const touch = e.touches[0];
      if (touch) updatePointerDown(pointers[0], touch.clientX, touch.clientY);
    });

    window.addEventListener('touchmove', e => {
      const touch = e.touches[0];
      if (touch) updatePointerMove(pointers[0], touch.clientX, touch.clientY);
    });

    window.addEventListener('touchend', () => {
      updatePointerUp(pointers[0]);
    });

    function animate() {
      const now = Date.now();
      let dt = (now - lastUpdateTime) / 1000;
      dt = Math.min(dt, 0.016666); // limit frame time
      lastUpdateTime = now;

      colorUpdateTimer += dt * COLOR_UPDATE_SPEED;
      colorUpdateTimer = wrap(colorUpdateTimer, 0, 1);

      // TODO: Add your WebGL framebuffer & splat logic here
      // For now, we just request next frame
      requestAnimationFrame(animate);
    }

    animate();
  }, [
    SIM_RESOLUTION,
    DYE_RESOLUTION,
    CAPTURE_RESOLUTION,
    DENSITY_DISSIPATION,
    VELOCITY_DISSIPATION,
    PRESSURE,
    PRESSURE_ITERATIONS,
    CURL,
    SPLAT_RADIUS,
    SPLAT_FORCE,
    SHADING,
    COLOR_UPDATE_SPEED,
    BACK_COLOR,
    TRANSPARENT
  ]);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 50
      }}
    >
      <canvas
        ref={canvasRef}
        id="fluid"
        style={{ width: '100vw', height: '100vh', display: 'block' }}
      />
    </div>
  );
}
