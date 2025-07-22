import { menuEndpoints } from "../api";
import { apiConnector } from "../apiConnector";

const { FETCH_MENU, FETCH_CATEGORIES, ITEM_DETAILS, PROMO_CODE} = menuEndpoints;

export const fetchCategories = async(displayHome) => await apiConnector("GET", FETCH_CATEGORIES(displayHome));
export const fetchCategoriesCopy = async(displayHome) => await apiConnector("GET", FETCH_CATEGORIES_COPY(displayHome));
export const fetchMenu = async(categoryId, displayHome) => await apiConnector("GET", FETCH_MENU(categoryId, displayHome));
export const fetchItemDetails = async(id) => await apiConnector("GET", ITEM_DETAILS(id));
export const applyPromoCode = async(data) => await apiConnector("POST", PROMO_CODE, data);