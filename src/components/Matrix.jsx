import React, { useEffect, useRef } from 'react';
import { getUserData } from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import axios from '../server/index';

const MatrixEffect = () => {
  let canvasRef = useRef(null);
  const fontHeight = 14;
  const fontFamily = "Meiryo, monospace";

  const numbers = "0123456789";
  const operators = "#+-\\/|=";
  const katakana =
    "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヰヱヲ";
  const hiragana =
    "あいうえおかきくけこがぎぐげごさしすせそざじずぜぞたちつてとだぢづでどなにぬねのはひふへほばびぶべぼぱぴぷぺぽまみむめもやゆよらりるれろわゐゑをん";
  const alphabet = numbers + operators + katakana + hiragana;

  const spawnInterval = 500;
  const density = 0.7;

  const glitchInterval = 500;
  const glitchAmount = 0.01;

  const moveScale = 0.012;

  const speedBase = 1.0;
  const speedDeviation = 0.4;
  const streaks = 1.9;

  const brightRatio = 0.1;

  const randomGlyph = () => ({
    glyph: alphabet[Math.floor(Math.random() * alphabet.length)],
    flipped: Math.random() < 0.5,
    bright: Math.random() < brightRatio,
  });

  const makeUniverse = (size) => {
    const out = [];
    for (let i = 0; i < size; i++) {
      out.push(randomGlyph());
    }
    return out;
  };
  const universe = makeUniverse(1000);

   canvasRef = useRef(null);
  let w, h;
  let charHeight, colWidth, colsPerLine, charsOnCol;
  const trails = [];

  const setCanvasExtents = (c) => {
    w = window.innerWidth;
    h = window.innerHeight;
    c.canvas.width = w;
    c.canvas.height = h;

    c.font = fontHeight + "px " + fontFamily;
    c.textBaseline = "top";
    const charSize = c.measureText("ネ");

    colWidth = charSize.width * 1.15;
    charHeight = fontHeight * 1.15;

    charsOnCol = Math.ceil(h / charHeight);
    if (charsOnCol <= 0) charsOnCol = 1;
    colsPerLine = Math.ceil(w / colWidth);
    if (colsPerLine <= 0) colsPerLine = 1;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const c = canvas.getContext("2d");
    setCanvasExtents(c);

    window.onresize = () => {
      setCanvasExtents(c);
    };

    const clear = () => {
      c.fillStyle = "black";
      c.fillRect(0, 0, canvas.width, canvas.height);
    };

    const drawTrail = (trail) => {
      const head = Math.round(trail.headAt);
      if (head < 0) return;

      const x = trail.col * colWidth;
      let y = head * charHeight + charHeight * 0.35;

      for (let i = 0; i < trail.length; i++, y -= charHeight) {
        if (y < 0) break;
        if (y > h) continue;

        const idx = (trail.universeAt + head - i) % universe.length;
        const item = universe[idx];

        c.fillStyle = item.bright ? "#20E020" : "#008000";
        if (item.flipped) {
          c.setTransform(-1, 0, 0, 1, 0, 0);
          c.fillText(item.glyph, -x - colWidth, y);
          c.setTransform(1, 0, 0, 1, 0, 0);
        } else {
          c.fillText(item.glyph, x, y);
        }
      }
    };

    const makeTrail = (col) => {
      const speed =
        speedBase + (Math.random() * speedDeviation * 2 - speedDeviation);
      return {
        col,
        universeAt: Math.floor(Math.random() * universe.length),
        headAt: -Math.floor(Math.random() * 2 * charsOnCol),
        speed,
        length: Math.floor(Math.random() * streaks * charsOnCol) + 8,
      };
    };

    const moveTrails = (distance) => {
      const trailsToRemove = [];
      for (let i = 0; i < trails.length; i++) {
        const trail = trails[i];
        trail.headAt += trail.speed * distance;

        const tip = trail.headAt - trail.length;
        if (tip * charHeight > h) {
          trailsToRemove.push(i);
        }
      }

      while (trailsToRemove.length > 0) {
        trails.splice(trailsToRemove.pop(), 1);
      }
    };

    const spawnTrails = () => {
      const topTrailPerCol = [];
      for (let i = 0; i < trails.length; i++) {
        const trail = trails[i];
        const trailTop = trail.headAt - trail.length;
        const top = topTrailPerCol[trail.col];
        if (!top || top.headAt - top.length > trailTop) {
          topTrailPerCol[trail.col] = trail;
        }
      }

      for (let i = 0; i < colsPerLine; i++) {
        let spawnProbability = 0.0;
        let maxSpeed = null;

        if (!topTrailPerCol[i]) {
          spawnProbability = 1.0;
        } else {
          const topTrail = topTrailPerCol[i];
          const tip = Math.round(topTrail.headAt) - topTrail.length;
          if (tip > 0) {
            const emptySpaceRatio = tip / charsOnCol;
            spawnProbability = emptySpaceRatio;
            maxSpeed = topTrail.speed * (1 + emptySpaceRatio);
          }
        }

        const effectiveP = spawnProbability * density;
        const p = Math.random();

        if (p < effectiveP) {
          trails.push(makeTrail(i, maxSpeed));
        }
      }
    };

    const glitchUniverse = (count) => {
      for (let i = 0; i < count; i++) {
        const idx = Math.floor(Math.random() * universe.length);
        universe[idx] = randomGlyph();
      }
    };

    let prevTime;
    const tick = (time) => {
      if (!prevTime) {
        prevTime = time;
      }
      const elapsed = time - prevTime;
      prevTime = time;

      moveTrails(elapsed * moveScale);
      if (Math.random() < density) {
        spawnTrails();
      }

      clear();
      for (const trail of trails) {
        drawTrail(trail);
      }

      requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);

    return () => {
      window.onresize = null; // Cleanup
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: "100%",
        height: "100%",
        position: "fixed",
        left: 0,
        top: 0,
        margin: 0,
        padding: 0,
      }}
    />
  );
};

export default MatrixEffect;
