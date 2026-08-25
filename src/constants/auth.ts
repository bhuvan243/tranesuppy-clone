export interface DemoAccount {
	email: string;
	password: string;
	name: string;
	accountName: string;
	company: string;
	/** Default "ship to" zip shown in the logged-in header once signed in. */
	shipToZip: string;
}

/** Static demo accounts - no backend, just for testing the logged-in UI. */
export const DEMO_ACCOUNTS: DemoAccount[] = [
	{
		email: "demo1@tranetechnologies.com",
		password: "Demo@123",
		name: "John Doe",
		accountName: "Lennox National Acct SRVS LLC -- old",
		company: "Charlotte Trane Supply",
		shipToZip: "07058",
	},
	{
		email: "demo2@tranetechnologies.com",
		password: "Demo@456",
		name: "Priya Shah",
		accountName: "Lennox National Acct SRVS LLC -- new",
		company: "Austin Trane Supply",
		shipToZip: "73301",
	},
];
