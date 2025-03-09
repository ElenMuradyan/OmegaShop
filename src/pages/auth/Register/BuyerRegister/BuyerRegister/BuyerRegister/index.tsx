import { Button, Form, Input, notification, Typography } from 'antd';
import { regexpValidation, ROUTE_NAMES } from '../../../../../../utilis/constants';
import { buyerRegister } from '../../../../../../typescript/interfaces/register';
import Title from '../../../../../../components/sheard/Title';
import { supabase } from '../../../../../../services/supabase/supabase';
import { Link, useNavigate } from 'react-router-dom';

const { Text } = Typography;

const BuyerRegister = () => {
     const [ form ] = Form.useForm();
     const navigate = useNavigate();

     const handleRegister = async (values: buyerRegister) => {
        const { firstName, lastName, email, phone, password, region, city, street, postIndex } = values;
        
        try {
            const user1 = supabase.auth.getUser();
            if (!user1) {
            throw new Error("User is not authenticated.");
            } else {
            console.log("User authenticated:", user1);
            }
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    emailRedirectTo: undefined,
                    data: {  
                        userRole: "buyer",  
                    }    
                }
            });           
            if (error) {
                throw new Error(error.message);
            }
            const user = data.user;
            if (!user) {
                throw new Error("User registration failed. No user data returned.");
            }
            const address = { region, city, street, postIndex };
            const { error: dbError } = await supabase
                .from("users")
                .insert([
                    {
                        id: user.id,
                        role: 'buyer',
                        firstName,
                        lastName,
                        email,
                        phone,
                        address
                    }
                ]);
            if (dbError) {
                throw new Error(dbError.message);
            }
            notification.success({
                message: "Registration Successful",
                description: "Your account has been created successfully."
            });
            navigate(ROUTE_NAMES.LOGIN);
    
        } catch (error: any) {
            notification.error({
                message: "Registration Failed",
                description: error.message
            });
        }
    };
    
    return(
        <div className="flex flex-col justify-center items-center min-h-screen text-center bg-gray-50 p-6">
        <Form
            layout="vertical"
            onFinish={handleRegister}
            form={form}
            className='bg-white w-full shadow-lg rounded-lg p-8 mt-6'
        >
            <h2 className="text-2xl font-bold text-center">ԳՐԱՆՑՎԵԼ</h2>
            <hr />

            <h3 className="text-lg font-semibold text-gray-700 text-center"><Title text1='ԱՆՁՆԱԿԱՆ' text2='ՏՎՅԱԼՆԵՐ' /></h3>

            {/* First Name */}
            <Form.Item
            label={<Text className="font-semibold">Անուն</Text>}
            name="firstName"
            rules={[{ required: true, message: 'Գրե՛ք ձեր անունը։' }]}
            >
            <Input placeholder="Գրե՛ք ձեր անունը։" className="border border-gray-300 rounded-lg py-3 px-4" />
            </Form.Item>

            {/* Last Name */}
            <Form.Item
            label={<Text className="font-semibold">Ազգանուն</Text>}
            name="lastName"
            rules={[{ required: true, message: 'Գրե՛ք ձեր ազգանունը։' }]}
            >
            <Input placeholder="Գրե՛ք ձեր ազգանունը։" className="border border-gray-300 rounded-lg py-3 px-4" />
            </Form.Item>

            {/* Email */}
            <Form.Item
            label={<Text className="font-semibold">Էլփոստ</Text>}
            name="email"
            rules={[{ required: true, message: 'Գրե՛ք ձեր էլփոստը։' }]}
            >
            <Input type="email" placeholder="Գրե՛ք ձեր էլփոստը։" className="border border-gray-300 rounded-lg py-3 px-4" />
            </Form.Item>

            {/* Phone */}
            <Form.Item
            label={<Text className="font-semibold">Հեռախոսահամար</Text>}
            name="phone"
            rules={[{ required: true, message: 'Գրե՛ք ձեր հեռախոսահամարը։' }]}
            >
            <Input type="tel" placeholder="Գրե՛ք ձեր հեռախոսահամարը։" className="border border-gray-300 rounded-lg py-3 px-4" />
            </Form.Item>

            {/* Password */}
            <Form.Item
            label={<Text className="font-semibold">Գաղտնաբառ</Text>}
            name="password"
            tooltip="Գաղտնաբառը պետք է պարունակի 6-ից 16 նիշ, գոնե 1 թիվ (0-9) և 1 հատուկ նշան (!@#$%^&*), մեծատառ և փոքրատառ տառեր։"
            rules={[
                { required: true, message: 'Գրե՛ք ձեր գաղտնաբառը։' },
                { pattern: regexpValidation, message: 'Գաղտնաբառը շատ պարզ է։' },
            ]}
            >
            <Input.Password placeholder="Գրե՛ք ձեր գաղտնաբառը։" className="border border-gray-300 rounded-lg py-3 px-4" />
            </Form.Item>

            <h3 className="text-lg font-semibold text-gray-700 text-center"><Title text1='ՁԵՐ' text2='ՀԱՍՑԵՆ' /></h3>

            {/* Region */}
            <Form.Item
            label={<Text className="font-semibold">Մարզ</Text>}
            name="region"
            rules={[{ required: true, message: 'Գրե՛ք ձեր մարզը։' }]}
            >
            <Input placeholder="Գրե՛ք ձեր մարզը։" className="border border-gray-300 rounded-lg py-3 px-4" />
            </Form.Item>

            {/* City */}
            <Form.Item
            label={<Text className="font-semibold">Քաղաք</Text>}
            name="city"
            rules={[{ required: true, message: 'Գրե՛ք ձեր քաղաքը։' }]}
            >
            <Input placeholder="Գրե՛ք ձեր քաղաքը։" className="border border-gray-300 rounded-lg py-3 px-4" />
            </Form.Item>

            {/* Street */}
            <Form.Item
            label={<Text className="font-semibold">Փողոց</Text>}
            name="street"
            rules={[{ required: true, message: 'Գրե՛ք ձեր փողոցը։' }]}
            >
            <Input placeholder="Գրե՛ք ձեր փողոցը։" className="border border-gray-300 rounded-lg py-3 px-4" />
            </Form.Item>

            {/* Postal Code */}
            <Form.Item
            label={<Text className="font-semibold">Փոստային ինդեքս</Text>}
            name="postIndex"
            rules={[
                { required: true, message: 'Գրե՛ք ձեր փոստային ինդեքսը։' },
                { pattern: /^[0-9]{4,6}$/, message: 'Մուտքագրեք վավեր փոստային ինդեքս։' },
            ]}
            >
            <Input placeholder="Գրե՛ք ձեր փոստային ինդեքսը։" className="border border-gray-300 rounded-lg py-3 px-4" />
            </Form.Item>

            {/* Action Buttons */}
            <div className="flex justify-between items-center space-x-4">
            <Button
                type="primary"
                htmlType="submit"
                size="large"
                className="w-full sm:w-auto px-16 py-3 rounded-lg text-white bg-black hover:bg-gray-800"
            >
                ԳՐԱՆՑՎԵԼ
            </Button>

            <Link to={ROUTE_NAMES.LOGIN} className="text-blue-600 hover:underline">
                ՄՈՒՏՔ ԳՈՐԾԵԼ
            </Link>
            </div>
        </Form>
        </div>
);
};      
export default BuyerRegister;