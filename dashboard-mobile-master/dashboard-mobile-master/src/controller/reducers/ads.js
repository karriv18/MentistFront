import {
    GET_PROMO
} from "../actions/types"
const initialState = { promo: [] }
export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_PROMO:
            return {
                ...state,
                promo: payload.promo,
            };
        default:
            return state;
    }
}