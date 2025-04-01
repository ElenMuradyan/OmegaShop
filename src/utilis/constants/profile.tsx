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
    PURCHASES: 'ԳՆՈՒՄՆԵՐ',
    PERSONAL: 'ԱՆՁՆԱԿԱՆ ԻՆՖՈՐՄԱՑԻԱ',
    PROGRAM: 'ԾՐԱԳԻՐ',
} as const;

export const profileOptions: Record<string, profileOption> = {
    [KEYS.PURCHASES]: {
        label: KEYS.PURCHASES,
        icon: <ShopOutlined />,
        options: {
            ORDERS: {
                label: 'ՁԵՐ ՊԱՏՎԵՐՆԵՐԸ',
                icon: <ShoppingOutlined />,
                link: ROUTE_NAMES.ORDERS,
            },
            SHOPPING_BAG: {
                label: 'ԶԱՄԲՅՈՒՂ',
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
                label: 'ՕԳՆՈՒԹՅՈՒՆ',
                icon: <QuestionCircleOutlined />,
                link: ROUTE_NAMES.HELP,
            },
            SOCIALS: {
                label: 'ՄԵՆՔ ՍՈՑ ՑԱՆՑԵՐՈՒՄ',
                icon: <ShareAltOutlined />,
                link: ROUTE_NAMES.SHARE,
            },
        },
    },
};
