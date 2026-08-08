"use client";

import { Suspense, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { PrimaryButton } from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";
import { DEMO_ACCOUNTS } from "@/constants/auth";
import { ROUTES, withRedirect } from "@/constants/routes";

export default function LoginPage() {
  return (
    <Suspense
      fallback={<h1 className="text-2xl md:text-3xl font-bold text-text-primary">Login</h1>}
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
        "That email/password combination doesn't match a demo account. Try one of the accounts below."
      );
    }
  }

  function fillDemoAccount(demoEmail: string, demoPassword: string) {
    setEmail(demoEmail);
    setPassword(demoPassword);
    setError(null);
  }

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-bold text-text-primary">Login</h1>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-10">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-[14px] font-semibold text-text-primary">
              Email address
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              className="h-[45px] rounded-md border border-border-default px-3 text-[15px] outline-none focus:border-accent"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="text-[14px] font-semibold text-text-primary">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="h-[45px] rounded-md border border-border-default px-3 text-[15px] outline-none focus:border-accent"
            />
          </div>

          {error && (
            <p role="alert" className="text-[13px] text-accent">
              {error}
            </p>
          )}

          <PrimaryButton className="mt-2 w-full">Login</PrimaryButton>

          <p className="text-[14px] text-text-secondary">
            Don&apos;t have an account?{" "}
            <Link
              href={withRedirect(ROUTES.register, next)}
              className="font-semibold text-accent hover:underline"
            >
              Create one
            </Link>
          </p>
        </form>

        <div className="rounded-lg border border-border-divider bg-surface-hover/50 p-5">
          <h2 className="text-[14px] font-bold uppercase tracking-wide text-text-primary">
            Demo accounts
          </h2>
          <p className="mt-1 text-[13px] text-text-secondary">
            No real backend here - use either demo account to test the logged-in header, or
            click a card to autofill the form.
          </p>
          <ul className="mt-4 flex flex-col gap-3">
            {DEMO_ACCOUNTS.map((account) => (
              <li key={account.email}>
                <button
                  type="button"
                  onClick={() => fillDemoAccount(account.email, account.password)}
                  className="w-full rounded-md border border-border-default bg-white p-3 text-left transition-colors hover:border-accent"
                >
                  <p className="text-[14px] font-semibold text-text-primary">{account.name}</p>
                  <p className="mt-1 text-[13px] text-text-secondary">{account.email}</p>
                  <p className="text-[13px] text-text-secondary">Password: {account.password}</p>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
