import {
    GET_CHAT, ADD_CHAT
} from "../actions/types"
const initialState = { chat: [] }
export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_CHAT:
            return {
                ...state,
                chat: [...state.chat, ...payload.chat],
            };
        case ADD_CHAT:
            return {
                ...state,
                chat: [...state.chat, payload.sndmsg],
            };
        default:
            return state;
    }
}