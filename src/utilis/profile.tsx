import { 
    ShoppingOutlined, 
    ShoppingCartOutlined, 
    EnvironmentOutlined, 
    CreditCardOutlined, 
    UserOutlined, 
    QuestionCircleOutlined, 
    ShareAltOutlined, 
    ShopOutlined, 
    TeamOutlined, 
    HeartOutlined 
} from "@ant-design/icons";
import { profileOption } from "../typescript/types/profileOption";
import { ROUTE_NAMES } from "./constants";
import { useSelector } from "react-redux";
import { RootState } from "../state-management/redux/store";


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
    [KEYS.PERSONAL]: {
        label: KEYS.PERSONAL,
        icon: <TeamOutlined />,
        options: {
            CARDS: {
                label: 'ԻՄ ՔԱՐՏԵՐԸ',
                icon: <CreditCardOutlined />,
                link: ROUTE_NAMES.CARDS,
            },
        },
    },
};
