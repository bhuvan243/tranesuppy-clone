"use client";

import { cn } from "@/utils/cn";
import { Icon } from "@/components/icons/Icon";
import { useRotatingText } from "@/hooks/useRotatingText";
import {
	SEARCH_PLACEHOLDER_INTERVAL_MS,
	SEARCH_PLACEHOLDER_SUFFIXES,
} from "@/constants/navigation";

interface SearchBarProps {
	className?: string;
}

/**
 * Search input container: search icon - input (with an animated
 * "Search by <rotating word>" placeholder) - camera icon, gap-2 (8px)
 * between each. The real <input> keeps a plain, static placeholder for
 * accessibility/SEO; the animated version is an overlay that hides once
 * the user starts typing or focuses the field.
 */
export function SearchBar({ className }: SearchBarProps) {
	const { current, transitioning } = useRotatingText({
		items: SEARCH_PLACEHOLDER_SUFFIXES,
		intervalMs: SEARCH_PLACEHOLDER_INTERVAL_MS,
	});

	return (
		<div
			className={cn(
				"flex items-center h-[42px] w-full max-w-[481px] min-w-[300px] gap-2 rounded-[16px] border border-border-default bg-white pl-3 pr-3.5",
				className,
			)}
		>
			<Icon
				name="search"
				className="w-4 h-4 md:w-5 md:h-5 text-text-secondary"
			/>

			<div className="relative flex-1 min-w-0 h-full overflow-hidden">
				<input
					type="text"
					aria-label="Search by Model/Serial Number"
					placeholder="Search by Model/Serial Number"
					className="peer absolute inset-0 w-full h-full bg-transparent outline-none text-[16px] font-medium placeholder:text-transparent"
				/>
				{/* Animated placeholder overlay - hidden once the input has a value or focus */}
				<div
					className="pointer-events-none absolute inset-0 flex items-center text-text-muted text-[16px] font-medium peer-focus:opacity-0 peer-[:not(:placeholder-shown)]:opacity-0"
					aria-hidden="true"
				>
					<span className="shrink-0">Search by&nbsp;</span>
					<span className="relative flex-1 min-w-0 h-[1.2em] overflow-hidden">
						<span
							key={current}
							className={cn(
								"absolute inset-0 text-ellipsis-line",
								transitioning
									? "placeholder-exit"
									: "placeholder-enter",
							)}
						>
							{current}
						</span>
					</span>
				</div>
			</div>

			<button
				type="button"
				aria-label="Search by image"
				className="shrink-0 text-text-secondary hover:text-text-primary transition-colors"
			>
				<Icon name="camera" className="w-4 h-4 md:w-5 md:h-5" />
			</button>
		</div>
	);
}
