export const orderStatuses: Record<string, Record<string, string>> = {
    newOrders: {
      color: "#FEE2A8", // brighter yellow-100
      textColor: "#B45309", // darker yellow-700
      message: "Ձեր պատվերը կատարվել է և սպասում է հաստատման։",
      modalMessage: 'Դուք վստահ ե՞ք, որ ունեք բավական քանակ պատվերը պատրաստելու և ուղարկելու համար։ Եթե ոչ, ապա չեղարկեք այն։ Խնդիրներ լինելու դեպքում կապնվեք մեզ հետ։',
      buttonMessage: 'Հաստատել պատվերը',
      index: '0',
    },
    processingOrders: {
      color: "#C7D2FE", // brighter indigo-100
      textColor: "#4F46E5", // darker indigo-700
      message: "Ձեր պատվերը մշակվում է և պատրաստվում առաքման։",
      modalMessage: 'Դուք վստահ ե՞ք, որ ուղարկել եք պատվերը։ Եթե գնորդը այն չստանա մենք չենք կարող ձեզ փոխանցել գումարը։ Խնդիրներ լինելու դեպքում կապնվեք մեզ հետ։',
      buttonMessage: 'Ուղարկել պատվերը',
      index: '1',
    },
    sentOrders: {
      color: "#FED7AA", // brighter orange-100
      textColor: "#9C4D15", // darker orange-700
      message: "Ձեր պատվերը առաքման ընթացքում է և շուտով կհասնի։",
      buyerModalMessage: 'Եթե ստացել եք պատվերը և ամեն ինչ նորմալ է հաստատեք պատվերի ստացումը։',
      index: '2',
    },
    doneOrders: {
      color: "#D1FAE5", // brighter green-100
      textColor: "#065F46", // darker green-700
      message: "Ձեր պատվերը հաջողությամբ առաքվել է։",
      index: '3',
    },
    failedOrders: {
      color: "#FEE2E2", // brighter red-100
      textColor: "#B91C1C", // darker red-700
      message: "Վճարումը կամ պատվերի մշակումը ձախողվել է։ Խնդրում ենք կրկին փորձել։",
      index: '4',
    },
  };