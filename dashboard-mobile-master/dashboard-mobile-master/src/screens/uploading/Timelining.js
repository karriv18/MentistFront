import React, { useState, useEffect } from "react"
import { SafeAreaView, View, StatusBar, TouchableOpacity, ScrollView } from "react-native"
import { t } from "react-native-tailwindcss"
import {
    Input,
    Text,
    Skeleton,
} from "native-base"
import MaterialIcons from 'react-native-ico'
import { useSelector, useDispatch } from "react-redux"
import { getMoreTimelining } from "../../controller/actions/uploading"

const Timelining = () => {
    const [service, setService] = useState()
    const [Id, setId] = useState()
    const [memId, setmemId] = useState()
    const [page, setpage] = useState(1)
    const [dateTimelining, setdateTimelining] = useState()
    const [dateLoging, setdateLoging] = useState()
    const [dateIntake, setdateIntake] = useState()
    const [schoolName, setschoolName] = useState()
    const [info, setinfo] = useState()
    const [isLoading, setisLoading] = useState(true)
    const { deposit } = useSelector(state => state)
    const dispatch = useDispatch()

    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('user')
            const tokenValue = await AsyncStorage.getItem('token')
            if (value) {
                setmemId(JSON.parse(value).member.id)
                setisLoading(false)
            }
            tokenValue ? settoken(tokenValue) : null
        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        let abort = new AbortController()
        if (deposit) {
            deposit.timelining.forEach(val => {
                setdateTimelining(val.date_of_timelining),
                    setdateLoging(val.date_of_lodging),
                    setdateIntake(val.intake_date),
                    setschoolName(val.school_name)
            });
            setinfo(deposit.timelining)
            setisLoading(false)
        }
        return () => {
            abort.abort()
        }
    }, [deposit])

    const fetchMoreTimelining = () => {
        setpage(page + 1)
        dispatch(getMoreTimelining(page, memId))
    }


    return (
        <SafeAreaView>
            <StatusBar backgroundColor='#231e57' />
            <ScrollView style={[t.bgWhite, t.hFull]}>
                <View style={[t.alignCenter, t.justifyCenter, t.m4]}>
                    <View style={[t.m2]}>
                        <Text style={[t.fontBold, t.textBase]} color="#231e57">Date of Timelining</Text>
                    </View>
                    <View style={[t.m2]}>
                        <Input
                            size="md"
                            variant="underlined" isDisabled
                            placeholder="Date of Timelining"
                            w={{
                                base: "100%",
                                md: "100%",
                            }}
                        >
                            {dateTimelining}
                        </Input>
                    </View>
                    <View style={[t.m2]}>
                        <Text style={[t.fontBold, t.textBase]} color="#231e57">Date of Lodging</Text>
                    </View>
                    <View style={[t.m2]}>
                        <Input
                            size="md"
                            variant="underlined" isDisabled
                            placeholder="Date of Lodging"
                            w={{
                                base: "100%",
                                md: "100%",
                            }}
                        >
                            {dateLoging}
                        </Input>
                    </View>
                    <View style={[t.m2]}>
                        <Text style={[t.fontBold, t.textBase]} color="#231e57">Intake Date</Text>
                    </View>
                    <View style={[t.m2]}>
                        <Input
                            size="md"
                            variant="underlined" isDisabled
                            placeholder="Intake Date"
                            w={{
                                base: "100%",
                                md: "100%",
                            }}
                        >
                            {dateIntake}
                        </Input>
                    </View>
                    <View style={[t.m2]}>
                        <Text style={[t.fontBold, t.textBase]} color="#231e57">School Name</Text>
                    </View>
                    <View style={[t.m2]}>
                        <Input
                            size="md"
                            variant="underlined" isDisabled
                            placeholder="School Name"
                            w={{
                                base: "100%",
                                md: "100%",
                            }}
                        >
                            {schoolName}
                        </Input>
                    </View>
                </View>

                {/* listview */}
                {isLoading ?
                    <>
                        <View style={[t.m2]}>
                            <Skeleton style={[t.h32]} rounded="md" />
                        </View>
                        <View style={[t.m2]}>
                            <Skeleton style={[t.h32]} rounded="md" />
                        </View>
                    </>
                    :
                    <>
                        {
                            info && Object.values(info).map((val, id) => (
                                <View style={[t.m2, t.flex1]} key={id}>
                                    <View style={[t.flex, t.flexWrap, t.flexRow, t.justifyStart, t.bgIndigo900, t.roundedLg, t.pL4]}>
                                        <MaterialIcons name="google-drive-file" group="basic" style={[t.selfCenter, t.m2, t.p6]} color="#ffffff" />
                                        <View style={[t.flexRow, t.flexCol, t.mL4, t.p2]}>
                                            <Text style={[t.fontNormal, t.pB4, t.textWhite]}>
                                                File Name: {val.file_type}
                                            </Text>
                                            <Text style={[t.fontNormal, t.textWhite]}>
                                                Status: {val.file_status}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            ))
                        }
                        <View>
                            <TouchableOpacity onPress={() => fetchMoreTimelining()}>
                                <Text style={[
                                    t.m2,
                                    t.bgWhite,
                                    t.shadowMd,
                                    t.selfCenter,
                                    t.w2_5,
                                    t.fontBold,
                                    t.borderBlack,
                                    t.textCenter,
                                    t.textBase,
                                    t.roundedFull,
                                ]}>
                                    Load More...
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </>
                }
            </ScrollView>
        </SafeAreaView >
    )
}
export default Timelining