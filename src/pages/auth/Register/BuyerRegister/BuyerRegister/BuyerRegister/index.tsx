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

     const handllBuyerRegister = async (values: buyerRegister) => {
        const { firstName, lastName, email, phone, password, region, city, street, postIndex } = values;
        const termsAndConditionsSelected = form.getFieldValue('termsAndConditions');
        const buyerPoliciesSelected = form.getFieldValue('buyerPolicies');
        
        if (!termsAndConditionsSelected || !buyerPoliciesSelected) {
            notification.error({
              message: 'Պարտադիր համաձայնություն',
              description: 'Խնդրում ենք ընդունել պայմաններն ու համաձայնությունները:',
            });
        } else {   
        try{
            setLoading(true);
            const response = await createUserWithEmailAndPassword( auth, email, password );
            const { uid } = response.user;
            const createDoc = doc(db, FIRESTORE_PATH_NAMES.REGISTERED_USERS, uid);
            const address = { region, city, street, postIndex };

            await setDoc(createDoc, {
                uid, firstName, lastName, email, phone, address, role: 'buyer', cart: [], orders: [],
            });

            localStorage.removeItem('BuyerFormValues');
            localStorage.removeItem('navigateAddress');
            notification.success({
                message: "Գրանցումը հաջողությամբ իրականացվել է",
                description: "Ձեր հաշիվը հաջողությամբ ստեղծվել է։"
            });

            await updateProfile(response.user, {
                displayName: 'buyer'
            })

            form.resetFields();
            navigate(ROUTE_NAMES.LOGIN);
        } catch (error: any) {
            notification.error({
                message: "Գրանցումը ձախողվեց",
                description: error.message
            });
        }finally{
            setLoading(false);
        }
    }};

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
            onFinish={handllBuyerRegister}
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

            <Form.Item
            name="termsAndConditions"
            valuePropName="checked"
            rules={[{ required: true, message: 'Պարտադիր է կարդալ և համաձայնություն հայտնել' }]}>
            <Checkbox onChange={(e) => form.setFieldValue('termsAndConditions', e.target.checked)} /><Link to={ROUTE_NAMES.BUYERCONTRACT} onClick={() => handleNavigate()}>Պայմաններ և համաձայնություն</Link>
            </Form.Item>

            <Form.Item
            name="buyerPolicies"
            valuePropName="checked"
            rules={[{ required: true, message: 'Համաձայն եմ վաճառողի քաղաքականության հետ' }]}
            >
            <Checkbox onChange={(e) => form.setFieldValue('buyerPolicies', e.target.checked)} /><Link to={ROUTE_NAMES.TERMSANDCONDITIONS} onClick={() => handleNavigate()}>Համաձայն եմ վաճառողի քաղաքականության հետ:</Link>
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