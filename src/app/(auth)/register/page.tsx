"use client";

import { Suspense, useState, type FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { ROUTES, withRedirect } from "@/constants/routes";

export default function RegisterPage() {
	return (
		<Suspense
			fallback={
				<h1 className="text-2xl font-bold text-text-primary">
					Create Account
				</h1>
			}
		>
			<RegisterForm />
		</Suspense>
	);
}

function RegisterForm() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const { register } = useAuth();
	const [form, setForm] = useState({
		firstName: "",
		lastName: "",
		email: "",
		phone: "",
		company: "",
		accountNumber: "",
		country: "",
		state: "",
		city: "",
		zip: "",
		comments: "",
		existingCustomer: "No",
		store: "",
	});

	// Where to send the user after registering - wherever they were before
	// they clicked "Create Account", or home if there's nowhere to return to.
	const next = searchParams.get("next") || ROUTES.home;

	function update<K extends keyof typeof form>(key: K, value: string) {
		setForm((prev) => ({ ...prev, [key]: value }));
	}

	function handleSubmit(e: FormEvent) {
		e.preventDefault();
		register({
			name: `${form.firstName} ${form.lastName}`.trim(),
			email: form.email,
			company: form.company,
			shipToZip: form.zip,
		});
		router.push(next);
	}

	const inputClass = "register-input";
	const field = (
		id: keyof typeof form,
		label: string,
		placeholder: string,
		required = false,
	) => (
		<label className="register-control" htmlFor={id}>
			<span>
				{required && <b>*</b>}
				{label}
			</span>
			<input
				id={id}
				required={required}
				value={form[id]}
				onChange={(e) => update(id, e.target.value)}
				placeholder={placeholder}
				className={inputClass}
			/>
		</label>
	);

	return (
		<div className="register-page">
			<nav className="register-breadcrumb" aria-label="Breadcrumb">
				<Link href={ROUTES.home}>Home</Link>
				<span>›</span>
				<span>Create Account</span>
			</nav>
			<h1>Become a Customer</h1>
			<div className="register-rule" />
			<div className="register-content">
				<form
					onSubmit={handleSubmit}
					className="register-form"
					noValidate
				>
					<h2>Create an Account With Us</h2>
					<div className="register-accent" />
					<div className="register-grid">
						{field(
							"firstName",
							"First Name",
							"Your First Name",
							true,
						)}
						{field("lastName", "Last Name", "Your Last Name", true)}
						<div className="register-span-2">
							{field(
								"email",
								"Email Address",
								"example@companyname.com",
								true,
							)}
						</div>
						<div className="register-span-2">
							{field("phone", "Phone Number", "(555) 555-5555")}
						</div>
						<div className="register-span-2">
							{field(
								"company",
								"Company Name",
								"Your Company Name",
								true,
							)}
						</div>
						<div className="register-span-2">
							{field(
								"accountNumber",
								"Trane Supply Account Number",
								"Trane Supply Account Number",
							)}
						</div>
						<label className="register-control">
							<span>
								<b>*</b>Country
							</span>
							<select
								required
								value={form.country}
								onChange={(e) =>
									update("country", e.target.value)
								}
								className={inputClass}
							>
								<option value="">Select Country</option>
								<option>United States</option>
								<option>Canada</option>
							</select>
						</label>
						<label className="register-control">
							<span>
								<b>*</b>State / Province
							</span>
							<select
								required
								value={form.state}
								onChange={(e) =>
									update("state", e.target.value)
								}
								className={inputClass}
							>
								<option value="">
									Select State / Province
								</option>
								<option>North Carolina</option>
								<option>New York</option>
								<option>Texas</option>
							</select>
						</label>
						{field("city", "City", "City", true)}
						{field(
							"zip",
							"Zip / Postal Code",
							"Zip / Postal Code",
							true,
						)}
						<div className="register-span-2">
							<label className="register-control">
								<span>
									<b>*</b>Store Location
								</span>
								<button type="button" className="store-button">
									▣ &nbsp; Select Store
								</button>
							</label>
						</div>
					</div>
					<fieldset className="register-existing">
						<legend>
							Are you an existing Trane Supply customer?
						</legend>
						<label>
							<input
								type="radio"
								name="existing"
								value="Yes"
								checked={form.existingCustomer === "Yes"}
								onChange={(e) =>
									update("existingCustomer", e.target.value)
								}
							/>{" "}
							Yes
						</label>
						<label>
							<input
								type="radio"
								name="existing"
								value="No"
								checked={form.existingCustomer === "No"}
								onChange={(e) =>
									update("existingCustomer", e.target.value)
								}
							/>{" "}
							No
						</label>
					</fieldset>
					<label className="register-control">
						<span>Additional Comments</span>
						<textarea
							value={form.comments}
							onChange={(e) => update("comments", e.target.value)}
						/>
					</label>
					<p className="register-consent">
						By submitting this form, I understand that I am
						providing express consent for Trane Supply to contact me
						about this request or similar topics. I know that I can
						opt-out from future communication at any time by
						following the instructions in our communications. Our{" "}
						<strong>Privacy Policy</strong> governs our use of your
						information.
					</p>
					<button type="submit" className="register-submit">
						Submit
					</button>
				</form>
				<div className="register-visual">
					<Image
						src="/images/traneSupplyHeaderLogo.png"
						alt="Trane Supply"
						width={416}
						height={100}
					/>
				</div>
			</div>
		</div>
	);
}
