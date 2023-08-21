import callApi from "../../../helpers/callApi"
import {
    GET_PROMO,
    SET_MESSAGE,
} from "./types"
export const getPromo = () => (dispatch) => {
    return callApi('get', '/promo')
        .then((response) => {
            const promo = response.data
            dispatch({
                type: GET_PROMO,
                payload: { promo: promo }
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