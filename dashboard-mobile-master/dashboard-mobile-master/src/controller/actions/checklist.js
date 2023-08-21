import callApi from "../../../helpers/callApi"
import {
    GET_MDCHECKLIST,
    SET_MESSAGE,
    UPLOAD_MDCHECKLIST,
    GET_MDCHECKLIST_DATA,
} from "./types"
import RNFetchBlob from "rn-fetch-blob"
import { Alert } from "react-native"
export const getMdchecklist = (memId, indicator) => (dispatch) => {
    return callApi('get', '/mdchecklist?id=' + memId + '&indicator=' + indicator)
        .then((response) => {
            const mdchecklist = response.data.data.files.data
            dispatch({
                type: GET_MDCHECKLIST,
                payload: { mdchecklist: mdchecklist }
            })

            const mdChecklistData = response.data
            
            dispatch({
                type: GET_MDCHECKLIST_DATA,
                payload: { mdChecklistData: mdChecklistData }
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

export const getMoreDocuments = (memId, indicator,page) => (dispatch) => {
    return callApi('get', '/mdchecklist?id=' + memId + '&indicator=' + indicator + '&page=' + page)
        .then((response) => {
            const mdchecklist = response.data.data.files.data
            dispatch({
                type: GET_MDCHECKLIST,
                payload: { mdchecklist: mdchecklist }
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

export const uploadMdChecklist = (id, file_type, indicator, files, Token, email, name) => (dispatch) => {
    return RNFetchBlob.fetch('POST', 'https://my.fil-global.com/api/upload-md-checklist', {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + Token,
    },
        [
            { name: 'file', filename: files.name, type: files.type, data: RNFetchBlob.wrap(files.uri.replace("file://", "")) },
            { name: 'membership_id', data: JSON.stringify(id) },
            { name: 'indicator', data: indicator },
            { name: 'email', data: email },
            { name: 'name', data: name },
            { name: 'file_type', data: file_type.toString() },
        ]).then((response) => {
            const uploadmdchecklist = response.data
            dispatch({
                type: UPLOAD_MDCHECKLIST,
                payload: { uploadmdchecklist: uploadmdchecklist }
            })
            Alert.alert('info', JSON.parse(uploadmdchecklist).message)
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