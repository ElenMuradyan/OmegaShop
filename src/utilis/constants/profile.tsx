import { 
    ShoppingOutlined, 
    ShoppingCartOutlined, 
    QuestionCircleOutlined, 
    ShareAltOutlined, 
    ShopOutlined, 
    HeartOutlined 
} from "@ant-design/icons";
import { profileOption } from "../../typescript/types/profileOption";
import { ROUTE_NAMES } from "./constants";

const KEYS = {
    PURCHASES: 'PURCHASES',
    PERSONAL: 'PERSONAL INFORMATION',
    PROGRAM: 'PROGRAM',
} as const;

export const profileOptions: Record<string, profileOption> = {
    [KEYS.PURCHASES]: {
        label: KEYS.PURCHASES,
        icon: <ShopOutlined />,
        options: {
            ORDERS: {
                label: 'YOUR ORDERS',
                icon: <ShoppingOutlined />,
                link: ROUTE_NAMES.ORDERS,
            },
            SHOPPING_BAG: {
                label: 'SHOPPING BAG',
                icon: <ShoppingCartOutlined />,
                link: ROUTE_NAMES.CARD,
            },
        },
    },
    [KEYS.PROGRAM]: {
        label: KEYS.PROGRAM,
        icon: <HeartOutlined />,
        options: {
            HELP: {
                label: 'HELP',
                icon: <QuestionCircleOutlined />,
                link: ROUTE_NAMES.HELP,
            },
            SOCIALS: {
                label: 'WE ARE ON SOCIAL MEDIA',
                icon: <ShareAltOutlined />,
                link: ROUTE_NAMES.SHARE,
            },
        },
    },
};
