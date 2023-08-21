import React from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"


export const authHeader = () => {
    const user = JSON.parse(AsyncStorage.getItem('user'))
    if (user && user.token) {
      return { Authorization: 'Bearer ' + user.token }
    } else {
      return {}
    }
  }