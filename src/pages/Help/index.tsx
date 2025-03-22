import { useState } from "react";
import { Form, Input, Button, notification } from "antd";
import { SendOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { RootState } from "../../state-management/redux/store";
import { useSelector } from "react-redux";
import emailjs from "emailjs-com";

const Help = () => {
    const [loading, setLoading] = useState(false);
    const { userData } = useSelector((store: RootState) => store.userData.authUserInfo);
    const [ form ] = Form.useForm();
    const sendMessage = async (values:Record<string, unknown>) => {
        setLoading(true);

        try{
            const response = await emailjs.send(
                import.meta.env.VITE_MY_SERVICE_ID as string,
                import.meta.env.VITE_TEMPLATE_ID as string,
                values,
                import.meta.env.VITE_API_KEY as string,
            );

            if (response.status === 200) {
                notification.success({
                    message: "Հաղորդագրությունը ուղարկվեց!",
                    description: "Մենք կպատասխանենք շուտով։",
                });
            }

        }catch(error){
            notification.error({
                message: "Տեղեկություն",
                description: "Հաղորդագրությունը ուղարկելու ժամանակ սխալ տեղի ունեցավ։ Փորձեք նորից։",
            });
        }finally{
            setLoading(false);
            form.resetFields();
        }
    };

    return (
        <Form 
        form={form}
        layout="vertical" 
        onFinish={sendMessage}
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
