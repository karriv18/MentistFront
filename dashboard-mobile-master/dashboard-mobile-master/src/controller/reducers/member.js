import {
    GET_MEMBER
} from "../actions/types"
const initialState = { member: [] }
export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_MEMBER:
            return {
                ...state,
                member: payload.member,
            };
        default:
            return state;
    }
}