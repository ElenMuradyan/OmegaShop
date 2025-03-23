import { useState } from "react";
import { Form, Input, Button } from "antd";
import { SendOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { RootState } from "../../state-management/redux/store";
import { useSelector } from "react-redux";
import { sendMessage } from "../../utilis/helpers/sendMessage";

const Help = () => {
    const [loading, setLoading] = useState(false);
    const { userData } = useSelector((store: RootState) => store.userData.authUserInfo);
    const [ form ] = Form.useForm();
    return (
        <Form 
        form={form}
        layout="vertical" 
        onFinish={(values) => sendMessage({form, setLoading, values})}
        initialValues={{
            from_name: userData ? `${userData.firstName} ${userData.lastName}` : "",
            from_email: userData ? `${userData?.email}` : '',
          }}        
        >
            <Form.Item
                label="Ձեր անունը"
                name="from_name"
                rules={[{ required: true, message: "Խնդրում ենք մուտքագրել ձեր անունը!" }]}>
                <Input placeholder="Մուտքագրեք ձեր անունը" prefix={<UserOutlined />} />
            </Form.Item>

            <Form.Item
                label="Ձեր էլփոստը"
                name="from_email"
                rules={[ 
                    { required: true, message: "Խնդրում ենք մուտքագրել ձեր էլփոստը!" },
                    { type: "email", message: "Մուտքագրեք ճիշտ էլփոստի հասցե!" },
                ]}>
                <Input placeholder="Մուտքագրեք ձեր էլփոստը" prefix={<MailOutlined />}/>
            </Form.Item>

            <Form.Item
                label="Ձեր հաղորդագրությունը"
                name="message"
                rules={[{ required: true, message: "Խնդրում ենք մուտքագրել ձեր հաղորդագրությունը!" }]}>
                <Input.TextArea rows={4} placeholder="Գրեք ձեր հաղորդագրությունը..."  />
            </Form.Item>

            <Button type="primary" htmlType="submit" loading={loading} icon={<SendOutlined />}>
                Ուղարկել հաղորդագրություն
            </Button>
        </Form>
    );
};

export default Help;
