import { ROUTE_NAMES } from "../../utilis/constants/constants";

type NavbarItem = {
    label: string,
    path: string,
}

export const NavbarItems: NavbarItem[] = [
    { label: "HOME", path: ROUTE_NAMES.HOME },
    { label: "COLLECTION", path: ROUTE_NAMES.COLLECTION },
    { label: "ABOUT US", path: ROUTE_NAMES.ABOUT },
    { label: "OUR SELLERS", path: ROUTE_NAMES.SELLERS },
];
