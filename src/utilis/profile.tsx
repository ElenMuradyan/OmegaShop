import { 
    ShoppingOutlined, 
    ShoppingCartOutlined, 
    EnvironmentOutlined, 
    CreditCardOutlined, 
    UserOutlined, 
    QuestionCircleOutlined, 
    ShareAltOutlined, 
    SettingOutlined, 
    ShopOutlined, 
    TeamOutlined, 
    HeartOutlined 
} from "@ant-design/icons";
import { profileOption } from "../typescript/types/profileOption";
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
    [KEYS.PERSONAL]: {
        label: KEYS.PERSONAL,
        icon: <TeamOutlined />,
        options: {
            ADDRESS: {
                label: 'ՀԱՍՑԵ',
                icon: <EnvironmentOutlined />,
                link: ROUTE_NAMES.ADDRESS,
            },
            CARDS: {
                label: 'ԻՄ ՔԱՐՏԵՐԸ',
                icon: <CreditCardOutlined />,
                link: ROUTE_NAMES.CARDS,
            },
            INFO: {
                label: 'ԻՄ ՏՎՅԱԼՆԵՐԸ',
                icon: <UserOutlined />,
                link: ROUTE_NAMES.EDITDATA,
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
            // SETTINGS: {
            //     label: 'ԿԱՅԱՆՔՆԵՐ',
            //     icon: <SettingOutlined />,
            //     link: ROUTE_NAMES.SETTINGS,
            // },
        },
    },
};
