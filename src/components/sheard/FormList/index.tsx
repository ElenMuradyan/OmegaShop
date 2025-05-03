import { Button, Flex, Form, FormInstance, Select } from "antd";
import { optionNamesOptions, suboptions } from "../../../utilis/constants/optionNamesOptions";
import { DeleteOutlined } from "@ant-design/icons";
import { useState } from "react";

const FormList = ({ form }: { form: FormInstance }) => {
    const [selectOptions, setSelectOptions] = useState<string[]>([]);

    const handleDelete = (index: number) => {
        if (!selectOptions || selectOptions.length === 0) return;

        const updatedOptions = selectOptions.filter((_, i) => i !== index);

        const currentOptions = form.getFieldValue("options") || [];
        const updatedFormOptions = currentOptions.filter((_: string, i: number) => i !== index);

        form.setFieldsValue({ options: updatedFormOptions });

        setSelectOptions(updatedOptions);
    };

    return (
        <Form.List name="options">
            {(fields, { add, remove }) => (
                <>
                    {fields.map(({ key, name, ...restField }, index) => (
                        <div key={key} className="flex gap-4 items-center">
                            <Form.Item
                                {...restField}
                                name={[name, "optionName"]}
                                rules={[{ required: true, message: "Please enter the name of the attribute" }]}
                            >
                                <Flex align="center" justify="center">
                                    <Select
                                        value={form.getFieldValue(["options", index, "optionName"])}
                                        defaultValue={selectOptions[index]}
                                        options={optionNamesOptions}
                                        placeholder="Select attribute"
                                        onChange={(value) => {
                                            form.setFieldValue(["options", index, "optionName"], value);
                                            form.setFieldValue(["options", index, "optionValue"], []);

                                            setSelectOptions((prev) => {
                                                const updated = [...prev];
                                                updated[index] = value;
                                                return updated;
                                            });
                                        }}
                                    />

                                    <Button
                                        onClick={() => {
                                            handleDelete(index);
                                            remove(name);
                                        }}
                                    >
                                        <DeleteOutlined />
                                    </Button>
                                </Flex>
                            </Form.Item>

                            <Form.Item
                                {...restField}
                                name={[name, "optionValue"]}
                                rules={[{ required: true, message: "Please enter the value of the attribute" }]}
                            >
                                <Select mode="multiple" style={{ width: 200 }} options={suboptions[selectOptions[name]]} />
                            </Form.Item>
                        </div>
                    ))}
                    <Button type="dashed" onClick={() => add()} className="mt-2">
                        + Add Attribute
                    </Button>
                </>
            )}
        </Form.List>
    );
};

export default FormList;
