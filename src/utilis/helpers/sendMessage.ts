import { notification } from "antd";
import emailjs from "emailjs-com";
import { sendMessageInterface } from "../../typescript/interfaces/sendMessageInterface";

export const sendMessage = async ({values, setLoading, form}: sendMessageInterface) => {
    setLoading(true);

    try{
        const response = await emailjs.send(
            import.meta.env.VITE_MY_SERVICE_ID as string,
            import.meta.env.VITE_TEMPLATE_ID as string,
            values,
            import.meta.env.VITE_API_KEY as string,
        );

        if (response.status === 200) {
            notification.success({
                message: "Հաղորդագրությունը ուղարկվեց!",
                description: "Մենք կպատասխանենք շուտով։",
            });
        }

    }catch(error){
        notification.error({
            message: "Տեղեկություն",
            description: "Հաղորդագրությունը ուղարկելու ժամանակ սխալ տեղի ունեցավ։ Փորձեք նորից։",
        });
    }finally{
        setLoading(false);
        form.resetFields();
    }
};

