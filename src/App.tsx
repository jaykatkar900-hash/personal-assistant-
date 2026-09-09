import { useState, useEffect } from "react";

/* ── Icon primitives ── */
const Icon = ({ d, size = 16, stroke = "currentColor", sw = 1.5, fill = "none" }: { d: string; size?: number; stroke?: string; sw?: number; fill?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

const icons = {
  home:     "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10",
  systems:  "M4 6h16 M4 12h16 M4 18h16",
  modules:  "M3 3h7v7H3z M14 3h7v7h-7z M14 14h7v7h-7z M3 14h7v7H3z",
  network:  "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M23 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75",
  logs:     "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8",
  settings: "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z",
  mic:      "M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z M19 10v2a7 7 0 0 1-14 0v-2 M12 19v4 M8 23h8",
  send:     "M22 2L11 13 M22 2L15 22 8 13 2 9z",
  shield:   "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  cpu:      "M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18",
  activity: "M22 12h-4l-3 9L9 3l-3 9H2",
  zap:      "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
  globe:    "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z M2 12h20 M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z",
  calendar: "M19 4H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z M16 2v4 M8 2v4 M3 10h18",
  clock:    "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z M12 6v6l4 2",
  lock:     "M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2z M7 11V7a5 5 0 0 1 10 0v4",
  wifi:     "M5 12.55a11 11 0 0 1 14.08 0 M1.42 9a16 16 0 0 1 21.16 0 M8.53 16.11a6 6 0 0 1 6.95 0 M12 20h.01",
  brain:    "M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2z M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2z",
  eye:      "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 12m-3 0a3 3 0 1 0 6 0 3 3 0 0 0-6 0",
  play:     "M5 3l14 9-14 9V3z",
  search:   "M11 17.25a6.25 6.25 0 1 1 0-12.5 6.25 6.25 0 0 1 0 12.5z M16 16l4.5 4.5",
  chevron:  "M9 18l6-6-6-6",
};

/* ── Bright Spider Logo (matches reference: solid white fill, prominent legs) ── */
function SpiderLogo({ size = 88 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      {/* Subtle web rings */}
      <circle cx="50" cy="50" r="42" stroke="#00d4ff" strokeWidth="0.4" strokeOpacity="0.18" />
      <circle cx="50" cy="50" r="28" stroke="#00d4ff" strokeWidth="0.4" strokeOpacity="0.22" />
      <circle cx="50" cy="50" r="15" stroke="#00d4ff" strokeWidth="0.4" strokeOpacity="0.3" />
      {/* Web radials */}
      {[0,45,90,135,180,225,270,315].map(a => {
        const rad = a * Math.PI / 180;
        return <line key={a} x1={50} y1={50} x2={50 + 42 * Math.cos(rad)} y2={50 + 42 * Math.sin(rad)} stroke="#00d4ff" strokeWidth="0.35" strokeOpacity="0.12" />;
      })}

      {/* === SPIDER BODY === */}
      {/* Abdomen — solid white with cyan glow fill */}
      <ellipse cx="50" cy="60" rx="10" ry="13" fill="white" fillOpacity="0.92" filter="url(#glow)" />
      {/* Abdomen pattern stripes */}
      <ellipse cx="50" cy="57" rx="4" ry="4.5" fill="#00d4ff" fillOpacity="0.45" />
      <ellipse cx="50" cy="63.5" rx="3" ry="3.2" fill="#00d4ff" fillOpacity="0.3" />

      {/* Cephalothorax */}
      <ellipse cx="50" cy="43" rx="8.5" ry="10" fill="white" fillOpacity="0.92" filter="url(#glow)" />

      {/* Neck connector */}
      <rect x="46.5" y="52" width="7" height="5.5" rx="2" fill="white" fillOpacity="0.85" />

      {/* Eyes — 4 pairs bright cyan */}
      <circle cx="46.5" cy="39" r="1.8" fill="#00d4ff" />
      <circle cx="53.5" cy="39" r="1.8" fill="#00d4ff" />
      <circle cx="44.5" cy="43" r="1.3" fill="#00d4ff" fillOpacity="0.8" />
      <circle cx="55.5" cy="43" r="1.3" fill="#00d4ff" fillOpacity="0.8" />

      {/* === LEGS (8 total, 4 per side) — thick, bright white === */}
      {/* Left legs */}
      <path d="M42 40 Q32 33 20 27" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeOpacity="0.9" fill="none" />
      <path d="M42 43 Q30 41 18 40" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeOpacity="0.9" fill="none" />
      <path d="M42 47 Q30 50 19 55" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeOpacity="0.9" fill="none" />
      <path d="M43 52 Q33 60 23 69" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeOpacity="0.9" fill="none" />
      {/* Right legs */}
      <path d="M58 40 Q68 33 80 27" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeOpacity="0.9" fill="none" />
      <path d="M58 43 Q70 41 82 40" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeOpacity="0.9" fill="none" />
      <path d="M58 47 Q70 50 81 55" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeOpacity="0.9" fill="none" />
      <path d="M57 52 Q67 60 77 69" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeOpacity="0.9" fill="none" />

      {/* Spinnerets */}
      <path d="M46.5 72.5 Q50 77 53.5 72.5" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.7" fill="none" />

      {/* Glow filter */}
      <defs>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
    </svg>
  );
}

/* ── Neural Core with large rings matching reference ── */
function NeuralCore() {
  const cx = 170, cy = 170, total = 340;
  const ticks = Array.from({ length: 48 }, (_, i) => {
    const a = (i * 7.5 - 90) * (Math.PI / 180);
    const r1 = 130, r2 = i % 4 === 0 ? 118 : 125;
    return { x1: cx + r1 * Math.cos(a), y1: cy + r1 * Math.sin(a), x2: cx + r2 * Math.cos(a), y2: cy + r2 * Math.sin(a), major: i % 4 === 0 };
  });

  return (
    <div className="relative flex items-center justify-center" style={{ width: total, height: total }}>
      {/* Outer halo */}
      <div className="absolute inset-0 rounded-full halo-breathe pointer-events-none"
        style={{ background: "radial-gradient(circle, #00d4ff44 0%, #00d4ff18 35%, #7c3aed08 60%, transparent 72%)" }} />

      {/* Pulse rings */}
      <div className="absolute rounded-full border pulse-1" style={{ width: 168, height: 168, borderColor: "#00d4ff44" }} />
      <div className="absolute rounded-full border pulse-2" style={{ width: 168, height: 168, borderColor: "#00d4ff2a" }} />

      {/* SVG HUD rings */}
      <svg className="absolute inset-0" width={total} height={total} viewBox={`0 0 ${total} ${total}`}>
        {/* Outermost subtle orbit */}
        <circle cx={cx} cy={cy} r={136} stroke="#00d4ff" strokeWidth="0.4" strokeOpacity="0.1" strokeDasharray="3 9" fill="none" />
        {/* Tick marks */}
        {ticks.map((t, i) => (
          <line key={i} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2}
            stroke="#00d4ff" strokeWidth={t.major ? 1.5 : 0.7}
            strokeOpacity={t.major ? 0.6 : 0.22} />
        ))}
        {/* Rotating arcs — outer */}
        <g className="ring-spin">
          <circle cx={cx} cy={cy} r={108} stroke="#00d4ff" strokeWidth="1.2" strokeOpacity="0.55"
            strokeDasharray="72 268" fill="none" />
          <circle cx={cx} cy={cy} r={108} stroke="#7c3aed" strokeWidth="1" strokeOpacity="0.35"
            strokeDasharray="40 300" fill="none" strokeDashoffset="180" />
        </g>
        {/* Rotating arcs — inner (reverse) */}
        <g className="ring-spin-rev">
          <circle cx={cx} cy={cy} r={88} stroke="#00d4ff" strokeWidth="0.9" strokeOpacity="0.4"
            strokeDasharray="55 220" fill="none" />
          <circle cx={cx} cy={cy} r={88} stroke="#3b82f6" strokeWidth="0.6" strokeOpacity="0.25"
            strokeDasharray="25 250" fill="none" strokeDashoffset="120" />
        </g>
        {/* Static structural ring */}
        <circle cx={cx} cy={cy} r={70} stroke="#00d4ff" strokeWidth="0.5" strokeOpacity="0.18" fill="none" />
        {/* Cardinal dots */}
        {[0, 90, 180, 270].map(deg => {
          const a = (deg - 90) * Math.PI / 180, r = 108;
          return <circle key={deg} cx={cx + r * Math.cos(a)} cy={cy + r * Math.sin(a)} r={3}
            fill="#00d4ff" fillOpacity="0.85" />;
        })}
        {/* Diagonal accent dots */}
        {[45, 135, 225, 315].map(deg => {
          const a = (deg - 90) * Math.PI / 180, r = 108;
          return <circle key={deg} cx={cx + r * Math.cos(a)} cy={cy + r * Math.sin(a)} r={1.5}
            fill="#7c3aed" fillOpacity="0.7" />;
        })}
        {/* Circuit traces */}
        <path d={`M${cx - 70} ${cy} L${cx - 90} ${cy} L${cx - 106} ${cy - 16}`}
          stroke="#00d4ff" strokeWidth="0.6" strokeOpacity="0.35" fill="none" />
        <path d={`M${cx + 70} ${cy} L${cx + 90} ${cy} L${cx + 106} ${cy + 16}`}
          stroke="#00d4ff" strokeWidth="0.6" strokeOpacity="0.35" fill="none" />
        <path d={`M${cx} ${cy - 70} L${cx} ${cy - 90} L${cx + 16} ${cy - 106}`}
          stroke="#7c3aed" strokeWidth="0.6" strokeOpacity="0.4" fill="none" />
        <path d={`M${cx} ${cy + 70} L${cx} ${cy + 90} L${cx - 16} ${cy + 106}`}
          stroke="#3b82f6" strokeWidth="0.6" strokeOpacity="0.35" fill="none" />
        {/* Endpoint nodes */}
        {[[cx - 106, cy - 16, "#00d4ff"], [cx + 106, cy + 16, "#00d4ff"], [cx + 16, cy - 106, "#7c3aed"], [cx - 16, cy + 106, "#3b82f6"]].map(([x, y, c], i) => (
          <circle key={i} cx={x as number} cy={y as number} r={2.5} fill={c as string} fillOpacity="0.8" />
        ))}
      </svg>

      {/* Core sphere — large, dark, glowing */}
      <div className="relative rounded-full orb-float"
        style={{
          width: 168, height: 168,
          background: "radial-gradient(circle at 38% 32%, #1a4878, #08203e 50%, #030d1e)",
          border: "1px solid #00d4ff66",
          boxShadow: "0 0 50px #00d4ff55, 0 0 100px #00d4ff22, 0 0 160px #7c3aed11, inset 0 0 30px #00d4ff1a",
        }}>
        {/* Scan line */}
        <div className="absolute inset-0 rounded-full overflow-hidden">
          <div className="scan-line absolute left-0 right-0 h-px"
            style={{ background: "linear-gradient(90deg, transparent, #00d4ffcc, transparent)" }} />
        </div>
        {/* Spider centered */}
        <div className="absolute inset-0 flex items-center justify-center"
          style={{ filter: "drop-shadow(0 0 8px #00d4ffaa) drop-shadow(0 0 20px #00d4ff55)" }}>
          <SpiderLogo size={108} />
        </div>
      </div>
    </div>
  );
}

/* ── Waveform ── */
const WV = [0,.07,.14,.1,.03,.18,.07,.14,.03,.1,.22,.07,.14,.03,.1];
function Waveform() {
  return (
    <div className="flex items-end gap-0.5" style={{ height: 22 }}>
      {WV.map((d, i) => (
        <div key={i} className="wave-bar"
          style={{ height: 22, animationDelay: `${d}s`, animationDuration: `${0.42 + (i % 4) * 0.11}s` }} />
      ))}
    </div>
  );
}

/* ── Data ── */
const METRICS = [
  { label: "CPU", value: 34, unit: "%",    icon: icons.cpu,      color: "#f59e0b" },
  { label: "RAM", value: 61, unit: "%",    icon: icons.activity, color: "#7c3aed" },
  { label: "NET", value: 78, unit: "Mbps", icon: icons.wifi,     color: "#00d4ff" },
  { label: "SSD", value: 45, unit: "%",    icon: icons.cpu,      color: "#3b82f6" },
];

const MODULES = [
  { icon: icons.shield, label: "Scan",    accent: "#00d4ff", bg: "#00d4ff12" },
  { icon: icons.brain,  label: "Analyze", accent: "#00d4ff", bg: "#00d4ff0c" },
  { icon: icons.logs,   label: "Brief",   accent: "#8eb8e0", bg: "#3b82f60c" },
  { icon: icons.search, label: "Search",  accent: "#00ff88", bg: "#00ff880c" },
  { icon: icons.eye,    label: "Monitor", accent: "#7c3aed", bg: "#7c3aed12" },
  { icon: icons.play,   label: "Execute", accent: "#00d4ff", bg: "#00d4ff0c" },
];

const NODES = [
  { name: "Node Alpha", status: "ACTIVE",  color: "#00ff88" },
  { name: "Node Beta",  status: "ACTIVE",  color: "#00ff88" },
  { name: "Node Gamma", status: "ACTIVE",  color: "#00d4ff" },
];

const LOGS = [
  { time: "09:42:11", text: "Scan network perimeter — 0 threats detected",      type: "success" },
  { time: "09:38:54", text: "Weather briefing: Mumbai 31°C, partly cloudy",      type: "info"    },
  { time: "09:31:07", text: "Calendar: 3 meetings scheduled for today",          type: "info"    },
  { time: "09:15:22", text: "System diagnostics complete — all systems nominal", type: "success" },
  { time: "08:55:40", text: "Morning news digest compiled — 12 articles",        type: "info"    },
];

const AI_STATS = [
  { label: "Response Time",   value: "0.3ms",  icon: icons.zap      },
  { label: "Tasks Completed", value: "1,847",  icon: icons.activity },
  { label: "Accuracy Rate",   value: "99.7%",  icon: icons.shield   },
  { label: "Learning Cycles", value: "24,183", icon: icons.brain    },
];

const SCHEDULE = [
  { time: "10:00", label: "Team Standup",   active: true  },
  { time: "13:00", label: "Project Review", active: false },
  { time: "16:30", label: "Client Call",    active: false },
];

const NAV_ITEMS = [
  { id: "home",     icon: icons.home,     label: "Home"     },
  { id: "systems",  icon: icons.systems,  label: "Systems"  },
  { id: "modules",  icon: icons.modules,  label: "Modules"  },
  { id: "network",  icon: icons.network,  label: "Network"  },
  { id: "logs",     icon: icons.logs,     label: "Logs"     },
  { id: "settings", icon: icons.settings, label: "Settings" },
];

const HEADER_CARDS = [
  { label: "THREAT LEVEL", value: "ZERO",   icon: icons.shield,   color: "#00ff88",  iconBg: "#00ff8818" },
  { label: "UPTIME",        value: "99.98%", icon: icons.clock,    color: "#00d4ff",  iconBg: "#00d4ff18" },
  { label: "CONNECTIONS",   value: "247",    icon: icons.wifi,     color: "#3b82f6",  iconBg: "#3b82f618" },
  { label: "AI CONFIDENCE", value: "97.3%",  icon: icons.brain,    color: "#a855f7",  iconBg: "#a855f718" },
];

/* ── Badge ── */
function Badge({ label, color = "#00d4ff" }: { label: string; color?: string }) {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full"
      style={{ background: `${color}18`, border: `1px solid ${color}44`, fontFamily: "var(--font-mono)", fontSize: 9, color, letterSpacing: "0.12em" }}>
      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: color, boxShadow: `0 0 4px ${color}` }} />
      {label}
    </span>
  );
}

/* ── Card wrapper ── */
function Card({ title, badge, children, className = "" }: { title: string; badge?: React.ReactNode; children: React.ReactNode; className?: string }) {
  return (
    <div className={`glass flex flex-col p-4 ${className}`}>
      <div className="flex items-center justify-between mb-3 flex-shrink-0">
        <span style={{ fontFamily: "var(--font-mono)", color: "#4a7aab", fontSize: 10, fontWeight: 600, letterSpacing: "0.18em" }}>{title}</span>
        {badge}
      </div>
      {children}
    </div>
  );
}

/* ── App ── */
export default function App() {
  const [input, setInput]      = useState("");
  const [logs, setLogs]        = useState(LOGS);
  const [listening, setListen] = useState(false);
  const [activeNav, setNav]    = useState("home");
  const [activeMod, setMod]    = useState<string | null>(null);
  const [time, setTime]        = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const ts = new Date().toTimeString().slice(0, 8);
    setLogs([{ time: ts, text: input, type: "command" }, ...logs]);
    setInput("");
  };

  const fmtClock = (d: Date) => d.toLocaleTimeString("en-US", { hour12: false });
  const fmtDate  = (d: Date) => d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" }).toUpperCase();

  return (
    <div className="relative flex flex-col w-full h-full overflow-hidden" style={{ background: "#030c1a" }}>
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg pointer-events-none" />
      {/* Central radial glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 55% at 50% 50%, #00d4ff09 0%, #0a1a3308 30%, transparent 65%)" }} />

      {/* ══ HEADER ══ */}
      <header className="relative z-10 flex items-center justify-between px-4 py-2 flex-shrink-0"
        style={{ background: "linear-gradient(180deg, #060f20f0, #030c1acc)", borderBottom: "1px solid #0c1e38" }}>

        {/* Brand */}
        <div className="flex items-center gap-3 flex-shrink-0" style={{ minWidth: 180 }}>
          <div className="w-9 h-9 flex items-center justify-center flex-shrink-0"
            style={{
              background: "linear-gradient(135deg, #00d4ff22, #00d4ff08)",
              border: "1.5px solid #00d4ff55",
              clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
            }}>
            <span style={{ fontFamily: "var(--font-display)", color: "#00d4ff", fontSize: 15, fontWeight: 800, textShadow: "0 0 12px #00d4ff" }}>S</span>
          </div>
          <div>
            <div style={{ fontFamily: "var(--font-display)", color: "#e2f4ff", fontSize: 20, fontWeight: 700, letterSpacing: "0.22em", lineHeight: 1.1, textShadow: "0 0 14px #00d4ff66" }}>SPIDY</div>
            <div style={{ fontFamily: "var(--font-mono)", color: "#2a4a6a", fontSize: 8.5, letterSpacing: "0.18em" }}>PERSONAL AI • V4.2.1</div>
          </div>
        </div>

        {/* Center: 4 metric cards */}
        <div className="flex items-center gap-2">
          {HEADER_CARDS.map((c) => (
            <div key={c.label} className="flex items-center gap-2.5 px-3 py-2 rounded-lg"
              style={{
                background: "#060f20cc",
                border: "1px solid #0c1e38",
                borderTop: `2px solid ${c.color}`,
                boxShadow: `0 -1px 8px ${c.color}22`,
                minWidth: 130,
              }}>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: c.iconBg, border: `1px solid ${c.color}33` }}>
                <Icon d={c.icon} size={14} stroke={c.color} />
              </div>
              <div>
                <div style={{ fontFamily: "var(--font-mono)", color: "#2a4a6a", fontSize: 8, letterSpacing: "0.15em" }}>{c.label}</div>
                <div style={{ fontFamily: "var(--font-display)", color: c.color, fontSize: 14, fontWeight: 700, letterSpacing: "0.05em", textShadow: `0 0 10px ${c.color}88` }}>{c.value}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Right: Clock */}
        <div className="flex items-center gap-3 flex-shrink-0 justify-end" style={{ minWidth: 220 }}>
          <div className="text-right">
            <div style={{ fontFamily: "var(--font-mono)", color: "#2a4a6a", fontSize: 8.5, letterSpacing: "0.15em" }}>{fmtDate(time)}</div>
            <div style={{ fontFamily: "var(--font-display)", color: "#00d4ff", fontSize: 22, fontWeight: 700, letterSpacing: "0.1em", textShadow: "0 0 16px #00d4ff66", lineHeight: 1.1 }}>
              {fmtClock(time)}
            </div>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg"
            style={{ background: "#00ff8810", border: "1px solid #00ff8830" }}>
            <div className="w-2 h-2 rounded-full" style={{ background: "#00ff88", boxShadow: "0 0 6px #00ff88" }} />
            <span style={{ fontFamily: "var(--font-mono)", color: "#00ff88", fontSize: 9, letterSpacing: "0.12em" }}>SYSTEM ONLINE</span>
          </div>
        </div>
      </header>

      {/* ══ BODY ══ */}
      <div className="relative z-10 flex flex-1 min-h-0 overflow-hidden">

        {/* ── Sidebar ── */}
        <nav className="flex flex-col items-center pt-4 pb-3 gap-1.5 flex-shrink-0"
          style={{ width: 78, borderRight: "1px solid #0c1e38", background: "#030c1acc" }}>
          {NAV_ITEMS.map((n) => (
            <button key={n.id}
              className="flex flex-col items-center justify-center gap-1 rounded-xl cursor-pointer transition-all w-[58px] py-2.5"
              style={{
                color: activeNav === n.id ? "#00d4ff" : "#2a4a6a",
                background: activeNav === n.id ? "linear-gradient(135deg, #00d4ff1a, #00d4ff0a)" : "transparent",
                border: activeNav === n.id ? "1px solid #00d4ff44" : "1px solid transparent",
                boxShadow: activeNav === n.id ? "0 0 14px #00d4ff1a, inset 0 0 10px #00d4ff08" : "none",
                position: "relative",
              }}
              onClick={() => setNav(n.id)}>
              {activeNav === n.id && (
                <div style={{ position: "absolute", left: -1, top: "25%", bottom: "25%", width: 2, background: "#00d4ff", borderRadius: "0 2px 2px 0", boxShadow: "0 0 6px #00d4ff" }} />
              )}
              <Icon d={n.icon} size={16} stroke="currentColor" />
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 8, letterSpacing: "0.08em" }}>{n.label}</span>
            </button>
          ))}
        </nav>

        {/* ── Left column ── */}
        <aside className="hidden lg:flex flex-col gap-2.5 p-3 flex-shrink-0 overflow-y-auto" style={{ width: 228 }}>

          {/* System Status */}
          <Card title="SYSTEM STATUS" badge={<Badge label="LIVE" color="#00ff88" />}>
            <div className="flex flex-col gap-3">
              {METRICS.map((m) => (
                <div key={m.label}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded flex items-center justify-center"
                        style={{ background: `${m.color}15`, border: `1px solid ${m.color}33` }}>
                        <Icon d={m.icon} size={11} stroke={m.color} />
                      </div>
                      <span style={{ fontFamily: "var(--font-mono)", color: "#4a7aab", fontSize: 10, letterSpacing: "0.1em" }}>{m.label}</span>
                    </div>
                    <span style={{ fontFamily: "var(--font-mono)", color: "#e2eaf7", fontSize: 11, fontWeight: 600 }}>
                      {m.value}{m.unit}
                    </span>
                  </div>
                  <div className="prog-track">
                    <div className="prog-fill" style={{ width: `${m.value}%`, background: `linear-gradient(90deg, ${m.color}, #7c3aed)` }} />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Quick Modules */}
          <Card title="QUICK MODULES">
            <div className="grid grid-cols-3 gap-2">
              {MODULES.map((m) => (
                <button key={m.label}
                  className="flex flex-col items-center gap-1.5 py-3 rounded-xl cursor-pointer transition-all"
                  style={{
                    background: activeMod === m.label ? m.bg : "#06101e",
                    border: `1px solid ${activeMod === m.label ? m.accent + "66" : "#0c1e38"}`,
                    boxShadow: activeMod === m.label ? `0 0 14px ${m.accent}22` : "none",
                  }}
                  onClick={() => setMod(activeMod === m.label ? null : m.label)}>
                  <Icon d={m.icon} size={20} stroke={m.accent} />
                  <span style={{ fontFamily: "var(--font-mono)", color: "#4a7aab", fontSize: 8.5, letterSpacing: "0.1em" }}>
                    {m.label.toUpperCase()}
                  </span>
                </button>
              ))}
            </div>
          </Card>

          {/* Network Nodes */}
          <Card title="NETWORK NODES" badge={<Badge label="ACTIVE" color="#00d4ff" />}>
            <div className="flex flex-col gap-1.5">
              {NODES.map((n) => (
                <div key={n.name} className="flex items-center justify-between px-2.5 py-2 rounded-lg"
                  style={{ background: "#06101e", border: "1px solid #0c1e38" }}>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: n.color, boxShadow: `0 0 6px ${n.color}` }} />
                    <span style={{ fontFamily: "var(--font-mono)", color: "#8eb8e0", fontSize: 10 }}>{n.name}</span>
                  </div>
                  <span style={{ fontFamily: "var(--font-mono)", color: n.color, fontSize: 9, letterSpacing: "0.1em" }}>{n.status}</span>
                </div>
              ))}
            </div>
          </Card>
        </aside>

        {/* ── Center ── */}
        <main className="flex-1 flex flex-col items-center justify-between min-h-0 p-3 pt-4">

          {/* Orb + labels */}
          <div className="flex-1 flex flex-col items-center justify-center gap-3">
            <NeuralCore />

            <div className="flex flex-col items-center gap-1 fade-up">
              <div style={{ fontFamily: "var(--font-display)", color: "#e2f4ff", fontSize: 26, fontWeight: 800, letterSpacing: "0.35em", textShadow: "0 0 24px #00d4ffaa, 0 0 48px #00d4ff44" }}>
                SPIDY
              </div>
              <Waveform />
              <div style={{ fontFamily: "var(--font-mono)", color: "#00d4ffaa", fontSize: 10, letterSpacing: "0.25em" }}>
                ── NEURAL CORE ACTIVE ──
              </div>
              <div style={{ fontFamily: "var(--font-mono)", color: "#2a4a6a", fontSize: 9, letterSpacing: "0.2em", marginTop: 2 }}>
                AWAITING COMMAND INPUT
              </div>
            </div>
          </div>

          {/* Command interface */}
          <div className="w-full max-w-lg pb-1">
            <div className="glass relative" style={{ borderRadius: 12, padding: "1px" }}>
              <div className="absolute -top-2.5 left-4 px-2" style={{ background: "#030c1a" }}>
                <span style={{ fontFamily: "var(--font-mono)", color: "#2a4a6a", fontSize: 9, letterSpacing: "0.18em" }}>◈ COMMAND INTERFACE</span>
              </div>
              <form onSubmit={send} className="flex items-center gap-2 px-3 py-2.5">
                <span style={{ fontFamily: "var(--font-mono)", color: "#00d4ff", fontSize: 16, lineHeight: 1, flexShrink: 0 }}>›</span>
                <input
                  className="cmd-input flex-1 px-3 py-2"
                  placeholder="Enter command for Spidy..."
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  style={{ borderRadius: 8 }}
                />
                <button type="button"
                  className="btn-ghost flex items-center gap-1.5 px-3 py-2"
                  style={{
                    fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.1em",
                    color: listening ? "#00ff88" : "#00d4ff",
                    borderColor: listening ? "#00ff8844" : "#00d4ff33",
                  }}
                  onClick={() => setListen(!listening)}>
                  <Icon d={icons.mic} size={13} stroke={listening ? "#00ff88" : "#00d4ff"} />
                  {listening ? "STOP" : "VOICE"}
                </button>
                <button type="submit" className="btn-primary flex items-center gap-1.5 px-4 py-2"
                  style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.12em" }}>
                  <Icon d={icons.send} size={12} stroke="#000810" fill="none" />
                  SEND
                </button>
              </form>
            </div>
          </div>
        </main>

        {/* ── Right column ── */}
        <aside className="hidden lg:flex flex-col gap-2.5 p-3 flex-shrink-0 overflow-y-auto" style={{ width: 248 }}>

          {/* Activity Log */}
          <Card title="ACTIVITY LOG" className="flex-1 min-h-0" badge={
            <button className="opacity-50 hover:opacity-100 transition-opacity">
              <Icon d={icons.chevron} size={12} stroke="#4a7aab" />
            </button>
          }>
            <div className="flex flex-col gap-0 overflow-y-auto flex-1" style={{ minHeight: 0 }}>
              {logs.map((log, i) => {
                const dotColor = log.type === "success" ? "#00ff88" : log.type === "command" ? "#7c3aed" : "#00d4ff";
                return (
                  <div key={i} className="flex gap-2 group fade-up" style={{ animationDelay: `${i * 0.04}s` }}>
                    <div className="flex flex-col items-center flex-shrink-0" style={{ paddingTop: 4 }}>
                      <div className="w-2 h-2 rounded-full"
                        style={{ background: dotColor, boxShadow: `0 0 5px ${dotColor}`, flexShrink: 0 }} />
                      {i < logs.length - 1 && (
                        <div style={{ width: 1, flex: 1, minHeight: 16, margin: "3px 0", background: `linear-gradient(180deg, ${dotColor}44, #0c1e3888)` }} />
                      )}
                    </div>
                    <div className="flex-1 pb-3 min-w-0">
                      <div style={{ fontFamily: "var(--font-mono)", color: "#1e3050", fontSize: 9 }}>{log.time}</div>
                      <div style={{ color: "#7aa8d0", fontSize: 11, lineHeight: 1.45, marginTop: 1 }}>{log.text}</div>
                    </div>
                    <div className="flex-shrink-0 pt-1 opacity-30 group-hover:opacity-70 transition-opacity">
                      <Icon d={icons.chevron} size={12} stroke="#4a7aab" />
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* AI Performance */}
          <Card title="AI PERFORMANCE" badge={
            <button className="opacity-50 hover:opacity-100 transition-opacity">
              <Icon d={icons.chevron} size={12} stroke="#4a7aab" />
            </button>
          }>
            <div className="flex flex-col gap-1.5">
              {AI_STATS.map((s) => (
                <div key={s.label} className="flex items-center justify-between px-2.5 py-2 rounded-lg"
                  style={{ background: "#06101e", border: "1px solid #0c1e38" }}>
                  <div className="flex items-center gap-2">
                    <Icon d={s.icon} size={12} stroke="#2a4a6a" />
                    <span style={{ fontFamily: "var(--font-mono)", color: "#2a4a6a", fontSize: 10 }}>{s.label}</span>
                  </div>
                  <span style={{ fontFamily: "var(--font-mono)", color: "#00d4ff", fontSize: 12, fontWeight: 600, textShadow: "0 0 8px #00d4ff66" }}>
                    {s.value}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          {/* Today's Schedule */}
          <Card title="TODAY'S SCHEDULE" badge={
            <button className="opacity-50 hover:opacity-100 transition-opacity">
              <Icon d={icons.chevron} size={12} stroke="#4a7aab" />
            </button>
          }>
            <div className="flex flex-col gap-0">
              {SCHEDULE.map((ev, i) => (
                <div key={ev.time} className="flex gap-2.5">
                  <div className="flex flex-col items-center flex-shrink-0" style={{ paddingTop: 4 }}>
                    <div className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                      style={{
                        background: ev.active ? "#00d4ff" : "transparent",
                        border: `1.5px solid ${ev.active ? "#00d4ff" : "#1e3858"}`,
                        boxShadow: ev.active ? "0 0 8px #00d4ff" : "none",
                      }} />
                    {i < SCHEDULE.length - 1 && (
                      <div style={{ width: 1, flex: 1, minHeight: 18, margin: "3px 0", background: "linear-gradient(180deg, #00d4ff33, #0c1e38)" }} />
                    )}
                  </div>
                  <div className="pb-3 flex-1">
                    <div style={{ fontFamily: "var(--font-mono)", color: "#1e3858", fontSize: 9 }}>{ev.time}</div>
                    <div style={{ color: ev.active ? "#00d4ff" : "#7aa8d0", fontSize: 11, fontWeight: ev.active ? 500 : 400, marginTop: 1 }}>
                      {ev.label}
                    </div>
                  </div>
                  {ev.active && <div className="flex-shrink-0 pt-1"><Badge label="NOW" color="#00d4ff" /></div>}
                </div>
              ))}
            </div>
          </Card>
        </aside>
      </div>

      {/* ══ FOOTER ══ */}
      <footer className="relative z-10 flex items-center justify-between px-5 py-1.5 flex-shrink-0"
        style={{ borderTop: "1px solid #0c1e38", background: "#030c1af0" }}>
        <div className="flex items-center gap-5">
          {[
            { label: "ENCRYPTED",     icon: icons.lock,  color: "#00d4ff" },
            { label: "SECURE TUNNEL", icon: icons.wifi,  color: "#00d4ff" },
            { label: "AI ACTIVE",     icon: icons.brain, color: "#00ff88" },
          ].map((s) => (
            <div key={s.label} className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: s.color, boxShadow: `0 0 5px ${s.color}` }} />
              <Icon d={s.icon} size={11} stroke={s.color} />
              <span style={{ fontFamily: "var(--font-mono)", color: "#2a4a6a", fontSize: 9, letterSpacing: "0.12em" }}>{s.label}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-3" style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "#1e3858" }}>
          <span>SPIDY PERSONAL AI</span>
          <span style={{ color: "#0c1e38" }}>•</span>
          <span>SESSION ID: SPD-AL7M5</span>
          <span style={{ color: "#0c1e38" }}>•</span>
          <span style={{ color: "#00d4ff", textShadow: "0 0 6px #00d4ff44" }}>SYSTEM SECURE</span>
        </div>
      </footer>
    </div>
  );
}
