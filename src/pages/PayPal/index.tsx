import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const PayPalCheckout = () => {
    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    💳 Pay with PayPal
                </h2>

                {/* PayPal Script Provider */}
                <PayPalScriptProvider options={{ clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID }}>
                <div className="flex justify-center">
                        <PayPalButtons
                            style={{ layout: "vertical" }}
                            createOrder={(data, actions) => {
                                return actions.order.create({
                                    intent: "CAPTURE",
                                    purchase_units: [
                                        {
                                            amount: {
                                                currency_code: "USD",
                                                value: "10.00",
                                            },
                                        },
                                    ],
                                });
                            }}
                            onApprove={(data, actions) => {
                                if (!actions.order) {
                                    return Promise.reject(new Error("Order action is undefined"));
                                }
                                return actions.order.capture().then((details) => {
                                    alert(`✅ Payment successful! Thank you, ${details?.payer?.name?.given_name}!`);
                                });
                            }}
                        />
                    </div>
                </PayPalScriptProvider>
            </div>
        </div>
    );
};

export default PayPalCheckout;
