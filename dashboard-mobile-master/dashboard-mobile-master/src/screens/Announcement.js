import React, { useState, useEffect } from "react"
import {
    Text,
    Box,
    Stack,
    Image,
} from "native-base"
import {
    View,
    SafeAreaView,
    StatusBar,
    FlatList,
    ScrollView
} from "react-native"
import { t } from "react-native-tailwindcss"
import callApi from "../../helpers/callApi"
import Loader from "../components/Loader"
import { useSelector } from "react-redux"


const Announcement = () => {
    const [info, setinfo] = useState()
    const [isLoading, setisLoading] = useState(true)
    const { announcement } = useSelector(state => state.announcement)

    useEffect(() => {
        let abort = new AbortController()
        setTimeout(() => {
            setinfo(announcement.data)
        }, 500)
        return () => {
            abort.abort()
        }
    }, [])

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
                    {item.announcement}
                </Text>
                <Text style={[t.fontNormal, t.p2, t.textBlack]}>
                    {item.text}
                </Text>
            </View>
        </View>
    )

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
                    data={info}
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
export default Announcement