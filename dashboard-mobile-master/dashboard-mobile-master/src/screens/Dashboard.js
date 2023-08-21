import React, { useEffect, useState } from 'react'
import {
    View,
    SafeAreaView,
    TouchableOpacity,
    Text,
    ScrollView,
    StatusBar,
    PermissionsAndroid,
    Image,
    Alert
} from 'react-native'
import { t } from 'react-native-tailwindcss'
import Icon from 'react-native-ico'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../controller/actions/auth'
import { Skeleton } from 'native-base'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getMember } from '../controller/actions/member'
import { getUploading, getTimelining, getPreliminary } from '../controller/actions/uploading'
import { getTicket } from '../controller/actions/ticket'
import { getFollowUp } from '../controller/actions/followup'
import { getAnnouncement } from '../controller/actions/announcement'
import { getPromo } from '../controller/actions/ads'
import { getChat } from '../controller/actions/support'

const Dashboard = ({ navigation }) => {
    const [isLoading, setisLoading] = useState()
    const [name, setname] = useState()
    const [email, setemail] = useState()
    const [userId, setuserId] = useState()
    const [token, settoken] = useState()
    const [status, setstatus] = useState()
    const [id, setid] = useState()
    const dispatch = useDispatch()
    const {user} = useSelector(state => state.auth)

    const getData = async () => {
        try {
            setisLoading(true)
            const value = await AsyncStorage.getItem('user')
            if (value !== null) {
                setname(JSON.parse(value).name)
                setemail(JSON.parse(value).email)
                setid(JSON.parse(value).member.id)
                setstatus(JSON.parse(value).member.status)
                setuserId(JSON.parse(value).id)
            }
            const token = await AsyncStorage.getItem('token')
            if (token) {
                settoken(token)
                setisLoading(false)
            }
        } catch (e) {
            console.log(e)
        }
    }
    const getPermissions = async () => {
        if (Platform.OS === 'android') {
            let granted = await PermissionsAndroid.requestMultiple([
                PermissionsAndroid.PERMISSIONS.CAMERA,
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            ])
            if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
                granted = await PermissionsAndroid.requestMultiple([
                    PermissionsAndroid.PERMISSIONS.CAMERA,
                    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                ])
            }
        }
    }
    useEffect(() => {
        let abort = new AbortController()
        setTimeout(() => {
            getData()
            getPermissions()
        }, 500);
        return () => {
            abort.abort()
        }
    }, [])

    const fetchMember = () => {
        dispatch(getMember(id))
            .then(() => navigation.push('ProfileFooter'))
    }

    const fetchTicket = () => {
        dispatch(getTicket(email))
            .then(() => navigation.push('Ticket'))
    }

    const fetchUploading = () => {
        dispatch(getUploading(id))
        dispatch(getPreliminary(id))
        dispatch(getTimelining(id))
            .then(() => navigation.push('UploadingFooter', status))
    }
    const fetchFollowUp = () => {
        dispatch(getFollowUp(email))
            .then(() => navigation.push('Followup'))
    }

    const fetchBooking = () => {
        navigation.push('Booking')
    }

    const fetchAnnouncement = () => {
        dispatch(getAnnouncement())
            .then(() => navigation.push('Annoucement'))
    }
    const fetchPromo = () => {
        dispatch(getPromo())
            .then(() => navigation.push('Promo'))
    }
    const fetchPayment = () => {
        navigation.push('Payment')
    }
    const fetchSupportChat = () => {
        // dispatch(getChat(id))
        //     .then(() => navigation.push('SupportChat', { id: id, name: name, user_id: userId, token: token }))
        navigation.push('Webview')
    }

    const handleLogout = () => {
        Alert.alert(
            "Logout",
            "Are you sure?",
            [
                {
                    text: "Cancel",
                    onPress: () => navigation.push('Dashboard'),
                    style: "cancel"
                },
                {
                    text: "OK", onPress: () => dispatch(logout()),
                    style: "ok"
                }
            ]
        );
    }

    return (
        <SafeAreaView>
            <ScrollView>
                <StatusBar backgroundColor='#231e57' />
                <View style={[t.bgWhite]}>
                    {isLoading ?
                        <Skeleton.Text lines={1} style={[t.pT10, t.p2]} /> :
                        <View style={[t.p2, t.mL2]}>
                            <View style={[t.flexRow, t.flexWrap, t.flex, t.justifyBetween, t.m2]}>
                                <Image source={require('../assets/fil-global-icon-dash.png')} />
                                <Text style={[t.fontBold, t.textLg, t.p2, t.textBlack, t.mT2, t.flex1]}>
                                    Welcome!
                                </Text>
                                <TouchableOpacity onPress={() =>
                                    handleLogout()
                                }>
                                    <Icon name="log-out" group="basic" style={[t.p4, t.selfCenter, t.m2]} />
                                </TouchableOpacity>
                            </View>

                        </View>
                    }

                    {status == 3 ?
                        <>
                            <View style={[t.flexRow, t.flexWrap, t.justifyCenter]}>
                                <View style={[t.m2, t.roundedLg, t.bgWhite, t.h40, t.w1_4]}>
                                    <TouchableOpacity
                                        onPress={() => fetchSupportChat()}>
                                        <Icon name="message" group="basic" style={[t.selfCenter, t.m2, t.p6]} color="#231e57" />
                                        <Text style={[t.fontBold, t.textSm,t.textCenter, t.textIndigo900]}>
                                            Support Chat
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={[t.m2, t.roundedLg, t.bgWhite, t.h40, t.w1_4]}>
                                    <TouchableOpacity
                                        onPress={() => fetchMember()}>
                                        <Icon name="profile" group="basic" style={[t.selfCenter, t.m2, t.p6]} color="#231e57" />
                                        <Text style={[t.fontBold, t.textSm,t.textCenter, t.textIndigo900]}>
                                            Personal Information
                                        </Text>
                                    </TouchableOpacity>
                                </View>

                                <View style={[t.m2, t.roundedLg, t.bgWhite, t.h40, t.w1_4]}>
                                    <TouchableOpacity
                                        onPress={() => fetchUploading()}>
                                        <Icon name="paper" group="basic" style={[t.selfCenter, t.m2, t.p6]} color="#231e57" />
                                        <Text style={[t.fontBold, t.textSm,t.textCenter, t.textIndigo900]}>
                                            Upload/Timelining
                                        </Text>
                                    </TouchableOpacity>
                                </View>

                                <View style={[t.m2, t.roundedLg, t.bgWhite, t.h40, t.w1_4]}>
                                    <TouchableOpacity
                                        onPress={() => navigation.push('Mdchecklist')}>
                                        <Icon name="folder-1" group="basic" style={[t.selfCenter, t.m2, t.p6]} color="#231e57" />
                                        <Text style={[t.fontBold, t.textSm,t.textCenter, t.textIndigo900]}>
                                            MD Checklist
                                        </Text>
                                    </TouchableOpacity>
                                </View>

                                <View style={[t.m2, t.roundedLg, t.bgWhite, t.h40, t.w1_4]}>
                                    <TouchableOpacity
                                        onPress={() => fetchTicket()}>
                                        <Icon name="ticket" group="basic" style={[t.selfCenter, t.m2, t.p6]} color="#231e57" />
                                        <Text style={[t.fontBold, t.textSm,t.textCenter, t.textIndigo900]}>
                                            Ticket
                                        </Text>
                                    </TouchableOpacity>
                                </View>

                                <View style={[t.m2, t.roundedLg, t.bgWhite, t.h40, t.w1_4]}>
                                    <TouchableOpacity
                                        onPress={() => fetchFollowUp()}>
                                        <Icon name="up-arrow" group="basic" style={[t.selfCenter, t.m2, t.p6]} color="#231e57" />
                                        <Text style={[t.fontBold, t.textSm,t.textCenter, t.textIndigo900]}>
                                            Follow Up
                                        </Text>
                                    </TouchableOpacity>
                                </View>

                                <View style={[t.m2, t.roundedLg, t.bgWhite, t.h40, t.w1_4]}>
                                    <TouchableOpacity
                                        onPress={() => fetchBooking()}>
                                        <Icon name="calendar" group="basic" style={[t.selfCenter, t.m2, t.p6]} color="#231e57" />
                                        <Text style={[t.fontBold, t.textSm,t.textCenter, t.textIndigo900]}>
                                            Book Appointment
                                        </Text>
                                    </TouchableOpacity>
                                </View>

                                <View style={[t.m2, t.roundedLg, t.bgWhite, t.h40, t.w1_4]}>
                                    <TouchableOpacity
                                        onPress={() => fetchAnnouncement()}>
                                        <Icon name="bull-horn-announcer" group="font-awesome" style={[t.selfCenter, t.m2, t.p6]} color="#231e57" />
                                        <Text style={[t.fontBold, t.textSm,t.textCenter, t.textIndigo900]}>
                                            Announcement
                                        </Text>
                                    </TouchableOpacity>
                                </View>

                                <View style={[t.m2, t.roundedLg, t.bgWhite, t.h40, t.w1_4]}>
                                    <TouchableOpacity
                                        onPress={() => fetchPromo()}>
                                        <Icon name="price-tag" group="miscellaneous" style={[t.selfCenter, t.m2, t.p6]} color="#231e57" />
                                        <Text style={[t.fontBold, t.textSm,t.textCenter, t.textIndigo900]}>
                                            Promo
                                        </Text>
                                    </TouchableOpacity>
                                </View>

                                <View style={[t.m2, t.roundedLg, t.bgWhite, t.h40, t.w1_4]}>
                                    <TouchableOpacity
                                        onPress={() => fetchPayment()}>
                                        <Icon name="credit-card" group="miscellaneous" style={[t.selfCenter, t.m2, t.p6]} color="#231e57" />
                                        <Text style={[t.fontBold, t.textSm,t.textCenter, t.textIndigo900]}>
                                            Payment
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </>
                        : status == 7 ?
                            <>
                                <View style={[t.flexRow, t.flexWrap, t.justifyCenter]}>
                                    <View style={[t.m2, t.roundedLg, t.bgRed600, t.h40, t.w1_4]}>
                                        <TouchableOpacity
                                            onPress={() => fetchMember()}>
                                            <Icon name="profile" group="basic" style={[t.selfCenter, t.m2, t.p6]} color="#231e57" />
                                            <Text style={[t.fontBold, t.textSm,t.textCenter, t.textIndigo900]}>
                                                Personal Information
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={[t.m2, t.roundedLg, t.bgRed600, t.h40, t.w1_4]}>
                                        <TouchableOpacity
                                            onPress={() => fetchUploading()}>
                                            <Icon name="paper" group="basic" style={[t.selfCenter, t.m2, t.p8]} color="#231e57" />
                                            <Text style={[t.fontBold, t.textSm,t.textCenter, t.textIndigo900]}>
                                                Upload
                                            </Text>
                                        </TouchableOpacity>
                                    </View>

                                    <View style={[t.m2, t.roundedLg, t.bgRed600, t.h40, t.w1_4]}>
                                        <TouchableOpacity
                                            onPress={() => fetchTicket()}>
                                            <Icon name="ticket" group="basic" style={[t.selfCenter, t.m2, t.p8]} color="#231e57" />
                                            <Text style={[t.fontBold, t.textSm,t.textCenter, t.textIndigo900]}>
                                                Ticket
                                            </Text>
                                        </TouchableOpacity>
                                    </View>

                                    <View style={[t.m2, t.roundedLg, t.bgRed600, t.h40, t.w1_4]}>
                                        <TouchableOpacity
                                            onPress={() => fetchAnnouncement()}>
                                            <Icon name="bull-horn-announcer" group="font-awesome" style={[t.selfCenter, t.m2, t.p6]} color="#231e57" />
                                            <Text style={[t.fontBold, t.textSm,t.textCenter, t.textIndigo900]}>
                                                Announcement
                                            </Text>
                                        </TouchableOpacity>
                                    </View>

                                    <View style={[t.m2, t.roundedLg, t.bgRed600, t.h40, t.w1_4]}>
                                        <TouchableOpacity
                                            onPress={() => fetchPromo()}>
                                            <Icon name="price-tag" group="miscellaneous" style={[t.selfCenter, t.m2, t.p6]} color="#231e57" />
                                            <Text style={[t.fontBold, t.textSm,t.textCenter, t.textIndigo900]}>
                                                Promo
                                            </Text>
                                        </TouchableOpacity>
                                    </View>

                                    <View style={[t.m2, t.roundedLg, t.bgRed600, t.h40, t.w1_4]}>
                                        <TouchableOpacity
                                            onPress={() => fetchPayment()}>
                                            <Icon name="credit-card" group="miscellaneous" style={[t.selfCenter, t.m2, t.p6]} color="#231e57" />
                                            <Text style={[t.fontBold, t.textSm,t.textCenter, t.textIndigo900]}>
                                                Payment
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </>
                            : status == 6 || status == 5 || status == 4 || status == 2 || status == 1 ?
                                <>
                                    <View style={[t.flexRow, t.flexWrap, t.justifyCenter, t.mB4]}>
                                        <View style={[t.m2, t.roundedLg, t.bgRed600, t.h40, t.w1_4]}>
                                            <TouchableOpacity
                                                onPress={() => fetchMember()}>
                                                <Icon name="profile" group="basic" style={[t.selfCenter, t.m2, t.p6]} color="#231e57" />
                                                <Text style={[t.fontBold, t.textSm,t.textCenter, t.textIndigo900]}>
                                                    Personal Information
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={[t.m2, t.roundedLg, t.bgRed600, t.h40, t.w1_4]}>
                                            <TouchableOpacity
                                                onPress={() => fetchUploading()}>
                                                <Icon name="paper" group="basic" style={[t.selfCenter, t.m2, t.p8]} color="#231e57" />
                                                <Text style={[t.fontBold, t.textSm,t.textCenter, t.textIndigo900]}>
                                                    Upload
                                                </Text>
                                            </TouchableOpacity>
                                        </View>

                                        <View style={[t.m2, t.roundedLg, t.bgRed600, t.h40, t.w1_4]}>
                                            <TouchableOpacity
                                                onPress={() => fetchTicket()}>
                                                <Icon name="ticket" group="basic" style={[t.selfCenter, t.m2, t.p8]} color="#231e57" />
                                                <Text style={[t.fontBold, t.textSm,t.textCenter, t.textIndigo900]}>
                                                    Ticket
                                                </Text>
                                            </TouchableOpacity>
                                        </View>

                                        <View style={[t.m2, t.roundedLg, t.bgRed600, t.h40, t.w1_4]}>
                                            <TouchableOpacity
                                                onPress={() => fetchBooking()}>
                                                <Icon name="calendar" group="basic" style={[t.selfCenter, t.m2, t.p6]} color="#231e57" />
                                                <Text style={[t.fontBold, t.textSm,t.textCenter, t.textIndigo900]}>
                                                    Book Appointment
                                                </Text>
                                            </TouchableOpacity>
                                        </View>

                                        <View style={[t.m2, t.roundedLg, t.bgRed600, t.h40, t.w1_4]}>
                                            <TouchableOpacity
                                                onPress={() => fetchAnnouncement()}>
                                                <Icon name="bull-horn-announcer" group="font-awesome" style={[t.selfCenter, t.m2, t.p6]} color="#231e57" />
                                                <Text style={[t.fontBold, t.textSm,t.textCenter, t.textIndigo900]}>
                                                    Announcement
                                                </Text>
                                            </TouchableOpacity>
                                        </View>

                                        <View style={[t.m2, t.roundedLg, t.bgRed600, t.h40, t.w1_4]}>
                                            <TouchableOpacity
                                                onPress={() => fetchPromo()}>
                                                <Icon name="price-tag" group="miscellaneous" style={[t.selfCenter, t.m2, t.p6]} color="#231e57" />
                                                <Text style={[t.fontBold, t.textSm,t.textCenter, t.textIndigo900]}>
                                                    Promo
                                                </Text>
                                            </TouchableOpacity>
                                        </View>

                                        <View style={[t.m2, t.roundedLg, t.bgRed600, t.h40, t.w1_4]}>
                                            <TouchableOpacity
                                                onPress={() => fetchPayment()}>
                                                <Icon name="credit-card" group="miscellaneous" style={[t.selfCenter, t.m2, t.p6]} color="#231e57" />
                                                <Text style={[t.fontBold, t.textSm,t.textCenter, t.textIndigo900]}>
                                                    Payment
                                                </Text>
                                            </TouchableOpacity>
                                        </View>

                                    </View>
                                </>
                                :
                                <></>
                    }
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};
export default Dashboard;