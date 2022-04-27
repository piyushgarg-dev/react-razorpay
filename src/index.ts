import { useEffect, useCallback, useMemo } from "react";

interface RazorpaySuccesshandlerArgs {
  razorpay_signature: string;
  razorpay_order_id: string;
  razorpay_payment_id: string;
}

export interface RazorpayOptions {
  key: string;
  amount: string;
  currency: string;
  name: string;
  description?: string;
  image?: string;
  order_id: string;
  handler?: (args: RazorpaySuccesshandlerArgs) => void;
  prefill?: {};
  notes?: {};
  theme?: {};
}

class Razorpay {
  private options: RazorpayOptions;
  private rzrpayInstannce: any;

  constructor(options: RazorpayOptions) {
    this.options = options;
    if (typeof window !== "undefined")
      this.rzrpayInstannce = new (window as any).Razorpay(this.options);
  }

  public on(event: string, callback: Function) {
    this.rzrpayInstannce.on(event, callback);
  }

  public open() {
    this.rzrpayInstannce.open();
  }
}

const useRazorpay = () => {
  /* Constants */
  const RAZORPAY_SCRIPT = "https://checkout.razorpay.com/v1/checkout.js";

  const isClient = useMemo(() => typeof window !== "undefined", []);

  const checkScriptLoaded: () => boolean = useCallback(() => {
    if (!isClient || !("Razorpay" in window)) return false;
    return true;
  }, []);

  const loadScript = useCallback((scriptUrl: string) => {
    if (!isClient) return; // Don't execute this function if it's rendering on server side
    return new Promise((resolve, reject) => {
      const scriptTag = document.createElement("script");
      scriptTag.src = scriptUrl;
      scriptTag.onload = (ev) => resolve(ev);
      scriptTag.onerror = (err) => reject(err);
      document.body.appendChild(scriptTag);
    });
  }, []);

  useEffect(() => {
    if (!checkScriptLoaded()) {
      (async () => {
        try {
          await loadScript(RAZORPAY_SCRIPT);
        } catch (error: any) {
          throw new Error(error);
        }
      })();
    }
  }, []);

  return Razorpay;
};

export default useRazorpay;
