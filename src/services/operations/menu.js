import { menuEndpoints } from "../api";
import { apiConnector } from "../apiConnector";

const { FETCH_MENU, FETCH_CATEGORIES, ITEM_DETAILS } = menuEndpoints;

export const fetchCategories = async(displayHome) => await apiConnector("GET", FETCH_CATEGORIES(displayHome));
export const fetchMenu = async(displayHome) => await apiConnector("GET", FETCH_MENU(displayHome));
export const fetchItemDetails = async(id) => await apiConnector("GET", ITEM_DETAILS(id));