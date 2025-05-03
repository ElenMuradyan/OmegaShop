import { Button, Checkbox, Form, Input, notification, Select, Typography } from 'antd';
import { regexpValidation, ROUTE_NAMES } from '../../../../utilis/constants/constants';
import { sellerRegister } from '../../../../typescript/interfaces/register';
import Title from '../../../../components/sheard/TitleComponent';
import { Link, useNavigate } from 'react-router-dom';
import { categoryLabels } from '../../../../typescript/types/categories';
import { options } from '../../../../utilis/constants/sellerTypeOptions';
import { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db } from '../../../../services/firebase/firebase';
import { FIRESTORE_PATH_NAMES } from '../../../../utilis/constants/firebaseConstants';
import { doc, setDoc } from 'firebase/firestore';

const { Text } = Typography;

const SellerRegister = () => {
    const [ form ] = Form.useForm();
    const navigate = useNavigate();
    const [ loading, setLoading ] = useState<boolean>( false );

    const handleSellerRegister = async (values: sellerRegister) => {
        const { firstName, lastName, email, phone, password, region, city, street, postIndex, businessRegion, businessCity, businessStreet, businessPostIndex, businessPhone, shopName, description, type, categories } = values;
        const termsAndConditionsSelected = form.getFieldValue('termsAndConditions');
        const buyerPoliciesSelected = form.getFieldValue('sellerPolicies');
        
        if (!termsAndConditionsSelected || !buyerPoliciesSelected) {
            notification.error({
              message: 'Required Agreement',
              description: 'Please accept the terms and agreements.',
            });
        } else {   
        try{
            setLoading(true);
            const response = await createUserWithEmailAndPassword( auth, email, password );
            const { uid } = response.user;
            const createDoc = doc(db, FIRESTORE_PATH_NAMES.REGISTERED_USERS, uid);
            const address = { region, city, street, postIndex };

            await setDoc(createDoc, {
                uid, firstName, lastName, email, phone, address, role: 'seller', cart: [], orders: [],
            });

            const createSellerDoc = doc(db, FIRESTORE_PATH_NAMES.SELLERS, uid);
            const businessAddress = { businessRegion, businessCity, businessStreet, businessPostIndex, businessPhone };

            await setDoc(createSellerDoc, { uid, email, businessAddress, shopName, description, type, categories, myproducts: [], newOrders: [], sentOrders: [], doneOrders: [], processingOrders: [], returnedProducts: [] });
            notification.success({
                message: "Registration Successful",
                description: "Your account has been successfully created."
            });

            localStorage.removeItem('SellerFormValues');
            localStorage.removeItem('navigateAddress');

            await updateProfile(response.user, {
                displayName: 'seller'
            })

            form.resetFields();
            navigate(ROUTE_NAMES.LOGIN);
        } catch (error: any) {
            notification.error({
                message: "Registration Failed",
                description: error.message
            });
        }finally{
            setLoading(false);
        }
    }};

    const handleNavigate = () => {
        const values = form.getFieldsValue();
        localStorage.setItem('SellerFormValues', JSON.stringify(values));
        localStorage.setItem('navigateAddress', ROUTE_NAMES.SELLERREGISTER);
    };

    useEffect(() => {
        const savedValues = localStorage.getItem('SellerFormValues');
        if (savedValues) {
            form.setFieldsValue(JSON.parse(savedValues));
          }
    }, []);

    
    return(
        <div className="flex flex-col justify-center items-center min-h-screen text-center bg-gray-50 p-6">
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-red-600">
        IF YOU ARE ALREADY REGISTERED WITH THIS EMAIL AS A BUYER, PLEASE REGISTER WITH A NEW EMAIL CREATED FOR BUSINESS USE.
        </p>
        <Form
            layout="vertical"
            onFinish={handleSellerRegister}
            form={form}
            className='bg-white w-full shadow-lg rounded-lg p-8 mt-6'
        >
            <h2 className="text-2xl font-bold text-center">REGISTER</h2>
            <hr />

            <h3 className="text-lg font-semibold text-gray-700 text-center"><Title text1='PERSONAL' text2='INFORMATION' /></h3>

            <Form.Item
            label={<Text className="font-semibold">First Name</Text>}
            name="firstName"
            rules={[{ required: true, message: 'Please enter your first name.' }]}
            >
            <Input placeholder="Enter your first name." className="border border-gray-300 rounded-lg py-3 px-4" />
            </Form.Item>

            <Form.Item
            label={<Text className="font-semibold">Last Name</Text>}
            name="lastName"
            rules={[{ required: true, message: 'Please enter your last name.' }]}
            >
            <Input placeholder="Enter your last name." className="border border-gray-300 rounded-lg py-3 px-4" />
            </Form.Item>

            <Form.Item
            label={<Text className="font-semibold">Email</Text>}
            name="email"
            rules={[{ required: true, message: 'Please enter your email.' }]}
            >
            <Input type="email" placeholder="Enter your email." className="border border-gray-300 rounded-lg py-3 px-4" />
            </Form.Item>

            <Form.Item
            label={<Text className="font-semibold">Phone Number</Text>}
            name="phone"
            rules={[{ required: true, message: 'Please enter your phone number.' }]}
            >
            <Input type="tel" placeholder="Enter your phone number." className="border border-gray-300 rounded-lg py-3 px-4" />
            </Form.Item>

            <Form.Item
            label={<Text className="font-semibold">Password</Text>}
            name="password"
            tooltip="Password must be between 6-16 characters, contain at least one number (0-9), one special character (!@#$%^&*), and both uppercase and lowercase letters."
            rules={[{ required: true, message: 'Please enter your password.' }, { pattern: regexpValidation, message: 'Password is too simple.' }]}
            >
            <Input.Password placeholder="Enter your password." className="border border-gray-300 rounded-lg py-3 px-4" />
            </Form.Item>

            <h3 className="text-lg font-semibold text-gray-700 text-center"><Title text1='YOUR' text2='ADDRESS' /></h3>

            <Form.Item
            label={<Text className="font-semibold">Region</Text>}
            name="region"
            rules={[{ required: true, message: 'Please enter your region.' }]}
            >
            <Input placeholder="Enter your region." className="border border-gray-300 rounded-lg py-3 px-4" />
            </Form.Item>

            <Form.Item
            label={<Text className="font-semibold">City</Text>}
            name="city"
            rules={[{ required: true, message: 'Please enter your city.' }]}
            >
            <Input placeholder="Enter your city." className="border border-gray-300 rounded-lg py-3 px-4" />
            </Form.Item>

            <Form.Item
            label={<Text className="font-semibold">Street</Text>}
            name="street"
            rules={[{ required: true, message: 'Please enter your street.' }]}
            >
            <Input placeholder="Enter your street." className="border border-gray-300 rounded-lg py-3 px-4" />
            </Form.Item>

            <Form.Item
            label={<Text className="font-semibold">Postal Code</Text>}
            name="postIndex"
            rules={[{ required: true, message: 'Please enter your postal code.' }, { pattern: /^[0-9]{4,6}$/, message: 'Enter a valid postal code.' }]}
            >
            <Input placeholder="Enter your postal code." className="border border-gray-300 rounded-lg py-3 px-4" />
            </Form.Item>

            <h2 className="text-2xl font-bold text-center">BUSINESS INFORMATION</h2>

            <h3 className="text-lg font-semibold text-gray-700 text-center"><Title text1='YOUR BUSINESS' text2='ADDRESS' /></h3>

            <Form.Item
            label={<Text className="font-semibold">Region</Text>}
            name="businessRegion"
            rules={[{ required: true, message: 'Please enter the region.' }]}
            >
            <Input placeholder="Enter the region." className="border border-gray-300 rounded-lg py-3 px-4" />
            </Form.Item>

            <Form.Item
            label={<Text className="font-semibold">City</Text>}
            name="businessCity"
            rules={[{ required: true, message: 'Please enter the city.' }]}
            >
            <Input placeholder="Enter the city." className="border border-gray-300 rounded-lg py-3 px-4" />
            </Form.Item>

            <Form.Item
            label={<Text className="font-semibold">Street</Text>}
            name="businessStreet"
            rules={[{ required: true, message: 'Please enter the street.' }]}
            >
            <Input placeholder="Enter the street." className="border border-gray-300 rounded-lg py-3 px-4" />
            </Form.Item>

            <Form.Item
            label={<Text className="font-semibold">Postal Code</Text>}
            name="businessPostIndex"
            rules={[{ required: true, message: 'Please enter the postal code.' }, { pattern: /^[0-9]{4,6}$/, message: 'Enter a valid postal code.' }]}
            >
            <Input placeholder="Enter the postal code." className="border border-gray-300 rounded-lg py-3 px-4" />
            </Form.Item>

            <Form.Item
            label={<Text className="font-semibold">Business Phone</Text>}
            name="businessPhone"
            rules={[{ required: true, message: 'Please enter the business phone.' }]}
            >
            <Input placeholder="Enter the business phone." className="border border-gray-300 rounded-lg py-3 px-4" />
            </Form.Item>

            <h3 className="text-lg font-semibold text-gray-700 text-center"><Title text1='SHOP' text2='DETAILS' /></h3>

            <Form.Item
            label={<Text className="font-semibold">Shop Name</Text>}
            name="shopName"
            rules={[{ required: true, message: 'Please enter your shop name.' }]}
            >
            <Input placeholder="Enter your shop name." className="border border-gray-300 rounded-lg py-3 px-4" />
            </Form.Item>

            <Form.Item
            label={<Text className="font-semibold">Business Description</Text>}
            name="description"
            rules={[{ required: true, message: 'Please enter your business description.' }]}
            >
            <Input.TextArea placeholder="Describe your business." className="border border-gray-300 rounded-lg py-3 px-4" />
            </Form.Item>

            <Form.Item
            label={<Text className="font-semibold">Seller Type</Text>}
            name="type"
            rules={[{ required: true, message: 'Please select the seller type.' }]}
            >
            <Select placeholder="Select your seller type." options={options} className="border border-gray-300 rounded-lg py-3 px-4" />
            </Form.Item>

            <Form.Item
            label={<Text className="font-semibold">Business Categories</Text>}
            name="categories"
            rules={[{ required: true, message: 'Please select business categories.' }]}
            >
            <Select
            mode="multiple"
            placeholder="Select your business categories."
            options={categoryLabels}
            className="border border-gray-300 rounded-lg py-3 px-4"
            />
            </Form.Item>
    
            <h3 className="text-lg font-semibold text-gray-700 text-center"><Title text1='AGREEMENTS' text2='AND POLICIES' /></h3>
    
            <Form.Item
            name="termsAndConditions"
            valuePropName="checked"
            rules={[{ validator: (_, value) => value ? Promise.resolve() : Promise.reject('You must accept the terms and conditions.') }]}
            >
            <Checkbox>I accept the <Link to="/terms-and-conditions">Terms and Conditions</Link>.</Checkbox>
            </Form.Item>
    
            <Form.Item
            name="sellerPolicies"
            valuePropName="checked"
            rules={[{ validator: (_, value) => value ? Promise.resolve() : Promise.reject('You must accept the seller policies.') }]}
            >
            <Checkbox>I accept the <Link to="/seller-policies">Seller Policies</Link>.</Checkbox>
            </Form.Item>
    
            <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading} onClick={handleNavigate}>
                Register
            </Button>
            </Form.Item>
    
            <p className="text-sm text-center">
                Already have an account? <Link to={ROUTE_NAMES.LOGIN} className="font-semibold">Login here</Link>.
            </p>
        </Form>
        </div>
    )   
} 
export default SellerRegister;