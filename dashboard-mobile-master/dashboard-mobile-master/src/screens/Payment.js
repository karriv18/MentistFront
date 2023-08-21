import {
    View,
    Text,
    SafeAreaView,
    StatusBar
} from 'react-native'
import React from 'react'
import { t } from 'react-native-tailwindcss'
import { Image } from 'native-base'

const Payment = () => {
    return (
        <SafeAreaView style={[t.bgWhite]}>
            <StatusBar backgroundColor='#231e57' />
            <View style={[t.alignCenter, t.justifyCenter,t.m2]}>
                <Image source={require('../assets/payment_option.png')} alt="payment" style={[
                    t.objectCenter,
                    t.justifyCenter,
                    t.objectContain,
                    t.wFull,
                    t.hFull,
                ]} />
            </View>
        </SafeAreaView>
    )
}

export default Payment