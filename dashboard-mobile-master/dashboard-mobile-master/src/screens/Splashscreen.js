import React, { useEffect, useState } from "react"
import {
    View,
    Text,
    Image,
    StatusBar,
    SafeAreaView
} from 'react-native'
import { t } from 'react-native-tailwindcss'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Splashscreen = ({ navigation }) => {
    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('user')
            value ? navigation.push('Dashboard') : navigation.push('Login')
        } catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {
        setTimeout(() => {
            getData()
        }, 500)
    }, [])
    return (
        <SafeAreaView style={[t.flex1, t.alignCenter, t.justifyCenter, t.bgWhite]}>
            <Image source={require('../assets/fil-global-icon.png')} style={[t.objectCenter, t.objectContain, t.wFull, t.m30]} />
        </SafeAreaView>
    )
}
export default Splashscreen