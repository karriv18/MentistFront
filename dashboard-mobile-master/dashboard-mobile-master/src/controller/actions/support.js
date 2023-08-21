import { Alert } from "react-native"
import RNFetchBlob from "rn-fetch-blob"
import callApi from "../../../helpers/callApi"
import {
    GET_CHAT,
    SET_MESSAGE,
    ADD_CHAT,
} from "./types"
export const getChat = (id) => (dispatch) => {
    return callApi('get', '/get-chat?id=' + id)
        .then((response) => {
            const chat = response.data.message.data
            dispatch({
                type: GET_CHAT,
                payload: { chat: chat }
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

export const getMoreChat = (page, id) => (dispatch) => {
    return callApi('get', '/get-chat?page=' + page + '&id=' + id)
        .then((response) => {
            const chat = response.data.message.data
            dispatch({
                type: GET_CHAT,
                payload: { chat: chat }
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

export const sendMsg = (data, files, Token) => (dispatch) => {
    if (files) {
        return RNFetchBlob.fetch('POST', 'http://192.168.50.197/api/send-msg', {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + Token
        },
            [
                { name: 'file', filename: files.name, type: files.type, data: RNFetchBlob.wrap(files.uri.replace("file://", "")) },
                { name: 'post', data: data.post },
                { name: 'name', data: data.name },
                { name: 'user_id', data: JSON.stringify(data.user_id) },
                { name: 'membership_id', data: JSON.stringify(data.membership_id) },
            ]
        ).then((response) => {
            const sndmsg = response.data
            dispatch({
                type: ADD_CHAT,
                payload: { sndmsg: sndmsg }
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
    } else {
        return callApi('post', '/send-msg', { ...data })
            .then((response) => {
                const sndmsg = response.data
                dispatch({
                    type: ADD_CHAT,
                    payload: { sndmsg: sndmsg }
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

}

