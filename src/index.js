"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
class Razorpay {
    constructor(options) {
        this.options = options;
        this.rzrpayInstannce = new window.Razorpay(this.options);
    }
    on(event, callback) {
        this.rzrpayInstannce.on(event, callback);
    }
    open() {
        this.rzrpayInstannce.open();
    }
}
const useRazorpay = () => {
    /* Constants */
    const RAZORPAY_SCRIPT = "https://checkout.razorpay.com/v1/checkout.js";
    const checkScriptLoaded = react_1.useCallback(() => {
        if (!("Razorpay" in window))
            return false;
        return true;
    }, []);
    const loadScript = react_1.useCallback((scriptUrl) => {
        return new Promise((resolve, reject) => {
            const scriptTag = document.createElement("script");
            scriptTag.src = scriptUrl;
            scriptTag.onload = (ev) => resolve(ev);
            scriptTag.onerror = (err) => reject(err);
            document.body.appendChild(scriptTag);
        });
    }, []);
    react_1.useEffect(() => {
        if (!checkScriptLoaded()) {
            (() => __awaiter(void 0, void 0, void 0, function* () {
                try {
                    yield loadScript(RAZORPAY_SCRIPT);
                }
                catch (error) {
                    throw new Error(error);
                }
            }))();
        }
    }, []);
    return Razorpay;
};
exports.default = useRazorpay;
