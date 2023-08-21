import React, { useState, useEffect } from "react"
import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from '@react-navigation/drawer'
import {
    View,
    Text,
    Alert,
    SafeAreaView
} from "react-native"
import { t } from 'react-native-tailwindcss'
import Icon from 'react-native-ico'
import { Avatar, Button, Image } from "native-base"
import AsyncStorage from "@react-native-async-storage/async-storage"


const SideBarMenu = (props, navigation) => {
    const [Email, setEmail] = useState()
    const [Id, setId] = useState()
    const [Name, setName] = useState()
    const getdata = async () => {
        try {
            const value = await AsyncStorage.getItem('user')
            if (value != null) {
                const userEmail = JSON.parse(value).data.user.email
                setEmail(userEmail)
                const membership = JSON.parse(value).data.user.member.id
                setId(membership)
                const userName = JSON.parse(value).data.user.name
                setName(userName)
            }
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        let abort = new AbortController()
        getdata()
        return () => {
            abort.abort()
        }
    }, [])

    return (
        <SafeAreaView>
            <View
                style={Id ? { backgroundColor: '#231e57', height: '100%', width: '100%' } : { backgroundColor: '#ec1d27', height: '100%', width: '100%' }}>
                <View style={[t.p4]}>
                    <Image style={[t.h16, t.w3_4]}
                        source={require('../assets/fil-global-white-logo.png')}
                        alt='fil-global-white-logo' />
                    <Text style={[t.textWhite, t.w3_4, t.fontBold]}>{Name}</Text>
                    <Text style={[t.textWhite, t.w3_4]}>{Email}</Text>
                </View>
                <View style={[t.hPx, t.mX5, t.bgWhite]} />
                <DrawerContentScrollView {...props}
                    contentContainerStyle={{ paddingTop: 5 }}
                >
                    <DrawerItemList {...props} />
                    <DrawerItem
                        label={() =>
                            <Text style={[t.mL6, t.textRed300]}>
                                Log Out
                            </Text>
                        }
                        onPress={() => {
                            props.navigation.toggleDrawer()
                            Alert.alert(
                                'Logout',
                                'Are you sure? You want to logout?',
                                [
                                    {
                                        text: 'Cancel',
                                        onPress: () => {
                                            return null
                                        },
                                    },
                                    {
                                        text: 'Confirm',
                                        onPress: () => {
                                            AsyncStorage.clear()
                                            props.navigation.replace('Login')
                                        },
                                    },
                                ],
                                { cancelable: false },
                            )
                        }}
                    />

                </DrawerContentScrollView>
            </View>
        </SafeAreaView>
    )
}

export default SideBarMenu