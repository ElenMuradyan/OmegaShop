import { Button, Checkbox, Form, Input, notification, Typography } from 'antd';
import { regexpValidation, ROUTE_NAMES } from '../../../../../../utilis/constants/constants';
import { buyerRegister } from '../../../../../../typescript/interfaces/register';
import Title from '../../../../../../components/sheard/TitleComponent';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db } from '../../../../../../services/firebase/firebase';
import { FIRESTORE_PATH_NAMES } from '../../../../../../utilis/constants/firebaseConstants';
import { doc, setDoc } from 'firebase/firestore';

const { Text } = Typography;

const BuyerRegister = () => {
     const [ form ] = Form.useForm();
     const navigate = useNavigate();
     const [ loading, setLoading ] = useState<boolean>( false );

     const handleBuyerRegister = async (values: buyerRegister) => {
        const { firstName, lastName, email, phone, password, region, city, street, postIndex } = values;
        const termsAndConditionsSelected = form.getFieldValue('termsAndConditions');
        const buyerPoliciesSelected = form.getFieldValue('buyerPolicies');
        
        if (!termsAndConditionsSelected || !buyerPoliciesSelected) {
            notification.error({
                message: 'Mandatory Agreement',
                description: 'Please accept the terms and conditions.',
            });
        } else {   
            try {
                setLoading(true);
                const response = await createUserWithEmailAndPassword(auth, email, password);
                const { uid } = response.user;
                const createDoc = doc(db, FIRESTORE_PATH_NAMES.REGISTERED_USERS, uid);
                const address = { region, city, street, postIndex };
    
                await setDoc(createDoc, {
                    uid, firstName, lastName, email, phone, address, role: 'buyer', cart: [], orders: [],
                });
    
                localStorage.removeItem('BuyerFormValues');
                localStorage.removeItem('navigateAddress');
                notification.success({
                    message: "Registration Successful",
                    description: "Your account has been successfully created."
                });
    
                await updateProfile(response.user, {
                    displayName: 'buyer'
                });
    
                form.resetFields();
                navigate(ROUTE_NAMES.LOGIN);
            } catch (error: any) {
                notification.error({
                    message: "Registration Failed",
                    description: error.message
                });
            } finally {
                setLoading(false);
            }
        }
    };
    
    const handleNavigate = () => {
        const values = form.getFieldsValue();
        localStorage.setItem('BuyerFormValues', JSON.stringify(values));
        localStorage.setItem('navigateAddress', ROUTE_NAMES.BUYERREGISTER);
    };
    
    useEffect(() => {
        const savedValues = localStorage.getItem('BuyerFormValues');
        if (savedValues) {
            form.setFieldsValue(JSON.parse(savedValues));
        }
    }, []);
    
    return(
<div className="flex flex-col justify-center items-center min-h-screen text-center bg-gray-50 p-6">
    <Form
        layout="vertical"
        onFinish={handleBuyerRegister}
        form={form}
        className='bg-white w-full shadow-lg rounded-lg p-8 mt-6'
    >
        <h2 className="text-2xl font-bold text-center">REGISTER</h2>
        <hr />

        <h3 className="text-lg font-semibold text-gray-700 text-center"><Title text1='PERSONAL' text2='DETAILS' /></h3>

        {/* First Name */}
        <Form.Item
        label={<Text className="font-semibold">First Name</Text>}
        name="firstName"
        rules={[{ required: true, message: 'Please enter your first name.' }]}
        >
        <Input placeholder="Please enter your first name." className="border border-gray-300 rounded-lg py-3 px-4" />
        </Form.Item>

        {/* Last Name */}
        <Form.Item
        label={<Text className="font-semibold">Last Name</Text>}
        name="lastName"
        rules={[{ required: true, message: 'Please enter your last name.' }]}
        >
        <Input placeholder="Please enter your last name." className="border border-gray-300 rounded-lg py-3 px-4" />
        </Form.Item>

        {/* Email */}
        <Form.Item
        label={<Text className="font-semibold">Email</Text>}
        name="email"
        rules={[{ required: true, message: 'Please enter your email.' }]}
        >
        <Input type="email" placeholder="Please enter your email." className="border border-gray-300 rounded-lg py-3 px-4" />
        </Form.Item>

        {/* Phone */}
        <Form.Item
        label={<Text className="font-semibold">Phone Number</Text>}
        name="phone"
        rules={[{ required: true, message: 'Please enter your phone number.' }]}
        >
        <Input type="tel" placeholder="Please enter your phone number." className="border border-gray-300 rounded-lg py-3 px-4" />
        </Form.Item>

        {/* Password */}
        <Form.Item
        label={<Text className="font-semibold">Password</Text>}
        name="password"
        tooltip="Password must be between 6 to 16 characters, contain at least 1 number (0-9), 1 special character (!@#$%^&*), and both uppercase and lowercase letters."
        rules={[ 
            { required: true, message: 'Please enter your password.' },
            { pattern: regexpValidation, message: 'Password is too simple.' },
        ]}
        >
        <Input.Password placeholder="Please enter your password." className="border border-gray-300 rounded-lg py-3 px-4" />
        </Form.Item>

        <h3 className="text-lg font-semibold text-gray-700 text-center"><Title text1='YOUR' text2='ADDRESS' /></h3>

        {/* Region */}
        <Form.Item
        label={<Text className="font-semibold">Region</Text>}
        name="region"
        rules={[{ required: true, message: 'Please enter your region.' }]}
        >
        <Input placeholder="Please enter your region." className="border border-gray-300 rounded-lg py-3 px-4" />
        </Form.Item>

        {/* City */}
        <Form.Item
        label={<Text className="font-semibold">City</Text>}
        name="city"
        rules={[{ required: true, message: 'Please enter your city.' }]}
        >
        <Input placeholder="Please enter your city." className="border border-gray-300 rounded-lg py-3 px-4" />
        </Form.Item>

        {/* Street */}
        <Form.Item
        label={<Text className="font-semibold">Street</Text>}
        name="street"
        rules={[{ required: true, message: 'Please enter your street.' }]}
        >
        <Input placeholder="Please enter your street." className="border border-gray-300 rounded-lg py-3 px-4" />
        </Form.Item>

        {/* Postal Code */}
        <Form.Item
        label={<Text className="font-semibold">Postal Code</Text>}
        name="postIndex"
        rules={[ 
            { required: true, message: 'Please enter your postal code.' },
            { pattern: /^[0-9]{4,6}$/, message: 'Please enter a valid postal code.' },
        ]}
        >
        <Input placeholder="Please enter your postal code." className="border border-gray-300 rounded-lg py-3 px-4" />
        </Form.Item>

        <Form.Item
        name="termsAndConditions"
        valuePropName="checked"
        rules={[{ required: true, message: 'You must read and agree to the terms and conditions.' }]} >
        <Checkbox onChange={(e) => form.setFieldValue('termsAndConditions', e.target.checked)} /><Link to={ROUTE_NAMES.BUYERCONTRACT} onClick={() => handleNavigate()}>Terms and Conditions</Link>
        </Form.Item>

        <Form.Item
        name="buyerPolicies"
        valuePropName="checked"
        rules={[{ required: true, message: 'I agree to the seller’s policies.' }]}>
        <Checkbox onChange={(e) => form.setFieldValue('buyerPolicies', e.target.checked)} /><Link to={ROUTE_NAMES.TERMSANDCONDITIONS} onClick={() => handleNavigate()}>I agree to the seller’s policies.</Link>
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
            REGISTER
        </Button>

        <Link to={ROUTE_NAMES.LOGIN} className="text-blue-600 hover:underline">
            LOGIN
        </Link>
        </div>
    </Form>
</div>
);
};      
export default BuyerRegister;