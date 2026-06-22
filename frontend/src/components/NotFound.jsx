import React, { useState, useEffect, useCallback, useRef } from 'react';
import '../styles/NotFound.css';

const COLS = 20;
const ROWS = 20;
const CELL = 100 / ROWS;

const DIR = {
  UP:    { x: 0,  y: -1 },
  DOWN:  { x: 0,  y:  1 },
  LEFT:  { x: -1, y:  0 },
  RIGHT: { x: 1,  y:  0 },
};

const KEY_MAP = {
  ArrowUp: 'UP', ArrowDown: 'DOWN', ArrowLeft: 'LEFT', ArrowRight: 'RIGHT',
  w: 'UP', W: 'UP', s: 'DOWN', S: 'DOWN', a: 'LEFT', A: 'LEFT', d: 'RIGHT', D: 'RIGHT',
};

const OPPOSITE = { UP: 'DOWN', DOWN: 'UP', LEFT: 'RIGHT', RIGHT: 'LEFT' };

const INIT_SNAKE = [{ x: 10, y: 10 }, { x: 9, y: 10 }, { x: 8, y: 10 }];
const FLOATERS   = ['✦', '◈', '◉', '✧', '⊹', '◆', '✶', '⋆'];
const HEAD_ROT   = { UP: 0, RIGHT: 90, DOWN: 180, LEFT: 270 };

function randomFood(snake) {
  let pos;
  do {
    pos = { x: Math.floor(Math.random() * COLS), y: Math.floor(Math.random() * ROWS) };
  } while (snake.some(s => s.x === pos.x && s.y === pos.y));
  return pos;
}

function FloatField() {
  return (
    <div className="nf-float-field" aria-hidden="true">
      {FLOATERS.map((ch, i) => (
        <span key={i} className={`nf-floater nf-floater-${i}`}>{ch}</span>
      ))}
    </div>
  );
}

function GlitchText({ text }) {
  return (
    <div className="nf-glitch-wrap" aria-label={text}>
      <span className="nf-glitch" data-text={text}>{text}</span>
    </div>
  );
}

function DPad({ onDir }) {
  const fire = (d) => (e) => { e.preventDefault(); onDir(d); };
  return (
    <div className="nf-dpad" aria-label="Game controls">
      <button className="nf-dpad-btn nf-dpad-up"    onPointerDown={fire('UP')}    aria-label="Up">▲</button>
      <button className="nf-dpad-btn nf-dpad-left"  onPointerDown={fire('LEFT')}  aria-label="Left">◀</button>
      <button className="nf-dpad-btn nf-dpad-right" onPointerDown={fire('RIGHT')} aria-label="Right">▶</button>
      <button className="nf-dpad-btn nf-dpad-down"  onPointerDown={fire('DOWN')}  aria-label="Down">▼</button>
    </div>
  );
}

export default function NotFound() {
  const [phase,      setPhase]      = useState('idle');
  const [snake,      setSnake]      = useState(INIT_SNAKE);
  const [food,       setFood]       = useState({ x: 15, y: 10 });
  const [dir,        setDir]        = useState('RIGHT');
  const [score,      setScore]      = useState(0);
  const [best,       setBest]       = useState(() => {
    try { return parseInt(localStorage.getItem('snk_best') || '0', 10); } catch { return 0; }
  });
  const [shaking,    setShaking]    = useState(false);
  const [popups,     setPopups]     = useState([]);
  const [scoreFlash, setScoreFlash] = useState(false);

  const dirRef   = useRef('RIGHT');
  const nextDir  = useRef('RIGHT');
  const snakeRef = useRef(INIT_SNAKE);
  const foodRef  = useRef({ x: 15, y: 10 });
  const scoreRef = useRef(0);
  const phaseRef = useRef('idle');

  useEffect(() => { dirRef.current   = dir;   }, [dir]);
  useEffect(() => { snakeRef.current = snake; }, [snake]);
  useEffect(() => { foodRef.current  = food;  }, [food]);
  useEffect(() => { scoreRef.current = score; }, [score]);
  useEffect(() => { phaseRef.current = phase; }, [phase]);

  const queueDir = useCallback((raw) => {
    const wanted = KEY_MAP[raw] || raw;
    if (!wanted) return;
    if (OPPOSITE[wanted] === dirRef.current) return;
    nextDir.current = wanted;
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (KEY_MAP[e.key]) { e.preventDefault(); queueDir(e.key); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [queueDir]);

  const startGame = useCallback(() => {
    const s = INIT_SNAKE.map(c => ({ ...c }));
    setSnake(s);
    snakeRef.current = s;
    setDir('RIGHT'); dirRef.current = 'RIGHT'; nextDir.current = 'RIGHT';
    const f = randomFood(s);
    setFood(f); foodRef.current = f;
    setScore(0); scoreRef.current = 0;
    setPopups([]);
    setShaking(false);
    setPhase('playing'); phaseRef.current = 'playing';
  }, []);

  function endGame() {
    setPhase('over'); phaseRef.current = 'over';
    setShaking(true);
    setTimeout(() => setShaking(false), 600);
    const final = scoreRef.current;
    setBest(prev => {
      const nb = Math.max(prev, final);
      try { localStorage.setItem('snk_best', String(nb)); } catch {}
      return nb;
    });
  }

  useEffect(() => {
    if (phase !== 'playing') return;
    const speed = Math.max(80, 160 - Math.floor(scoreRef.current / 3) * 8);
    const iv = setInterval(() => {
      if (phaseRef.current !== 'playing') return;

      const committed = nextDir.current;
      dirRef.current  = committed;
      setDir(committed);

      const d    = DIR[committed];
      const head = snakeRef.current[0];
      const nx   = head.x + d.x;
      const ny   = head.y + d.y;

      if (nx < 0 || nx >= COLS || ny < 0 || ny >= ROWS) { endGame(); return; }
      if (snakeRef.current.slice(0, -1).some(s => s.x === nx && s.y === ny)) { endGame(); return; }

      const ate = nx === foodRef.current.x && ny === foodRef.current.y;
      const ns  = [{ x: nx, y: ny }, ...snakeRef.current];
      if (!ate) ns.pop();
      setSnake(ns); snakeRef.current = ns;

      if (ate) {
        const newScore = scoreRef.current + 1;
        setScore(newScore); scoreRef.current = newScore;
        setScoreFlash(true); setTimeout(() => setScoreFlash(false), 350);
        const pid = Date.now() + Math.random();
        const fx  = foodRef.current.x;
        const fy  = foodRef.current.y;
        setPopups(prev => [...prev, { id: pid, x: fx, y: fy }]);
        setTimeout(() => setPopups(prev => prev.filter(p => p.id !== pid)), 750);
        const nf = randomFood(ns);
        setFood(nf); foodRef.current = nf;
      }
    }, speed);
    return () => clearInterval(iv);
  }, [phase]); // eslint-disable-line

  const headPos = snake[0];

  return (
    <div className="nf-page">
      <FloatField />
      <div className="nf-blob nf-blob-a" aria-hidden="true" />
      <div className="nf-blob nf-blob-b" aria-hidden="true" />
      <div className="nf-blob nf-blob-c" aria-hidden="true" />

      <div className="nf-center">

        <header className="nf-header">
          <GlitchText text="404" />
          <p className="nf-headline">Oops! This page got lost in the creator universe&nbsp;😅</p>
          <p className="nf-subtext">While you're here, play Snake Game 🐍</p>
        </header>

        <div className={`nf-card${shaking ? ' nf-card--shake' : ''}`}>

          <div className="nf-hud">
            <div className="nf-hud-stat">
              <span className="nf-hud-label">Score</span>
              <span className={`nf-hud-value nf-score-val${scoreFlash ? ' nf-score-val--pop' : ''}`}>{score}</span>
            </div>
            <div className="nf-hud-keys">↑ ↓ ← → / WASD</div>
            <div className="nf-hud-stat nf-hud-right">
              <span className="nf-hud-label">Best</span>
              <span className="nf-hud-value">{best}</span>
            </div>
          </div>

          <div className="nf-board-wrap">
            <div className="nf-board" role="img" aria-label="Snake game board">

              {/* body segments */}
              {snake.slice(1).map((seg, i) => (
                <div
                  key={`seg-${i}`}
                  className={`nf-seg${i === snake.length - 2 ? ' nf-seg--tail' : ''}`}
                  style={{
                    left: `${seg.x * CELL}%`,
                    top:  `${seg.y * CELL}%`,
                    width:  `${CELL}%`,
                    height: `${CELL}%`,
                  }}
                />
              ))}

              {/* head */}
              {phase !== 'idle' && (
                <div
                  className="nf-head"
                  style={{
                    left:      `${headPos.x * CELL}%`,
                    top:       `${headPos.y * CELL}%`,
                    width:     `${CELL}%`,
                    height:    `${CELL}%`,
                    transform: `rotate(${HEAD_ROT[dir]}deg)`,
                  }}
                >
                  <div className="nf-eye nf-eye-l" />
                  <div className="nf-eye nf-eye-r" />
                  <div className="nf-tongue" />
                </div>
              )}

              {/* food */}
              <div
                className="nf-food"
                style={{
                  left:   `${food.x * CELL}%`,
                  top:    `${food.y * CELL}%`,
                  width:  `${CELL}%`,
                  height: `${CELL}%`,
                }}
              />

              {/* score popups */}
              {popups.map(p => (
                <div
                  key={p.id}
                  className="nf-popup"
                  style={{ left: `${p.x * CELL + CELL / 2}%`, top: `${p.y * CELL}%` }}
                >+1</div>
              ))}

              {/* idle overlay */}
              {phase === 'idle' && (
                <div className="nf-overlay">
                  <div className="nf-overlay-icon">🐍</div>
                  <p className="nf-overlay-title">Snake</p>
                  <p className="nf-overlay-hint">Arrow keys or WASD to move</p>
                  <button className="nf-btn nf-btn--primary nf-btn--lg" onClick={startGame}>
                    Start game
                  </button>
                </div>
              )}

              {/* game-over overlay */}
              {phase === 'over' && (
                <div className="nf-overlay nf-overlay--over">
                  <p className="nf-over-eyebrow">Game over</p>
                  <p className="nf-over-score">{score}</p>
                  <p className="nf-over-pts">points</p>
                  {score > 0 && score >= best && (
                    <div className="nf-new-best">🏆 New best!</div>
                  )}
                  <button className="nf-btn nf-btn--primary nf-btn--lg" onClick={startGame}>
                    Play again
                  </button>
                </div>
              )}
            </div>
          </div>

          <DPad onDir={queueDir} />
        </div>

        <div className="nf-actions">
          <a href="/" className="nf-btn nf-btn--primary">← Return to home</a>
          <a href="/exp" className="nf-btn nf-btn--ghost">Explore creators</a>
        </div>

      </div>
    </div>
  );
}