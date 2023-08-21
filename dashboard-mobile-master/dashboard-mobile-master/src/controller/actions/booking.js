import callApi from "../../../helpers/callApi"
import {
    GET_BOOKING,
    SET_MESSAGE,
} from "./types"
export const getBooking = (type) => (dispatch) => {
    return callApi('get', '/get-agents?appointment_type=' + type)
        .then((response) => {
            const booking = response.data
            dispatch({
                type: GET_BOOKING,
                payload: { booking: booking }
            })
            Alert.alert('info', response.data.message)
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