import { ROUTE_NAMES } from "../../utilis/constants"

type DropdownItem = {
    label: string,
    path: string,
}

export const DropdownItems: DropdownItem[] = [
    { label: 'My Profile', path: ''},
    { label: 'Orders', path: ROUTE_NAMES.ORDERS},
    { label: 'Logout', path: ''}
]