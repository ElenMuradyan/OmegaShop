import { Flex, Form, Input, notification } from 'antd';
import { ROUTE_NAMES } from '../../../utilis/constants';
import Title from '../../../components/Title';
import { supabase } from '../../../services/supabase/supabase';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../../typescript/interfaces/login';

const Register = () => {
     const [ form ] = Form.useForm();
     const navigate = useNavigate();

     const handleLogin = async (values: login) => {
        const { email, password } = values;
        
        try{
            if (!email || !password) {
                throw new Error("Email and password are required.");
              }
              console.log('Attempting login with email:', email, 'and password:', password);

            const { data, error } = await supabase.auth.signInWithPassword({
                email, password,
            });

            if(error){
                throw new Error(error.message);
            };

            if(data?.user){
                console.log('User logged in:', data.user);
                navigate(ROUTE_NAMES.HOME);
            }
        }catch(error: any){
            notification.error({
                message: 'Login Failed',
                description: error.message,
            })
        }
    };
    
        return(
        <Form layout='vertical' onFinish={ handleLogin } form={ form }>
            <Title text1='ՄՈՒՏՔ' />
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
                label='Գաղտնաբառ'
                name='password'
                tooltip='Գաղտնաբառը պետք է պարունակի 6-ից 16 նիշ, գոնե 1 թիվ (0-9) և 1 հատուկ նշան (!@#$%^&*), մեծատառ և փոքրատառ տառեր։'
                rules={[{
                        required:true,
                        message:'Գրե՛ք ձեր գաղտնաբառը։'
                }]}
                >
                <Input.Password placeholder='Գրե՛ք ձեր գաղտնաբառը:'/>
                </Form.Item>
                <Flex align='center' justify='space-between'>
                <button className='bg-black text-white px-16 py-3 text-sm' type='submit'>ՄՈՒՏՔ</button>
                <Link to={ROUTE_NAMES.REGISTER}>ԳՐԱՆՑՎԵԼ</Link>
                </Flex>
                </Form>
        )
}
export default Register;