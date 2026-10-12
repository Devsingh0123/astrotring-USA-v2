# Melooha Design System Specification

> Extracted from: [https://www.melooha.com](https://www.melooha.com/)  
> Design Style: **Mystic Modern Dark Glassmorphism**  
> Dominant Theme: Deep Obsidian Plum with Celestial Amber Highlights  

---

## 1. Color Palette & Design Tokens

Melooha utilizes a custom dark-mode token system prefixed with `--mlh-*`, augmented by Tailwind CSS utilities and OKLCH/sRGB alpha channels.

### A. Core Backgrounds & Surfaces
| Token Name | Hex / Value | Computed RGB / OKLCH | Visual Role |
| :--- | :--- | :--- | :--- |
| `--mlh-bg` | `#0f090c` | `rgb(15, 9, 12)` | **Main Canvas Background** (Deep obsidian plum) |
| `--mlh-sidebar` | `#0c070a` | `rgb(12, 7, 10)` | **Sidebar Rail Background** (Darkest void) |
| `--mlh-surface` | `#12131c` | `rgb(18, 19, 28)` | **Card & Container Surface** (Midnight slate) |
| `--mlh-surface-hi` | `#1c1d29` | `rgb(28, 29, 41)` | **Elevated Surface** (Hover states, active cards) |
| `--mlh-border` | `#252637` | `rgb(37, 38, 55)` | **Subtle Structural Borders** |
| `--mlh-border-hi` | `#2e3045` | `rgb(46, 48, 69)` | **Prominent / Active Borders** |

### B. Brand Plum Hierarchy (Primary Signature)
| Token Name | Hex / Value | Usage |
| :--- | :--- | :--- |
| `--mlh-plum-800` | `#4d0e34` | Deep plum shadow & dark undertone |
| `--mlh-plum` | `#811756` | **Primary Brand Color** (Buttons, glows, keyframes) |
| `--mlh-plum-500` | `#9a4578` | Gradient highlight stop for action buttons |
| `--mlh-plum-400` | `#b3749a` | Interactive icons, chevrons, accent highlights |
| `--mlh-plum-300` | `#cda2bb` | Hover link text, secondary CTA labels |
| `--mlh-plum-100` | `#f2e8ee` | Button text on dark plum backgrounds |

### C. Accent & Functional Colors
| Token Name | Hex / Value | Visual Role |
| :--- | :--- | :--- |
| `--mlh-amber` | `#fc9918` | **Vedic Saffron / Solar Fire** (Sun sign, active dashas) |
| `--mlh-orrery` | `#df8107` | Planetary brass / celestial ring accents |
| `--mlh-orrery-hi`| `#feb371` | Highlight celestial brass gold |
| `--mlh-iris` | `#1877fc` | Astropedia knowledge blue accent |
| `--mlh-iris-hi` | `#65a5ff` | Info badges & hyperlinked references |
| `--mlh-iris-ink`| `#090a0e` | Deep indigo dark background |
| `--mlh-success` | `#4ec77e` | Positive planetary yoga / favorable transit |
| `--mlh-danger` | `#e2574a` | Planetary dosha / affliction / malefic alert |

### D. Typography & Text Hierarchy Colors
| Token Name | Hex / Value | Usage |
| :--- | :--- | :--- |
| `--mlh-text-hi` | `#ffffff` | Headers, active tabs, selected states |
| `--mlh-text` | `#e7e6e7` | Standard readable body text |
| `--mlh-muted` | `#9f9d9e` | Descriptions, secondary metadata, explanations |
| `--mlh-faint` | `#6f6b6d` | Inactive tabs, placeholder text, borders |

---

## 2. Typography System

Melooha pairs a classical editorial serif for celestial headings with clean, modern sans-serif and monospace typefaces for technical Vedic data.

### Font Families
```css
/* Display & Primary Headings (Classical, Regal, Astrological) */
font-serif: Bitter, "Bitter Fallback", Georgia, "Times New Roman", serif;

/* Body, Interface & Form Controls (Legible, Contemporary) */
font-sans: Mulish, "Mulish Fallback", system-ui, -apple-system, sans-serif;

/* Micro-Badges, Dasha Tables, Ephemeris Coordinates & Codes */
font-mono: "IBM Plex Mono", "IBM Plex Mono Fallback", ui-monospace, SFMono-Regular, monospace;

/* Zodiac & Astrological Glyph Glyphs */
font-symbol: "Noto Sans Symbols 2", "Segoe UI Symbol", sans-serif;
```

### Font Size Scale
| Size | Tailwind Equivalent | Primary UI Application |
| :--- | :--- | :--- |
| `8.5px` | `text-[8.5px]` | Monospace category pills (`ALL`, `VAANI`, `ASTROPEDIA`) |
| `10px` / `10.5px` | `text-[10.5px]` | Monospace pill buttons (`BUY QUESTIONS`, status chips) |
| `11.5px` / `12px` | `text-xs` | Legal copyright, timestamps, fine print |
| `13px` | `text-[13px]` | Sidebar secondary navigation, login link |
| `14px` / `14.5px` | `text-sm` | Default chat input text, FAQ accordion body |
| `15px` | `text-[15px]` | FAQ question summary text, tab headers |
| `16px` | `text-base` | Lead descriptive copy |
| `17px` / `19px` | `text-lg` | Card titles and prompt card labels |
| `21px` / `22px` | `text-xl` | Modal headings, secondary headers |
| `25px` | `text-[25px]` | Mobile H1 |
| `31px` | `text-[31px]` | Tablet H1 |
| `36px` | `text-[36px]` | Desktop H1 (`What do you want to know?`) |

---

## 3. Border Radii & Shape Tokens

Melooha favors smooth, pebble-like curvature that softens the dark aesthetic:

| Radius Token | Value | Applied Elements |
| :--- | :--- | :--- |
| `rounded-sm` | `4px` | Focus rings, micro badges |
| `rounded-md` | `8px` | Store download badges, standard input boxes |
| `--radius` | `10px` (`.625rem`) | Base component token, navigation rows |
| `rounded-xl` | `12px` / `14px` | Question prompt cards, accordion containers |
| `rounded-2xl`| `22px` | Large feature cards, dialog panels |
| `rounded-full`| `9999px` / `50%` | Send button, avatar circles, filter pills |

---

## 4. Shadows, Elevation & Glassmorphism

Melooha relies heavily on multi-layered ambient neon glows with frosted glass backdrop filters:

### A. Ambient Glass Card (`.mlh-card-glass`)
```css
.mlh-card-glass {
  background: color(srgb 0.0470588 0.027451 0.0392157 / 0.92);
  border: 1px solid var(--mlh-border);
  backdrop-filter: blur(3px);
  box-shadow: 
    0px 22px 60px 0px rgba(0, 0, 0, 0.55),
    0px 0px 48px 0px rgba(129, 23, 86, 0.44),
    inset 0px 1px 0px 0px rgba(255, 255, 255, 0.08);
}
```

### B. Action Send Button Glow (`[aria-label="Send question"]`)
```css
/* Resting state */
background: linear-gradient(160deg, #9a4578, #811756 62%, #6b0f47);
box-shadow: 0px 0px 24px 0px rgba(129, 23, 86, 0.6);
transition: box-shadow 200ms ease, transform 200ms ease;

/* Hover state */
transform: translateY(-2px);
box-shadow: 0px 0px 40px 0px rgba(129, 23, 86, 1);
```

### C. Subtle Glow Accents
* **Plum Glow:** `color(srgb 0.603922 0.270588 0.470588 / 0.26) 0px 0px 18px 0px`
* **Amber Glow:** `color(srgb 0.87451 0.505882 0.027451 / 0.18) 0px 0px 18px 0px`

---

## 5. Spacing, Padding & Layout Tokens

* **Micro Padding (Badges & Tags):**
  * `px-2 py-[4px]` (Monospace filter buttons)
  * `px-3.5 py-[7px]` (`Buy questions` CTA)
* **Standard Interactive Padding (Buttons & Inputs):**
  * `px-3.5 py-[9px]` (Engine selector pills)
  * `px-5 py-4` (FAQ accordions and form inputs)
* **Card Padding:**
  * `p-3.5` to `p-5` with `pb-3.5`
* **Modal Padding:**
  * `p-6` (Mobile) to `p-8` (Desktop)
* **Flexbox/Grid Gaps:**
  * `gap-1.5` (Micro icons with text)
  * `gap-2.5` to `gap-3` (Navigation items, engine rows)
  * `gap-4` to `gap-6` (Form rows, card grids)

---

## 6. Micro-Interactions & Animation Tokens

* **Entrance Transitions:**
  * Custom CSS variable-based reveal animations:
    * `--mlh-in-delay: 240ms`
    * `--mlh-in-scale: 0.985`
    * `--mlh-in-y: 12px`
* **Easing Function:** `cubic-bezier(0.22, 1, 0.36, 1)` (Smooth decelerated ease-out)
* **Transition Durations:**
  * Fast hover states: `200ms`
  * Drawer/sidebar expand: `280ms`
