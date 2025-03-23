import { FormInstance } from "antd";

export interface sendMessageInterface {
    values:Record<string, unknown>,
    form: FormInstance,
    setLoading: (loading: boolean) => void,
}