export const orderStatuses: Record<string, Record<string, string>> = {
  newOrders: {
    color: "#FEE2A8", // brighter yellow-100
    textColor: "#B45309", // darker yellow-700
    message: "Your order has been placed and is waiting for confirmation.",
    modalMessage: 'Are you sure you have enough stock to prepare and send the order? If not, please cancel it. If you encounter any issues, contact us.',
    buttonMessage: 'Confirm the order',
    index: '0',
  },
  processingOrders: {
    color: "#C7D2FE", // brighter indigo-100
    textColor: "#4F46E5", // darker indigo-700
    message: "Your order is being processed and is getting ready for shipment.",
    modalMessage: 'Are you sure you have shipped the order? If the buyer does not receive it, we cannot transfer the money to you. If you encounter any issues, contact us.',
    buttonMessage: 'Ship the order',
    index: '1',
  },
  sentOrders: {
    color: "#FED7AA", // brighter orange-100
    textColor: "#9C4D15", // darker orange-700
    message: "Your order is in transit and will arrive soon.",
    buyerModalMessage: 'If you have received the order and everything is in order, please confirm the receipt of the order.',
    index: '2',
  },
  doneOrders: {
    color: "#D1FAE5", // brighter green-100
    textColor: "#065F46", // darker green-700
    message: "Your order has been successfully delivered.",
    index: '3',
  },
  failedOrders: {
    color: "#FEE2E2", // brighter red-100
    textColor: "#B91C1C", // darker red-700
    message: "The payment or order processing has failed. Please try again.",
    index: '4',
  },
};
