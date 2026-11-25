import {
  ArrowDown,
  ArrowUp,
  BarChart3,
  ChevronDown,
  ChevronRight,
  Copy,
  ExternalLink,
  EyeOff,
  Menu,
  Plus,
  RefreshCw,
  Search,
  Send,
  Star,
  X,
} from "lucide-react";
import { WalletChart } from "@/components/wallet-chart";

const address = "0x64b766b07362405a9cc19c2226490f3015929da9";

const tickerItems = [
  { token: "HYPE", kind: "Increased", address: "0x3a81...9ab1", amount: "$166.7K", age: "56s", color: "mint" },
  { token: "HYPE", kind: "Increased", address: "0x3a81...9ab1", amount: "$166.7K", age: "58s", color: "mint" },
  { token: "BTC", kind: "Long", address: "0x5080...9247", amount: "$529.9K", age: "1m", color: "orange" },
  { token: "BTC", kind: "Closed", address: "0x5080...9247", amount: "−$106.6K", age: "1m", color: "orange", loss: true },
  { token: "BTC", kind: "Long", address: "0x5080...9247", amount: "$529.9K", age: "1m", color: "orange" },
  { token: "BTC", kind: "Closed", address: "0x5080...9247", amount: "−$106.6K", age: "1m", color: "orange", loss: true },
  { token: "BTC", kind: "Increased", address: "0x3947...f3b1", amount: "$51.6K", age: "3m", color: "orange" },
  { token: "BTC", kind: "Increased", address: "0x3947...f3b1", amount: "$51.6K", age: "3m", color: "orange" },
];

const positions = [
  { asset: "OG", symbol: "●", color: "blue", held: "Held 60d", side: "Long", notional: "$91.4K", margin: "$30.5K", entry: "$0.232170", mark: "$0.096900", change: "▼ 58.26%", liq: "—", lev: "3x", pnl: "−$127.6K", pnlPercent: "−419.07%" },
  { asset: "AAVE", symbol: "A", color: "teal", held: "Held 1d", side: "Short", notional: "$514.7K", margin: "$51.4K", entry: "$93.2518", mark: "$95.8330", change: "▲ 2.77%", liq: "$4,925.31", lev: "10x", pnl: "−$13.9K", pnlPercent: "−26.96%" },
  { asset: "ADA", symbol: "◉", color: "slate", held: "Held 9d", side: "Short", notional: "$1.06M", margin: "$105.8K", entry: "$0.142569", mark: "$0.147200", change: "▲ 3.25%", liq: "$3.7471", lev: "10x", pnl: "−$33.3K", pnlPercent: "−31.51%" },
  { asset: "ARB", symbol: "◈", color: "violet", held: "Held 5h", side: "Short", notional: "$476.2K", margin: "$47.6K", entry: "$0.106030", mark: "$0.112180", change: "▲ 5.80%", liq: "$6.0402", lev: "10x", pnl: "−$26.1K", pnlPercent: "−54.87%" },
  { asset: "BERA", symbol: "●", color: "blue", held: "Held 67d", side: "Long", notional: "$3.2K", margin: "$630.23", entry: "$0.221340", mark: "$0.081050", change: "▼ 63.38%", liq: "—", lev: "5x", pnl: "−$5.5K", pnlPercent: "−866.74%" },
  { asset: "BIO", symbol: "◉", color: "blue", held: "Held 2d", side: "Long", notional: "$223.6K", margin: "$74.5K", entry: "$0.027133", mark: "$0.015162", change: "▼ 44.12%", liq: "—", lev: "3x", pnl: "−$176.5K", pnlPercent: "−237.03%" },
];

function BrandMark() {
  return <span className="brand-mark" aria-hidden="true"><i /><i /><i /></span>;
}

function Header() {
  return (
    <>
      <header className="topbar">
        <div className="brand"><BrandMark /><span>Hyperstats</span></div>
        <nav className="main-nav" aria-label="Main navigation">
          <a href="#main">Main</a><a href="#traders">Top Traders</a><a href="#activity">Activity</a>
          <a className="nav-active" href="#favourites">Favourites</a><a href="#analytics">Analytics</a>
          <a href="#terminal">Terminal</a><a href="#guides">Guides</a><a href="#docs">Docs</a>
        </nav>
        <div className="header-actions">
          <label className="global-search"><Search size={13} /><span>Search wallets, tokens, ranks...</span><kbd>/</kbd></label>
          <button className="round-button close-button" aria-label="Close"><X size={14} /></button>
          <button className="small-action"><Send size={12} /><span>Bots</span></button>
          <button className="telegram-copy"><Send size={12} /><span>Copy on Telegram</span><span>→</span></button>
          <button className="mobile-menu" aria-label="Open menu"><Menu size={18} /></button>
        </div>
      </header>
      <div className="ticker-strip" aria-label="Recent trades">
        <div className="ticker-track">
          {tickerItems.map((item, index) => <div className="ticker-item" key={`${item.token}-${index}`}>
            <span className={`ticker-coin ${item.color}`}>{item.token === "BTC" ? "₿" : "〽"}</span>
            <strong>{item.token}</strong><span className={`ticker-kind ${item.kind.toLowerCase()}`}>{item.kind}</span>
            <span className="ticker-address">{item.address}</span><strong className={item.loss ? "loss" : ""}>{item.amount}</strong><span className="ticker-age">{item.age}</span>
          </div>)}
        </div>
      </div>
    </>
  );
}

function StatLine({ label, value, positive, negative }: { label: string; value: string; positive?: boolean; negative?: boolean }) {
  return <div className="stat-line"><span>{label}</span><strong className={positive ? "positive" : negative ? "negative" : ""}>{value}</strong></div>;
}

function WalletStats() {
  return <aside className="left-sidebar" aria-label="Wallet statistics">
    <div className="sidebar-heading"><h2>Wallet Stats</h2><p>Live performance for the selected wallet</p></div>
    <section className="side-section account-structure">
      <div className="section-title"><strong>Account structure</strong><strong>$134.76M</strong></div>
      <div className="allocation-bar"><span /></div>
      <div className="allocation-legend"><span><i className="legend-dot spot" /> Spot <b>25%</b></span><span><i className="legend-dot position" /> Position <b>75%</b></span></div>
      <StatLine label="Spot Value" value="$33.77M" /><StatLine label="Position Value" value="$100.98M" /><StatLine label="Positions P&L" value="−$9.86M" negative />
    </section>
    <section className="side-section consistency-section">
      <div className="section-title"><strong>Consistency</strong><strong className="positive">46%</strong></div>
      <div className="section-subline"><span>12 of 26 profitable days</span><span>hit rate</span></div>
      <div className="consistency-bar"><i /><i /></div>
    </section>
    <section className="side-section trade-tempo">
      <h3>Trade tempo</h3>
      <div className="mini-stat-grid"><div><span>Avg Daily P&L</span><strong className="negative">−$41.5K</strong></div><div><span>Avg Position</span><strong>$544.2K</strong></div></div>
      <div className="streak-card"><span>Streaks</span><strong>35W / 76L</strong></div>
    </section>
    <section className="side-section day-section">
      <h3>Best &amp; worst day</h3>
      <div className="day-row best"><span>Best <small>Nov 15</small></span><strong className="positive">+$664.7K</strong></div>
      <div className="day-row worst"><span>Worst <small>Nov 10</small></span><strong className="negative">−$1.07M</strong></div>
    </section>
    <section className="side-section largest-section">
      <h3>Largest trades</h3>
      <div className="day-row best"><span>Largest Win <small>PONS</small></span><strong className="positive">+$522.1K</strong></div>
      <div className="day-row worst"><span>Largest Loss <small>WLD</small></span><strong className="negative">−$404.8K</strong></div>
    </section>
    <section className="side-section execution-section">
      <h3>Execution</h3><StatLine label="Execution Pace" value="16.5 / day" /><StatLine label="Active Exit Days · 30D" value="26 days" />
    </section>
    <section className="side-section funds-section">
      <h3>Funds</h3><StatLine label="Net Deposit" value="+$0.00" /><StatLine label="Transactions" value="3,046" />
    </section>
    <section className="side-section risk-section">
      <h3>Risk-adjusted</h3><div className="mini-stat-grid"><div><span>Sortino</span><strong>8.78</strong></div><div><span>Profit Factor</span><strong>0.77</strong></div></div>
    </section>
  </aside>;
}

function WalletHeader() {
  return <div className="wallet-header">
    <div className="wallet-title-row"><div><h1>Hyperliquid Wallet</h1><div className="wallet-address">{address}</div></div>
      <div className="wallet-tools"><button className="icon-button" aria-label="Refresh wallet"><RefreshCw size={13} /></button><button className="outline-button hide-favourites">Hide favourites <ChevronRight size={12} /></button></div>
    </div>
    <div className="wallet-action-row"><button className="outline-button"><Copy size={11} />Copy</button><button className="outline-button"><ExternalLink size={11} />Open</button><button className="outline-button"><Star size={11} />Save</button></div>
    <div className="rank-row"><span className="grade-badge">Grade C</span><span>Rank <strong>#9,490</strong></span><span className="updated"><i />Updated <strong>just now</strong></span></div>
    <div className="metric-chips">
      <span>Account <strong>$134.76M</strong></span><span>30D Realized <strong className="negative">−$1.08M</strong></span>
      <span>Win Rate <strong>44.9%</strong></span><span>Sharpe <strong className="positive">4.57</strong></span><span>Bias <strong className="positive">Long 71%</strong></span>
    </div>
  </div>;
}

function ChartControls() {
  return <div className="chart-controls">
    <div className="segmented-control pnl-tabs"><button className="selected">Period PnL</button><button>Total PnL</button><button>Realized PnL</button></div>
    <div className="segmented-control time-tabs"><button>15m</button><button>1H</button><button className="selected">24H</button><button>7D</button><button>30D</button><button>3M</button><button>1Y</button></div>
    <div className="chart-tools"><button className="round-button active-star" aria-label="Favourite"><Star size={13} fill="currentColor" /></button><button aria-label="More options">•••</button><button aria-label="Hide chart"><EyeOff size={13} /></button></div>
  </div>;
}

function PerformanceOverview() {
  return <div className="performance-overview">
    <div className="pnl-stat"><span>Period P&amp;L</span><strong className="positive">+$186.7K</strong><small><ArrowUp size={9} /> 0.1% vs prev 24H</small></div>
    <div className="event-stat"><span>Events</span><strong>3068</strong><small><i className="event-dot teal-dot" />65 opens <i className="event-dot blue-dot" />1839 adds <i className="event-dot pink-dot" />1149 reduces <i className="event-dot mint-dot" />5 wins <i className="event-dot gray-dot" />10 losses</small></div>
  </div>;
}

function PositionsTable() {
  return <section className="positions-section">
    <div className="position-tabs"><button className="selected">Positions <b>48</b></button><button>Spot <b>2</b></button><button>Orders <b>0</b></button><button>History</button><button>Entries</button></div>
    <div className="position-summary"><span>Total Value <strong>$100.98M</strong></span><span>Total Margin <strong>$8.16M</strong></span><span>Open P&amp;L <strong className="negative">−$9.86M</strong></span></div>
    <div className="table-scroll"><table className="positions-table">
      <thead><tr><th>Asset <ChevronDown size={8} /></th><th>Side</th><th>Notional <ChevronDown size={8} /></th><th>Margin <ChevronDown size={8} /></th><th>Entry <ChevronDown size={8} /></th><th>Mark <ChevronDown size={8} /></th><th>Liq. <ChevronDown size={8} /></th><th>Lev. <ChevronDown size={8} /></th><th>P&amp;L <ArrowDown size={9} /></th><th /></tr></thead>
      <tbody>{positions.map((position) => <tr key={position.asset}>
        <td><div className="asset-cell"><span className={`asset-icon ${position.color}`}>{position.symbol}</span><span><strong>{position.asset}</strong><small>{position.held}</small></span></div></td>
        <td><span className={`side-pill ${position.side.toLowerCase()}`}>{position.side === "Long" ? <ArrowUp size={9} /> : <ArrowDown size={9} />}{position.side}</span></td>
        <td>{position.notional}</td><td className="strong-cell">{position.margin}</td><td>{position.entry}</td>
        <td><strong className="negative">{position.mark}</strong><small className="table-change negative">{position.change}</small></td><td>{position.liq}</td><td className="leverage">{position.lev}</td>
        <td className="pnl-cell"><strong className="negative">{position.pnl}</strong><small className="negative">{position.pnlPercent}</small></td><td><ChevronRight size={11} /></td>
      </tr>)}</tbody>
    </table></div>
  </section>;
}

function MainWalletPanel() {
  return <main className="main-panel" id="main">
    <WalletHeader />
    <ChartControls />
    <PerformanceOverview />
    <WalletChart />
    <PositionsTable />
  </main>;
}

function RightSidebar() {
  return <aside className="right-sidebar" aria-label="Telegram alerts and favourites">
    <section className="telegram-panel"><h2>Telegram alerts</h2><p>Get pinged on every position open, close, and liquidation from your favourites — straight to Telegram.</p><button className="connect-telegram"><Send size={12} fill="currentColor" />Connect Telegram</button></section>
    <section className="favourites-panel" id="favourites"><div className="favourites-title"><h2>Favourites</h2><button className="add-button"><Plus size={11} />Add</button></div>
      <p className="tracked-count">0 wallets tracked</p>
      <label className="favourite-search"><Search size={12} /><span>Search wallet...</span></label>
      <div className="sort-row"><span>SORT</span><div className="sort-options"><button className="selected">Recent <ArrowDown size={9} /></button><button>PnL</button><button>Value</button></div></div>
      <div className="empty-favourites"><strong>No favourites yet</strong><p>Add wallets from the leaderboard or here to start tracking.</p></div>
    </section>
  </aside>;
}

export function WalletDashboard() {
  return <div className="wallet-app"><Header /><div className="dashboard-grid"><WalletStats /><MainWalletPanel /><RightSidebar /></div></div>;
}
