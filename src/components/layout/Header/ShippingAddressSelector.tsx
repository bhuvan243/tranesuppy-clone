"use client";

import { useEffect, useState } from "react";
import { Edit3, Plus, X } from "lucide-react";
import { Icon } from "@/components/icons/Icon";

interface ShippingAddressSelectorProps {
	selected: string;
	onSelect: (zip: string) => void;
}

interface ShippingAddress {
	id: string;
	name: string;
	address: string;
	city: string;
	state: string;
	zip: string;
	country: string;
	primary?: boolean;
}

type AddressForm = Omit<ShippingAddress, "id" | "primary"> & {
	primary: boolean;
};

const INITIAL_ADDRESSES: ShippingAddress[] = [
	{
		id: "main-office",
		name: "Main Office",
		address: "23, Building A, Suite 500 Pine Brook",
		city: "Pine Brook",
		state: "New Jersey",
		zip: "07058",
		country: "United States",
		primary: true,
	},
	{
		id: "job-site",
		name: "Job Site",
		address: "19 Chapin Road, Building B, Suite 200",
		city: "Pine Brook",
		state: "New Jersey",
		zip: "07058",
		country: "United States",
	},
	{
		id: "warehouse",
		name: "Warehouse",
		address: "45 Maple Drive, Suite 10B",
		city: "San Francisco",
		state: "California",
		zip: "94105",
		country: "United States",
	},
	{
		id: "job-studio",
		name: "Job Studio",
		address: "123 Elm Street, Floor 3",
		city: "Chicago",
		state: "Illinois",
		zip: "60614",
		country: "United States",
	},
];

const EMPTY_FORM: AddressForm = {
	name: "",
	address: "",
	city: "",
	state: "",
	zip: "",
	country: "United States",
	primary: false,
};

export function ShippingAddressSelector({
	selected,
	onSelect,
}: ShippingAddressSelectorProps) {
	const [open, setOpen] = useState(false);
	const [addresses, setAddresses] = useState(INITIAL_ADDRESSES);
	const [selectedId, setSelectedId] = useState(INITIAL_ADDRESSES[0].id);
	const [editingId, setEditingId] = useState<string | null>(null);
	const [form, setForm] = useState<AddressForm>(EMPTY_FORM);

	useEffect(() => {
		if (!open) return;
		function closeOnEscape(event: KeyboardEvent) {
			if (event.key === "Escape") setOpen(false);
		}
		document.addEventListener("keydown", closeOnEscape);
		return () => document.removeEventListener("keydown", closeOnEscape);
	}, [open]);

	function updateForm(key: keyof AddressForm, value: string | boolean) {
		setForm((current) => ({ ...current, [key]: value }));
	}

	function startAdd() {
		setEditingId("new");
		setForm(EMPTY_FORM);
	}

	function startEdit(address: ShippingAddress) {
		setEditingId(address.id);
		setForm({
			name: address.name,
			address: address.address,
			city: address.city,
			state: address.state,
			zip: address.zip,
			country: address.country,
			primary: Boolean(address.primary),
		});
	}

	function saveAddress() {
		const id = editingId === "new" ? `address-${Date.now()}` : editingId!;
		const nextAddress = { ...form, id };
		setAddresses((current) => {
			const next =
				editingId === "new"
					? [...current, nextAddress]
					: current.map((address) =>
							address.id === id ? nextAddress : address,
						);
			return form.primary
				? next.map((address) => ({
						...address,
						primary: address.id === id,
					}))
				: next;
		});
		if (form.primary) setSelectedId(id);
		setEditingId(null);
	}

	function selectAddress() {
		const address = addresses.find((item) => item.id === selectedId);
		if (address) onSelect(address.zip);
		setOpen(false);
	}

	const selectedAddress = addresses.find(
		(address) => address.id === selectedId,
	);
	const isDefaultSelected = Boolean(selectedAddress?.primary);

	return (
		<>
			<button
				type="button"
				className="flex max-w-45 h-11 shrink-0 items-center gap-1.5 text-[14px] font-medium text-text-primary bg-[#E9E9E9] rounded-[16px] px-[12px] py-[8px]"
				onClick={() => setOpen(true)}
				aria-haspopup="dialog"
				aria-expanded={open}
			>
				<Icon
					name="pin"
					className="h-4 w-4 shrink-0 text-text-secondary"
				/>
				<span className="text-ellipsis-line">
					<span className="text-text-secondary">Ship to&nbsp;</span>
					<span className="font-semibold">{selected}</span>
				</span>
				<Icon name="chevron-down" className="h-3.5 w-3.5 shrink-0" />
			</button>

			{open && (
				<div
					className="address-modal-backdrop"
					onMouseDown={() => setOpen(false)}
				>
					<section
						className="address-modal"
						role="dialog"
						aria-modal="true"
						aria-labelledby="address-modal-title"
						onMouseDown={(event) => event.stopPropagation()}
					>
						{editingId ? (
							<AddressEditor
								form={form}
								onChange={updateForm}
								onCancel={() => setEditingId(null)}
								onSave={saveAddress}
								isNew={editingId === "new"}
							/>
						) : (
							<>
								<header className="address-modal-header">
									<h2 id="address-modal-title">
										Select a Shipping Address
									</h2>
									<button
										type="button"
										onClick={() => setOpen(false)}
										aria-label="Close shipping address selector"
									>
										<X size={18} />
									</button>
								</header>
								<div className="address-modal-body">
									<button
										type="button"
										className="address-add-button"
										onClick={startAdd}
									>
										<Plus size={15} /> Add a New Address
									</button>
									<p className="address-info">
										Select a shipping address from your
										account
									</p>
									<div className="address-list">
										{addresses.map((address) => (
											<article
												key={address.id}
												className={`address-card ${address.id === selectedId ? "address-card-selected" : ""}`}
											>
												<label>
													<input
														type="radio"
														name="shipping-address"
														checked={
															address.id ===
															selectedId
														}
														onChange={() =>
															setSelectedId(
																address.id,
															)
														}
													/>
													<span>
														<strong>
															{address.name}
														</strong>
														<small>
															{address.address},{" "}
															{address.city},{" "}
															{address.state}{" "}
															{address.zip}{" "}
															{address.country}
														</small>
														{address.primary && (
															<em>
																✓ Primary
																Address
															</em>
														)}
													</span>
												</label>
												<button
													type="button"
													className="address-edit-button"
													onClick={() =>
														startEdit(address)
													}
													aria-label={`Edit ${address.name}`}
												>
													<Edit3 size={14} /> Edit
												</button>
											</article>
										))}
									</div>
								</div>
								<footer className="address-modal-footer">
									<button
										type="button"
										className="address-cancel-button"
										onClick={() => setOpen(false)}
									>
										Cancel
									</button>
									<button
										type="button"
										className="address-select-button"
										disabled={isDefaultSelected}
										onClick={selectAddress}
									>
										Select Address
									</button>
								</footer>
							</>
						)}
					</section>
				</div>
			)}
		</>
	);
}

function AddressEditor({
	form,
	onChange,
	onCancel,
	onSave,
	isNew,
}: {
	form: AddressForm;
	onChange: (key: keyof AddressForm, value: string | boolean) => void;
	onCancel: () => void;
	onSave: () => void;
	isNew: boolean;
}) {
	const field = (
		key: keyof AddressForm,
		label: string,
		placeholder: string,
		required = true,
	) => (
		<label className="address-form-control">
			<span>
				{required && <b>*</b>}
				{label}
			</span>
			<input
				required={required}
				value={String(form[key])}
				onChange={(event) => onChange(key, event.target.value)}
				placeholder={placeholder}
			/>
		</label>
	);
	return (
		<>
			<header className="address-modal-header">
				<h2 id="address-modal-title">
					{isNew
						? "Add New Shipping Address"
						: "Edit Shipping Address"}
				</h2>
				<button
					type="button"
					onClick={onCancel}
					aria-label="Close address editor"
				>
					<X size={18} />
				</button>
			</header>
			<div className="address-editor-body">
				<div className="address-editor-grid">
					{field("name", "Name", "Main Office")}
					<label className="address-form-control">
						<span>
							<b>*</b>Country
						</span>
						<select
							value={form.country}
							onChange={(event) =>
								onChange("country", event.target.value)
							}
						>
							<option>United States</option>
							<option>Canada</option>
						</select>
					</label>
					<label className="address-form-control">
						<span>
							<b>*</b>State
						</span>
						<select
							required
							value={form.state}
							onChange={(event) =>
								onChange("state", event.target.value)
							}
						>
							<option value="">Select State</option>
							<option>New Jersey</option>
							<option>California</option>
							<option>Illinois</option>
						</select>
					</label>
					<div className="address-form-span-2">
						{field(
							"address",
							"Address",
							"23, Building A, Suite 500 Pine Brook",
						)}
					</div>
					{field("city", "City", "Pine Brook")}
					<label className="address-form-control">
						<span>
							<b>*</b>ZIP Code
						</span>
						<input
							required
							value={form.zip}
							onChange={(event) =>
								onChange("zip", event.target.value)
							}
							placeholder="07058"
						/>
					</label>
				</div>
				<label className="address-primary-check">
					<input
						type="checkbox"
						checked={form.primary}
						onChange={(event) =>
							onChange("primary", event.target.checked)
						}
					/>{" "}
					Use this as a primary address
				</label>
			</div>
			<footer className="address-modal-footer">
				<button
					type="button"
					className="address-cancel-button"
					onClick={onCancel}
				>
					Cancel
				</button>
				<button
					type="button"
					className="address-select-button address-save-button"
					onClick={onSave}
				>
					Save Address
				</button>
			</footer>
		</>
	);
}
