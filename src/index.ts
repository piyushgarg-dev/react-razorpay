import * as React from "react";
import Razorpay from "./razorpay";

export type { RazorpayOrderOptions } from "./razorpay";

const NODE_ENV = process.env.NODE_ENV as
  | "dev"
  | "development"
  | "staging"
  | "test"
  | "prod"
  | "production";

const logger = (message: any, ...args: any) => {
  if (NODE_ENV === "prod" || NODE_ENV === "production") return;
  console.log(`[react-razorpay]:`, message, ...args);
};

export const useRazorpay = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | undefined>();

  const isClient = typeof window !== "undefined";

  const checkScriptLoaded = () => {
    if (!isClient) return false;
    if (!("Razorpay" in window)) return false;
    return true;
  };

  function loadScript(src: string) {
    return new Promise<void>((resolve, reject) => {
      const script = window.document.createElement("script");
      script.src = src;
      script.onload = function () {
        resolve();
      };
      script.onerror = function (e) {
        reject(e.toString());
      };
      document.body.appendChild(script);
    });
  }

  React.useEffect(() => {
    logger(`init... (Logs won't appear in production env)`);

    if (!isClient) {
      logger(`server detected! Skipping script loading...`);
      return;
    }

    setIsLoading(true);

    if (!checkScriptLoaded()) {
      logger(`loading script: https://checkout.razorpay.com/v1/checkout.js`);
      loadScript("https://checkout.razorpay.com/v1/checkout.js")
        .then(() => {
          logger(`script loaded success..`);
          setError(undefined);
        })
        .catch((err) => {
          logger(`script loading error`, err);
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError(`Unknown Error`);
          }
        })
        .finally(() => setIsLoading(false));
    }
  }, []);

  return { error, isLoading, Razorpay };
};
