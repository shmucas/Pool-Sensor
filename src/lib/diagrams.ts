// Diagram markup ported verbatim from docs/build-reference.html (trusted, static).
// Rendered via dangerouslySetInnerHTML in the roadmap view; styling comes from
// globals.css (.sensor-label, .pin-label, .wire-label) and theme CSS vars.

export const WIRING_SVG = `<svg viewBox="0 0 1080 460" width="1080" height="460" role="img" aria-label="Wiring diagram from Raspberry Pi GPIO header to two DS18B20 temp probes, ADS1115, pressure transducer, pH probe, ORP probe and heater current clamp">
            <rect x="20" y="150" width="150" height="180" rx="4" fill="none" stroke="var(--ink)" stroke-width="1.5"/>
            <text x="95" y="140" text-anchor="middle" class="sensor-label">Raspberry Pi 4B</text>
            <text x="95" y="175" text-anchor="middle" class="pin-label">3V3 · 1</text>
            <text x="95" y="200" text-anchor="middle" class="pin-label">GPIO2 SDA · 3</text>
            <text x="95" y="225" text-anchor="middle" class="pin-label">GPIO3 SCL · 5</text>
            <text x="95" y="250" text-anchor="middle" class="pin-label">GPIO4 · 7</text>
            <text x="95" y="275" text-anchor="middle" class="pin-label">GND · 9</text>
            <text x="95" y="300" text-anchor="middle" class="pin-label">5V · 2</text>
            <path d="M170,250 H300" stroke="var(--copper)" stroke-width="2" fill="none"/>
            <text x="235" y="243" text-anchor="middle" class="wire-label" fill="var(--copper)">1-Wire + 4.7kΩ pull-up→3V3</text>
            <rect x="300" y="220" width="150" height="60" rx="4" fill="none" stroke="var(--line)" stroke-width="1.5"/>
            <text x="375" y="245" text-anchor="middle" class="sensor-label">DS18B20</text>
            <text x="375" y="262" text-anchor="middle" class="sensor-sub">temp · pump return line</text>
            <path d="M170,200 H520" stroke="var(--accent)" stroke-width="2" fill="none"/>
            <path d="M170,225 H520" stroke="var(--accent)" stroke-width="2" fill="none"/>
            <text x="345" y="193" text-anchor="middle" class="wire-label" fill="var(--accent)">SDA / SCL — I²C bus</text>
            <rect x="520" y="150" width="150" height="180" rx="4" fill="none" stroke="var(--ink)" stroke-width="1.5"/>
            <text x="595" y="140" text-anchor="middle" class="sensor-label">ADS1115 ADC</text>
            <text x="595" y="175" text-anchor="middle" class="pin-label">I²C in</text>
            <text x="595" y="205" text-anchor="middle" class="pin-label">A0 →</text>
            <text x="595" y="235" text-anchor="middle" class="pin-label">A1 →</text>
            <text x="595" y="265" text-anchor="middle" class="pin-label">A2 →</text>
            <text x="595" y="295" text-anchor="middle" class="pin-label">A3 →</text>
            <path d="M670,205 H800" stroke="var(--amber)" stroke-width="2" fill="none"/>
            <rect x="800" y="180" width="180" height="50" rx="4" fill="none" stroke="var(--line)" stroke-width="1.5"/>
            <text x="890" y="200" text-anchor="middle" class="sensor-label">Pressure transducer</text>
            <text x="890" y="216" text-anchor="middle" class="sensor-sub">0.5–4.5V · filter gauge port</text>
            <path d="M670,235 H800" stroke="var(--amber)" stroke-width="2" fill="none"/>
            <rect x="800" y="250" width="180" height="50" rx="4" fill="none" stroke="var(--line)" stroke-width="1.5"/>
            <text x="890" y="270" text-anchor="middle" class="sensor-label">pH probe</text>
            <text x="890" y="286" text-anchor="middle" class="sensor-sub">Gravity SEN0161-V2 · flow cell</text>
            <path d="M670,265 H800" stroke="var(--amber)" stroke-width="2" fill="none"/>
            <rect x="800" y="320" width="180" height="50" rx="4" fill="none" stroke="var(--line)" stroke-width="1.5"/>
            <text x="890" y="340" text-anchor="middle" class="sensor-label">ORP probe</text>
            <text x="890" y="356" text-anchor="middle" class="sensor-sub">Gravity SEN0165 · flow cell</text>
            <path d="M670,265 V335 H800" stroke="var(--amber)" stroke-width="2" fill="none"/>
            <path d="M375,280 V332" stroke="var(--copper)" stroke-width="2" fill="none"/>
            <text x="455" y="308" text-anchor="middle" class="wire-label" fill="var(--copper)">1-Wire multidrop</text>
            <rect x="300" y="332" width="180" height="56" rx="4" fill="none" stroke="var(--warn)" stroke-width="1.5"/>
            <text x="390" y="356" text-anchor="middle" class="sensor-label">DS18B20 #2</text>
            <text x="390" y="373" text-anchor="middle" class="sensor-sub">temp · heater outlet</text>
            <path d="M670,295 H745 V414 H800" stroke="var(--amber)" stroke-width="2" fill="none"/>
            <rect x="800" y="388" width="180" height="54" rx="4" fill="none" stroke="var(--warn)" stroke-width="1.5"/>
            <text x="890" y="410" text-anchor="middle" class="sensor-label">Heater CT clamp</text>
            <text x="890" y="427" text-anchor="middle" class="sensor-sub">SCT-013 · heater feed · firing state</text>
            <path d="M170,175 H1000" stroke="var(--ink-soft)" stroke-width="1" stroke-dasharray="3 4" fill="none"/>
            <text x="1000" y="168" text-anchor="end" class="wire-label">shared 3V3/5V + GND rail to all boards</text>
          </svg>`;

export const CASE_SVG = `<svg viewBox="0 0 1080 520" width="1080" height="520" role="img" aria-label="Isometric mockup render of the IP65 enclosure interior showing the Raspberry Pi, ADS1115 breakout, terminal block and cable glands">
            <defs>
              <linearGradient id="wallLeftGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stop-color="var(--ink-soft)" stop-opacity=".55"/>
                <stop offset="1" stop-color="var(--ink)" stop-opacity=".85"/>
              </linearGradient>
              <linearGradient id="wallRightGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stop-color="var(--line)" stop-opacity=".9"/>
                <stop offset="1" stop-color="var(--ink-soft)" stop-opacity=".6"/>
              </linearGradient>
              <linearGradient id="floorGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stop-color="var(--panel)"/>
                <stop offset="1" stop-color="var(--accent-soft)"/>
              </linearGradient>
              <linearGradient id="piGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stop-color="var(--accent)" stop-opacity=".9"/>
                <stop offset="1" stop-color="var(--accent)" stop-opacity=".55"/>
              </linearGradient>
              <linearGradient id="adcGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stop-color="var(--copper)" stop-opacity=".9"/>
                <stop offset="1" stop-color="var(--copper)" stop-opacity=".5"/>
              </linearGradient>
              <linearGradient id="termGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stop-color="var(--amber)" stop-opacity=".9"/>
                <stop offset="1" stop-color="var(--amber)" stop-opacity=".5"/>
              </linearGradient>
              <radialGradient id="standoffGrad">
                <stop offset="0" stop-color="var(--ink-soft)" stop-opacity=".9"/>
                <stop offset="1" stop-color="var(--ink-soft)" stop-opacity="0"/>
              </radialGradient>
              <radialGradient id="glandGrad">
                <stop offset="0" stop-color="var(--line)"/>
                <stop offset="1" stop-color="var(--ink-soft)"/>
              </radialGradient>
              <filter id="softShadow" x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur stdDeviation="6"/>
              </filter>
            </defs>
            <ellipse cx="540" cy="410" rx="230" ry="60" fill="var(--ink)" opacity=".18" filter="url(#softShadow)"/>
            <polygon points="540,210 710,305 540,400 370,305" fill="url(#wallRightGrad)" opacity=".35"/>
            <polygon points="370,235 540,330 540,400 370,305" fill="url(#wallLeftGrad)" stroke="var(--ink)" stroke-width="1"/>
            <polygon points="540,330 710,235 710,305 540,400" fill="url(#wallRightGrad)" stroke="var(--ink)" stroke-width="1"/>
            <polygon points="540,140 710,235 540,330 370,235" fill="none" stroke="var(--ink)" stroke-width="1.5"/>
            <polygon points="540,168 682,247 540,326 398,247" fill="url(#floorGrad)" stroke="var(--line)" stroke-width="1"/>
            <circle cx="452" cy="205" r="6" fill="url(#standoffGrad)"/>
            <circle cx="452" cy="278" r="6" fill="url(#standoffGrad)"/>
            <circle cx="628" cy="205" r="6" fill="url(#standoffGrad)"/>
            <circle cx="628" cy="278" r="6" fill="url(#standoffGrad)"/>
            <g>
              <polygon points="430,200 520,248 520,262 430,214" fill="var(--ink)" opacity=".25"/>
              <polygon points="520,248 560,226 560,240 520,262" fill="var(--ink)" opacity=".35"/>
              <polygon points="430,200 520,248 560,226 470,178" fill="url(#piGrad)" stroke="var(--ink)" stroke-width="1"/>
              <text x="495" y="205" text-anchor="middle" class="sensor-label" fill="var(--panel)">Raspberry Pi 4B</text>
              <rect x="452" y="176" width="26" height="10" fill="var(--ink)" opacity=".6" transform="skewX(-28) translate(-70,0)"/>
              <rect x="500" y="240" width="14" height="8" rx="1" fill="var(--ink)" opacity=".7"/>
            </g>
            <g>
              <polygon points="560,190 605,213 605,225 560,202" fill="var(--ink)" opacity=".25"/>
              <polygon points="605,213 630,199 630,211 605,225" fill="var(--ink)" opacity=".35"/>
              <polygon points="560,190 605,213 630,199 585,176" fill="url(#adcGrad)" stroke="var(--ink)" stroke-width="1"/>
              <text x="597" y="196" text-anchor="middle" class="sensor-label" fill="var(--panel)" font-size="10">ADS1115</text>
            </g>
            <g>
              <polygon points="558,248 610,276 610,290 558,262" fill="var(--ink)" opacity=".25"/>
              <polygon points="610,276 645,258 645,270 610,290" fill="var(--ink)" opacity=".35"/>
              <polygon points="558,248 610,276 645,258 593,230" fill="url(#termGrad)" stroke="var(--ink)" stroke-width="1"/>
              <text x="600" y="255" text-anchor="middle" class="sensor-label" fill="var(--panel)" font-size="10">Terminal block</text>
              <line x1="570" y1="243" x2="580" y2="248" stroke="var(--ink)" stroke-width="1" opacity=".6"/>
              <line x1="583" y1="236" x2="593" y2="241" stroke="var(--ink)" stroke-width="1" opacity=".6"/>
              <line x1="596" y1="229" x2="606" y2="234" stroke="var(--ink)" stroke-width="1" opacity=".6"/>
            </g>
            <path d="M540,220 C555,205 550,198 570,196" fill="none" stroke="var(--accent)" stroke-width="2.5" stroke-linecap="round"/>
            <path d="M600,218 C595,232 598,238 590,246" fill="none" stroke="var(--amber)" stroke-width="2.5" stroke-linecap="round"/>
            <path d="M525,230 C610,275 660,270 695,258" fill="none" stroke="var(--copper)" stroke-width="2.5" stroke-linecap="round"/>
            <path d="M615,268 C650,278 675,272 698,266" fill="none" stroke="var(--amber)" stroke-width="2" stroke-linecap="round" opacity=".85"/>
            <path d="M615,272 C650,286 675,284 700,278" fill="none" stroke="var(--amber)" stroke-width="2" stroke-linecap="round" opacity=".85"/>
            <path d="M615,276 C650,294 675,296 700,292" fill="none" stroke="var(--amber)" stroke-width="2" stroke-linecap="round" opacity=".85"/>
            <path d="M470,222 C440,250 415,268 392,282" fill="none" stroke="var(--ink-soft)" stroke-width="2.5" stroke-linecap="round" opacity=".85"/>
            <ellipse cx="700" cy="258" rx="9" ry="6" fill="url(#glandGrad)" stroke="var(--ink)" stroke-width="1"/>
            <text x="722" y="248" class="pin-label">Gland 1 · DS18B20</text>
            <ellipse cx="700" cy="278" rx="9" ry="6" fill="url(#glandGrad)" stroke="var(--ink)" stroke-width="1"/>
            <text x="722" y="282" class="pin-label">Gland 2 · Pressure</text>
            <ellipse cx="700" cy="292" rx="9" ry="6" fill="url(#glandGrad)" stroke="var(--ink)" stroke-width="1"/>
            <text x="722" y="308" class="pin-label">Gland 3 · pH</text>
            <ellipse cx="620" cy="330" rx="9" ry="6" fill="url(#glandGrad)" stroke="var(--ink)" stroke-width="1"/>
            <text x="560" y="352" class="pin-label">Gland 4 · ORP</text>
            <path d="M615,278 C610,305 610,318 618,328" fill="none" stroke="var(--amber)" stroke-width="2" stroke-linecap="round" opacity=".85"/>
            <ellipse cx="392" cy="282" rx="9" ry="6" fill="url(#glandGrad)" stroke="var(--ink)" stroke-width="1"/>
            <text x="310" y="292" text-anchor="end" class="pin-label">Gland 5 · 5V power in</text>
            <path d="M618,285 C655,300 678,306 700,311" fill="none" stroke="var(--warn)" stroke-width="2" stroke-linecap="round" opacity=".9"/>
            <ellipse cx="700" cy="311" rx="9" ry="6" fill="url(#glandGrad)" stroke="var(--warn)" stroke-width="1.3"/>
            <text x="722" y="330" class="pin-label">Gland 6 · Heater run (shielded)</text>
            <rect x="500" y="352" width="60" height="18" rx="3" fill="none" stroke="var(--line)" stroke-width="1.5" transform="skewX(0)"/>
            <text x="530" y="380" text-anchor="middle" class="pin-label">Vent + desiccant</text>
          </svg>`;
