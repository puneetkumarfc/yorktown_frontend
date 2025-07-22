const BASE_URL = "https://eatatyorktown.com/api/"

export const menuEndpoints = {
    FETCH_CATEGORIES: (displayHome) => BASE_URL + `menu/home-categories?displayHome=${displayHome}`,
    FETCH_MENU: (categoryId, displayHome) => BASE_URL + `menu/home-items/${categoryId}?displayHome=${displayHome}`,
    ITEM_DETAILS: (id) => BASE_URL + `menu/item-details/${id}`,
    PROMO_CODE: `${BASE_URL}order/apply-coupon`,
}

export const stripeEndpoints = {
    PLACE_ORDER: BASE_URL + "order/place",
    CHECK_STATUS: (orderId) => BASE_URL + `payment/check-payment-status/${orderId}`,

}