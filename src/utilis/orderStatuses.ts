export const orderStatuses: Record<string, Record<string, string>> = {
    pending: {
      color: "#FEE2A8", // brighter yellow-100
      textColor: "#B45309", // darker yellow-700
      message: "Ձեր պատվերը կատարվել է և սպասում է հաստատման։",
    },
    confirmed: {
      color: "#BFDBFE", // brighter blue-100
      textColor: "#1D4ED8", // darker blue-700
      message: "Ձեր պատվերը հաստատվել է և պատրաստման փուլում է։",
    },
    processing: {
      color: "#C7D2FE", // brighter indigo-100
      textColor: "#4F46E5", // darker indigo-700
      message: "Ձեր պատվերը մշակվում է և պատրաստվում առաքման։",
    },
    outForDelivery: {
      color: "#FED7AA", // brighter orange-100
      textColor: "#9C4D15", // darker orange-700
      message: "Ձեր պատվերը առաքման ընթացքում է և շուտով կհասնի։",
    },
    delivered: {
      color: "#D1FAE5", // brighter green-100
      textColor: "#065F46", // darker green-700
      message: "Ձեր պատվերը հաջողությամբ առաքվել է։",
    },
    failed: {
      color: "#FEE2E2", // brighter red-100
      textColor: "#B91C1C", // darker red-700
      message: "Վճարումը կամ պատվերի մշակումը ձախողվել է։ Խնդրում ենք կրկին փորձել։",
    },
  };
  