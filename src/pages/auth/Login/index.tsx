import { Button, Form, Input, notification, Typography } from 'antd';
import { ROUTE_NAMES } from '../../../utilis/constants/constants';
import { supabase } from '../../../services/supabase/supabase';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../../typescript/interfaces/login';
import { useDispatch } from 'react-redux';
import { fetchUserData } from '../../../state-management/redux/slices/userDataSlice';
import { AppDispatch } from '../../../state-management/redux/store';

const { Text } = Typography;

const Login = () => {
    const [ form ] = Form.useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const handleLogin = async (values: login) => {
        const { email, password } = values;

        try {
            if (!email || !password) {
                throw new Error("Email և գաղտնաբառը պարտադիր են։");
            }
            console.log('Մուտք գործելու փորձ՝ էլփոստով:', email, 'և գաղտնաբառով:', password);

            const { data, error } = await supabase.auth.signInWithPassword({
                email, password,
            });

            if (error) {
                throw new Error(error.message);
            };

            if (data?.user) {
                console.log('Օգտատեր մուտք գործեց:', data.user);
                navigate(ROUTE_NAMES.HOME);
                dispatch(fetchUserData(email));
            }

            if (!data.user.email_confirmed_at) {
              notification.warning({
                  message: 'Օգտատերը վերիֆիկացված չէ։',
                  description: 'Ձեր էլփոստը դեռևս հաստատված չի: Խնդրում ենք ստուգել ձեր էլփոստի նամակները և վերիֆիկացնել հասցեն:',
              });
              return; 
          }

        } catch (error: any) {
            notification.error({
                message: 'Մուտք Գործելը Չհաջողվեց',
                description: error.message,
            });
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50 p-6">
            <Form
                layout="vertical"
                onFinish={handleLogin}
                form={form}
                className="w-full sm:max-w-md p-8 space-y-6"
            >
                <h2 className="text-2xl font-bold text-center">ՄՈՒՏՔ</h2>

                {/* Email Field */}
                <Form.Item
                    label={<Text className="font-semibold">Էլփոստ</Text>}
                    name="email"
                    rules={[{ required: true, message: 'Գրե՛ք ձեր էլփոստը։' }]}
                >
                    <Input type="email" placeholder="Գրե՛ք ձեր էլփոստը։" className="border border-gray-300 rounded-lg py-3 px-4" />
                </Form.Item>

                {/* Password Field */}
                <Form.Item
                    label={<Text className="font-semibold">Գաղտնաբառ</Text>}
                    name="password"
                    tooltip="Գաղտնաբառը պետք է պարունակի 6-ից 16 նիշ, գոնե 1 թիվ (0-9) և 1 հատուկ նշան (!@#$%^&*), մեծատառ և փոքրատառ տառեր։"
                    rules={[{ required: true, message: 'Գրե՛ք ձեր գաղտնաբառը։' }]}
                >
                    <Input.Password placeholder="Գրե՛ք ձեր գաղտնաբառը։" className="border border-gray-300 rounded-lg py-3 px-4" />
                </Form.Item>

                {/* Action Buttons */}
                <div className="flex justify-between items-center space-x-4">
                    <Button
                        type="primary"
                        htmlType="submit"
                        size="large"
                        className="w-full sm:w-auto px-16 py-3 rounded-lg text-white bg-black hover:bg-gray-800"
                    >
                        ՄՈՒՏՔ
                    </Button>

                    <Link to={ROUTE_NAMES.BUYERREGISTER} className="text-blue-600 hover:underline">
                        ԳՐԱՆՑՎԵԼ
                    </Link>
                </div>
                <p className="text-center text-gray-700 text-sm bg-gray-100 py-3 px-4 rounded-lg shadow-md max-w-md mx-auto">
                      ՈՐՊԵՍԶԻ ԽՆԴԻՐՆԵՐ ՉԱՌԱՋԱՆԱՆ ՀԱՄՈԶՎԵՔ, ՈՐ ՁԵՐ ԷԼՓՈՍՏԻՆ ՈՒՂԱՐԿՎԱԾ ՆԱՄԱԿՈՎ ՎԵՐԻՖԻԿԱՑՐԵԼ ԵՔ ՁԵՐ ԷԼՓՈՍՏԻ ՀԱՍՑԵՆ։
                    </p>

            </Form>
        </div>
    );
};

export default Login;
