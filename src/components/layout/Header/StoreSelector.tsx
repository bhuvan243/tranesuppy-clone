"use client";

import { useEffect, useState } from "react";
import { LocateFixed, MapPin, RotateCcw, Search, Store, X } from "lucide-react";
import { Icon } from "@/components/icons/Icon";

interface StoreSelectorProps {
	selected: string;
	onSelect: (store: string) => void;
}

interface StoreOption {
	name: string;
	address: string;
	distance: string;
}

const STORES: StoreOption[] = [
	{
		name: "Charlotte Trane Supply",
		address: "3829 Revolution Park Dr Charlotte, NC 28217-1503",
		distance: "11.1 miles",
	},
	{
		name: "Charlotte Aripark Trane Supply",
		address: "8810 - B Aripark West Drive Charlotte, NC 28214",
		distance: "8.2 miles",
	},
	{
		name: "Matthews Trane Supply",
		address: "13054-B E Independence Blvd Matthews, NC 28105-4243",
		distance: "14.3 miles",
	},
	{
		name: "Huntersville Trane Supply",
		address: "10431 S Tryon Street Huntersville, NC 28078",
		distance: "18.6 miles",
	},
	{
		name: "Concord Trane Supply",
		address: "1234 Concord Rd, Concord, NC 28025",
		distance: "22.5 miles",
	},
	{
		name: "Gastonia Trane Supply",
		address: "5678 Gastonia St, Gastonia, NC 28052",
		distance: "30.2 miles",
	},
	{
		name: "Rock Hill Trane Supply",
		address: "9101 Rock Hill Ave, Rock Hill, SC 29730",
		distance: "35.8 miles",
	},
	{
		name: "Fort Mill Trane Supply",
		address: "2345 Fort Mill Rd, Fort Mill, SC 29715",
		distance: "40.1 miles",
	},
	{
		name: "Mooresville Trane Supply",
		address: "6789 Mooresville Blvd, Mooresville, NC 28117",
		distance: "45.6 miles",
	},
];

export function StoreSelector({ selected, onSelect }: StoreSelectorProps) {
	const [open, setOpen] = useState(false);
	const [query, setQuery] = useState("");
	const [expanded, setExpanded] = useState<string | null>(null);
	const stores = STORES.filter((store) =>
		`${store.name} ${store.address}`
			.toLowerCase()
			.includes(query.toLowerCase()),
	);

	useEffect(() => {
		if (!open) return;
		function closeOnEscape(event: KeyboardEvent) {
			if (event.key === "Escape") setOpen(false);
		}
		document.addEventListener("keydown", closeOnEscape);
		return () => document.removeEventListener("keydown", closeOnEscape);
	}, [open]);

	function chooseStore(store: string) {
		onSelect(store);
		setOpen(false);
	}

	return (
		<>
			<button
				type="button"
				onClick={() => setOpen(true)}
				className="flex max-w-46 h-11 shrink-0 items-center gap-1.5 text-[14px] font-medium text-text-primary bg-[#E9E9E9] rounded-[16px] px-[12px] py-[8px]"
				aria-haspopup="dialog"
				aria-expanded={open}
			>
				<Icon
					name="store"
					className="h-4 w-4 shrink-0 text-text-secondary"
				/>
				<span className="text-ellipsis-line font-semibold">
					{selected}
				</span>
				<Icon name="chevron-down" className="h-3.5 w-3.5 shrink-0" />
			</button>

			{open && (
				<div
					className="store-modal-backdrop"
					onMouseDown={() => setOpen(false)}
				>
					<section
						className="store-modal"
						role="dialog"
						aria-modal="true"
						aria-labelledby="store-modal-title"
						onMouseDown={(event) => event.stopPropagation()}
					>
						<header className="store-modal-header">
							<h2 id="store-modal-title">Select Store</h2>
							<button
								type="button"
								onClick={() => setOpen(false)}
								aria-label="Close store selector"
							>
								<X size={20} />
							</button>
						</header>
						<div className="store-modal-body">
							<label className="store-search">
								<input
									value={query}
									onChange={(event) =>
										setQuery(event.target.value)
									}
									placeholder="Search by State, City or Zip Code"
									aria-label="Search stores"
								/>
								<Search size={15} aria-hidden="true" />
							</label>
							<div className="store-modal-actions">
								<button
									type="button"
									className="store-outline-button"
								>
									<LocateFixed size={15} />
									Locate Me
								</button>
								<div>
									<button
										type="button"
										className="store-outline-button"
										onClick={() => setQuery("")}
									>
										<RotateCcw size={14} />
										Reset
									</button>
									<button
										type="button"
										className="store-search-button"
									>
										<Search size={14} />
										Search
									</button>
								</div>
							</div>
							<p className="store-availability">
								Only showing stores with availability
							</p>
							<div className="store-results">
								{stores.map((store) => (
									<article
										className="store-result"
										key={store.name}
									>
										<div className="store-result-copy">
											<h3>
												<Store
													size={14}
													fill="currentColor"
												/>
												{store.name}
											</h3>
											<p>{store.address}</p>
											<p>{store.distance}</p>
											<button
												type="button"
												onClick={() =>
													setExpanded(
														expanded === store.name
															? null
															: store.name,
													)
												}
											>
												Show More{" "}
												<Icon
													name="chevron-down"
													className="h-3 w-3"
												/>
											</button>
											{expanded === store.name && (
												<p className="store-more">
													<MapPin size={13} /> Store
													hours and availability
													available at this location.
												</p>
											)}
										</div>
										<button
											type="button"
											disabled={store.name === selected}
											onClick={() =>
												chooseStore(store.name)
											}
											className="store-set-button"
										>
											{store.name === selected
												? "My Store"
												: "Set as My Store"}
										</button>
									</article>
								))}
								{stores.length === 0 && (
									<p className="store-empty">
										No stores found.
									</p>
								)}
							</div>
						</div>
						<footer className="store-modal-footer">
							<button
								type="button"
								onClick={() => setOpen(false)}
								className="store-cancel-button"
							>
								Cancel
							</button>
						</footer>
					</section>
				</div>
			)}
		</>
	);
}
