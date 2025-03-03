import { ROUTE_NAMES } from "../../utilis/constants"

type DropdownItem = {
    label: string,
    path: string,
}

export const DropdownItems: DropdownItem[] = [
    { label: 'My Profile', path: ROUTE_NAMES.PROFILE},
    { label: 'Orders', path: ROUTE_NAMES.ORDERS},
    { label: 'Logout', path: ''}
]