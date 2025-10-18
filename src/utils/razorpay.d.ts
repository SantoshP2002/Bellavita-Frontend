declare global {
  interface RazorpayOptions {
    key: string;
    amount: number;
    currency: string;
    name: string;
    description: string;
    image?: string;
    order_id?: string;
    handler?: (response: { [key: string]: string }) => void;
    prefill?: {
      name?: string;
      email?: string;
    };
    notes?: { [key: string]: string };
    theme?: { color?: string };
  }

  interface RazorpayInstance {
    open: () => void;
    close: () => void;
    on(event: string, callback: () => void): void;
    off(event: string, callback: () => void): void;
  }

  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance; // ✅ constructor
  }
}
export {};
