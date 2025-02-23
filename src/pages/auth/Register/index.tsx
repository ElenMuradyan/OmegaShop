import { Form, Input, notification } from 'antd';
import { regexpValidation, ROUTE_NAMES } from '../../../utilis/constants';
import { register } from '../../../typescript/interfaces/register';
import Title from '../../../components/Title';
import { supabase } from '../../../services/supabase/supabase';
import { useNavigate } from 'react-router-dom';

const Register = () => {
     const [ form ] = Form.useForm();
     const navigate = useNavigate();

     const handleRegister = async (values: register) => {
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
                    emailRedirectTo: undefined 
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
    
            // Navigate to login
            navigate(ROUTE_NAMES.LOGIN);
    
        } catch (error: any) {
            notification.error({
                message: "Registration Failed",
                description: error.message
            });
        }
    };
    

        return(
        <Form layout='vertical' onFinish={ handleRegister } form={ form }>
            <Title text1='ԱՆՁՆԱԿԱՆ' text2='ՏՎՅԱԼՆԵՐ' />
                <Form.Item 
                label='Անուն'
                name='firstName'
                rules={[{
                        required:true,
                        message:'Գրե՛ք ձեր անունը։'
                }]}
                >
                <Input type='text' placeholder='Գրե՛ք ձեր անունը։' />
                </Form.Item>
                <Form.Item 
                label='Ազգանուն'
                name='lastName'
                rules={[{
                        required:true,
                        message:'Գրե՛ք ձեր ազգանունը։'
                }]}
                >
                <Input type='text' placeholder='Գրե՛ք ձեր ազգանունը։' />
                </Form.Item>
                <Form.Item 
                label='Էլփոստ'
                name='email'
                rules={[{
                        required:true,
                        message:'Գրե՛ք ձեր էլփոստը։'
                }]}
                >
                <Input type='email' placeholder='Գրե՛ք ձեր էլփոստը։' />
                </Form.Item>
                <Form.Item 
                label='Հեռախոսահամար'
                name='phone'
                rules={[{
                        required:true,
                        message:'Գրե՛ք ձեր հեռախոսահամարը։'
                }]}
                >
                <Input type='tel' placeholder='Գրե՛ք ձեր հեռախոսահամարը։' />
                </Form.Item>
                <Form.Item 
                label='Գաղտնաբառ'
                name='password'
                tooltip='Գաղտնաբառը պետք է պարունակի 6-ից 16 նիշ, գոնե 1 թիվ (0-9) և 1 հատուկ նշան (!@#$%^&*), մեծատառ և փոքրատառ տառեր։'
                rules={[{
                        required:true,
                        message:'Գրե՛ք ձեր գաղտնաբառը։'
                },
                {
                pattern:regexpValidation,
                message:'Գաղտնաբառը շատ պարզ է։'
                }]}
                >
                <Input.Password placeholder='Գրե՛ք ձեր գաղտնաբառը:'/>
                </Form.Item>

                <Title text1='ՁԵՐ' text2='ՀԱՍՑԵՆ' />

                <Form.Item
                label="Մարզ"
                name="region"
                rules={[{ required: true, message: "Գրե՛ք ձեր մարզը։" }]}
                >
                <Input type="text" placeholder="Գրե՛ք ձեր մարզը։" />
                </Form.Item>

                <Form.Item
                label="Քաղաք"
                name="city"
                rules={[{ required: true, message: "Գրե՛ք ձեր քաղաքը։" }]}
                >
                <Input type="text" placeholder="Գրե՛ք ձեր քաղաքը։" />
                </Form.Item>

                <Form.Item
                label="Փողոց"
                name="street"
                rules={[{ required: true, message: "Գրե՛ք ձեր փողոցը։" }]}
                >
                <Input type="text" placeholder="Գրե՛ք ձեր փողոցը։" />
                </Form.Item>

                <Form.Item
                label="Փոստային ինդեքս"
                name="postalIndex"
                rules={[
                    { required: true, message: "Գրե՛ք ձեր փոստային ինդեքսը։" },
                    { pattern: /^[0-9]{4,6}$/, message: "Մուտքագրեք վավեր փոստային ինդեքս։" },
                ]}
                >
                <Input type="text" placeholder="Գրե՛ք ձեր փոստային ինդեքսը։" />
                </Form.Item>
                <button className='bg-black text-white px-16 py-3 text-sm' type='submit'>ԳՐԱՆՑՎԵԼ</button>
        </Form>
        )
}
export default Register;