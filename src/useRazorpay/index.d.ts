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
declare class Razorpay {
    private options;
    private rzrpayInstannce;
    constructor(options: RazorpayOptions);
    on(event: string, callback: Function): void;
    open(): void;
}
declare const useRazorpay: () => typeof Razorpay;
export default useRazorpay;
