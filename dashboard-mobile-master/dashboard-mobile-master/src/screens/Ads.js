import React, { useState, useEffect } from "react"
import {
    Text,
    Image,
    Box,
    Stack
} from "native-base"
import {
    View,
    SafeAreaView,
    FlatList,
    StatusBar,
    ScrollView
} from "react-native"
import { t } from "react-native-tailwindcss"
import { useSelector } from "react-redux"


const Ads = () => {
    const [item, setitem] = useState()
    const [isLoading, setisLoading] = useState(true)
    const { promo } = useSelector(state => state.promo)

    const ItemSeparatorView = () => {
        return (
            <View
                style={{
                    height: 0.5,
                    width: '100%',
                    // backgroundColor: '#C8C8C8',
                }}
            />
        )
    }

    const renderItem = ({ item }) => (
        <View style={[t.m2]}>
            <View style={[t.flexRow, t.flexCol, t.p2, t.roundedLg, t.relative]}>
                <Text style={[t.fontBold, t.p2, t.textBlack, t.textBase]}>
                    {item.title}
                </Text>
                <Text style={[t.fontNormal, t.p2, t.textBlack]}>
                    {item.description}
                </Text>
            </View>
        </View>
    )

    useEffect(() => {
        let abort = new AbortController()
        setitem(promo.data)
        return () => {
            abort.abort()
        }
    }, [])

    return (
        <SafeAreaView>
            <StatusBar backgroundColor='#231e57' />
            <View style={[t.alignCenter, t.justifyCenter, t.m4]}>
                <Image source={require('../assets/fil-global-icon.png')} alt="logo" style={[
                    t.objectCenter,
                    t.objectContain,
                    t.wFull,
                ]} />
                <FlatList
                    data={item}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => String(index)}
                    onEndReachedThreshold={0.2}
                    ItemSeparatorComponent={ItemSeparatorView}
                    style={[t.pB32]}
                />
            </View>
        </SafeAreaView>
    )
}
export default Ads