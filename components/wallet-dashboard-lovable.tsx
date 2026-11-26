"use client";

import { useState, type ReactNode } from "react";

const ADDR = "0x64b766b07362405a9cc19c2226490f3015929da9";

/* ---------- tiny icons ---------- */
const I = {
  search: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>,
  send: <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>,
  copy: <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/></svg>,
  ext: <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 3h7v7M10 14 21 3M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5"/></svg>,
  star: <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m12 2 3 7 7 .6-5.3 4.7L18.5 22 12 18l-6.5 4 1.8-7.7L2 9.6 9 9z"/></svg>,
  refresh: <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12a9 9 0 0 1-15 6.7L3 16M3 12a9 9 0 0 1 15-6.7L21 8M21 3v5h-5M3 21v-5h5"/></svg>,
  chev: <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m9 6 6 6-6 6"/></svg>,
  x: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.2 2H21l-6.5 7.4L22 22h-6l-4.7-6.1L5.8 22H3l7-8L2 2h6.1l4.3 5.7zm-1 18h1.6L7 3.7H5.3z"/></svg>,
  eyeOff: <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3l18 18M10.6 6.1A10 10 0 0 1 22 12a14 14 0 0 1-3 3.6M6.6 6.6A14 14 0 0 0 2 12s4 7 10 7a9 9 0 0 0 5.4-1.6"/></svg>,
};

/* ---------- top nav ---------- */
function Logo() {
  return (
    <a href="#" className="clk flex items-center gap-2">
      <svg width="14" height="16" viewBox="0 0 14 16" fill="currentColor"><rect x="0" y="4" width="3" height="12" rx="1"/><rect x="5.5" y="0" width="3" height="16" rx="1"/><rect x="11" y="6" width="3" height="6" rx="1"/></svg>
      <span className="text-[22px] font-medium tracking-[-0.01em]">Hyperstats</span>
    </a>
  );
}

function TopNav() {
  const items = ["Main", "Top Traders", "Activity", "Favourites", "Analytics", "Terminal", "Guides", "Docs"];
  return (
    <header className="flex h-[68px] items-center px-[18px]">
      <Logo />
      <nav className="ml-[38px] flex items-center gap-1">
        {items.map((t) => (
          <a key={t} href="#" className={`clk rounded-full px-[9px] py-[6px] text-[11.5px] ${t === "Terminal" ? "bg-brand text-foreground" : "text-foreground/90 hover:bg-chip-strong"}`}>{t}</a>
        ))}
      </nav>
      <div className="ml-auto flex items-center gap-2">
        <div className="clk flex h-[25px] w-[175px] items-center hover:border-foreground/20 gap-2 rounded-full border border-line bg-chip px-3 text-[10px] text-muted-foreground">
          {I.search}<span className="flex-1 truncate">Search wallets, tokens, ranks...</span>
          <span className="rounded border border-line px-1 text-[9px]">/</span>
        </div>
        <span className="clk grid h-[25px] w-[25px] place-items-center rounded-full border border-line bg-chip hover:bg-chip-strong">{I.x}</span>
        <span className="clk flex h-[25px] items-center gap-1.5 rounded-full border border-line bg-chip px-3 text-[10px] font-semibold hover:bg-chip-strong">{I.send}Bots</span>
        <span className="clk flex h-[25px] items-center gap-1.5 rounded-full border border-brand/60 bg-brand/25 px-3 text-[10px] hover:bg-brand/40">{I.send}<b className="font-semibold">Copy</b> on Telegram <span className="ml-0.5">→</span></span>
      </div>
    </header>
  );
}

/* ---------- ticker ---------- */
type Tick = [string, string, string, string, string];
const ticks: Tick[] = [
  ["HYPE", "Increased", "0x3a81…9ab1", "$42.8K", "2m"],
  ["BTC", "Long", "0x5080…9247", "$118.6K", "5m"],
  ["ETH", "Short", "0x51b9…3bc1", "$76.4K", "12m"],
  ["BTC", "Closed", "0x3947…f3b1", "+$4.2K", "18m"],
  ["HYPE", "Reduced", "0x7a26…4f8e", "$31.2K", "27m"],
  ["ETH", "Long", "0x6bc1…928e", "$24.7K", "36m"],
  ["$SOL", "Short", "0x2ba7…cc91", "$18.2K", "48m"],
];
const tokenLogoUrls: Record<string, string> = {
  PUMP: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-UhKbHj3DDFcpMrys8Ig2ikIVmRLYQ7.png",
  SOL: "/solana-logo.png",
};

function Coin({ s, size = 14 }: { s: string; size?: number }) {
  const ticker = s.replace(/^\$/, "");
  const src = tokenLogoUrls[ticker] ?? `https://app.hyperliquid.xyz/coins/${ticker}.svg`;
  const shape = ticker === "PUMP" ? "rounded-md" : "rounded-full";

  return <img src={src} alt={`${ticker} logo`} width={size} height={size} loading="lazy" decoding="async" style={{ width: size, height: size }} className={`shrink-0 ${shape} bg-chip-strong object-contain ring-1 ring-background`} />;
}
function Ticker() {
  const row = [...ticks, ...ticks];
  return (
    <div className="overflow-hidden border-y border-line-soft py-[7px]">
      <div className="flex w-max animate-ticker gap-[22px]">
        {row.map((t, i) => (
          <a href="#" key={i} className="clk flex items-center gap-[7px] text-[10px] whitespace-nowrap hover:opacity-80">
            <Coin s={t[0]} />
            <span className="text-[11px] font-semibold">{t[0]}</span>
            <span className={`rounded px-1.5 py-[1px] text-[8.5px] ${t[1] === "Long" ? "bg-gain/15 text-gain" : t[1] === "Short" ? "bg-loss/15 text-loss" : "bg-chip-strong text-muted-foreground"}`}>{t[1]}</span>
            <span className="text-[9.5px] text-muted-foreground underline decoration-dotted underline-offset-2">{t[2]}</span>
            <span className={`font-semibold ${t[3].startsWith("−") ? "text-loss" : t[3].startsWith("+") ? "text-gain" : ""}`}>{t[3]}</span>
            <span className="text-dim">{t[4]}</span>
          </a>
        ))}
      </div>
    </div>
  );
}

/* ---------- left sidebar ---------- */
function Section({ title, right, children }: { title: string; right?: ReactNode; children: ReactNode }) {
  return (
    <div className="border-b border-line-soft px-4 py-[14px]">
      <div className="mb-[13px] flex justify-between text-[10.5px] font-semibold">{title}{right}</div>
      {children}
    </div>
  );
}
const Row = ({ l, r, c = "" }: { l: ReactNode; r: ReactNode; c?: string }) => (
  <div className="flex items-center justify-between py-[6px] text-[10px]"><span className="text-muted-foreground">{l}</span><span className={`font-medium ${c}`}>{r}</span></div>
);
const Box = ({ l, v, c = "" }: { l: string; v: string; c?: string }) => (
  <div className="rounded-md border border-line bg-chip px-2 py-2 text-[9.5px]"><div className="text-muted-foreground">{l}</div><div className={`mt-1 text-[10px] font-medium ${c}`}>{v}</div></div>
);
const BarRow = ({ l, d, v, c }: { l: string; d: string; v: string; c: string }) => (
  <div className="flex items-center justify-between py-[5px] text-[10px]"><span>{l} <span className="ml-1 text-[8px] text-dim">{d}</span></span><span className={c}>{v}</span></div>
);

function LeftSidebar() {
  return (
    <aside className="border-r border-line-soft">
      <div className="border-b border-line-soft px-4 py-[16px]">
        <div className="text-[12.5px] font-semibold">Wallet Stats</div>
        <div className="mt-0.5 text-[9px] text-muted-foreground">30-day and lifetime activity</div>
      </div>
      <div className="border-b border-line-soft px-4 py-[14px]">
        <div className="flex justify-between text-[10.5px] font-semibold"><span>Account structure</span><span>$3.68M</span></div>
        <div className="mt-2 h-1 rounded-full bg-chip-strong"><div className="h-full w-[34%] rounded-full bg-gain" /></div>
        <div className="mt-2 flex gap-3 text-[8.5px] text-muted-foreground"><span><span className="text-gain">●</span> Spot <b className="text-foreground">34%</b></span><span>● Position <b className="text-foreground">66%</b></span></div>
        <div className="mt-3">
          <Row l="Spot Value" r="$1.24M" />
          <Row l="Position Value" r="$2.44M" />
          <Row l="Positions P&L" r="−$68.6K" c="text-loss" />
        </div>
      </div>
      <Section title="Consistency" right={<span className="text-gain">53%</span>}>
        <div className="flex justify-between text-[9.5px] text-muted-foreground"><span>16 of 30 profitable days</span><span>hit rate</span></div>
        <div className="mt-[18px] h-[3px] rounded-full bg-chip-strong"><div className="h-full w-[53%] rounded-full bg-gain" /></div>
      </Section>
      <Section title="Trade tempo">
        <div className="grid grid-cols-2 gap-2"><Box l="Avg Daily P&L" v="+$10.77K" c="text-gain" /><Box l="Avg Position" v="$305.2K" /></div>
        <div className="mt-2"><Box l="Closed trades" v="21W / 18L" /></div>
      </Section>
      <Section title="Best & worst day">
        <div className="border-l-2 border-chip-strong pl-2"><BarRow l="Best" d="Nov 14" v="+$36.8K" c="text-gain" /><BarRow l="Worst" d="Nov 7" v="−$24.2K" c="text-loss" /></div>
      </Section>
      <Section title="Largest trades">
        <div className="border-l-2 border-chip-strong pl-2"><BarRow l="Largest Win" d="BTC" v="+$25.6K" c="text-gain" /><BarRow l="Largest Loss" d="ARB" v="−$16.6K" c="text-loss" /></div>
      </Section>
      <Section title="Execution"><Row l="Execution Pace" r="6.2 trades / day" /><Row l="Active Exit Days · 30D" r="21 days" /></Section>
      <Section title="Funds"><Row l="Net Deposits" r="+$248.6K" c="text-gain" /><Row l="Transactions" r="3,046" /></Section>
      <Section title="Risk-adjusted">
        <div className="grid grid-cols-2 gap-2"><Box l="Sortino" v="1.58" /><Box l="Profit Factor" v="1.22" /><Box l="Max Drawdown" v="−18.4%" c="text-loss" /><Box l="Gross P&L" v="+$482.6K" c="text-gain" /></div>
      </Section>
    </aside>
  );
}

/* ---------- chart ---------- */
function seeded(n: number) {
  let s = 7;
  const r = () => ((s = (s * 9301 + 49297) % 233280) / 233280);
  const noise: number[] = [0];
  let value = 0;
  for (let i = 1; i < n; i++) {
    value += (r() - 0.5) * 18000;
    noise.push(value);
  }
  const first = noise[0] ?? 0;
  const last = noise[noise.length - 1] ?? first;
  return noise.map((point, i) => {
    const progress = i / Math.max(1, n - 1);
    const centeredNoise = point - first - (last - first) * progress;
    return progress * 323100 + centeredNoise * 0.7;
  });
}
function PnlChart() {
  const W = 1380, H = 220, X0 = 56, Y = (v: number) => 205 - ((v + 100000) / 500000) * 187;
  const data = seeded(180);
  const xs = (i: number) => X0 + (i / (data.length - 1)) * (W - X0 - 30);
  const line = data.map((v, i) => `${i ? "L" : "M"}${xs(i).toFixed(1)},${Y(v).toFixed(1)}`).join("");
  const zeroY = Y(0);
  const area = `${line}L${xs(data.length - 1)},${zeroY}L${X0},${zeroY}Z`;
  const gridValues = [400000, 300000, 200000, 100000, 0, -100000];
  const markers: [number, string][] = [[0.06, "18"], [0.14, "27"], [0.24, "12"], [0.35, "34"], [0.46, "19"], [0.58, "28"], [0.71, "16"], [0.82, "31"], [0.94, "22"]];
  return (
    <div role="img" aria-label="30-day cumulative P&L chart ending at positive 323,100 dollars" className="relative h-[270px]">
      <svg viewBox={`0 0 ${W} 250`} preserveAspectRatio="none" className="h-full w-full">
        <defs>
          <linearGradient id="lossG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="var(--loss)" stopOpacity=".35"/><stop offset="1" stopColor="var(--loss)" stopOpacity="0"/></linearGradient>
          <linearGradient id="gainG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="var(--gain)" stopOpacity=".3"/><stop offset="1" stopColor="var(--gain)" stopOpacity="0"/></linearGradient>
          <clipPath id="above"><rect x="0" y="0" width={W} height={zeroY} /></clipPath>
          <clipPath id="below"><rect x="0" y={zeroY} width={W} height={H} /></clipPath>
        </defs>
        {gridValues.map((value) => <line key={value} x1={X0} x2={W - 30} y1={Y(value)} y2={Y(value)} stroke={value === 0 ? "#ffffff35" : "#ffffff14"} strokeDasharray={value === 0 ? "4 4" : "2 7"} />)}
        {markers.map(([p], i) => <line key={i} x1={X0 + p * (W - X0 - 30)} x2={X0 + p * (W - X0 - 30)} y1="16" y2="205" stroke="#ffffff22" strokeWidth="1" />)}
        <g>
          <path d={area} fill="url(#lossG)" clipPath="url(#below)" />
          <path d={area} fill="url(#gainG)" clipPath="url(#above)" />
          <path d={line} fill="none" stroke="var(--loss)" strokeWidth="1.5" clipPath="url(#below)" />
          <path d={line} fill="none" stroke="var(--gain)" strokeWidth="1.5" clipPath="url(#above)" />
        </g>
      </svg>
      {markers.map(([p, label], i) => (
        <span key={i} style={{ left: `${((X0 + p * (W - X0 - 30)) / W) * 100}%` }} className="absolute top-[6px] -translate-x-1/2 rounded-full bg-chip-strong px-1.5 text-[8px] font-semibold text-foreground">{label}</span>
      ))}
      <div className="pointer-events-none absolute inset-0 left-0 text-[9px] text-dim">
        {gridValues.map((value) => <span key={value} style={{ top: `${(Y(value) / 250) * 100}%` }} className="absolute left-0 -translate-y-1/2">{value > 0 ? `$${value / 1000}K` : value === 0 ? "$0" : "−$100K"}</span>)}
      </div>
      <span className="absolute right-[1.6%] top-[16%] rounded-full bg-gain px-2 py-0.5 text-[9px] font-semibold text-light-foreground">+$323.1K</span>
      <span className="absolute bottom-[40px] left-[58px] grid h-[22px] w-[22px] place-items-center rounded-full bg-light text-[11px] text-light-foreground">⇆</span>
      <div className="absolute inset-x-[56px] bottom-0 flex justify-between text-[9px] text-muted-foreground">
        {["Oct 28", "Nov 2", "Nov 7", "Nov 12", "Nov 17", "Nov 22", "Nov 26"].map((date) => (
          <span key={date} className="text-center leading-tight">{date}</span>
        ))}
      </div>
    </div>
  );
}

/* ---------- main ---------- */
const Btn = ({ children }: { children: ReactNode }) => (
  <span className="clk flex h-[21px] items-center gap-1.5 rounded-full border border-line bg-chip px-2.5 text-[9.5px] hover:bg-chip-strong">{children}</span>
);
const Stat = ({ l, v, c = "" }: { l: string; v: string; c?: string }) => (
  <span className="flex h-[22px] items-center gap-1.5 rounded-full border border-line bg-chip px-2.5 text-[9.5px]"><span className="text-muted-foreground">{l}</span><b className={`font-semibold ${c}`}>{v}</b></span>
);
function Seg({ items, active, badges, onPick }: { items: string[]; active: string; badges?: Record<string, string>; onPick?: (t: string) => void }) {
  const [local, setLocal] = useState(active);
  const cur = onPick ? active : local;
  return (
    <div className="flex items-center rounded-full border border-line bg-chip p-[3px]">
      {items.map((t) => (
        <button type="button" key={t} onClick={() => (onPick ? onPick(t) : setLocal(t))} className={`clk flex items-center gap-1.5 rounded-full px-[11px] py-[5px] text-[10.5px] ${t === cur ? "bg-light font-medium text-light-foreground" : "text-muted-foreground hover:text-foreground"}`}>
          {t}{badges?.[t] && <span className={`rounded-full px-1 text-[8px] ${t === cur ? "bg-light-foreground/10" : "bg-chip-strong"}`}>{badges[t]}</span>}
        </button>
      ))}
    </div>
  );
}

type Pos = [string, string, "Long" | "Short", string, string, string, string, string, string, string, string, string];
const positions: Pos[] = [
  ["0G", "Held 18d", "Long", "$182.8K", "$61.0K", "$0.232170", "$0.206900", "▾ 10.89%", "—", "3x", "−$19.8K", "−32.5%"],
  ["AAVE", "Held 6d", "Short", "$169.4K", "$17.0K", "$93.2518", "$95.8330", "▴ 2.77%", "$102.40", "10x", "−$4.6K", "−27.7%"],
  ["ADA", "Held 9d", "Short", "$224.0K", "$22.4K", "$0.142569", "$0.147200", "▴ 3.25%", "$0.1574", "10x", "−$7.2K", "−32.5%"],
  ["ARB", "Held 5h", "Short", "$95.2K", "$9.52K", "$0.106030", "$0.112180", "▴ 5.80%", "$0.1168", "10x", "−$5.6K", "−58.0%"],
  ["BERA", "Held 12d", "Long", "$36.4K", "$7.28K", "$0.221340", "$0.208050", "▾ 6.00%", "$0.1790", "5x", "−$2.2K", "−30.4%"],
  ["BIO", "Held 16d", "Long", "$104.6K", "$34.8K", "$0.027133", "$0.025162", "▾ 7.26%", "$0.0181", "3x", "−$7.6K", "−21.8%"],
  ["BTC", "Held 2d", "Short", "$1.2068M", "$120.6K", "$86,412.0", "$87,105.0", "▴ 0.80%", "$95,053", "10x", "−$9.6K", "−7.9%"],
  ["DOGE", "Held 12d", "Short", "$422.4K", "$42.2K", "$0.148200", "$0.152410", "▴ 2.84%", "$0.1622", "10x", "−$12.0K", "−28.4%"],
];

function PositionsTable() {
  const heads = ["Asset", "Side", "Notional", "Margin", "Entry", "Mark", "Liq.", "Lev.", "P&L"];
  return (
    <table className="mt-5 w-full text-[10px]">
      <thead>
        <tr className="text-[9.5px] text-foreground/90">
          {heads.map((h, i) => (
            <th key={h} className={`clk pb-3 font-normal hover:text-foreground ${i < 2 ? "text-left" : "text-right"} ${i === 0 ? "pl-2.5" : ""}`}>{h}{h !== "Side" && <span className="ml-0.5 text-dim">{h === "P&L" ? "↓" : "⇅"}</span>}</th>
          ))}
          <th />
        </tr>
      </thead>
      <tbody>
        {positions.map((p) => (
          <tr key={p[0]} className="clk border-t border-line-soft hover:bg-chip">
            <td className="py-[11px] pl-2.5"><div className="flex items-center gap-2.5"><Coin s={p[0]} size={11} /><div><a href="#" className="font-medium hover:underline">{p[0]}</a><div className="text-[8.5px] text-muted-foreground">{p[1]}</div></div></div></td>
            <td><span className={`flex items-center gap-2 ${p[2] === "Long" ? "text-gain" : "text-loss"}`}><span className={`grid h-[15px] w-[15px] place-items-center rounded text-[9px] ${p[2] === "Long" ? "bg-gain/15" : "bg-loss/15"}`}>{p[2] === "Long" ? "↑" : "↓"}</span><span className="text-[9px]">{p[2]}</span></span></td>
            <td className="text-right text-muted-foreground">{p[3]}</td>
            <td className="text-right">{p[4]}</td>
            <td className="text-right">{p[5]}</td>
            <td className="text-right"><div className="text-loss">{p[6]}</div><div className="text-[8px] text-loss/80">{p[7]}</div></td>
            <td className="text-right">{p[8]}</td>
            <td className="text-right text-gold">{p[9]}</td>
            <td className="text-right"><div className="text-loss">{p[10]}</div><div className="text-[8.5px] text-loss/80">{p[11]}</div></td>
            <td className="w-6 text-right text-muted-foreground">›</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

type Tx = {
  age: string;
  type: string;
  asset: string;
  via: string;
  size: string;
  value: string;
  fee: string;
  txid: string;
  status: string;
  network: "hyperliquid" | "ethereum" | "base" | "arbitrum" | "optimism" | "solana";
};
const txs: Tx[] = [
  { age: "1w ago", type: "Open Long", asset: "BTC", via: "Hyperliquid", size: "0.50 BTC", value: "$42,180.21", fee: "$12.65", txid: "0x8dd3b7dfeb1fcfa09bb7f9bb36c242e63e096c5be08ad4c299088c4a3f5143b1", status: "Filled", network: "hyperliquid" },
  { age: "5d ago", type: "Swap", asset: "ETH → USDC", via: "Uniswap · Ethereum", size: "4.20 ETH", value: "$13,440.00", fee: "$8.75", txid: "0x2b2199aea1748f3ba21dd912da0de4b585ba2c0c4d51f936eb4fdbf65ade9f98", status: "Confirmed", network: "ethereum" },
  { age: "4d ago", type: "Withdraw", asset: "USDC", via: "Base", size: "5,000.00 USDC", value: "$5,000.00", fee: "$0.35", txid: "0x1a5cc9feb9c077d4a85b3cf6d4b61c02b4b95fc777810b006d156dd3d9d2d086", status: "Completed", network: "base" },
  { age: "3d ago", type: "Receive", asset: "ARB", via: "Arbitrum", size: "14,250.00 ARB", value: "$12,825.00", fee: "—", txid: "0x707a8cdcf556a5dd5bb3d78c7842064b2659c5665594b2104f65910ae3eba699", status: "Received", network: "arbitrum" },
  { age: "2d ago", type: "Open Long", asset: "LINK", via: "Hyperliquid", size: "700.00 LINK", value: "$10,402.00", fee: "$3.12", txid: "0xcf643d912484e4dda569acf74ae968b850e3e754071f503589bb0cd51a85cc6b", status: "Filled", network: "hyperliquid" },
  { age: "1d ago", type: "Swap", asset: "LINK → USDC", via: "Uniswap · Ethereum", size: "350.00 LINK", value: "$5,201.00", fee: "$4.50", txid: "0xc38e1e3f78d7e0a78727ad190cb70ab7dae7fc17253426f44ea981f61929e362", status: "Confirmed", network: "ethereum" },
  { age: "19h ago", type: "Withdraw", asset: "USDT", via: "Optimism", size: "2,750.00 USDT", value: "$2,750.00", fee: "$0.08", txid: "0xf05bef9596dc28d0d166c2d3844a062b9a6d59b0c8acd3e8afb60f4cb493f0f9", status: "Completed", network: "optimism" },
  { age: "14h ago", type: "Close Long", asset: "BTC", via: "Hyperliquid", size: "0.125 BTC", value: "$10,840.00", fee: "$3.25", txid: "0x9440c1b47049c3d7a826d41066f82f8b386507fade08cda3a70ced7006929977", status: "Filled", network: "hyperliquid" },
  { age: "8m ago", type: "Receive", asset: "$PUMP", via: "Solana", size: "19,913,625.40", value: "$50,073.79", fee: "—", txid: "XV3gj6wKMhFhhK7TPGbs9bidwSSmQQEYv5doGnrs7PfSHaQH3TK2CWNC99EgNsyurWgrNSfqdsVU6vUna1Y9fif3", status: "Received", network: "solana" },
  { age: "7m ago", type: "Swap", asset: "$PUMP → $SOL", via: "Jupiter", size: "$4,978,406.35", value: "$12,505.00", fee: "$0.00157", txid: "bDbyc6TirJmeouY8XjUdMSdor7JKHCNsjHZenfBEPEcgaERK2VAVPUtqchUJo71Srzfyqyg3haM9rSmAVF679yqt", status: "Confirmed", network: "solana" },
  { age: "5m ago", type: "Swap", asset: "$PUMP → $SOL", via: "Jupiter", size: "$4,967,831.20", value: "$12,530.00", fee: "$0.00193", txid: "Jve34h3ugWuo1c49tHChhsZDaB5YVHMJ42zPwasbL2bVPrKis5tqwH7PiSXB7Mu6XgZDof11Lbz2WhBmqicywcwT", status: "Confirmed", network: "solana" },
  { age: "4m ago", type: "Swap", asset: "$PUMP → $SOL", via: "Jupiter", size: "$4,986,019.13", value: "$12,507.00", fee: "$0.00128", txid: "up5GXCWLcGci9LzRnWJDbxzPfBfGyLxKBEwaKVUwAtzMdGkTwGF3NNWNBSB46iUm3kn1jXmwBjod8W5LoiiWTUBk", status: "Confirmed", network: "solana" },
  { age: "2m ago", type: "Swap", asset: "$PUMP → $SOL", via: "Jupiter", size: "$4,981,368.72", value: "$12,531.79", fee: "$0.00164", txid: "jCh8w6zjAkcWktoD1mxzsdYop5sPeybjYfpqfBuhSqWdjcTVnpgkPX38mrDDLmuoV5d793rK1WhMCEoobHULToDm", status: "Pending", network: "solana" },
];
const txExplorerUrls: Record<Tx["network"], string> = {
  hyperliquid: "https://app.hyperliquid.xyz/explorer/tx/",
  ethereum: "https://etherscan.io/tx/",
  base: "https://basescan.org/tx/",
  arbitrum: "https://arbiscan.io/tx/",
  optimism: "https://optimistic.etherscan.io/tx/",
  solana: "https://solscan.io/tx/",
};
const short = (h: string) => `${h.slice(0, 8)}…${h.slice(-6)}`;
const shortAddress = (address: string) => `${address.slice(0, 6)}…${address.slice(-4)}`;
function TransactionsTable() {
  const heads = ["Ago", "Type", "Asset", "Via", "Size", "Value", "Fee", "Status", "Tx ID"];
  return (
    <table className="mt-5 w-full text-[10px]">
      <thead><tr className="text-[9.5px] text-foreground/90">{heads.map((h, i) => <th key={h} className={`clk pb-3 font-normal hover:text-foreground ${i < 4 ? "text-left" : "text-right"} ${i === 0 ? "pl-2.5" : ""}`}>{h}</th>)}</tr></thead>
      <tbody>
        {[...txs].reverse().map((t) => {
          const tone = t.type.includes("Long") || t.type === "Deposit" || t.type === "Receive" ? "text-gain" : t.type.includes("Short") ? "text-loss" : t.type === "Swap" ? "text-brand" : "text-gold";
          const statusTone = t.status === "Pending" || t.status === "Open" ? "text-gold" : t.status === "Cancelled" ? "text-loss" : "text-gain";
          return (
            <tr key={t.txid} className="clk border-t border-line-soft hover:bg-chip">
              <td className="py-[11px] pl-2.5 whitespace-nowrap text-muted-foreground">{t.age}</td>
              <td><span className={`rounded px-1.5 py-[2px] text-[9px] ${tone} bg-chip-strong`}>{t.type}</span></td>
              <td><div className="flex items-center gap-2"><span className="flex items-center gap-0.5">{t.asset.split(" → ").map((asset) => <Coin key={asset} s={asset} size={14} />)}</span><a href="#" className="font-medium hover:underline">{t.asset}</a></div></td>
              <td className="whitespace-nowrap"><div className="flex items-center gap-1.5 text-muted-foreground">
                {t.via === "Jupiter" ? <img src="https://jup.ag/favicon.svg" alt="Jupiter Exchange logo" width={14} height={14} loading="lazy" decoding="async" /> : t.via === "Solana" ? <Coin s="$SOL" size={14} /> : null}
                <span>{t.via}</span>
              </div></td>
              <td className="text-right whitespace-nowrap">{t.size}</td>
              <td className="text-right whitespace-nowrap">{t.value}</td>
              <td className="text-right text-muted-foreground">{t.fee}</td>
              <td className={`text-right ${statusTone}`}>{t.status}</td>
              <td className="text-right">
                <a href={`${txExplorerUrls[t.network]}${t.txid}`} target="_blank" rel="noopener noreferrer" aria-label={`Open ${t.network} transaction ${t.txid}`} onClick={(e) => e.stopPropagation()} className="clk inline-flex items-center gap-1 font-mono text-[9.5px] text-brand underline decoration-brand/40 underline-offset-2 hover:decoration-brand">{short(t.txid)}{I.ext}</a>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
function SpotTable() {
  const rows = [["USDC", "1,156,105.70", "$1.1561M", "$1.0000"], ["HYPE", "2,491.74", "$84.72K", "$34.00"]];
  return (
    <table className="mt-5 w-full text-[10px]">
      <thead><tr className="text-[9.5px] text-foreground/90">{["Asset", "Balance", "Value", "Price"].map((h, i) => <th key={h} className={`pb-3 font-normal ${i ? "text-right" : "pl-2.5 text-left"}`}>{h}</th>)}</tr></thead>
      <tbody>{rows.map((r) => <tr key={r[0]} className="clk border-t border-line-soft hover:bg-chip"><td className="py-[11px] pl-2.5"><div className="flex items-center gap-2.5"><Coin s={r[0]!} size={12} /><a href="#" className="font-medium hover:underline">{r[0]}</a></div></td><td className="text-right">{r[1]}</td><td className="text-right">{r[2]}</td><td className="text-right text-muted-foreground">{r[3]}</td></tr>)}</tbody>
    </table>
  );
}
function BottomTabs() {
  const [tab, setTab] = useState("Positions");
  return (
    <>
      <div className="inline-flex"><Seg items={["Positions", "Spot", "Transactions", "Orders", "History", "Entries"]} active={tab} onPick={setTab} badges={{ Positions: "8", Spot: "2", Transactions: "3,046", Orders: "0" }} /></div>
      <div className="mt-[12px] flex flex-wrap gap-2"><Stat l="Total Value" v="$3.68M" /><Stat l="Total Margin" v="$314.8K" /><Stat l="Open P&L" v="−$68.6K" c="text-loss" /></div>
      {tab === "Transactions" ? <TransactionsTable /> : tab === "Spot" ? <SpotTable /> : tab === "Positions" ? <PositionsTable /> : <div className="py-16 text-center text-[10px] text-muted-foreground">No {tab.toLowerCase()} to show</div>}
    </>
  );
}

function Main() {
  return (
    <main className="min-w-0 px-6 py-5">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <img src="/shane-profile.png" alt="Shane S." width={44} height={44} className="h-11 w-11 rounded-full border border-line object-cover" />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-[16px] font-medium tracking-[-0.01em]">Shane S.</h1>
              <span className="rounded bg-chip-strong px-1.5 py-1 text-[8.5px] text-muted-foreground">Hyperliquid</span>
            </div>
            <div className="mt-1 flex items-center gap-2">
              <a href={`https://app.hyperliquid.xyz/explorer/address/${ADDR}`} target="_blank" rel="noreferrer" className="clk text-[12px] text-muted-foreground hover:text-foreground hover:underline">{shortAddress(ADDR)}</a>
              <Btn>{I.copy}Copy</Btn><Btn>{I.ext}Open</Btn><Btn>{I.star}Save</Btn>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="clk grid h-[25px] w-[25px] place-items-center rounded-full border border-line bg-chip hover:bg-chip-strong">{I.refresh}</span>
          <span className="clk flex h-[25px] items-center gap-2 rounded-full border border-line bg-chip px-3 text-[10px] hover:bg-chip-strong">Hide favourites {I.chev}</span>
        </div>
      </div>
      <div className="mt-2 flex items-center gap-3 text-[9.5px]">
        <span className="rounded bg-chip-strong px-1.5 py-1">Grade B</span>
        <span aria-label="Demo snapshot; values are illustrative and not live" className="rounded border border-brand/30 bg-brand/10 px-2 py-1 text-[8px] font-semibold uppercase tracking-wide text-brand">Demo snapshot</span>
        <span className="text-muted-foreground">Rank <b className="font-medium text-foreground">#4,281</b></span>
        <span className="text-muted-foreground"><span className="text-gain">●</span> 30D window <b className="font-medium text-foreground">Oct 28 – Nov 26</b></span>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        <Stat l="Account" v="$3.68M" /><Stat l="30D Realized" v="+$391.7K" c="text-gain" /><Stat l="Win Rate" v="53.8%" />
        <Stat l="Sharpe" v="1.34" c="text-gain" /><Stat l="Bias" v="Long 58%" c="text-gain" />
      </div>
      <div className="mt-3 flex w-full flex-wrap items-center justify-between gap-3">
        <Seg items={["Period PnL", "Total PnL", "Realized PnL"]} active="Period PnL" />
        <Seg items={["15m", "1H", "24H", "7D", "30D", "3M", "1Y"]} active="30D" />
        <div className="ml-auto flex items-center gap-1 rounded-full border border-line bg-chip p-[3px] text-muted-foreground">
          <span className="grid h-[19px] w-[19px] place-items-center rounded-full bg-light text-light-foreground">★</span>
          <span className="px-1 text-[10px]">···</span>
          <span className="px-1">{I.eyeOff}</span>
        </div>
      </div>
      <div className="mt-5 flex flex-wrap items-start gap-x-12 gap-y-3">
        <div className="w-[42%] min-w-[320px]">
          <div className="text-[9px] text-muted-foreground">30D Period P&L</div>
          <div className="font-mono text-[26px] font-semibold tracking-tight text-gain">+$323.1K</div>
          <div className="text-[8.5px] text-gain">▴ <span className="text-muted-foreground"><span className="text-gain">+8.78%</span> return on equity · 30D</span></div>
        </div>
        <div>
          <div className="text-[9px] text-muted-foreground">Events · 30D</div>
          <div className="text-[22px] font-medium">428</div>
          <div className="flex gap-2 text-[8.5px] text-muted-foreground">
            <span><span className="text-brand">●</span> 62 opens</span><span><span className="text-brand">●</span> 218 adds</span>
            <span className="ml-2">148 reduces</span><span><span className="text-gain">●</span> 21 wins</span><span><span className="text-loss">●</span> 18 losses</span>
          </div>
        </div>
      </div>
      <div className="mt-2"><PnlChart /></div>
      <div className="mt-12">
        <BottomTabs />
      </div>
    </main>
  );
}

/* ---------- right sidebar ---------- */
const favoriteWallets = [
  { label: "HYPE flow", address: "0x7a26b4d2e9f041c78b93a1e650d72f8c2a64e913", value: "$186.4K", pnl: "+$4.82K", activity: "4m" },
  { address: "0x3f8a2d6c7410e9b5a22d3f6c8e1b47a0f5d9c31a", value: "$92.8K", pnl: "+$2.16K", activity: "18m" },
  { label: "BTC swing", address: "0x91c3a84d28b71f203e9d496ab3c6104d8fe2a57c", value: "$48.1K", pnl: "−$640", activity: "42m" },
  { address: "0xa91d20c34e6b0f8a12d73e904c1b5a6d7e8f9012", value: "$73.6K", pnl: "+$1.08K", activity: "1h" },
  { label: "ARB watch", address: "0x6bc1a4f70e2d9c835b671a4f82c0d931e48b7f20", value: "$16.2K", pnl: "+$312", activity: "3h" },
];
function RightSidebar() {
  return (
    <aside className="border-l border-line-soft">
      <div className="border-b border-line-soft px-[14px] py-[16px]">
        <div className="text-[12.5px] font-semibold">Telegram alerts</div>
        <p className="mt-2 text-[9px] leading-[1.75] text-muted-foreground">Get pinged on every position open, close, and liquidation from your favourites — straight to Telegram.</p>
        <button className="clk mt-3 flex h-[29px] w-full hover:opacity-90 items-center justify-center gap-2 rounded-full bg-light text-[10px] font-medium text-light-foreground">{I.send}Connect Telegram</button>
      </div>
      <div className="px-[14px] py-[18px]">
        <div className="flex items-center justify-between"><span className="text-[12px] font-semibold">Favourites</span><span className="clk rounded-full border border-line bg-chip px-2.5 py-1 text-[9.5px] hover:bg-chip-strong">+ Add</span></div>
        <div className="mt-3 text-[9px] text-muted-foreground"><b className="text-foreground">5</b> wallets tracked</div>
        <div className="mt-3 flex h-[24px] items-center gap-2 rounded-md border border-line bg-chip px-2.5 text-[9.5px] text-muted-foreground">{I.search}Search wallet...</div>
        <div className="mt-3 flex items-center gap-3 text-[8.5px] text-muted-foreground">
          SORT
          <div className="flex flex-1 rounded-full border border-line bg-chip p-[2px]">
            <span className="flex-1 rounded-full bg-chip-strong py-[3px] text-center text-foreground">Recent ↓</span>
            <span className="flex-1 py-[3px] text-center">PnL</span><span className="flex-1 py-[3px] text-center">Value</span>
          </div>
        </div>
      </div>
      <div className="border-t border-line-soft px-[14px]">
        {favoriteWallets.map((wallet) => (
          <div key={wallet.address} className="flex items-center gap-2.5 border-b border-line-soft py-2.5">
            <span aria-hidden="true" className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-line bg-chip text-[9px] font-semibold text-muted-foreground">{wallet.label?.slice(0, 1).toUpperCase() ?? "0x"}</span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-1">
                <span className="truncate text-[9px] font-semibold">{wallet.label ?? shortAddress(wallet.address)}</span>
                <span className={`whitespace-nowrap text-[8.5px] ${wallet.pnl.startsWith("+") ? "text-gain" : "text-loss"}`}>{wallet.pnl}</span>
              </div>
              <div className="mt-1 flex justify-between gap-1 text-[8px] text-muted-foreground">
                <span className="truncate">{wallet.label ? shortAddress(wallet.address) : wallet.value}</span>
                <span className="whitespace-nowrap">{wallet.activity}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}

export function WalletDashboard() {
  return (
    <div className="wallet-dashboard min-h-screen min-w-[1440px] bg-background">
      <TopNav />
      <Ticker />
      <div className="grid grid-cols-[230px_minmax(0,1fr)_236px]">
        <LeftSidebar /><Main /><RightSidebar />
      </div>
    </div>
  );
}
