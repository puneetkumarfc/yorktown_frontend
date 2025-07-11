import { menuEndpoints } from "../api";
import { apiConnector } from "../apiConnector";

const {FETCH_MENU, FETCH_CATEGORIES} = menuEndpoints;

export const fetchMenu = async(displayHome) => await apiConnector("GET", FETCH_MENU(displayHome));
export const fetchCategories = async(displayHome) => await apiConnector("GET", FETCH_CATEGORIES(displayHome));