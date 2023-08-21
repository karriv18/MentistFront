import {
    View,
    SafeAreaView,
    StatusBar,
    Image,
    KeyboardAvoidingView,
    Alert
} from 'react-native'
import {
    Spinner,
    Text,
    FormControl,
} from "native-base"
import { t } from 'react-native-tailwindcss'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"

const Loader = ({ navigation }) => {

    const { user } = useSelector(state => state.auth)
    
    useEffect(() => {
        let abort = new AbortController()
        user ? navigation.push('Dashboard') : navigation.push('Login')
        return () => {
            abort.abort()
        }
    }, [])


    return (
        <SafeAreaView style={[t.flex1, t.justifyCenter, t.alignCenter, t.bgWhite]}>
            <StatusBar backgroundColor='#231e57' />
            <View>
                <KeyboardAvoidingView enabled>
                    <FormControl>
                        {/* <View style={[t.alignCenter]}>
                            <Image source={require('../../assets/fil-global-icon.png')} style={[
                                t.objectCenter,
                                t.objectContain,
                                t.wFull]} />
                        </View> */}
                        <View>
                            <Spinner size="lg" />
                            <Text style={[t.textCenter, t.fontBold, t.textXl, t.p5]}>
                                Loading...
                            </Text>
                        </View>
                    </FormControl>
                </KeyboardAvoidingView>
            </View>
        </SafeAreaView>
    )
}

export default Loader