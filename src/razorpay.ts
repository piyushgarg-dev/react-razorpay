import { CurrencyCode } from "./constants/currency";

interface RazorpayPrefillOpts {
  name?: string;
  email?: string;
  contact?: string;
  method?: "card" | "netbanking" | "wallet" | "emi" | "upi";
}

interface RazorpayThemeOpts {
  hide_topbar?: boolean;
  color?: string;
  backdrop_color?: string;
}

interface RazorpayErrorCallbackResponse {
  error: {
    code: string;
    description: string;
    field: string;
    source: string;
    step: string;
    reason: string;
    metadata: {
      payment_id: string;
      order_id: string;
    };
  };
}

interface RazorpayReadonlyOpts {
  contact?: boolean;
  email?: boolean;
  name?: boolean;
}

interface RazorpayConfigOpts {
  display: {
    language: "en" | "ben" | "hi" | "mar" | "guj" | "tam" | "tel";
  };
}

interface RazorpayModalOpts {
  backdropclose?: boolean;
  escape?: boolean;
  handleback?: boolean;
  confirm_close?: boolean;
  ondismiss?: () => any;
  animation?: boolean;
}

interface RazorpayRetryOpts {
  enabled?: boolean;
}

interface RazorpayHiddenOpts {
  contact?: boolean;
  email?: boolean;
}

interface RazorpaySuccesshandlerArgs {
  razorpay_signature: string;
  razorpay_order_id: string;
  razorpay_payment_id: string;
}

export interface RazorpayOrderOptions {
  key: string;
  amount: number;
  currency: CurrencyCode;
  name: string;
  description?: string;
  image?: string;
  order_id: string;
  prefill?: RazorpayPrefillOpts;
  notes?: string;
  theme?: RazorpayThemeOpts;
  modal?: RazorpayModalOpts;
  subscription_id?: string;
  subscription_card_change?: boolean;
  recurring?: boolean;
  callback_url?: string;
  redirect?: boolean;
  customer_id?: string;
  remember_customer?: boolean;
  timeout?: number;
  readonly?: RazorpayReadonlyOpts;
  hidden?: RazorpayHiddenOpts;
  send_sms_hash?: boolean;
  allow_rotation?: boolean;
  retry?: RazorpayRetryOpts;
  config?: RazorpayConfigOpts;
  handler?: (response: RazorpaySuccesshandlerArgs) => any;
}

class Razorpay {
  private readonly options: RazorpayOrderOptions;
  private readonly instance: any | undefined = undefined;

  constructor(options: RazorpayOrderOptions) {
    this.options = options;
    if (typeof window !== "undefined")
      this.instance = new (window as any).Razorpay(this.options);
  }

  public on(
    event: "payment.failed",
    cb: (response: RazorpayErrorCallbackResponse) => void
  ) {
    if (!this.instance) throw new Error(`Razorpay Instance in not ready`);
    this.instance.on(event, cb);
  }

  public open() {
    if (!this.instance) throw new Error(`Razorpay Instance in not ready`);
    this.instance.open();
  }
}

export default Razorpay;
