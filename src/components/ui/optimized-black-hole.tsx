"use client";

import BlackHoleHeroSection from "./blackhole-hero-section";

/**
 * Compatibility wrapper for the portfolio hero.
 * The landing page already imports this component, so swapping the renderer
 * here lets the new cinematic WebGL black hole drop into the existing layout
 * without changing the rest of the page.
 */
export function Example() {
  return (
    <BlackHoleHeroSection
      distance={24}
      elevation={-5.5}
      azimuth={0}
      orbitSpeed={0}
      roll={-20}
      fov={42}
      diskInner={3}
      diskOuter={15}
      diskThickness={0.26}
      diskDensity={1}
      brightness={1.35}
      spinSpeed={0.06}
      grain={0.48}
      doppler={0.35}
      starBrightness={0.35}
      glow={1.2}
      exposure={1}
      vignette={0.18}
      steps={300}
      resolution={0.78}
      maxDpr={1.75}
      focus={[0.72, 0.46]}
      scrim="left"
      scrimStrength={0.72}
    />
  );
}

export default Example;
