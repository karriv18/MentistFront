import {
    GET_TICKET, UPLOAD_TICKET
} from "../actions/types"
const initialState = { ticket: [], uploadticket: [] }
export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_TICKET:
            return {
                ...state,
                ticket: payload.ticket,
            };
        case UPLOAD_TICKET:
            return {
                ...state,
                uploadticket: payload.uploadticket,
            };
        default:
            return state;
    }
}