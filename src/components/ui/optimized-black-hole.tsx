"use client";

/**
 * Cinematic black-hole media layer for the portfolio hero.
 * Uses NASA's published edge-on accretion-disk visualization rather than a
 * WebGL UI component. The black background is intentionally allowed to merge
 * into the surrounding pitch-black hero.
 */
export function Example() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-transparent">
      <img
        src="https://svs.gsfc.nasa.gov/vis/a010000/a013300/a013326/BH_AccretionDisk_Sim_Stationary.gif"
        alt=""
        aria-hidden="true"
        className="black-hole-media absolute left-1/2 top-1/2 h-full w-full max-w-none -translate-x-1/2 -translate-y-1/2 object-cover"
        draggable={false}
      />
    </div>
  );
}

export default Example;
