import React from "react";

export default function BrandLogo({
  mobile = false,
  iconOnly = false,
  className = "",
  alt = "Coombb",
}) {
  const src = iconOnly ? "/branding/coombb-icon.svg" : "/branding/coombb-logo.svg";
  const heightClass = iconOnly
    ? mobile
      ? "h-8 w-8"
      : "h-10 w-10"
    : mobile
      ? "h-9 w-auto"
      : "h-12 w-auto";

  return (
    <img
      src={src}
      alt={alt}
      className={`${heightClass} object-contain px-1 transition-transform duration-200 hover:scale-[1.03] ${className}`}
      loading="eager"
      decoding="async"
    />
  );
}
