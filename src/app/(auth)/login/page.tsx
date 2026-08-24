"use client";

import { Suspense, useState, type FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { LockKeyhole, UserRound } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { ROUTES, withRedirect } from "@/constants/routes";

export default function LoginPage() {
	return (
		<Suspense
			fallback={
				<h1 className="text-2xl font-bold text-text-primary">Login</h1>
			}
		>
			<LoginForm />
		</Suspense>
	);
}

function LoginForm() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const { login } = useAuth();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState<string | null>(null);

	// Where to send the user after a successful login - wherever they were
	// before they clicked "Login", or home if there's nowhere to return to.
	const next = searchParams.get("next") || ROUTES.home;

	function handleSubmit(e: FormEvent) {
		e.preventDefault();
		const success = login(email, password);
		if (success) {
			router.push(next);
		} else {
			setError(
				"That email/password combination doesn't match a demo account. Try one of the accounts below.",
			);
		}
	}

	return (
		<div className="login-page">
			<div className="mb-5 flex justify-center border-b border-[#e5e5e5] pb-6">
				<Link href={ROUTES.home} aria-label="Trane Technologies home">
					<Image
						src="/images/traneTechnologiesLogoV1.png"
						alt="Trane Technologies"
						width={160}
						height={38}
					/>
				</Link>
			</div>

			<p className="mb-2 text-[10px] font-bold leading-2.75 text-[#333]">
				Are you a Trane Technologies customer?
				<br />
				Sign in here.
			</p>

			<form onSubmit={handleSubmit} className="flex flex-col" noValidate>
				<div className="login-field">
					<UserRound size={14} strokeWidth={3} aria-hidden="true" />
					<input
						id="email"
						type="email"
						required
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="Username"
						aria-label="Username"
					/>
				</div>
				<div className="login-field mt-1">
					<LockKeyhole size={14} strokeWidth={3} aria-hidden="true" />
					<input
						id="password"
						type="password"
						required
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="Password"
						aria-label="Password"
					/>
				</div>
				<label className="mt-1 flex items-center justify-end gap-1 text-[12px] font-semibold text-[#444]">
					<input type="checkbox" className="h-3 w-3 accent-[#777]" />
					Keep me signed in
				</label>
				{error && (
					<p role="alert" className="mt-2 text-[11px] text-accent">
						{error}
					</p>
				)}
				<div className="mt-2 flex justify-center gap-1 text-[12px] text-[#2878bd]">
					<Link href="#" className="hover:underline">
						Forgot your password?
					</Link>
					<span>|</span>
					<Link href="#" className="hover:underline">
						Change Password
					</Link>
				</div>
				<button
					type="submit"
					className="mt-4 h-8.5 w-full rounded-sm bg-[#6500ff] text-[12px] font-semibold text-white shadow-[0_7px_20px_rgba(101,0,255,0.18)] hover:bg-[#5400d9]"
				>
					Sign in
				</button>
			</form>

			<div className="mt-10">
				<p className="mb-4 text-[10px] font-bold leading-2.75 text-[#333]">
					Are you a Trane Technologies Employee, Contractor or Citrix
					<br />
					User?
				</p>
				<Link
					href={withRedirect(ROUTES.home, next)}
					className="flex h-9 items-center justify-center rounded-sm border-2 border-[#6500ff] text-[12px] font-semibold text-[#6500ff] hover:bg-[#f5efff]"
				>
					Sign in here
				</Link>
			</div>
		</div>
	);
}
