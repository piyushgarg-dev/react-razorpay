import { useEffect, useCallback, useMemo, useState } from "react";

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
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
    method?: "card" | "netbanking" | "wallet" | "emi" | "upi";
  };
  notes?: {};
  theme?: {
    hide_topbar?: boolean;
    color?: string;
    backdrop_color?: string;
  };
  modal?: {
    backdropclose?: boolean;
    escape?: boolean;
    handleback?: boolean;
    confirm_close?: boolean;
    ondismiss?: () => void;
    animation?: boolean;
  };
  subscription_id?: string;
  subscription_card_change?: boolean;
  recurring?: boolean;
  callback_url?: string;
  redirect?: boolean;
  customer_id?: string;
  timeout?: number;
  remember_customer?: boolean;
  readonly?: {
    contact?: boolean;
    email?: boolean;
    name?: boolean;
  };
  hidden?: {
    contact?: boolean;
    email?: boolean;
  };
  send_sms_hash?: boolean;
  allow_rotation?: boolean;
  retry?: {
    enabled?: boolean;
    max_count?: boolean;
  };
  config?: {
    display: {
      language: "en" | "ben" | "hi" | "mar" | "guj" | "tam" | "tel";
    };
  };
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

  const [isLoaded, setIsLoaded] = useState(false);

  const checkScriptLoaded: () => boolean = useCallback(() => {
    if (!isClient || !("Razorpay" in window)) return false;
    return true;
  }, []);

  const loadScript = useCallback((scriptUrl: string) => {
    if (!isClient) return; // Don't execute this function if it's rendering on server side
    return new Promise((resolve, reject) => {
      const scriptTag = document.createElement("script");
      scriptTag.src = scriptUrl;
      scriptTag.onload = (ev) => {
        setIsLoaded(true), resolve(ev);
      };
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

  return [Razorpay, isLoaded] as [typeof Razorpay, boolean];
};

export default useRazorpay;
