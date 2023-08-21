import {
    GET_BOOKING
} from "../actions/types"
const initialState = { booking: [] }
export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_BOOKING:
            return {
                ...state,
                booking: payload.booking,
            };
        default:
            return state;
    }
}