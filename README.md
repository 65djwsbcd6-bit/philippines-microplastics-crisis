# PLASTIC ECO PH | The Crisis & The Solution

Educational platform exploring plastic and microplastic pollution in the Philippines, from systemic crises to circular economy solutions.

Created by Alexies Jean Ballesteros for *People & Earth's Ecosystem*.

## Tech Stack & Architecture

- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS v4 with custom responsive design & coastal/ocean color palettes
- **Architecture**:
  - `src/components/Navigation.tsx`: Single-page view switcher (Gateway, Crisis, Solution) and responsive navigation.
  - `src/components/GatewayView.tsx`: Entrance landing interface with dual interactive pathways ("Expose: The Crisis" and "Restore: The Solution").
  - `src/components/CrisisView.tsx`: Comprehensive empirical research view with 8 interactive modules:
    1. Household Sachet Footprint Calculator
    2. Interactive Geographic Hotspot Map (Manila Bay, Pasig River, Verde Island Passage)
    3. 6-Stage Plastic Environmental Journey Explorer
    4. Delivery Packaging Item Inspector
    5. Daily Timeline Plastic Touchpoint Module
    6. Trophic Marine Food Web Inspector
    7. Macro-to-Microplastic Zoom Scale Slider
    8. Verified Research Statistics Cards with click-to-reveal
    Plus detailed national context, the land-to-sea plastic conveyor belt, and systemic drivers.
  - `src/components/SolutionView.tsx`: Action-oriented circular economy interface with interactive modules:
    1. Regenerated Coastline vs Degraded Shoreline Horizon Comparison
    2. Everyday Swaps Choice Board with 4-Tier Outward Ripple Visualizer (Me, Store, Community, Environment)
    3. 6-Stage Circular Economy System Builder with completion celebrations
    4. Active Interception "Break the Chain" Checkpoint Simulator
    5. Filterable Groundbreaking Philippine Initiatives (EPR Act, Wala Usik, Eco-Pavers, Waste Worker Dignity, Apo Island & Siquijor, Seaweed Bioplastics)
    6. Multi-Stakeholder Shared Responsibility Cards (Individuals, Businesses, Communities, Government)
    7. Personal Impact Simulator & Philippine Ocean Guardian Action Pledge Generator
    8. Horizon Scenario Comparison (Business as Usual, Cleanup Without Prevention, Circular Future)
  - `src/components/ImageWithFallback.tsx`: Resilient fallback handler for documented local and web imagery.
  - `src/components/Icon.tsx`: Clean SVG icons matching the visual language of the original project.

## Development

```bash
npm install
npm run dev
```

Build for production:
```bash
npm run build
```
