import { FacebookOutlined, InstagramOutlined } from "@ant-design/icons"
import { JSX } from "react";
import { FaTelegramPlane } from "react-icons/fa"

export const links: LinkItem[] = [
    {
        title: 'Instagram',
        icon: <InstagramOutlined className="mr-2 text-[#E4405F]"/>,
        label: 'Follow us for product launches, promotions, and behind-the-scenes.',
        buttonLabel: 'Follow Us',
        link: 'https://www.instagram.com/yourhandle',
        buttonIcon: <InstagramOutlined />
    },
    {
        title: 'Facebook',
        icon: <FacebookOutlined className="mr-2 text-[#1877F2]"/>,
        label: 'Join our community for news, events, and exclusive deals.',
        buttonLabel: 'Join Us',
        link: 'https://www.facebook.com/yourhandle',
        buttonIcon: <FacebookOutlined />
    },
    {
        title: 'Telegram',
        icon: <FaTelegramPlane className="mr-2 text-[#0088cc]"/>,
        label: 'Get real-time updates and chat directly with us.',
        buttonLabel: 'Chat With Us',
        link: 'https://t.me/yourhandle',
        buttonIcon: <FaTelegramPlane />
    }
];

type LinkItem = {
    title: string;
    icon: JSX.Element;
    label: string;
    buttonLabel: string;
    link: string;
    buttonIcon: JSX.Element;
}
