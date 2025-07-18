import { stripeEndpoints } from "../api";
import { apiConnector } from "../apiConnector";

const { PLACE_ORDER } = stripeEndpoints;

export const placeOrder = async(data) => await apiConnector("POST", PLACE_ORDER, data);