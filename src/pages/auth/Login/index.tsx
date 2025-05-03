import { Button, Form, Input, notification, Typography } from 'antd';
import { ROUTE_NAMES } from '../../../utilis/constants/constants';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../../typescript/interfaces/login';
import { useDispatch } from 'react-redux';
import { fetchUserData } from '../../../state-management/redux/slices/userDataSlice';
import { AppDispatch } from '../../../state-management/redux/store';
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../services/firebase/firebase';

const { Text } = Typography;

const Login = () => {
    const [ form ] = Form.useForm();
    const navigate = useNavigate();
    const [ loading, setLoading ] = useState<boolean>( false );
    const dispatch = useDispatch<AppDispatch>();

    const handleLogin = async (values: login) => {
      setLoading( true );
      try{
      const { email, password } = values;
      await signInWithEmailAndPassword( auth, email, password );
      form.resetFields();
      dispatch(fetchUserData());
      navigate(ROUTE_NAMES.HOME);
      }catch( error ){
              notification.error({
                      message:'Invalid Login Credentials', 
              })
      }finally{
              setLoading( false );
      };
    };

    return (
<div className="flex justify-center items-center min-h-screen bg-gray-50 p-6">
    <Form
        layout="vertical"
        onFinish={handleLogin}
        form={form}
        className="w-full sm:max-w-md p-8 space-y-6"
    >
        <h2 className="text-2xl font-bold text-center">LOGIN</h2>

        {/* Email Field */}
        <Form.Item
            label={<Text className="font-semibold">Email</Text>}
            name="email"
            rules={[{ required: true, message: 'Please enter your email.' }]}
        >
            <Input type="email" placeholder="Please enter your email." className="border border-gray-300 rounded-lg py-3 px-4" />
        </Form.Item>

        {/* Password Field */}
        <Form.Item
            label={<Text className="font-semibold">Password</Text>}
            name="password"
            tooltip="Password must be between 6 to 16 characters, contain at least 1 number (0-9), 1 special character (!@#$%^&*), and both uppercase and lowercase letters."
            rules={[{ required: true, message: 'Please enter your password.' }]}
        >
            <Input.Password placeholder="Please enter your password." className="border border-gray-300 rounded-lg py-3 px-4" />
        </Form.Item>

        {/* Action Buttons */}
        <div className="flex justify-between items-center space-x-4">
            <Button
                type="primary"
                htmlType="submit"
                size="large"
                className="w-full sm:w-auto px-16 py-3 rounded-lg text-white bg-black hover:bg-gray-800"
                loading={loading}
            >
                LOGIN
            </Button>

            <Link to={ROUTE_NAMES.BUYERREGISTER} className="text-blue-600 hover:underline">
                REGISTER
            </Link>
        </div>
        <p className="text-center text-gray-700 text-sm bg-gray-100 py-3 px-4 rounded-lg shadow-md max-w-md mx-auto">
            TO AVOID ISSUES, PLEASE VERIFY YOUR EMAIL ADDRESS THROUGH THE EMAIL SENT TO YOUR INBOX.
        </p>

    </Form>
</div>
    );
};

export default Login;
