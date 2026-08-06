import type { CSSProperties } from "react";
import { cn } from "@/utils/cn";

export type IconName =
  | "search"
  | "camera"
  | "chevron-down"
  | "chevron-right"
  | "chevron-left"
  | "globe"
  | "menu"
  | "close"
  | "user"
  | "pin"
  | "headset"
  | "parts"
  | "home-equipment"
  | "commercial-equipment";

interface IconProps {
  name: IconName;
  /** Always include a width/height utility (e.g. "w-4 h-4 md:w-5 md:h-5"). */
  className?: string;
}

/**
 * All icon artwork lives in /public/icons as fixed 16/20 viewBox SVGs (per
 * the design spec) and is reused everywhere. We render each icon as a
 * CSS mask rather than a plain <img>, so the *same source file* can be
 * recolored per usage (currentColor-style) via ordinary Tailwind text-color
 * utilities - e.g. text-accent on hover turns the chevron red - while the
 * SVG stays a single shared asset on disk. Sizing is left entirely to the
 * className the caller passes (w-4 h-4, md:w-5 md:h-5, etc.) so the same
 * icon can be a different size on desktop vs mobile per the spec.
 */
export function Icon({ name, className }: IconProps) {
  const maskUrl = `url(/icons/${name}.svg)`;
  const style: CSSProperties = {
    WebkitMaskImage: maskUrl,
    maskImage: maskUrl,
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
    WebkitMaskPosition: "center",
    maskPosition: "center",
    WebkitMaskSize: "contain",
    maskSize: "contain",
  };

  return (
    <span
      aria-hidden="true"
      style={style}
      className={cn("inline-block shrink-0 bg-current align-middle", className)}
    />
  );
}
