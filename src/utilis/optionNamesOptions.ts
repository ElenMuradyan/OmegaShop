import { SelectProps } from "antd";

export const optionNamesOptions = [
    { label: "Չափս (Size)", value: "size" },
    { label: "Գույն (Color)", value: "color" },
    { label: "Նյութ (Material)", value: "material" },
    { label: "Հզորություն (Power)", value: "power" },
    { label: "Քաշ (Weight)", value: "weight" },
];

export const suboptions:Record<string, SelectProps['options']> = {
    size: [
        { label: "X-Small", value: "X-Small" },
        { label: "Small", value: "Small" },
        { label: "Medium", value: "Medium" },
        { label: "Large", value: "Large" },
        { label: "X-Large", value: "X-Large" },
        { label: "XX-Large", value: "XX-Large" },
        { label: "XXX-Large", value: "XXX-Large" },
        { label: "XXXX-Large", value: "XXXX-Large" },
        { label: "One Size", value: "One Size" }
    ],
    color: [
        { label: "Կարմիր", value: "Կարմիր" },
        { label: "Կապույտ", value: "Կապույտ" },
        { label: "Կանաչ", value: "Կանաչ" },
        { label: "Սև", value: "Սև" },
        { label: "Սպիտակ", value: "Սպիտակ" },
        { label: "Դեղին", value: "Դեղին" },
        { label: "Վարդագույն", value: "Վարդագույն" },
        { label: "Մանուշակագույն", value: "Մանուշակագույն" },
        { label: "Շագանակագույն", value: "Շագանակագույն" },
        { label: "Մոխրագույն", value: "Մոխրագույն" }
    ],
    material: [
        { label: "Բամբակ", value: "Բամբակ" },
        { label: "Կաշի", value: "Կաշի" },
        { label: "Պոլիեսթեր", value: "Պոլիեսթեր" },
        { label: "Փայտ", value: "Փայտ" },
        { label: "Մետաղ", value: "Մետաղ" },
        { label: "Պլաստիկ", value: "Պլաստիկ" },
        { label: "Ապակի", value: "Ապակի" },
        { label: "Մետաքս", value: "Մետաքս" },
        { label: "Բուրդ", value: "Բուրդ" }
    ],
    power: [
        { label: "Ցածր", value: "Ցածր" },
        { label: "Միջին", value: "Միջին" },
        { label: "Բարձր", value: "Բարձր" },
        { label: "Ուլտրա Բարձր", value: "Ուլտրա Բարձր" }
    ],
    weight: [
        { label: "Թեթև", value: "Թեթև" },
        { label: "Միջին", value: "Միջին" },
        { label: "Ծանր", value: "Ծանր" },
        { label: "Շատ Ծանր", value: "Շատ Ծանր" }
    ]
}