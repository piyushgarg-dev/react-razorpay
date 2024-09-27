# React Razorpay Documentation

## Overview

`react-razorpay` is a React library that allows you to easily integrate the Razorpay payment gateway into your React applications. It provides a simple API to load the Razorpay script and handle payments.

## Installation

To install the library, use npm or yarn:

```bash
npm install react-razorpay
```

or

```bash
yarn add react-razorpay
```

## Usage

### Importing the Library

You can import the `useRazorpay` hook and the `Razorpay` class from the library:

```jsx
import { useRazorpay, RazorpayOrderOptions } from "react-razorpay";
```

### Using the `useRazorpay` Hook

The `useRazorpay` hook is used to load the Razorpay script and manage the loading state and errors.

```jsx
const { error, isLoading, Razorpay } = useRazorpay();
```

### Example Component

Here’s an example of how to use the `useRazorpay` hook in a functional component:

```tsx
import React from "react";
import { useRazorpay, RazorpayOrderOptions } from "react-razorpay";

const PaymentComponent = () => {
  const { error, isLoading, Razorpay } = useRazorpay();

  const handlePayment = () => {
    const options: RazorpayOrderOptions = {
      key: "YOUR_RAZORPAY_KEY",
      amount: 50000, // Amount in paise
      currency: "INR",
      name: "Test Company",
      description: "Test Transaction",
      order_id: "order_9A33XWu170gUtm", // Generate order_id on server
      handler: (response) => {
        console.log(response);
        alert("Payment Successful!");
      },
      prefill: {
        name: "John Doe",
        email: "john.doe@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#F37254",
      },
    };

    const razorpayInstance = new Razorpay(options);
    razorpayInstance.open();
  };

  return (
    <div>
      <h1>Payment Page</h1>
      {isLoading && <p>Loading Razorpay...</p>}
      {error && <p>Error loading Razorpay: {error}</p>}
      <button onClick={handlePayment} disabled={isLoading}>
        Pay Now
      </button>
    </div>
  );
};

export default PaymentComponent;
```

### RazorpayOrderOptions

The `RazorpayOrderOptions` interface defines the options you can pass when creating a Razorpay instance. Here are the key properties:

- `key`: Your Razorpay API key.

- `amount`: Amount to be charged (in paise).

- `currency`: Currency code (e.g., "INR").

- `name`: Name of the company.

- `description`: Description of the transaction.

- `order_id`: Unique order ID.

- `handler`: Callback function to handle the payment response.

- `prefill`: Pre-fill customer details (name, email, contact).

- `theme`: Customization options for the Razorpay modal.

### Error Handling

The `useRazorpay` hook provides an `error` state that you can use to display any issues that occur while loading the Razorpay script.

### Conclusion

The `react-razorpay` library simplifies the integration of Razorpay into your React applications. With just a few lines of code, you can set up payment processing and handle user interactions seamlessly. For more details, refer to the [Razorpay documentation](https://razorpay.com/docs/payment-gateway/integration/).
