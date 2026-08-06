"use client";

import { useRef, useState } from "react";
import { Icon } from "@/components/icons/Icon";
import { LANGUAGES } from "@/constants/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { useClickOutside } from "@/hooks/useClickOutside";
import { cn } from "@/utils/cn";

export function LanguageDropdown() {
  const { language, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useClickOutside(containerRef, () => setOpen(false), open);

  const current = LANGUAGES.find((l) => l.code === language) ?? LANGUAGES[0];

  return (
    <div ref={containerRef} className="relative shrink-0">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex items-center gap-1.5 h-full text-[15px] font-semibold text-text-primary"
      >
        <Icon name="globe" className="w-4 h-4" />
        <span>{current.short}</span>
        <Icon
          name="chevron-down"
          className={cn("w-3.5 h-3.5 transition-transform duration-200", open && "rotate-180")}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 top-full mt-2 w-full min-w-[140px] rounded-md border border-border-divider bg-white shadow-lg py-1 z-30"
        >
          {LANGUAGES.map((lang) => (
            <li key={lang.code}>
              <button
                type="button"
                role="option"
                aria-selected={lang.code === language}
                onClick={() => {
                  setLanguage(lang.code);
                  setOpen(false);
                }}
                className={cn(
                  "w-full text-left px-3 py-2 text-[14px] hover:bg-surface-hover transition-colors",
                  lang.code === language && "font-semibold text-accent"
                )}
              >
                {lang.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
