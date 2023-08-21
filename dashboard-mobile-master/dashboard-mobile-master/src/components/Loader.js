import { Center, Spinner, View, Text } from "native-base"
import React from "react"
import { SafeAreaView, StatusBar } from "react-native"
import { t } from "react-native-tailwindcss"
const Loader = () => {
    return (
        <SafeAreaView style={[t.flex, t.itemsCenter, t.justifyCenter, t.relative, t.mT64, t.pT48]}>
            <StatusBar backgroundColor='#231e57' />
            <View style={[t.absolute]}>
                <Spinner size="lg" />
                <Text>
                    Loading...
                </Text>
            </View>
        </SafeAreaView>
    )
}
export default Loader