"use client";

import { useEffect, useRef, useState } from "react";
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

const MOCK_SEARCH_TERMS = [
	"AG0445101206",
	"AG0444100328",
	"AG0422200",
	"AG0422201",
	"AG0422203",
	"TRR00826",
	"AG0450204",
];

const MAX_SUGGESTIONS = 5;
const SEARCH_QUERY_STORAGE_KEY = "tranesupply-search-query";
const RECENT_SEARCHES_STORAGE_KEY = "tranesupply-recent-searches";

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
	const inputRef = useRef<HTMLInputElement>(null);
	const [query, setQuery] = useState(() => {
		if (typeof window === "undefined") return "";
		return window.sessionStorage.getItem(SEARCH_QUERY_STORAGE_KEY) ?? "";
	});
	const [focused, setFocused] = useState(false);
	const [suggestions, setSuggestions] = useState<string[]>([]);
	const [recentSearches, setRecentSearches] = useState<string[]>(() => {
		if (typeof window === "undefined") return [];

		try {
			const storedSearches = window.sessionStorage.getItem(
				RECENT_SEARCHES_STORAGE_KEY,
			);
			if (!storedSearches) return [];

			const parsedSearches: unknown = JSON.parse(storedSearches);
			return Array.isArray(parsedSearches) &&
				parsedSearches.every((search) => typeof search === "string")
				? parsedSearches
				: [];
		} catch {
			return [];
		}
	});
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		window.sessionStorage.setItem(SEARCH_QUERY_STORAGE_KEY, query);
		window.sessionStorage.setItem(
			RECENT_SEARCHES_STORAGE_KEY,
			JSON.stringify(recentSearches),
		);
	}, [query, recentSearches]);

	useEffect(() => {
		if (!focused) {
			return;
		}

		const timer = window.setTimeout(() => {
			const normalizedQuery = query.trim().toLowerCase();
			const nextSuggestions = normalizedQuery
				? MOCK_SEARCH_TERMS.filter((term) =>
						term.toLowerCase().includes(normalizedQuery),
					).slice(0, MAX_SUGGESTIONS)
				: [];

			setSuggestions(nextSuggestions);
			setLoading(false);
		}, 300);

		return () => window.clearTimeout(timer);
	}, [focused, query]);

	const saveSearch = (term: string) => {
		const normalizedTerm = term.trim();
		if (!normalizedTerm) return;

		setRecentSearches((currentSearches) => [
			normalizedTerm,
			...currentSearches.filter((search) => search !== normalizedTerm),
		]);
	};

	const clearSearch = () => {
		if (query) {
			setQuery("");
			setLoading(true);
			inputRef.current?.focus();
			return;
		}

		inputRef.current?.blur();
	};

	const selectSearch = (term: string) => {
		setQuery(term);
		saveSearch(term);
		setLoading(true);
		inputRef.current?.focus();
	};

	const showDropdown =
		focused &&
		(loading ||
			suggestions.length > 0 ||
			recentSearches.length > 0 ||
			Boolean(query.trim()));

	return (
		<div
			className={cn(
				"relative z-20 flex items-center h-10.5 w-full max-w-120.25 min-w-75 gap-2 rounded-2xl border border-border-default pl-3 pr-3.5",
				query ? "bg-white" : "bg-transparent",
				className,
			)}
		>
			{!query && (
				<button
					type="button"
					aria-label="Focus search"
					onMouseDown={(event) => event.preventDefault()}
					onClick={() => inputRef.current?.focus()}
					className="shrink-0 text-text-secondary transition-colors hover:text-text-primary"
				>
					<Icon name="search" className="w-4 h-4 md:w-5 md:h-5" />
				</button>
			)}

			<div className="relative flex-1 min-w-0 h-full overflow-hidden">
				<input
					ref={inputRef}
					type="text"
					aria-label="Search by Model/Serial Number"
					placeholder="Search by Model/Serial Number"
					value={query}
					onChange={(event) => {
						setQuery(event.target.value);
						setLoading(true);
					}}
					onFocus={() => {
						setFocused(true);
					}}
					onBlur={() => setFocused(false)}
					onKeyDown={(event) => {
						if (event.key === "Enter") saveSearch(query);
					}}
					className="absolute inset-0 w-full h-full bg-transparent outline-none text-[16px] font-medium placeholder:text-transparent"
				/>
				{/* Keep the animated placeholder visible while an empty input has focus. */}
				<div
					className={cn(
						"pointer-events-none absolute inset-0 flex items-center text-text-muted text-[16px] font-medium",
						query ? "opacity-0" : "opacity-100",
					)}
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

			{focused && (
				<button
					type="button"
					aria-label={query ? "Clear search" : "Close search"}
					onMouseDown={(event) => event.preventDefault()}
					onClick={clearSearch}
					className="shrink-0 text-text-primary transition-colors hover:text-text-secondary"
				>
					<Icon name="close" className="w-4 h-4 md:w-5 md:h-5" />
				</button>
			)}

			<button
				type="button"
				aria-label="Search by image"
				className="shrink-0 text-text-secondary hover:text-text-primary transition-colors"
			>
				<Icon name="camera" className="w-4 h-4 md:w-5 md:h-5" />
			</button>

			{showDropdown && (
				<div className="absolute -left-px -right-px top-10.25 rounded-b-2xl border border-t-0 border-border-default bg-white px-4 pb-4 pt-5 shadow-lg">
					{loading ? (
						<div className="flex min-h-14.5 items-center rounded-2xl border border-border-default px-5 text-[16px] font-medium text-text-secondary">
							Loading Suggestions
						</div>
					) : suggestions.length > 0 ? (
						<>
							<h2 className="mb-4 px-1 text-[18px] font-semibold text-text-secondary">
								Suggestions
							</h2>
							<div className="space-y-3">
								{suggestions.map((suggestion) => (
									<button
										key={suggestion}
										type="button"
										onMouseDown={(event) =>
											event.preventDefault()
										}
										onClick={() => selectSearch(suggestion)}
										className="flex min-h-14.5 w-full items-center gap-4 rounded-2xl border border-border-default px-5 text-left text-[16px] font-medium text-text-primary hover:bg-surface-header-row1"
									>
										<Icon
											name="search"
											className="h-5 w-5 text-text-secondary"
										/>
										{suggestion}
									</button>
								))}
							</div>
						</>
					) : recentSearches.length > 0 ? (
						<>
							<h2 className="mb-4 px-1 text-[18px] font-semibold text-text-secondary">
								Recently Searched
							</h2>
							<div className="space-y-3">
								{recentSearches.map((search) => (
									<button
										key={search}
										type="button"
										onMouseDown={(event) =>
											event.preventDefault()
										}
										onClick={() => selectSearch(search)}
										className="flex min-h-14.5 w-full items-center gap-4 rounded-2xl border border-border-default px-5 text-left text-[16px] font-medium text-text-primary hover:bg-surface-header-row1"
									>
										<Icon
											name="rotate-ccw"
											className="h-5 w-5 text-text-secondary"
										/>
										{search}
									</button>
								))}
							</div>
						</>
					) : query.trim() ? (
						<div className="flex min-h-14.5 items-center rounded-2xl border border-border-default px-5 text-[16px] font-medium italic text-text-secondary">
							No suggestions found
						</div>
					) : null}
				</div>
			)}
		</div>
	);
}
