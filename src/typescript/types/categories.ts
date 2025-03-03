import { SelectProps } from "antd";
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
    label: "Հագուստ և Նորաձևություն",
    undercategories: [
      { label: "Տղամարդկանց հագուստ" },
      { label: "Կանացի հագուստ" },
      { label: "Մանկական հագուստ" },
      { label: "Աքսեսուարներ" },
    ],
  },
  {
    label: "Նրբագեղություն և Անձնական խնամք",
    undercategories: [
      { label: "Մաշկի խնամք" },
      { label: "Մազերի խնամք" },
      { label: "Հիգիենա" },
      { label: "Կոսմետիկա" },
    ],
  },
  {
    label: "Տուն և Խոհանոց",
    undercategories: [
      { label: "Խոհարարական պարագաներ" },
      { label: "Պահեստավորման համակարգեր" },
      { label: "Սանրվածքի պարագաներ" },
    ],
  },
  {
    label: "Էլեկտրոնիկա և Տեխնոլոգիա",
    undercategories: [
      { label: "Խելացի սարքեր" },
      { label: "Աքսեսուարներ" },
      { label: "Աուդիո սարքեր և ականջակալներ" },
    ],
  },
  {
    label: "Առողջություն",
    undercategories: [
      { label: "Ֆիթնես պարագաներ" },
      { label: "Բժշկական պարագաներ" },
    ],
  },
  {
    label: "Կահույք և Դիզայն",
    undercategories: [
      { label: "Բնակասենյակի կահույք" },
      { label: "Ննջարան" },
      { label: "Աշխատանքային կահույք" },
    ],
  },
  {
    label: "Խաղալիքներ և Մանկական ապրանքներ",
    undercategories: [
      { label: "Մանկական խաղալիքներ" },
      { label: "Երեխաներին անհրաժեշտ իրեր" },
    ],
  },
  {
    label: "Ավտոմեքենաներ և Գործիքներ",
    undercategories: [
      { label: "Մեքենայի պարագաներ" },
      { label: "Տնային գործիքներ" },
    ],
  },
];

export let categoryLabels: DefaultOptionType[] = Categories.map((item) =>({
    label: item.label,
    value: item.label,
}));