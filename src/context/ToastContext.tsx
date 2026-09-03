"use client";

import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState,
	type ReactNode,
} from "react";

export type ToastType = "success" | "error";

interface Toast {
	id: number;
	message: string;
	type: ToastType;
}

interface ToastContextValue {
	showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
	const [toast, setToast] = useState<Toast | null>(null);

	const showToast = useCallback(
		(message: string, type: ToastType = "success") => {
			setToast({ id: Date.now(), message, type });
		},
		[],
	);

	useEffect(() => {
		if (!toast) return;
		const timeout = window.setTimeout(() => setToast(null), 3500);
		return () => window.clearTimeout(timeout);
	}, [toast]);

	return (
		<ToastContext.Provider value={{ showToast }}>
			{children}
			{toast && (
				<div
					key={toast.id}
					className={`app-toast app-toast-${toast.type}`}
					role={toast.type === "error" ? "alert" : "status"}
					aria-live="polite"
				>
					{toast.message}
				</div>
			)}
		</ToastContext.Provider>
	);
}

export function useToast() {
	const context = useContext(ToastContext);
	if (!context)
		throw new Error("useToast must be used within a ToastProvider");
	return context;
}
