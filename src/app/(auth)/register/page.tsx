"use client";

import { Suspense, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { PrimaryButton } from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";
import { ROUTES, withRedirect } from "@/constants/routes";

export default function RegisterPage() {
  return (
    <Suspense
      fallback={
        <h1 className="text-2xl md:text-3xl font-bold text-text-primary">Create Account</h1>
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
    name: "",
    email: "",
    company: "",
    shipToZip: "",
    password: "",
  });

  // Where to send the user after registering - wherever they were before
  // they clicked "Create Account", or home if there's nowhere to return to.
  const next = searchParams.get("next") || ROUTES.home;

  function update<K extends keyof typeof form>(key: K, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    // No API call - filling the form out is enough to be treated as a logged-in user.
    register({
      name: form.name,
      email: form.email,
      company: form.company,
      shipToZip: form.shipToZip,
    });
    router.push(next);
  }

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-bold text-text-primary">Create Account</h1>

      <form onSubmit={handleSubmit} className="mt-6 flex max-w-md flex-col gap-4" noValidate>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className="text-[14px] font-semibold text-text-primary">
            Full name
          </label>
          <input
            id="name"
            required
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder="Jordan Rivera"
            className="h-[45px] rounded-md border border-border-default px-3 text-[15px] outline-none focus:border-accent"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="reg-email" className="text-[14px] font-semibold text-text-primary">
            Email address
          </label>
          <input
            id="reg-email"
            type="email"
            required
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder="you@company.com"
            className="h-[45px] rounded-md border border-border-default px-3 text-[15px] outline-none focus:border-accent"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="company" className="text-[14px] font-semibold text-text-primary">
            Company / branch
          </label>
          <input
            id="company"
            required
            value={form.company}
            onChange={(e) => update("company", e.target.value)}
            placeholder="Charlotte HVAC Supply"
            className="h-[45px] rounded-md border border-border-default px-3 text-[15px] outline-none focus:border-accent"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="zip" className="text-[14px] font-semibold text-text-primary">
            Ship-to zip code
          </label>
          <input
            id="zip"
            required
            value={form.shipToZip}
            onChange={(e) => update("shipToZip", e.target.value)}
            placeholder="07058"
            className="h-[45px] rounded-md border border-border-default px-3 text-[15px] outline-none focus:border-accent"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="reg-password" className="text-[14px] font-semibold text-text-primary">
            Password
          </label>
          <input
            id="reg-password"
            type="password"
            required
            value={form.password}
            onChange={(e) => update("password", e.target.value)}
            placeholder="••••••••"
            className="h-[45px] rounded-md border border-border-default px-3 text-[15px] outline-none focus:border-accent"
          />
        </div>

        <PrimaryButton className="mt-2 w-full">Create Account</PrimaryButton>

        <p className="text-[14px] text-text-secondary">
          Already have an account?{" "}
          <Link
            href={withRedirect(ROUTES.login, next)}
            className="font-semibold text-accent hover:underline"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
