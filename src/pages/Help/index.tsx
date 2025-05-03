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
                label="Your Name"
                name="from_name"
                rules={[{ required: true, message: "Please enter your name!" }]}>
                <Input placeholder="Enter your name" prefix={<UserOutlined />} />
            </Form.Item>

            <Form.Item
                label="Your Email"
                name="from_email"
                rules={[ 
                    { required: true, message: "Please enter your email!" },
                    { type: "email", message: "Please enter a valid email address!" },
                ]}>
                <Input placeholder="Enter your email" prefix={<MailOutlined />}/>
            </Form.Item>

            <Form.Item
                label="Your Message"
                name="message"
                rules={[{ required: true, message: "Please enter your message!" }]}>
                <Input.TextArea rows={4} placeholder="Write your message..."  />
            </Form.Item>

            <Button type="primary" htmlType="submit" loading={loading} icon={<SendOutlined />}>
                Send Message
            </Button>
        </Form>
    );
};

export default Help;
