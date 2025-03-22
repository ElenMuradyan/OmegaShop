import { Button, Form, Input, notification, Select } from "antd";
import { product } from "../../typescript/interfaces/product";
import { Categories, categoryLabels } from "../../typescript/types/categories";
import { useState } from "react";
import { DefaultOptionType } from "antd/es/select";
import ImageUpload from "../../components/sheard/ImageUpload";
import { supabase } from "../../services/supabase/supabase";
import FormList from "../../components/sheard/FormList";
import { useNavigate } from "react-router-dom";
import { ROUTE_NAMES } from "../../utilis/constants/constants";
import { options } from "../../utilis/constants/productOptions";

const AddProduct = () => {
    const [ form ] = Form.useForm();
    const navigate = useNavigate();
    const [ price, setPrice ] = useState<number>(0);
    const [ subCategories, setSubCategories ] = useState<DefaultOptionType[]>([]);
    const [ imageUrls, setImageUrls ] = useState<string[]>([]);

    const addProduct = async (values: product) => {
        const { name, description, price, category, subCategory, usedType, stock, options } = values;
        
        try {
            const { data } = await supabase.auth.getSession();
            if (data.session?.user?.email) {
                const autor = data.session?.user?.email;
                console.log('User email:', autor); 
    
                const { data: productData, error: productError } = await supabase
                    .from("products")
                    .insert([
                        {
                            name,
                            description,
                            price: Number(price),
                            images: imageUrls,
                            category,
                            subCategory,
                            usedType,
                            stock: Number(stock),
                            autor,
                            options,
                        }
                    ])
                    .select("id");
    
                if (productError) {
                    throw new Error(productError.message);
                }
    
                const productId = productData[0].id; 
                console.log('Product ID:', productId);
    
                const { error: sellerError } = await supabase.rpc("append_product_to_seller", {
                    input_email: autor,
                    input_product_id: productId,
                });
    
                if (sellerError) {
                    console.error('RPC Error:', sellerError);
                    notification.error({
                        message: "Error while adding product to seller",
                        description: sellerError.message,
                    });
                    throw new Error(sellerError.message);
                }
    
                notification.success({
                    message: "Ապրանքն ավելացվեց։",
                });
                navigate(ROUTE_NAMES.MYPRODUCTS);
            }
        } catch (error: any) {
            notification.error({
                message: "Ապրանքը չավելացվեց։",
                description: error.message,
            });
        }
    };
    
    const handleImageUpload = (url: string) => {
        setImageUrls(prevUrls => [...prevUrls, url]);
    };

    const handleChangeCategory = (value: string) => {
        Categories.forEach((item) => {
            if(item.label === value){
                const subCategory:DefaultOptionType[] = item.undercategories.map((item)=>{
                    return({
                        label: item.label,
                        value: item.label   
                    })
                })
                setSubCategories(subCategory);
                form.setFieldValue("subCategory", "");
                return;
            }
        })
    };

    return (
        <div className="max-w-2xl mx-auto p-8 bg-white rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            🛒 Ավելացնել նոր ապրանք
        </h2>
        
        <Form form={form} layout="vertical" onFinish={addProduct} className="space-y-6">
            
            <Form.Item name="name" rules={[{ required: true, message: "Խնդրում ենք մուտքագրել ապրանքի անունը" }]}>          
            <Input className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
            </Form.Item>

            <Form.Item name="price" label="Գին (դրամ)" rules={[{ required: true, message: "Խնդրում ենք մուտքագրել գինը" }]}>          
            <Input 
                min={0} 
                onChange={(e) => setPrice(Number(Number(e.target.value) * 80 / 100))} 
                type="number" 
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" 
            />
            </Form.Item>

            <p className="text-lg font-medium text-gray-600 text-center">
            💰 <span className="font-semibold text-green-600">ՁԵՐ ՕԳՈՒՏԸ:</span> {price} դրամ
            </p>

            <Form.Item name="description" label="Նկարագրություն" rules={[{ required: true, message: "Խնդրում ենք մուտքագրել նկարագրությունը։" }]}>          
            <Input.TextArea rows={4} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
            </Form.Item>

            <Form.Item name="images" label="Նկարների հղումներ">   
            <ImageUpload onFinish={handleImageUpload}/>
            </Form.Item>

            <div className="grid grid-cols-2 gap-4">
            <Form.Item name="category" label="Կատեգորիա" rules={[{ required: true, message: "Խնդրում ենք մուտքագրել կատեգորիան" }]}>          
                <Select options={categoryLabels} onChange={handleChangeCategory} className="w-full"/>
            </Form.Item>

            <Form.Item name="subCategory" label="Ենթակատեգորիա" rules={[{ required: true, message: "Խնդրում ենք մուտքագրել ենթակատեգորիան" }]}>          
                <Select options={subCategories} className="w-full"/>
            </Form.Item>
            </div>

            <Form.Item name="usedType" label="Ապրանքի վիճակը" rules={[{ required: true, message: "Խնդրում ենք ընտրել տարբերակը" }]}>          
            <Select options={options} className="w-full"/>
            </Form.Item>

            <Form.Item name="stock" label="Պահեստում առկա քանակ" rules={[{ required: true, message: "Խնդրում ենք մուտքագրել քանակը" }]}>          
            <Input type="number" min={0} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
            </Form.Item>

            <FormList form={form}/>

            <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-all">
                ➕ Ավելացնել ապրանք
            </Button>
            </Form.Item>

        </Form>
        </div>
      );
    };
    
export default AddProduct;    