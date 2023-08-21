import { Alert } from "react-native"
import callApi from "../../../helpers/callApi"
import {
    GET_FOLLOWUP,
    SET_MESSAGE,
    ADD_FOLLOWUP,
} from "./types"
export const getFollowUp = (email) => (dispatch) => {
    return callApi('get', '/followup?email=' + email)
        .then((response) => {
            const followup = response.data
            dispatch({
                type: GET_FOLLOWUP,
                payload: { followup: followup }
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

export const addFollowUp = (data) => (dispatch) => {
    return callApi('post', '/followup', { ...data })
        .then((response) => {
            const addfollowup = response.data
            dispatch({
                type: ADD_FOLLOWUP,
                payload: { addfollowup: addfollowup }
            })
            Alert.alert('info', addfollowup.message)
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