import callApi from "../../../helpers/callApi"
import {
    GET_ANNOUCEMENT,
    SET_MESSAGE,
} from "./types"
export const getAnnouncement = () => (dispatch) => {
    return callApi('get', '/announcement')
        .then((response) => {
            const announcement = response.data
            dispatch({
                type: GET_ANNOUCEMENT,
                payload: { announcement: announcement }
            })
            return Promise.resolve()
        },
            (error) => {
                const message = (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                    error.message ||
                    error.toString()
                dispatch({
                    type: SET_MESSAGE,
                    payload: message
                })
                return Promise.reject()
            }
        )
}