"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/components/icons/Icon";

interface StoreSelectorProps {
	selected: string;
	onSelect: (store: string) => void;
}

interface StoreOption {
	name: string;
	address: string;
	distance: string;
	phone: string;
	openingTime: string;
	closingTime: string;
}

const parseTimeToMinutes = (time: string): number => {
	const value = time.trim().toUpperCase();
	const meridiem = value.slice(-2);
	const [hoursPart, minutesPart = "0"] = value.slice(0, -2).split(":");
	let hours = Number(hoursPart);
	const minutes = Number(minutesPart);

	if (meridiem === "PM" && hours < 12) {
		hours += 12;
	}

	if (meridiem === "AM" && hours === 12) {
		hours = 0;
	}

	return hours * 60 + minutes;
};

const formatTimeLabel = (time: string): string => {
	const [hoursPart, minutesPart = "00"] = time.trim().split(":");
	const hours = Number(hoursPart);
	const minutes = Number(minutesPart);
	const date = new Date();
	date.setHours(hours, minutes, 0, 0);
	return date.toLocaleTimeString([], {
		hour: "numeric",
		minute: "2-digit",
	});
};

const getStoreStatus = (openingTime: string, closingTime: string) => {
	const now = new Date();
	const nowMinutes = now.getHours() * 60 + now.getMinutes();
	const openingMinutes = parseTimeToMinutes(openingTime);
	const closingMinutes = parseTimeToMinutes(closingTime);
	const isOpen = nowMinutes >= openingMinutes && nowMinutes < closingMinutes;

	if (isOpen) {
		return {
			statusText: "Open Now",
			detailText: `Closes at ${formatTimeLabel(closingTime)}`,
			isOpen: true,
		};
	}

	if (nowMinutes < openingMinutes) {
		return {
			statusText: `Opens at ${formatTimeLabel(openingTime)}`,
			detailText: "",
			isOpen: false,
		};
	}

	return {
		statusText: "Closed",
		detailText: `Opening Tomorrow at ${formatTimeLabel(openingTime)}`,
		isOpen: false,
	};
};

const getMapDirectionsUrl = (location: string): string =>
	`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;

const STORES: StoreOption[] = [
	{
		name: "Charlotte Trane Supply",
		address: "3829 Revolution Park Dr Charlotte, NC 28217-1503",
		distance: "11.1 miles",
		phone: "704-555-0181",
		openingTime: "7:00 AM",
		closingTime: "5:00 PM",
	},
	{
		name: "Charlotte Aripark Trane Supply",
		address: "8810 - B Aripark West Drive Charlotte, NC 28214",
		distance: "8.2 miles",
		phone: "704-555-0182",
		openingTime: "8:00 AM",
		closingTime: "6:00 PM",
	},
	{
		name: "Matthews Trane Supply",
		address: "13054-B E Independence Blvd Matthews, NC 28105-4243",
		distance: "14.3 miles",
		phone: "704-555-0183",
		openingTime: "9:00 AM",
		closingTime: "5:30 PM",
	},
	{
		name: "Huntersville Trane Supply",
		address: "10431 S Tryon Street Huntersville, NC 28078",
		distance: "18.6 miles",
		phone: "704-555-0184",
		openingTime: "7:30 AM",
		closingTime: "5:00 PM",
	},
	{
		name: "Concord Trane Supply",
		address: "1234 Concord Rd, Concord, NC 28025",
		distance: "22.5 miles",
		phone: "704-555-0185",
		openingTime: "8:00 AM",
		closingTime: "4:30 PM",
	},
	{
		name: "Gastonia Trane Supply",
		address: "5678 Gastonia St, Gastonia, NC 28052",
		distance: "30.2 miles",
		phone: "704-555-0186",
		openingTime: "9:00 AM",
		closingTime: "6:00 PM",
	},
	{
		name: "Rock Hill Trane Supply",
		address: "9101 Rock Hill Ave, Rock Hill, SC 29730",
		distance: "35.8 miles",
		phone: "803-555-0187",
		openingTime: "8:30 AM",
		closingTime: "5:30 PM",
	},
	{
		name: "Fort Mill Trane Supply",
		address: "2345 Fort Mill Rd, Fort Mill, SC 29715",
		distance: "40.1 miles",
		phone: "803-555-0188",
		openingTime: "9:00 AM",
		closingTime: "6:00 PM",
	},
	{
		name: "Mooresville Trane Supply",
		address: "6789 Mooresville Blvd, Mooresville, NC 28117",
		distance: "45.6 miles",
		phone: "704-555-0189",
		openingTime: "7:00 AM",
		closingTime: "4:00 PM",
	},
];

export function StoreSelector({ selected, onSelect }: StoreSelectorProps) {
	const [open, setOpen] = useState(false);
	const [query, setQuery] = useState("");
	const [expanded, setExpanded] = useState<string | null>(null);
	const [copiedPhone, setCopiedPhone] = useState<string | null>(null);
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

	async function handleCopyPhone(phone: string) {
		try {
			if (navigator?.clipboard) {
				await navigator.clipboard.writeText(phone);
			}
			setCopiedPhone(phone);
			window.setTimeout(
				() =>
					setCopiedPhone((current) =>
						current === phone ? null : current,
					),
				1500,
			);
		} catch {
			setCopiedPhone(null);
		}
	}

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
								<Icon name="close" className="h-5 w-5" />
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
								<Icon
									name="search"
									className="h-[15px] w-[15px]"
								/>
							</label>
							<div className="store-modal-actions">
								<button
									type="button"
									className="store-outline-button"
								>
									<Icon
										name="map-pin"
										className="h-[15px] w-[15px]"
									/>
									Locate Me
								</button>
								<div>
									<button
										type="button"
										className="store-outline-button"
										onClick={() => setQuery("")}
									>
										<Icon
											name="rotate-ccw"
											className="h-[14px] w-[14px]"
										/>
										Reset
									</button>
									<button
										type="button"
										className="store-search-button"
									>
										<Icon
											name="search"
											className="h-[14px] w-[14px]"
										/>
										Search
									</button>
								</div>
							</div>
							<p className="store-availability">
								Only showing stores with availability
							</p>
							<div className="store-results">
								{stores.map((store) => {
									const status = getStoreStatus(
										store.openingTime,
										store.closingTime,
									);

									return (
										<article
											className="store-result"
											key={store.name}
										>
											<div className="store-result-copy">
												<h3>
													<Icon
														name="store"
														className="h-[14px] w-[14px]"
													/>
													{store.name}
												</h3>
												<p>{store.address}</p>
												<p>{store.distance}</p>
												<button
													type="button"
													onClick={() =>
														setExpanded(
															expanded ===
																store.name
																? null
																: store.name,
														)
													}
													className="store-expand-toggle"
													aria-expanded={
														expanded === store.name
													}
												>
													<span>
														{expanded === store.name
															? "Show Less"
															: "Show More"}
													</span>
													{expanded === store.name ? (
														<Icon
															name="chevron-up"
															className="h-3 w-3"
														/>
													) : (
														<Icon
															name="chevron-down"
															className="h-3 w-3"
														/>
													)}
												</button>
												{expanded === store.name && (
													<div className="store-more-panel">
														<div className="store-more-row">
															<span className="store-more-label">
																<Icon
																	name="phone"
																	className="h-[12px] w-[12px]"
																/>
																Contact Number
															</span>
															<div className="store-more-value-row">
																<a
																	href={`tel:${store.phone.replace(/[^\d+]/g, "")}`}
																	className="store-phone-link"
																>
																	{
																		store.phone
																	}
																</a>
																<button
																	type="button"
																	className="store-copy-button"
																	onClick={() =>
																		handleCopyPhone(
																			store.phone,
																		)
																	}
																	aria-label={`Copy ${store.phone}`}
																>
																	{copiedPhone ===
																	store.phone ? (
																		<span>
																			✓
																		</span>
																	) : (
																		<Icon
																			name="copy"
																			className="h-[12px] w-[12px]"
																		/>
																	)}
																</button>
															</div>
														</div>
														<div className="store-more-row">
															<span className="store-more-label">
																<Icon
																	name="clock"
																	className="h-[12px] w-[12px]"
																/>
																Open / Closed
															</span>
															<span
																className={
																	status.isOpen
																		? "store-status-open"
																		: "store-status-closed"
																}
															>
																{
																	status.statusText
																}
																{status.detailText
																	? ` - ${status.detailText}`
																	: ""}
															</span>
														</div>
														<div className="store-more-row">
															<span className="store-more-label">
																<Icon
																	name="clock"
																	className="h-[12px] w-[12px]"
																/>
																Hours
															</span>
															<span className="store-more-value">
																{
																	store.openingTime
																}{" "}
																-{" "}
																{
																	store.closingTime
																}
															</span>
														</div>
														<div className="store-more-row">
															<a
																href={getMapDirectionsUrl(
																	store.address,
																)}
																target="_blank"
																rel="noopener noreferrer"
																className="store-direction-link"
															>
																<Icon
																	name="navigation"
																	className="h-[12px] w-[12px]"
																/>
																<span>
																	Get
																	Direction
																</span>
															</a>
														</div>
													</div>
												)}
											</div>
											<button
												type="button"
												disabled={
													store.name === selected
												}
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
									);
								})}
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
