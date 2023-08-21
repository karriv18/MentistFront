import {
    GET_ANNOUCEMENT
} from "../actions/types"
const initialState = { announcement: [] }
export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_ANNOUCEMENT:
            return {
                ...state,
                announcement: payload.announcement,
            };
        default:
            return state;
    }
}