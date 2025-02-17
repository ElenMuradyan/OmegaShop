import { ROUTE_NAMES } from "../../utilis/constants"

type NavbarItem = {
    label: string,
    path: string,
}

export const NavbarItems: NavbarItem[] = [
    { label: "HOME", path: ROUTE_NAMES.HOME },
    { label: "COLLECTION", path: ROUTE_NAMES.COLLECTION },
    { label: "ABOUT", path: ROUTE_NAMES.ABOUT },
]