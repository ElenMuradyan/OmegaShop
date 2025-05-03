import { DefaultOptionType } from "antd/es/select";
type Category = {
  label: string,
  undercategories: underCategory[]
}

type underCategory = {
  label: string
}

export const Categories: Category[] = [
  {
    label: "Clothing and Fashion",
    undercategories: [
      { label: "Men's Clothing" },
      { label: "Women's Clothing" },
      { label: "Kids' Clothing" },
      { label: "Accessories" },
    ],
  },
  {
    label: "Beauty and Personal Care",
    undercategories: [
      { label: "Skin Care" },
      { label: "Hair Care" },
      { label: "Hygiene" },
      { label: "Cosmetics" },
    ],
  },
  {
    label: "Home and Kitchen",
    undercategories: [
      { label: "Cookware" },
      { label: "Storage Systems" },
      { label: "Hair Styling Tools" },
    ],
  },
  {
    label: "Electronics and Technology",
    undercategories: [
      { label: "Smart Devices" },
      { label: "Accessories" },
      { label: "Audio Devices and Headphones" },
    ],
  },
  {
    label: "Health",
    undercategories: [
      { label: "Fitness Equipment" },
      { label: "Medical Equipment" },
    ],
  },
  {
    label: "Furniture and Design",
    undercategories: [
      { label: "Living Room Furniture" },
      { label: "Bedroom" },
      { label: "Office Furniture" },
    ],
  },
  {
    label: "Toys and Baby Products",
    undercategories: [
      { label: "Children's Toys" },
      { label: "Essential Baby Items" },
    ],
  },
  {
    label: "Automobiles and Tools",
    undercategories: [
      { label: "Car Accessories" },
      { label: "Home Tools" },
    ],
  },
];

export const categoryLabels: DefaultOptionType[] = Categories.map((item) =>({
    label: item.label,
    value: item.label,
}));
