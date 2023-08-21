import {
    GET_MDCHECKLIST,
    UPLOAD_MDCHECKLIST,
    GET_MDCHECKLIST_DATA,
} from "../actions/types"
const initialState = { mdchecklist: [], uploadmdchecklist: [], mdChecklistData: [] }
export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_MDCHECKLIST:
            return {
                ...state,
                mdchecklist: [...state.mdchecklist, ...payload.mdchecklist],
            };
        case GET_MDCHECKLIST_DATA:
            return {
                ...state,
                mdChecklistData: payload.mdChecklistData,
            };
        case UPLOAD_MDCHECKLIST:
            return {
                ...state,
                uploadmdchecklist: payload.uploadmdchecklist,
            }
        default:
            return state;
    }
}