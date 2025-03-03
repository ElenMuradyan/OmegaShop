import { useState } from "react";
import { Form, Input, Button, notification, message } from "antd";
import { SendOutlined, MailOutlined, UserOutlined, MessageOutlined } from "@ant-design/icons";
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
                    message: "Message Sent!",
                    description: "We will get back to you soon.",
                });
            }

        }catch(error){
            notification.error({
                message: "Error",
                description: "Failed to send the message. Try again later.",
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
                label="Your Name"
                name="from_name"
                rules={[{ required: true, message: "Please enter your name!" }]}
            >
                <Input placeholder="Enter your name" prefix={<UserOutlined />} />
            </Form.Item>

            <Form.Item
                label="Your Email"
                name="from_email"
                rules={[
                    { required: true, message: "Please enter your email!" },
                    { type: "email", message: "Enter a valid email!" },
                ]}
            >
                <Input placeholder="Enter your email" prefix={<MailOutlined />}/>
            </Form.Item>

            <Form.Item
                label="Your Message"
                name="message"
                rules={[{ required: true, message: "Please enter your message!" }]}
            >
                <Input.TextArea rows={4} placeholder="Write your message..."  />
            </Form.Item>

            <Button type="primary" htmlType="submit" loading={loading} icon={<SendOutlined />}>
                Send Message
            </Button>
        </Form>
    );
};

export default Help;
