import { stripeEndpoints } from "../api";
import { apiConnector } from "../apiConnector";

const { PLACE_ORDER, CHECK_STATUS } = stripeEndpoints;

export const placeOrder = async(data) => await apiConnector("POST", PLACE_ORDER, data);
export const checkStatus = async(orderId) => await apiConnector("GET", CHECK_STATUS(orderId));