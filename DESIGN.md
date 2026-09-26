---
name: Tactical Obsidian & Crimson Red
description: High-precision engineering and backend developer portfolio system for AndrewsB
colors:
  canvas: "#090d16"
  canvas-subtle: "#0e1424"
  surface: "#12192b"
  surface-hover: "#172138"
  primary: "#e11d48"
  primary-hover: "#f43f5e"
  secondary: "#06b6d4"
  secondary-hover: "#38bdf8"
  status-success: "#10b981"
  text-primary: "#ffffff"
  text-secondary: "#cbd5e1"
  text-muted: "#94a3b8"
  border-subtle: "rgba(255, 255, 255, 0.08)"
typography:
  display:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 5vw, 3.75rem)"
    fontWeight: 800
    lineHeight: 1.08
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "2rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.015em"
  title:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 700
    lineHeight: 1.4
  body:
    fontFamily: "DM Sans, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "0.8125rem"
    fontWeight: 500
    letterSpacing: "0.02em"
rounded:
  sm: "8px"
  md: "12px"
  lg: "16px"
  full: "9999px"
spacing:
  xs: "6px"
  sm: "10px"
  md: "16px"
  lg: "24px"
  xl: "32px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "#ffffff"
    rounded: "{rounded.md}"
    padding: "14px 28px"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
---

# Design System: Tactical Obsidian & Crimson Red

## Overview

**Creative North Star: "The Crimson Monolith"**

A crisp, high-contrast visual language engineered for software and backend developers. Built upon a deep obsidian backdrop with a subtle tactical grid texture, energetic Crimson Red (`#E11D48`) compute accents, and Glacier Cyan (`#06B6D4`) data indicators.

**Key Characteristics:**
- Deep obsidian canvas with a subtle 56px tactical coordinate grid overlay and midnight slate frosted cards.
- Punchy typography: `Bricolage Grotesque` for technical headlines and `DM Sans` for body legibility.
- Zero decorative gradient text; contrast is achieved through deliberate font weights and solid tonal accents.
- Purposeful GSAP micro-animations: reactive cursor spotlight tracking, dynamic metric counters, and magnetic interactive buttons.

## Colors

A focused, high-contrast palette built for clear technical wayfinding and low cognitive load.

### Primary
- **Crimson Red / Carmesí** (`#E11D48`): Primary CTA buttons, key highlight words in titles, active navigation/filter indicators, and badge highlights.

### Secondary
- **Glacier Cyan** (`#06B6D4`): Data metrics, secondary technical category icons, and demo links.

### Tertiary
- **Terminal Emerald** (`#10B981`): Status pills, system uptime indicators, and successful test logs.

### Neutral
- **Obsidian Canvas** (`#090D16`): The root background canvas with tactical grid.
- **Midnight Surface** (`#12192B`): Frosted container cards and panels with 1px border `rgba(255, 255, 255, 0.08)`.
- **Text White** (`#FFFFFF`): Primary headings and card titles.
- **Text Muted** (`#94A3B8`): Supporting body copy and metadata.

### Named Rules
**The Solid Emphasis Rule.** Never use text gradients on headings or numbers. Emphasis is conveyed exclusively via typographic scale, weight, and solid Crimson / Glacier Cyan accents.

## Typography

**Display Font:** `Bricolage Grotesque` (fallback: `system-ui, sans-serif`)
**Body Font:** `DM Sans` (fallback: `system-ui, sans-serif`)
**Label/Mono Font:** `JetBrains Mono` (fallback: `monospace`)

### Hierarchy
- **Display** (800, `clamp(2.25rem, 5vw, 3.75rem)`, `1.08`): Hero title and primary section statements.
- **Headline** (700, `2rem`, `1.2`): Section titles (`h2`).
- **Title** (700, `1.125rem`, `1.4`): Card and category titles (`h3`).
- **Body** (400, `1rem`, `1.6`): Bio narrative, project descriptions, and general copy.
- **Label** (500, `0.8125rem`, `normal`): Tech stack chips, terminal commands, and timestamps.

## Layout

- Max container width: `72rem` (`1152px`, `max-w-6xl`) with responsive horizontal padding (`px-4 sm:px-6`).
- Section vertical rhythm: `py-24 sm:py-32` with a `scroll-margin-top: 80px`.
- Grid systems: 2-column Bento Grid on desktop, 3-column responsive Project Cards, and 2-column Tech Stack categories.

## Elevation & Depth

Surfaces rely on tonal layering and interactive spotlight illumination rather than heavy static drop shadows.

### Shadow Vocabulary
- **Surface Elevation** (`0 8px 32px 0 rgba(0, 0, 0, 0.36)`): Standard card resting shadow with 1px top highlight `inset 0 1px 0 0 rgba(255, 255, 255, 0.05)`.
- **Interactive Hover** (`0 20px 50px -10px rgba(0, 0, 0, 0.8), 0 0 30px rgba(225, 29, 72, 0.16)`): Dynamic elevation on hovered project and bento cards.

## Shapes

- **Base Radius**: `12px` (`rounded-xl`) for interactive controls and badges; `16px` (`rounded-2xl`) for major container cards and the floating navbar.
- **Pill Radius**: `9999px` (`rounded-full`) for status indicators and filter buttons.

## Components

### Buttons
- **Primary Button**: Solid Crimson (`#E11D48`), bold white text (`#FFFFFF`), `12px` radius, hover scale `1.03` with GSAP magnetic pull.
- **Secondary Button**: Midnight slate glass (`rgba(18, 25, 43, 0.8)`), slate-200 text, 1px slate-700 border.

### Interactive Cards
- **Spotlight Card**: Frosted glass card that renders an inline radial spotlight gradient tracking the cursor coordinates (`--mouse-x`, `--mouse-y`).

### Interactive Terminal
- **Telemetry Terminal**: Dark obsidian container (`#080C16`) with status dots, typing simulation, and interactive test re-run button.

## Do's and Don'ts

### Do:
- **Do** maintain high contrast between text and backgrounds (minimum 4.5:1 for body copy).
- **Do** use `JetBrains Mono` for code, terminal output, and technical labels.
- **Do** ensure all interactive hover states provide immediate tactile feedback within 150ms.

### Don't:
- **Don't** use multi-color gradient text masks on headings.
- **Don't** introduce generic purple/violet lighting cones.
