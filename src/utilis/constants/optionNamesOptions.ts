import { SelectProps } from "antd";

export const optionNamesOptions = [
    { label: "Size", value: "size" },
    { label: "Color", value: "color" },
    { label: "Material", value: "material" },
    { label: "Power", value: "power" },
    { label: "Weight", value: "weight" },
];

export const names: Record<string, string> = {
    size: 'size',
    color: 'color',
    material: 'material',
    power: 'power',
    weight: 'weight',
}

export const cartNames: Record<string, string> = {
    size: 'Size',
    color: 'Color',
    material: 'Material',
    power: 'Power',
    weight: 'Weight',
}

export const suboptions: Record<string, SelectProps['options']> = {
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
        { label: "Red", value: "Red" },
        { label: "Blue", value: "Blue" },
        { label: "Green", value: "Green" },
        { label: "Black", value: "Black" },
        { label: "White", value: "White" },
        { label: "Yellow", value: "Yellow" },
        { label: "Pink", value: "Pink" },
        { label: "Purple", value: "Purple" },
        { label: "Brown", value: "Brown" },
        { label: "Gray", value: "Gray" }
    ],
    material: [
        { label: "Cotton", value: "Cotton" },
        { label: "Leather", value: "Leather" },
        { label: "Polyester", value: "Polyester" },
        { label: "Wood", value: "Wood" },
        { label: "Metal", value: "Metal" },
        { label: "Plastic", value: "Plastic" },
        { label: "Glass", value: "Glass" },
        { label: "Silk", value: "Silk" },
        { label: "Wool", value: "Wool" }
    ],
    power: [
        { label: "Low", value: "Low" },
        { label: "Medium", value: "Medium" },
        { label: "High", value: "High" },
        { label: "Ultra High", value: "Ultra High" }
    ],
    weight: [
        { label: "Light", value: "Light" },
        { label: "Medium", value: "Medium" },
        { label: "Heavy", value: "Heavy" },
        { label: "Very Heavy", value: "Very Heavy" }
    ]
}