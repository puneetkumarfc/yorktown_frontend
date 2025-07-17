const BASE_URL = "http://44.201.121.75:8080/api/"

export const menuEndpoints = {
    FETCH_CATEGORIES: (displayHome) => BASE_URL + `menu/home-categories?displayHome=${displayHome}`,
    FETCH_MENU: (displayHome) => BASE_URL + `menu/home-items/1?displayHome=${displayHome}`,
    ITEM_DETAILS: (id) => BASE_URL + `menu/item-details/${id}`
}

export const stripeEndpoints = {
    PLACE_ORDER: BASE_URL + "order/place"
}