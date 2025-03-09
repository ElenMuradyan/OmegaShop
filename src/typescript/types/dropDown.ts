import { ROUTE_NAMES } from "../../utilis/constants"

type DropdownItem = {
    label: string,
    path: string,
}

export const BuyerDropdownItems: DropdownItem[] = [
    { label: 'My Profile', path: ROUTE_NAMES.PROFILE},
    { label: 'Orders', path: ROUTE_NAMES.ORDERS},
    { label: 'Logout', path: ''}
]

export const SellerDropdownItems: DropdownItem[] = [
    { label: 'My Profile', path: ROUTE_NAMES.PROFILE },
    { label: 'Orders', path: ROUTE_NAMES.ORDERS },
    { label: 'My Products', path: ROUTE_NAMES.ADDPRODUCT }, 
    { label: 'Settings', path: ROUTE_NAMES.SETTINGS },
    { label: 'Logout', path: '' }
];