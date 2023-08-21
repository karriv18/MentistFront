import {
    Text,
    Button,
    Checkbox,
    Input,
    ScrollView,
    Alert
} from "native-base"
import { View, SafeAreaView, StatusBar, Modal, TouchableOpacity } from "react-native"
import React, { useEffect, useState } from "react"
import { t } from "react-native-tailwindcss"
import AsyncStorage from "@react-native-async-storage/async-storage"
import callApi from "../../helpers/callApi"
import Loader from "../components/Loader"
import Icon from 'react-native-ico-material-design'
import { useDispatch, useSelector } from "react-redux"
import { getBooking } from "../controller/actions/booking"
import NotAvailable from "./errors/NotAvailable"

const Booking = () => {
    const [selectedAgent, setselectedAgent] = useState()
    const [selectedTime, setSelectedTime] = useState()
    const [date, setDate] = useState(new Date())
    const [mode, setMode] = useState('date')
    const [isShow, setIsShow] = useState(false)
    const [agent, setagent] = useState()
    const [selectDate, setSelectDate] = useState()
    const [type, settype] = useState()
    const [isLoading, setisLoading] = useState(true)
    const [Times, setTimes] = useState()
    const [groupValue, setGroupValue] = useState()
    const [Name, setName] = useState()
    const [Email, setEmail] = useState()
    const [Country, setCountry] = useState()
    const [selectCountry, setSelectCountry] = useState()
    const [FbName, setFbName] = useState()
    const [Contact, setContact] = useState()
    const [EduBg, setEduBg] = useState()
    const [Feedback, setFeedback] = useState()
    const dispatch = useDispatch()
    const [visible, setvisible] = useState(false)
    const { booking } = useSelector(state => state.booking)
    // const Data = {
    //     name: Name,
    //     email: Email,
    //     fb_name: FbName,
    //     contact_no: Contact,
    //     education_bg: EduBg,
    //     country: [selectCountry],
    //     programs: groupValue,
    //     feedback: Feedback,
    //     title: Type,
    //     date: selectDate,
    //     time: selectedTime,
    //     agent_email: service,
    // }

    // const onChange = (event, selectedDate) => {
    //     const currentDate = selectedDate || date
    //     setIsShow(Platform.OS === 'ios')
    //     setDate(currentDate)
    //     setSelectDate(currentDate.toDateString())
    //     getTime(Type, selectDate, service)


    // }
    // const showMode = (currentMode) => {
    //     setIsShow(true)
    //     setMode(currentMode)
    // }
    // const showDatepicker = () => {
    //     showMode('date')
    // }

    // const getData = async () => {
    //     try {
    //         const value = await AsyncStorage.getItem('user')
    //         if (value != null) {
    //             const userEmail = JSON.parse(value).data.user.email
    //             setEmail(userEmail)
    //             const userName = JSON.parse(value).data.user.name
    //             setName(userName)
    //             return value != null ? JSON.parse(value) : null
    //         }
    //     } catch (e) {
    //         console.log(e.response)
    //     }
    // }

    // const getMsr = async (type) => {
    //     try {
    //         const res = await callApi('get', '/agents?appointment_type=' + type)
    //         if (res.status == 200) {
    //             if (res.data.data != null) {
    //                 setAgent(res.data.data)
    //                 setisLoading(false)
    //             }
    //         }
    //     }
    //     catch (err) {
    //         console.log(err.response)
    //     }

    // }
    // const getTime = async (type, date, email) => {
    //     try {
    //         const res = await callApi('get', '/agents?appointment_type=' + type + '&date=' + date + '&email=' + email)
    //         if (res.status == 200) {
    //             setTimes(res.data.time)
    //             setisLoading(false)
    //         }
    //     }
    //     catch (err) {
    //         console.log(err.response)
    //     }
    // }
    // const getCountry = async () => {
    //     try {
    //         const res = await callApi('get', '/countries')
    //         if (res.status == 200) {
    //             setCountry(res.data.data)
    //             setisLoading(false)
    //         }
    //     }
    //     catch (err) {
    //         console.log(err)
    //     }

    // }
    // const addBook = async (data) => {
    //     setisLoading(true)
    //     try {
    //         const res = await callApi('post', '/book', { ...data })
    //         if (res.status == 200) {
    //             setisLoading(false)
    //             Alert.alert('Info', 'Added Book Appointment')
    //         }
    //     }
    //     catch (err) {
    //         console.log(err)
    //         Alert.alert('Error', 'Something went wrong')
    //     }
    // }

    // const items = [
    //     {
    //         name: "Programs",
    //         id: 0,
    //         children: [
    //             {
    //                 id: 'Student Visa',
    //                 name: 'Student Visa'
    //             }, {
    //                 id: 'Tourist Visa',
    //                 name: 'Tourist Visa'
    //             }, {
    //                 id: 'Immigrant Visa',
    //                 name: 'Immigrant Visa'
    //             }, {
    //                 id: 'Internship Visa',
    //                 name: 'Internship Visa'
    //             }, {
    //                 id: 'Dependent Visa',
    //                 name: 'Dependent Visa'
    //             }, {
    //                 id: 'Spousal Visa',
    //                 name: 'Spousal Visa'
    //             }, {
    //                 id: 'Fiancee Visa',
    //                 name: 'Fiancee Visa'
    //             }, {
    //                 id: 'Business Visa',
    //                 name: 'Business Visa'
    //             }
    //         ]
    //     }
    // ]

    const types = [{
        id: 'Appointment for Financial Requirements',
        name: 'Appointment for Financial Requirements'
    }, {
        id: 'Consultation',
        name: 'Consultation'
    }, {
        id: 'Counseling for Members',
        name: 'Counseling for Members'
    }, {
        id: 'Documents Evaluation',
        name: 'Documents Evaluation'
    }, {
        id: 'Pre-Departure Orientation Seminar',
        name: 'Pre-Departure Orientation Seminar'
    }, {
        id: 'Timelining',
        name: 'Timelining'
    }, {
        id: 'Others',
        name: 'Others'
    }]


    useEffect(() => {
        let abort = new AbortController()
        dispatch(getBooking(type))
        setagent(booking.data)

        return () => {
            abort.abort()
        }
    }, [type])

    return (
        <SafeAreaView>
            <StatusBar backgroundColor='#231e57' />
            {/* <View style={[t.alignCenter, t.justifyCenter, t.m4]}>
                <View style={[t.m2]}>
                    <Text style={[t.fontBold, t.textBase]} color="#231e57">Appointment Type</Text>
                </View>
                <View style={[t.m2]}>
                    <View style={[t.flex1, t.justifyCenter, t.alignCenter]}>
 
                    </View>
                </View>
                <View style={[t.m2]}>
                    <Text style={[t.fontBold, t.textBase]} color="#231e57">Choose Agent</Text>
                </View>
                <View style={[t.m2]}>

                </View>

            </View> */}
            <NotAvailable/>
        </SafeAreaView>
    )
}
export default Booking