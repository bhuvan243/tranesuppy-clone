export interface DemoAccount {
  email: string;
  password: string;
  name: string;
  company: string;
  /** Default "ship to" zip shown in the logged-in header once signed in. */
  shipToZip: string;
}

/** Static demo accounts - no backend, just for testing the logged-in UI. */
export const DEMO_ACCOUNTS: DemoAccount[] = [
  {
    email: "demo1@hvacdirect.com",
    password: "Demo@123",
    name: "John Doe",
    company: "Charlotte HVAC Supply",
    shipToZip: "07058",
  },
  {
    email: "demo2@hvacdirect.com",
    password: "Demo@456",
    name: "Priya Shah",
    company: "Austin HVAC Supply",
    shipToZip: "73301",
  },
];
