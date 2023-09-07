import React, { useRef } from "react";

import "./App.css";
// const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
const initialOptions = {
  clientId:
    "AdoQUb986Cigyd6JiPQYo8h9S7Rh3TIwvQiAE4_4VAUJYHOZ25Fnfa2xC2FhxKwqfxMcx5X12x021RXJ",
  currency: "PHP",
  intent: "capture",
};
function App() {
  const textboxRef = useRef(null);
  // function _createOrder(data, actions) {
  //   const amountDep = textboxRef.current.value;
  //   return actions.order.create({
  //     purchase_units: [
  //       {
  //         amount: {
  //           value: amountDep,
  //         },
  //       },
  //     ],
  //   });
  // }
  // async function _onApprove(data, actions) {
  //   let order = await actions.order.capture();
  //   console.log(order);
  //   window.ReactNativeWebView &&
  //     window.ReactNativeWebView.postMessage(JSON.stringify(order));
  //   return order;
  // }
  // function _onError(err) {
  //   console.log(err);
  //   let errObj = {
  //     err: err,
  //     status: "FAILED",
  //   };
  //   window.ReactNativeWebView &&
  //     window.ReactNativeWebView.postMessage(JSON.stringify(errObj));
  // }

  return (
    <div className="App">
      <PayPalScriptProvider options={initialOptions}>
        <input
          type="text"
          placeholder="Enter amount to deposite"
          ref={textboxRef}
          className="input"
        />
        <PayPalButtons
          style={{ layout: "horizontal" }}
          createOrder={async (data, actions) => {
            const textboxValue = textboxRef.current.value;
            return await actions.order
              .create({
                purchase_units: [
                  {
                    amount: {
                      currency_code: initialOptions.currency,
                      value: parseInt(textboxValue).toFixed(2),
                    },
                    description: "Deposite",
                  },
                ],
              })
              .then((order) => {
                return order;
              });
          }}
          onApprove={async (data, actions) => {
            let order = await actions.order.capture();
            console.log(order);
            window.ReactNativeWebView &&
              window.ReactNativeWebView.postMessage(JSON.stringify(order));
            return order;
          }}
        />
      </PayPalScriptProvider>
    </div>
  );
}
export default App;
