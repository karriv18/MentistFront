import callApi from "../../../helpers/callApi"
import {
    GET_DEPOSIT,
    GET_TIMELINING,
    GET_PRELIMINARY,
    SET_MESSAGE,
    UPLOAD_DEPOSIT,
    UPLOAD_PRELIMINARY,
} from "./types"
import RNFetchBlob from "rn-fetch-blob"
import { Alert } from "react-native"
export const getUploading = (id) => (dispatch) => {
    return callApi('get', '/deposit?id=' + id)
        .then((response) => {
            const deposit = response.data.deposit.data
            dispatch({
                type: GET_DEPOSIT,
                payload: { deposit: deposit }
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

export const getMoreDeposit = (page, id) => (dispatch) => {
    return callApi('get', '/deposit?page=' + page + '&id=' + id)
        .then((response) => {
            const deposit = response.data.deposit.data
            dispatch({
                type: GET_DEPOSIT,
                payload: { deposit: deposit }
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

export const getTimelining = (id) => (dispatch) => {
    return callApi('get', '/timelining?id=' + id)
        .then((response) => {
            const timelining = response.data.timelining.data
            dispatch({
                type: GET_TIMELINING,
                payload: { timelining: timelining }
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

export const getMoreTimelining = (page, id) => (dispatch) => {
    return callApi('get', '/timelining?page=' + page + '&id=' + id)
        .then((response) => {
            const timelining = response.data.timelining.data
            dispatch({
                type: GET_TIMELINING,
                payload: { timelining: timelining }
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

export const getPreliminary = (id) => (dispatch) => {
    return callApi('get', '/preliminary?id=' + id)
        .then((response) => {
            const preliminary = response.data.preliminary.data
            dispatch({
                type: GET_PRELIMINARY,
                payload: { preliminary: preliminary }
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

export const getMorePreliminary = (page, id) => (dispatch) => {
    return callApi('get', '/preliminary?page=' + page + '&id=' + id)
        .then((response) => {
            console.log(response.data.preliminary.data)
            const preliminary = response.data.preliminary.data
            dispatch({
                type: GET_PRELIMINARY,
                payload: { preliminary: preliminary }
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



export const uploadDeposit = (email, file_type, id, files, Token) => (dispatch) => {
    return RNFetchBlob.fetch('POST', 'https://my.fil-global.com/api/deposit-slips', {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + Token,
    },
        [
            { name: 'file', filename: files.name, type: files.type, data: RNFetchBlob.wrap(files.uri.replace("file://", "")) },
            { name: 'membership_id', data: JSON.stringify(id) },
            { name: 'email', data: email },
            { name: 'file_type', data: file_type.toString() },
        ]).then((response) => {
            const deposit = response.data
            dispatch({
                type: UPLOAD_DEPOSIT,
                payload: { deposit: deposit }
            })
            Alert.alert('info', JSON.parse(deposit).data)
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

export const uploadPrelimenary = (email, file_type, id, files, Token) => (dispatch) => {
    return RNFetchBlob.fetch('POST', 'https://my.fil-global.com/api/preliminary', {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + Token,
    },
        [
            { name: 'file', filename: files.name, type: files.type, data: RNFetchBlob.wrap(files.uri.replace("file://", "")) },
            { name: 'membership_id', data: JSON.stringify(id) },
            { name: 'email', data: email },
            { name: 'file_type', data: file_type.toString() },
        ]).then((response) => {
            const preliminary = response.data
            dispatch({
                type: UPLOAD_PRELIMINARY,
                payload: { preliminary: preliminary }
            })
            Alert.alert('info', JSON.parse(preliminary).data)
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