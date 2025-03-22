import { ROUTE_NAMES } from "../../utilis/constants/constants"

type NavbarItem = {
    label: string,
    path: string,
}

export const NavbarItems: NavbarItem[] = [
    { label: "ԳԼԽԱՎՈՐ", path: ROUTE_NAMES.HOME },
    { label: "ՀԱՎԱՔԱԾՈՒ", path: ROUTE_NAMES.COLLECTION },
    { label: "ՄԵՐ ՄԱՍԻՆ", path: ROUTE_NAMES.ABOUT },
    { label: "ՄԵՐ ՎԱՃԱՌՈՂՆԵՐԸ", path: ROUTE_NAMES.SELLERS },
];