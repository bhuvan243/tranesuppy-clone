import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { AuthProvider } from "@/context/AuthContext";
import { ToastProvider } from "@/context/ToastContext";

export const metadata: Metadata = {
	title: "TraneSupply",
	description: "Shop HVAC parts, equipment, and supplies.",
};

/**
 * Minimal root layout - just <html>/<body> and the global providers.
 * Header/Footer are NOT rendered here on purpose: they're added by the
 * (site) route group's layout instead, so auth pages (login/register),
 * which live in the (auth) route group, render chrome-free.
 */
export default function RootLayout({ children }: LayoutProps<"/">) {
	return (
		<html lang="en" className="h-full antialiased">
			<body className="min-h-full flex flex-col">
				<AuthProvider>
					<LanguageProvider>
						<ToastProvider>{children}</ToastProvider>
					</LanguageProvider>
				</AuthProvider>
			</body>
		</html>
	);
}
