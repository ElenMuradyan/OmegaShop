type Category = {
    label: string,
    undercategories: underCategory[]
}

type underCategory = {
    label: string
}

export const Categories: Category[] = [
    {
      label: "Clothing & Fashion",
      undercategories: [
        { label: "Men" },
        { label: "Women" },
        { label: "Kids" },
        { label: "Accessories" },
      ],
    },
    {
      label: "Beauty & Personal Care",
      undercategories: [
        { label: "Skincare" },
        { label: "Haircare" },
        { label: "Hygiene" },
        { label: "Makeup" },
      ],
    },
    {
      label: "Home & Kitchen",
      undercategories: [
        { label: "Cookware" },
        { label: "Storage" },
        { label: "Cleaning Supplies" },
      ],
    },
    {
      label: "Electronics & Gadgets",
      undercategories: [
        { label: "Smart Devices" },
        { label: "Accessories" },
        { label: "Audio & Headphones" },
      ],
    },
    {
      label: "Health & Wellness",
      undercategories: [
        { label: "Fitness Equipment" },
        { label: "Supplements" },
        { label: "Medical Supplies" },
      ],
    },
    {
      label: "Groceries & Food",
      undercategories: [
        { label: "Snacks" },
        { label: "Beverages" },
        { label: "Organic Products" },
      ],
    },
    {
      label: "Furniture & Decor",
      undercategories: [
        { label: "Living Room" },
        { label: "Bedroom" },
        { label: "Office" },
      ],
    },
    {
      label: "Toys & Baby Products",
      undercategories: [
        { label: "Kids’ Toys" },
        { label: "Baby Essentials" },
      ],
    },
    {
      label: "Automotive & Tools",
      undercategories: [
        { label: "Car Accessories" },
        { label: "Home Tools" },
      ],
    },
    {
      label: "Pet Supplies",
      undercategories: [
        { label: "Food" },
        { label: "Accessories" },
        { label: "Grooming" },
      ],
    },
  ];
  