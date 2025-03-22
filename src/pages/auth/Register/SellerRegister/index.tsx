import { Button, Checkbox, Form, Input, notification, Select, Typography } from 'antd';
import { regexpValidation, ROUTE_NAMES } from '../../../../utilis/constants/constants';
import { sellerRegister } from '../../../../typescript/interfaces/register';
import Title from '../../../../components/sheard/TitleComponent';
import { supabase } from '../../../../services/supabase/supabase';
import { Link, useNavigate } from 'react-router-dom';
import { categoryLabels } from '../../../../typescript/types/categories';
import { options } from '../../../../utilis/constants/sellerTypeOptions';
import { useEffect } from 'react';

const { Text } = Typography;
  
const SellerRegister = () => {
     const [ form ] = Form.useForm();
     const navigate = useNavigate();

     const handleRegister = async (values: sellerRegister) => {
        const { firstName, lastName, email, phone, password, region, city, street, postIndex, businessRegion, businessCity, businessStreet, businessPostIndex, businessPhone, shopName, description, type, categories } = values;
        const termsAndConditionsSelected = form.getFieldValue('termsAndConditions');
        const sellerPoliciesSelected = form.getFieldValue('sellerPolicies');

        if (!termsAndConditionsSelected || !sellerPoliciesSelected) {
            notification.error({
              message: 'Պարտադիր համաձայնություն',
              description: 'Խնդրում ենք ընդունել պայմաններն ու համաձայնությունները:',
            });
          } else {      
            try {
                const user1 = supabase.auth.getUser();
                if (!user1) {
                    throw new Error("Օգտագործողը չի հաստատվել։");
                } else {
                    console.log("Օգտագործողը հաստատվել է:", user1);
                }
                const { data, error } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        emailRedirectTo: undefined,
                        data: {
                            userRole: "seller",
                        }
                    }
                });
                if (error) {
                    throw new Error(error.message);
                }
                const user = data.user;
                if (!user) {
                    throw new Error("Օգտագործողի գրանցումը ձախողվեց։ Չկան օգտատիրոջ տվյալներ։");
                }
                const address = { region, city, street, postIndex };
                const { error: dbError } = await supabase
                    .from("users")
                    .insert([
                        {
                            id: user.id,
                            role: 'seller',
                            firstName,
                            lastName,
                            email,
                            phone,
                            address,
                        }
                    ]);
                
                const businessAddress = { businessRegion, businessCity, businessStreet, businessPostIndex, businessPhone };
                
                const { error: sellerError } = await supabase
                    .from("sellers")
                    .insert([
                        {
                            id: user.id,
                            email,
                            businessAddress,    
                            shopName,
                            description,
                            type,
                            categories,
                        }
                    ]);
                
                if (dbError || sellerError) {
                    const error = dbError ?? sellerError;
                    if(error){
                        throw new Error(error.message);
                    }
                }
                localStorage.removeItem('SellerFormValues');
                localStorage.removeItem('navigateAddress');
            
                notification.success({
                    message: "Գրանցումը հաջողությամբ իրականացվել է",
                    description: "Ձեր հաշիվը հաջողությամբ ստեղծվել է։"
                });
                navigate(ROUTE_NAMES.LOGIN);
                
                } catch (error: any) {
                    notification.error({
                        message: "Գրանցումը ձախողվեց",
                        description: error.message
                    });
                }
          }
    };

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
        ԵԹԵ ԱՐԴԵՆ ԳՐԱՆՑՎԱԾ ԵՔ ԱՅՍ ԷԼՓՈՍՏՈՎ ՈՐՊԵՍ ԳՆՈՐԴ, ԽՆԴՐՈՒՄ ԵՆՔ ԳՐԱՆՑՎԵԼ ՆՈՐ ԷԼՓՈՍՏՈՎ ՍՏԵՂԾՎԱԾ ՀԱՏՈՒԿ ԲԻԶՆԵՍ ԷՋԻ ՀԱՄԱՐ։
        </p>
        <Form
            layout="vertical"
            onFinish={handleRegister}
            form={form}
            className='bg-white w-full shadow-lg rounded-lg p-8 mt-6'
        >
            <h2 className="text-2xl font-bold text-center">ԳՐԱՆՑՎԵԼ</h2>
            <hr />

            <h3 className="text-lg font-semibold text-gray-700 text-center"><Title text1='ԱՆՁՆԱԿԱՆ' text2='ՏՎՅԱԼՆԵՐ' /></h3>

            <Form.Item
            label={<Text className="font-semibold">Անուն</Text>}
            name="firstName"
            rules={[{ required: true, message: 'Գրե՛ք ձեր անունը։' }]}
            >
            <Input placeholder="Գրե՛ք ձեր անունը։" className="border border-gray-300 rounded-lg py-3 px-4" />
            </Form.Item>

            <Form.Item
            label={<Text className="font-semibold">Ազգանուն</Text>}
            name="lastName"
            rules={[{ required: true, message: 'Գրե՛ք ձեր ազգանունը։' }]}
            >
            <Input placeholder="Գրե՛ք ձեր ազգանունը։" className="border border-gray-300 rounded-lg py-3 px-4" />
            </Form.Item>

            <Form.Item
            label={<Text className="font-semibold">Էլփոստ</Text>}
            name="email"
            rules={[{ required: true, message: 'Գրե՛ք ձեր էլփոստը։' }]}
            >
            <Input type="email" placeholder="Գրե՛ք ձեր էլփոստը։" className="border border-gray-300 rounded-lg py-3 px-4" />
            </Form.Item>

            <Form.Item
            label={<Text className="font-semibold">Հեռախոսահամար</Text>}
            name="phone"
            rules={[{ required: true, message: 'Գրե՛ք ձեր հեռախոսահամարը։' }]}
            >
            <Input type="tel" placeholder="Գրե՛ք ձեր հեռախոսահամարը։" className="border border-gray-300 rounded-lg py-3 px-4" />
            </Form.Item>

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

            <Form.Item
            label={<Text className="font-semibold">Մարզ</Text>}
            name="region"
            rules={[{ required: true, message: 'Գրե՛ք ձեր մարզը։' }]}
            >
            <Input placeholder="Գրե՛ք ձեր մարզը։" className="border border-gray-300 rounded-lg py-3 px-4" />
            </Form.Item>

            <Form.Item
            label={<Text className="font-semibold">Քաղաք</Text>}
            name="city"
            rules={[{ required: true, message: 'Գրե՛ք ձեր քաղաքը։' }]}
            >
            <Input placeholder="Գրե՛ք ձեր քաղաքը։" className="border border-gray-300 rounded-lg py-3 px-4" />
            </Form.Item>

            <Form.Item
            label={<Text className="font-semibold">Փողոց</Text>}
            name="street"
            rules={[{ required: true, message: 'Գրե՛ք ձեր փողոցը։' }]}
            >
            <Input placeholder="Գրե՛ք ձեր փողոցը։" className="border border-gray-300 rounded-lg py-3 px-4" />
            </Form.Item>

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

            <h2 className="text-2xl font-bold text-center">ԲԻԶՆԵՍ ԻՆՖՈՐՄԱՑԻԱ</h2>

            <h3 className="text-lg font-semibold text-gray-700 text-center"><Title text1='ՁԵՐ ԲԻԶՆԵՍԻ' text2='ՀԱՍՑԵՆ' /></h3>

            <Form.Item
            label={<Text className="font-semibold">Մարզ</Text>}
            name="businessRegion"
            rules={[{ required: true, message: 'Գրե՛ք մարզը։' }]}
            >
            <Input placeholder="Գրե՛ք մարզը։" className="border border-gray-300 rounded-lg py-3 px-4" />
            </Form.Item>

            <Form.Item
            label={<Text className="font-semibold">Քաղաք</Text>}
            name="businessCity"
            rules={[{ required: true, message: 'Գրե՛ք քաղաքը։' }]}
            >
            <Input placeholder="Գրե՛ք քաղաքը։" className="border border-gray-300 rounded-lg py-3 px-4" />
            </Form.Item>

            <Form.Item
            label={<Text className="font-semibold">Փողոց</Text>}
            name="businessStreet"
            rules={[{ required: true, message: 'Գրե՛ք փողոցը։' }]}
            >
            <Input placeholder="Գրե՛ք փողոցը։" className="border border-gray-300 rounded-lg py-3 px-4" />
            </Form.Item>

            <Form.Item
            label={<Text className="font-semibold">Փոստային ինդեքս</Text>}
            name="businessPostIndex"
            rules={[
                { required: true, message: 'Գրե՛ք փոստային ինդեքսը։' },
                { pattern: /^[0-9]{4,6}$/, message: 'Մուտքագրեք վավեր փոստային ինդեքս։' },
            ]}
            >
            <Input placeholder="Գրե՛ք փոստային ինդեքսը։" className="border border-gray-300 rounded-lg py-3 px-4" />
            </Form.Item>

            <Form.Item
            label={<Text className="font-semibold">Աշխատանքային հեռախոսահամար</Text>}
            name="businessPhone"
            rules={[{ required: true, message: 'Գրե՛ք հեռախոսահամարը։' }]}
            >
            <Input type="tel" placeholder="Գրե՛ք հեռախոսահամարը։" className="border border-gray-300 rounded-lg py-3 px-4" />
            </Form.Item>

            {/* Government ID / Business License Upload (File Upload) */}
            <h3 className="text-lg font-semibold text-gray-700 text-center"><Title text1='ՁԵՐ ԲԻԶՆԵՍԻ' text2='ՆԿԱՐԱԳՐՈՒԹՅՈՒՆԸ' /></h3>


            <Form.Item
            label={<Text className="font-semibold">Խանութի անուն</Text>}
            name="shopName"
            rules={[{ required: true, message: 'Գրե՛ք ձեր խանութի անունը։' }]}
            >
            <Input placeholder="Գրե՛ք ձեր խանութի անունը։" className="border border-gray-300 rounded-lg py-3 px-4" />
            </Form.Item>

            <Form.Item
            label={<Text className="font-semibold">Խանութի նկարագրություն</Text>}
            name="description"
            rules={[{ required: true, message: 'Գրե՛ք ձեր խանութի նկարագրությունը։' }]}
            >
            <Input placeholder="Գրե՛ք ձեր խանութի նկարագրությունը։" className="border border-gray-300 rounded-lg py-3 px-4" />
            </Form.Item>

            <Form.Item
            label={<Text className="font-semibold">Վաճառում եք որպես անհատ թե բիզնես։</Text>}
            name="type"
            rules={[{ required: true, message: 'Նշե՛ք տարբերակը։' }]}
            >
            <Select options={options} />
            </Form.Item>

            <h3 className="text-lg font-semibold text-gray-700 text-center"><Title text1='ՁԵՐ ԱՊՐԱՆՔԻ' text2='ՄԱՍԻՆ' /></h3>

            <Form.Item
            label={<Text className="font-semibold">Ինչ տեսակի ապրանք եք վաճառելու։</Text>}
            name="categories"
            rules={[{ required: true, message: 'Նշե՛ք մեկ կամ մի քանի տարբերակներ' }]}
            >
                <Select
                mode="multiple"
                size={'middle'}
                options={categoryLabels}
                showSearch={false}  
                />
            </Form.Item>

            <Form.Item
            name="termsAndConditions"
            valuePropName="checked"
            rules={[{ required: true, message: 'Պարտադիր է կարդալ և համաձայնություն հայտնել' }]}>
            <Checkbox onChange={(e) => form.setFieldValue('termsAndConditions', e.target.checked)}/><Link to={ROUTE_NAMES.SELLERCONTRACT} onClick={() => handleNavigate()}>Պայմաններ և համաձայնություն</Link>
            </Form.Item>

            <Form.Item
            name="sellerPolicies"
            valuePropName="checked"
            rules={[{ required: true, message: 'Համաձայն եմ վաճառողի քաղաքականության հետ' }]}>
            <Checkbox onChange={(e) => form.setFieldValue('sellerPolicies', e.target.checked)}/><Link to={ROUTE_NAMES.TERMSANDCONDITIONS} onClick={() => handleNavigate()}>Համաձայն եմ վաճառողի քաղաքականության հետ:</Link>
            </Form.Item>

            {/* do this using links and write it */}

            <div className="flex flex-col sm:flex-row justify-between sm:justify-between items-center space-x-4 sm:space-x-0 sm:space-y-4">
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
export default SellerRegister;