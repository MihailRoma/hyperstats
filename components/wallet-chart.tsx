const chartPath = `M 48 112 L 70 116 L 88 110 L 106 120 L 124 112 L 142 125 L 160 118 L 178 121 L 196 111 L 214 119 L 232 116 L 250 124 L 268 114 L 286 118 L 304 109 L 322 111 L 340 105 L 358 110 L 376 101 L 394 98 L 412 102 L 430 95 L 448 100 L 466 94 L 484 102 L 502 115 L 520 121 L 538 117 L 556 124 L 574 120 L 592 128 L 610 126 L 628 139 L 646 133 L 664 145 L 682 140 L 700 152 L 718 149 L 736 160 L 754 156 L 772 165 L 790 152 L 808 158 L 826 146 L 844 150 L 862 143 L 880 150 L 898 146 L 916 158 L 934 152 L 952 164 L 970 153 L 988 159 L 1006 147 L 1024 153 L 1042 145 L 1060 151 L 1078 158 L 1096 150 L 1114 164 L 1132 157 L 1150 168 L 1168 158 L 1186 169 L 1204 163 L 1222 177 L 1240 169 L 1258 182 L 1276 174 L 1294 184 L 1312 173 L 1330 190 L 1348 178 L 1366 204 L 1384 214 L 1402 186 L 1420 226 L 1438 248 L 1456 199 L 1474 220 L 1492 190 L 1510 175 L 1528 164 L 1546 156 L 1564 128 L 1582 106 L 1600 95 L 1618 84 L 1636 93 L 1654 75 L 1672 88 L 1690 67 L 1708 78 L 1726 57 L 1744 71 L 1762 61 L 1780 49 L 1798 55 L 1816 37 L 1834 33`;

const eventMarkers = [
  { x: 140, label: "42" },
  { x: 183, label: "" },
  { x: 472, label: "12" },
  { x: 560, label: "4" },
  { x: 1336, label: "20" },
  { x: 1355, label: "9" },
  { x: 1575, label: "3" },
  { x: 1603, label: "14" },
  { x: 1625, label: "5" },
];

export function WalletChart() {
  return (
    <div className="chart-wrap" aria-label="Wallet profit and loss over the last 24 hours">
      <div className="chart-zoom">Zoomed <strong>35%</strong><span className="zoom-reset">↻</span></div>
      <svg className="performance-chart" viewBox="0 0 1900 300" preserveAspectRatio="none" role="img" aria-label="Performance chart, beginning near zero, dropping below three million dollars, then recovering to nearly two million dollars">
        <defs>
          <linearGradient id="area-green" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#26d8c0" stopOpacity=".22" />
            <stop offset="100%" stopColor="#26d8c0" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="area-red" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fb4772" stopOpacity="0" />
            <stop offset="100%" stopColor="#fb4772" stopOpacity=".2" />
          </linearGradient>
          <linearGradient id="line-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#35d7c2" />
            <stop offset="35%" stopColor="#42d4c0" />
            <stop offset="36%" stopColor="#fa4b75" />
            <stop offset="100%" stopColor="#fa4b75" />
          </linearGradient>
          <clipPath id="positive-area"><rect x="0" y="0" width="1900" height="112" /></clipPath>
          <clipPath id="negative-area"><rect x="0" y="112" width="1900" height="188" /></clipPath>
        </defs>
        <g className="chart-grid">
          {[28, 70, 112, 154, 196, 238].map((y) => <line key={y} x1="48" x2="1870" y1={y} y2={y} />)}
          <line className="zero-line" x1="48" x2="1870" y1="112" y2="112" />
        </g>
        <g className="chart-y-labels">
          <text x="0" y="32">$2M</text><text x="0" y="74">$1M</text><text x="0" y="116">$0</text>
          <text x="0" y="158">−$1M</text><text x="0" y="200">−$2M</text><text x="0" y="242">−$3M</text>
        </g>
        <path d={`${chartPath} L 1834 112 L 48 112 Z`} fill="url(#area-green)" clipPath="url(#positive-area)" />
        <path d={`${chartPath} L 1834 112 L 48 112 Z`} fill="url(#area-red)" clipPath="url(#negative-area)" />
        <g className="event-lines">
          {eventMarkers.map((marker, index) => (
            <g key={`${marker.x}-${index}`}>
              <line x1={marker.x} x2={marker.x} y1="24" y2="238" />
              {marker.label && <rect x={marker.x - 13} y="8" width="26" height="13" rx="6.5" />}
              {marker.label && <text x={marker.x} y="17">{marker.label}</text>}
            </g>
          ))}
        </g>
        <path d={chartPath} className="chart-line" />
        <circle className="end-dot" cx="1834" cy="33" r="3.5" />
        <rect className="chart-current" x="1841" y="26" width="47" height="16" rx="8" />
        <text className="chart-current-label" x="1864" y="37">+$2M</text>
        <g className="chart-x-labels">
          <text x="52" y="275">22:25<tspan x="52" dy="14">Nov 24</tspan></text>
          <text x="385" y="275">02:25<tspan x="385" dy="14">Nov 25</tspan></text>
          <text x="675" y="275">06:25</text><text x="970" y="275">10:25</text>
          <text x="1275" y="275">14:25</text><text x="1550" y="275">18:25</text>
          <text x="1830" y="275">22:25</text>
        </g>
        <circle className="chart-floating-button" cx="70" cy="232" r="16" />
        <path className="chart-floating-icon" d="M65 236v-6m5 6v-12m5 12v-9" />
      </svg>
    </div>
  );
}
