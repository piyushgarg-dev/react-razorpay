# React Razorpay

Integrate Razorpay Payment gateway in your react application.

## Basic Example

```js
// Import the package
import useRazorpay from "react-razorpay";
```

```js
const [Razorpay] = useRazorpay();

const handlePayment = async (params) => {
  const order = await createOrder(params); //  Create order on your backend

  const options = {
    key: "YOUR_KEY_ID", // Enter the Key ID generated from the Dashboard
    amount: "50000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    currency: "INR",
    name: "Acme Corp",
    description: "Test Transaction",
    image: "https://example.com/your_logo",
    order_id: "order_9A33XWu170gUtm", //This is a sample Order ID. Pass the `id` obtained in the response of createOrder().
    handler: function (response) {
      alert(response.razorpay_payment_id);
      alert(response.razorpay_order_id);
      alert(response.razorpay_signature);
    },
    prefill: {
      name: "Piyush Garg",
      email: "youremail@example.com",
      contact: "9999999999",
    },
    notes: {
      address: "Razorpay Corporate Office",
    },
    theme: {
      color: "#3399cc",
    },
  };

  const rzp1 = new Razorpay(options);

  rzp1.on("payment.failed", function (response) {
    alert(response.error.code);
    alert(response.error.description);
    alert(response.error.source);
    alert(response.error.step);
    alert(response.error.reason);
    alert(response.error.metadata.order_id);
    alert(response.error.metadata.payment_id);
  });

  rzp1.open();
};
```

Offical Docs of Razorpay: https://razorpay.com/docs/payment-gateway/web-integration/standard/

# Full Code Example

```ts
import { useCallback } from "react";
import useRazorpay from "react-razorpay";

export default function App() {
  const [Razorpay] = useRazorpay();

  const handlePayment = useCallback(() => {
    const order = await createOrder(params);

    const options: RazorpayOptions = {
      key: "YOUR_KEY_ID",
      amount: "3000",
      currency: "INR",
      name: "Acme Corp",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: order.id,
      handler: (res) => {
        console.log(res);
      },
      prefill: {
        name: "Piyush Garg",
        email: "youremail@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzpay = new Razorpay(options);
    rzpay.open();
  }, [Razorpay]);

  return (
    <div className="App">
      <button onClick={handlePayment}>Click</button>
    </div>
  );
}
```

# Full example with trigger on page load

```ts
import { useCallback } from "react";
import useRazorpay from "react-razorpay";

export default function App() {
  const [Razorpay, isLoaded] = useRazorpay();

  const handlePayment = useCallback(() => {
    const order = await createOrder(params);

    const options: RazorpayOptions = {
      key: "YOUR_KEY_ID",
      amount: "3000",
      currency: "INR",
      name: "Acme Corp",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: order.id,
      handler: (res) => {
        console.log(res);
      },
      prefill: {
        name: "Piyush Garg",
        email: "youremail@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzpay = new Razorpay(options);
    rzpay.open();
  }, [Razorpay]);

  useEffect(() => {
    if (isLoaded) {
      handlePayment();
    }
  }, [isLoaded, handlePayment])

  return (
    <div className="App">
      <button onClick={handlePayment}>Click</button>
    </div>
  );
}
```
