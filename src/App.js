// import React, { useRef } from "react";

import "./App.css";
// const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
const initialOptions = {
  clientId: process.env.REACT_APP_PAYPAL_ID,
  currency: process.env.REACT_APP_CURRENCY,
  intent: "capture",
};
function App() {
  // const textboxRef = useRef(null);
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
  console.log(process.env.REACT_APP_PAYPAL_ID);
  return (
    <div className="App">
      <PayPalScriptProvider options={initialOptions}>
        {/* <input
          type="text"
          placeholder="Enter amount to deposite"
          ref={textboxRef}
          className="input"
        /> */}
        <PayPalButtons
          style={{ layout: "horizontal" }}
          createOrder={async (data, actions) => {
            // const textboxValue = textboxRef.current.value;
            const urlParams = new URLSearchParams(window.location.search);
            const amount = urlParams.get("amount");
            return await actions.order
              .create({
                purchase_units: [
                  {
                    amount: {
                      currency_code: initialOptions.currency,
                      value: parseInt(amount).toFixed(2),
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
          onError={(error) => {
            console.log(error);
            window.ReactNativeWebView &&
              window.ReactNativeWebView.postMessage(JSON.stringify(error));
          }}
        />
      </PayPalScriptProvider>
    </div>
  );
}
export default App;
