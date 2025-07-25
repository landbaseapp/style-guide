# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Development server**: `npm run dev` (runs on host with vite)
- **Build**: `npm run build` (uses cross-env with increased memory allocation)
- **Lint**: `npm run lint` (ESLint on src/ for ts,tsx files)
- **Fix linting**: `npm run lint:fix`
- **Type checking**: `npm run tslint` (runs `tsc`)

## Architecture Overview

This is a React + TypeScript UI component library/style guide built with:

- **Build Tool**: Vite with React plugin
- **Styling**: Tailwind CSS v4 with custom design tokens
- **Component Library**: Radix UI primitives as foundation
- **Icons**: Phosphor Icons
- **Testing**: Vitest with Testing Library
- **Documentation**: Storybook for component showcases

Please use existing components that is in `components/ui`, do not make your own components.

### Project Structure

- `src/components/ui/` - All reusable UI components organized by component type
- `src/utils/` - Utility functions (mainly Tailwind utilities)
- `src/App.tsx` - Demo application showcasing all components
- Each component has its own folder with:
  - Main component file (e.g., `Button.tsx`)
  - Index file for exports
  - Sub-components and variants as needed

### Component Architecture

Components follow a consistent pattern:
- Built on Radix UI primitives where applicable
- Use `class-variance-authority` (cva) for variant management
- Custom design system with semantic color tokens
- Components export both individual parts and compound components
- All components use forwardRef for proper ref handling
- Always use phosphor icons for icons, do not make your own icons

### Alias Configuration

The project uses path aliases:
- `src/` maps to `./src` for imports
- Custom alias for react-virtualized


<copy_guidelines>
## Positioning & Tone

### **Positioning**

**Landbase helps sales and marketing teams find their next customer faster, better, and with more clarity.**

We help them act on signals, not guesswork, identifying who to go after, what to say, and where to say it across outbound and inbound.

- **Outbound:** Fit, intent, engagement, and trust signals — not just contact data — help reps focus on high-opportunity accounts and craft sharp, relevant outreach. From who to prioritize, to how to message them, to which channels to use, Landbase accelerates what works.
- **Inbound:** We help teams build content in their voice, based on what their audience engages with — so they can warm leads, drive visibility, and earn trust over time.

From signals to scripts to send, everything is built for execution, clarity, and GTM traction.

**Tone of Voice Summary**

| Focused | Execution-first | Confident, not corporate | Human, not robotic |
| --- | --- | --- | --- |
| Every word earns its place | Say what the user should do | No filler or hedging | Direct, clear, and human-first |
| No bloat, no fluff | No “maybe” or “let’s explore” | No over-selling or jargon | Feels natural, not stiff |

---

## 1. Tone of Voice

**Best Practice**

Use confident, direct, helpful language. Avoid filler, fluff, or uncertainty.

**Do**

- Add to campaign
- Build GTM plan
- Refine message

**Don’t**

- Let’s get started with your journey
- You might want to try…
- Imagine what’s possible when…

---

## 2. Buttons & CTAs

| ✅ Do | ❌ Don’t |
| --- | --- |
| Start draft | Let’s begin |
| Preview post | Customize your settings here |
| Add email | Choose your tone of voice |

**Best Practice**

Use 1–2 word verbs in sentence case. Avoid filler. Minimize pronouns unless needed for clarity.

**Why it matters**

Short buttons = faster reactions and lower brain fatigue.

---

## 3. Copy & Microcopy

| Area | Example |
| --- | --- |
| Headline | Build GTM plan |
| Subhead | Start with AI or use your own outline |
| Tooltip | Add a campaign goal to unlock Vibe insights |

**Best Practice**

- Lead with outcome
- Use sentence case
- Break up long ideas with bullets
- Avoid marketing fluff in functional surfaces

---

## 5. Language Rules

| ✅ Do | ❌ Don’t |
| --- | --- |
| Use sentence case | Use Title Case or ALL CAPS |
| Prefer active voice | Write in passive constructions |
| Be inclusive & specific | Use jargon or vague modifiers |
| Use ✨ sparingly in human copy | Overload UI with emoji or “fun” text |

---

## 6. Anti-Patterns to Avoid

Avoid these in the tool as off-brand or high-friction:

- Overlong buttons or tooltips
- Passive voice ("can be used to...")
- “Imagine if…” or “What if…” copy
- Unclear intensifiers (“easily,” “simply,” “quickly”)
- Random emoji usage
- Excessive personalization ("my" / "your") in system copy

---

## 7. AI-Generated Content Checks

**Check For**

- Filler phrases (e.g., “In today’s fast-paced world…”)
- Generic intros and closings
- Passive voice
- Empty modifiers (“innovative,” “cutting-edge”)

**Fix With**

- Clear, crisp verbs
- Shorter sentences
- Specific suggestions or examples
- Strong CTAs

---

## Final Philosophy

Ccontent should help users **act, not admire**.
It’s not about sounding clever, it’s about removing friction and helping users execute with trust, clarity and confidence.

</copy_guidelines>