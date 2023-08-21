import AsyncStorage from "@react-native-async-storage/async-storage"
import { Alert } from "react-native"
import callApi from "../../../helpers/callApi"
import {
  LOGIN_SUCCESS,
  LOGOUT,
} from "./types"
export const login = (email, password) => (dispatch) => {
  return callApi('post', '/login', { email, password })
    .then((response) => {
      AsyncStorage.setItem('token', response.data.data.token)
      AsyncStorage.setItem('user', JSON.stringify(response.data.data.user))
      const user = response.data.data
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { user: user }
      })
      return Promise.resolve()
    })
    .catch((error) => {
      Alert.alert('login', 'Wrong Credential')
    })
}
export const register = (name, email, password) => (dispatch) => {
  return callApi('post', '/register', { name, email, password })
    .then((response) => {
      const user = response.data.data
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { user: user }
      })
      return Promise.resolve()
    })
    .catch((error) => {
      Alert.alert('login', 'Wrong Credential')
    })
}
export const logout = () => (dispatch) => {
  AsyncStorage.removeItem('user')
  AsyncStorage.removeItem('token')
  dispatch({
    type: LOGOUT,
    user: null
  })
}