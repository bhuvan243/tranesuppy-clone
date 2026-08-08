"use client";

import { useRef, useState } from "react";
import { Icon, type IconName } from "@/components/icons/Icon";
import { useClickOutside } from "@/hooks/useClickOutside";
import { cn } from "@/utils/cn";

interface HeaderInfoDropdownProps {
  icon: IconName;
  /** Static leading label, e.g. "Ship to" - rendered in a lighter weight before `value`. */
  label?: string;
  value: string;
  options: string[];
  selected: string;
  onSelect: (value: string) => void;
  className?: string;
}

/** Store selector / ship-to style dropdown: icon - text - chevron, no border. */
export function HeaderInfoDropdown({
  icon,
  label,
  value,
  options,
  selected,
  onSelect,
  className,
}: HeaderInfoDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, () => setOpen(false), open);

  return (
    <div ref={ref} className={cn("relative shrink-0", className)}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex items-center gap-1.5 text-[14px] font-medium text-text-primary max-w-[180px]"
      >
        <Icon name={icon} className="w-4 h-4 shrink-0 text-text-secondary" />
        <span className="text-ellipsis-line">
          {label && <span className="text-text-secondary">{label}&nbsp;</span>}
          <span className="font-semibold">{value}</span>
        </span>
        <Icon
          name="chevron-down"
          className={cn("w-3.5 h-3.5 shrink-0 transition-transform duration-200", open && "rotate-180")}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 top-full mt-2 w-max min-w-[220px] max-w-[280px] rounded-md border border-border-divider bg-white shadow-lg py-1 z-30"
        >
          {options.map((option) => (
            <li key={option}>
              <button
                type="button"
                role="option"
                aria-selected={option === selected}
                onClick={() => {
                  onSelect(option);
                  setOpen(false);
                }}
                className={cn(
                  "w-full text-left px-3 py-2 text-[14px] hover:bg-surface-hover transition-colors text-ellipsis-line block",
                  option === selected && "font-semibold text-accent"
                )}
              >
                {option}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
