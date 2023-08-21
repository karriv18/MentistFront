import {
    GET_DEPOSIT,
    GET_TIMELINING,
    GET_PRELIMINARY,
    UPLOAD_DEPOSIT,
    UPLOAD_PRELIMINARY,
} from "../actions/types"
const initialState = { deposit: [], preliminary: [], timelining: [] }
export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_DEPOSIT:
            return {
                ...state,
                deposit: [...state.deposit, ...payload.deposit]
            };
        case GET_TIMELINING:
            return {
                ...state,
                timelining: [...state.timelining, ...payload.timelining]
            };
        case GET_PRELIMINARY:
            return {
                ...state,
                preliminary: [...state.preliminary, ...payload.preliminary]
            };
        case UPLOAD_DEPOSIT:
            return {
                ...state,
                deposit: payload.deposit
            };
        case UPLOAD_PRELIMINARY:
            return {
                ...state,
                preliminary: payload.preliminary
            };
        default:
            return state;
    }
}