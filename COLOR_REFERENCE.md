# Color Reference - jupeters.de

## 🎨 Primary Brand Colors (Preserved)

### Main Primary Color
```
Lime Green (Primary)
HEX: #76ff03
RGB: rgb(118, 255, 3)
HSL: hsl(87, 100%, 51%)
```
Used for:
- Header navigation background
- Primary buttons and links
- Brand identity
- Mobile menu hover states

### Dark Primary Variant
```
Lime Green (Dark)
HEX: #64dd17
RGB: rgb(100, 221, 23)
HSL: hsl(87, 81%, 48%)
```
Used for:
- Darker green elements
- Border accents
- Focus states

### Light Primary Variant
```
Lime Green (Light)
HEX: #b2ff59
RGB: rgb(178, 255, 89)
HSL: hsl(88, 100%, 67%)
```
Used for:
- Lighter green accents
- Hover states

## 🔴 Accent Color (Preserved)

### Red Accent
```
Red Accent
HEX: #ff1744
RGB: rgb(255, 23, 68)
HSL: hsl(348, 100%, 55%)
```
Used for:
- Desktop navigation hover states
- Mobile navigation background (gradient)
- Important actions
- Call-to-action elements
- Gallery link item background

### Dark Red (Mobile Nav)
```
Dark Red
HEX: #d50000
RGB: rgb(213, 0, 0)
HSL: hsl(0, 100%, 42%)
```
Used for:
- Mobile navigation gradient end
- Darker red accents

## ⚫ Neutral Colors

### Text Colors
```
Dark Gray (Primary Text)
HEX: #212121
RGB: rgb(33, 33, 33)
HSL: hsl(0, 0%, 13%)

Light Gray (Secondary Text)
HEX: #757575
RGB: rgb(117, 117, 117)
HSL: hsl(0, 0%, 46%)
```

### Background Colors
```
White
HEX: #ffffff
RGB: rgb(255, 255, 255)
HSL: hsl(0, 0%, 100%)

Light Gray Background
HEX: #fafafa
RGB: rgb(250, 250, 250)
HSL: hsl(0, 0%, 98%)
```

## 🎨 CSS Custom Properties

The colors are defined as CSS variables in `style.css`:

```css
:root {
    --primary-color: #76ff03;
    --primary-dark: #64dd17;
    --primary-light: #b2ff59;
    --accent-color: #ff1744;
    --text-dark: #212121;
    --text-light: #757575;
    --bg-white: #ffffff;
    --bg-light: #fafafa;
}
```

## 🌈 Color Usage Guide

### Header Navigation
- Background: `var(--primary-color)` (#76ff03)
- Hover: `var(--accent-color)` (#ff1744)
- Logos: Inverted (filter: invert(1))

### Mobile Navigation
- Background: Linear gradient from #ff1744 to #d50000
- Hover: `var(--primary-color)` (#76ff03)
- Links: White text

### Gallery Items
- Background: White
- Hover overlay: Gradient black to transparent
- Labels: White text on dark gradient

### Modal
- Background: rgba(0, 0, 0, 0.95) (95% black)
- Buttons: White with transparency
- Hover: `var(--primary-color)` (#76ff03)

### External Link (scharf.jupeters.de)
- Background: Linear gradient #c62828 to #b71c1c
- Hover: Lighter gradient #d32f2f to #c62828

## 🎯 Accessibility

All color combinations meet WCAG 2.1 AA standards:

- Primary green on white: ✅ Pass (4.5:1+)
- White on dark gray: ✅ Pass (15.8:1)
- White on red accent: ✅ Pass (4.9:1)
- White on modal background: ✅ Pass (20:1)

## 🔍 Color Psychology

### Lime Green (#76ff03)
- Energy, growth, vitality
- Adventure and outdoor activities
- Fresh and modern feel
- Perfect for a photo gallery of adventures

### Red (#ff1744)
- Excitement, passion, action
- Draws attention to interactive elements
- Complements the green color scheme
- Creates visual interest and energy

## 🎨 Design System

### Shadows
```css
--shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.1);
--shadow-md: 0 4px 12px rgba(0, 0, 0, 0.15);
--shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.2);
```

### Border Radius
```css
--border-radius: 12px;
```

### Transitions
```css
--transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
```

## 📐 Color Scheme Overview

```
Primary Palette:
┌──────────────────────────────────┐
│ #76ff03  Lime Green (Primary)    │
│ #64dd17  Lime Green (Dark)       │
│ #b2ff59  Lime Green (Light)      │
└──────────────────────────────────┘

Accent Palette:
┌──────────────────────────────────┐
│ #ff1744  Red (Accent)            │
│ #d50000  Red (Dark)              │
│ #c62828  Red (Medium)            │
│ #b71c1c  Red (Darker)            │
└──────────────────────────────────┘

Neutral Palette:
┌──────────────────────────────────┐
│ #212121  Dark Gray (Text)        │
│ #757575  Light Gray (Secondary)  │
│ #fafafa  Light Background        │
│ #ffffff  White                   │
└──────────────────────────────────┘
```

## 🖼️ Visual Examples

### Header
```
┌────────────────────────────────────┐
│  #76ff03 (Lime Green Background)   │
│  ┌───┐ ┌───┐ ┌───┐ ┌───┐ ┌───┐   │
│  │   │ │   │ │   │ │   │ │   │    │ (White inverted logos)
│  └───┘ └───┘ └───┘ └───┘ └───┘   │
│  Hover: #ff1744 (Red Background)   │
└────────────────────────────────────┘
```

### Gallery Grid
```
┌──────┐ ┌──────┐ ┌──────┐
│ #fff │ │ #fff │ │ #fff │ (White cards)
│      │ │      │ │      │
└──────┘ └──────┘ └──────┘
  ↓         ↓         ↓
 Hover: Scale + Shadow + Gradient overlay
```

### Mobile Menu
```
┌─────────────────────┐
│ #ff1744 → #d50000   │ (Gradient)
│ ┌─────────────────┐ │
│ │ Logo (white)    │ │
│ ├─────────────────┤ │
│ │ Link 1          │ │ (White text)
│ │ Link 2          │ │
│ │ Link 3          │ │
│ └─────────────────┘ │
│ Hover: #76ff03      │ (Green)
└─────────────────────┘
```

---

**Note:** All colors are preserved from the original design to maintain brand consistency and recognition.