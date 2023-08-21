import {
    GET_FOLLOWUP,
    ADD_FOLLOWUP
} from "../actions/types"
const initialState = { followup: [], addfollowup: [] }
export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_FOLLOWUP:
            return {
                ...state,
                followup: payload.followup,
            };
        case ADD_FOLLOWUP:
            return {
                ...state,
                addfollowup: payload.addfollowup,
            };
        default:
            return state;
    }
}