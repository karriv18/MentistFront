import {
    View,
    SafeAreaView,
    StatusBar,
    Image
} from 'react-native'
import React from 'react'
import { t } from 'react-native-tailwindcss'
import { Text } from 'native-base'

const NotAvailable = () => {
    return (
        <SafeAreaView>
            <StatusBar backgroundColor='#231e57' />
            <View style={[t.alignCenter, t.justifyCenter, t.hFull,t.border,t.borderBlack]}>
                <Image source={require('../../assets/page_not_available.png')} alt="logo" style={[
                    t.objectCenter,
                    t.objectContain,
                    t.wFull,
                ]} />
            </View>
        </SafeAreaView>
    )
}

export default NotAvailable