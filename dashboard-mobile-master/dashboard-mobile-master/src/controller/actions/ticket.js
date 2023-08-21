import callApi from "../../../helpers/callApi"
import {
    GET_TICKET,
    SET_MESSAGE,
    UPLOAD_TICKET,
} from "./types"
import { Alert } from "react-native"
import RNFetchBlob from "rn-fetch-blob"
export const getTicket = (email) => (dispatch) => {
    return callApi('get', '/ticket?email=' + email)
        .then((response) => {
            const ticket = response.data
            dispatch({
                type: GET_TICKET,
                payload: { ticket: ticket }
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
export const uploadTicket = (files, email, subject, details, category, type, priority, name, token) => (dispatch) => {
    return RNFetchBlob.fetch('POST', 'https://my.fil-global.com/api/upload-ticket', {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + token,
    },
        [
            { name: 'ss', filename: files.name, type: files.type, data: RNFetchBlob.wrap(files.uri.replace("file://", "")) },
            { name: 'email', data: email },
            { name: 'subject', data: subject },
            { name: 'detail', data: details },
            { name: 'category', data: category },
            { name: 'type', data: type },
            { name: 'priority', data: priority },
            { name: 'name', data: name },
        ]).then((response) => {
            const uploadticket = response.data
            dispatch({
                type: UPLOAD_TICKET,
                payload: { uploadticket: uploadticket }
            })
            Alert.alert('info', JSON.parse(uploadticket).message)
            console.log(response)
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