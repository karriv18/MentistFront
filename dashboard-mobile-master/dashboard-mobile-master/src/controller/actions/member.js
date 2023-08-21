import { Alert } from "react-native"
import callApi from "../../../helpers/callApi"
import {
    GET_MEMBER,
    SET_MESSAGE,
} from "./types"
export const getMember = (id) => (dispatch) => {
    return callApi('get', '/information?id=' + id)
        .then((response) => {
            const member = response.data
            dispatch({
                type: GET_MEMBER,
                payload: { member: member }
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
export const updateMember = (email, data) => (dispatch) => {
    return callApi('post', '/information', { email, ...data })
        .then((response) => {
            const member = response.data
            dispatch({
                type: GET_MEMBER,
                payload: { member: member }
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

export const updateDependents = (id, data) => (dispatch) => {
    return callApi('post', '/dependents', { id, ...data })
        .then((response) => {
            const member = response.data
            dispatch({
                type: GET_MEMBER,
                payload: { member: member }
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

export const updateEducation = (id, data) => (dispatch) => {
    return callApi('post', '/educational-backgrounds', { id, ...data })
        .then((response) => {
            const member = response.data

            dispatch({
                type: GET_MEMBER,
                payload: { member: member }
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

export const updateInformation = (id, data) => (dispatch) => {
    return callApi('post', '/other-info', { id, ...data })
        .then((response) => {
            const member = response.data
            dispatch({
                type: GET_MEMBER,
                payload: { member: member }
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
