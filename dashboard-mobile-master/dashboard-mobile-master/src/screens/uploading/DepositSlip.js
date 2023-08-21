import React, { useState, useEffect } from "react"
import {
    ScrollView,
    PermissionsAndroid,
    View,
    FlatList,
    SafeAreaView,
    StatusBar,
    Alert,
    TouchableOpacity,
    ActivityIndicator
} from "react-native"
import { t } from "react-native-tailwindcss"
import {
    Text,
    Skeleton,
} from "native-base"
import MaterialIcons from 'react-native-ico'
import { Dropdown } from 'react-native-element-dropdown'
import DocumentPicker from 'react-native-document-picker'
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useDispatch, useSelector } from "react-redux"
import { uploadDeposit, getMoreDeposit } from "../../controller/actions/uploading"

const DepositSlip = () => {
    const [type, settype] = useState()
    const [info, setinfo] = useState()
    const [memId, setmemId] = useState()
    const [email, setemail] = useState()
    const [isLoading, setisLoading] = useState(true)
    const [file, setfile] = useState()
    const [token, settoken] = useState()
    const [fileName, setfileName] = useState()
    const [loadFiles, setloadFiles] = useState()
    const [page, setpage] = useState(1)
    const [memberId, setmemberId] = useState()
    const { deposit } = useSelector(state => state)
    const dispatch = useDispatch()


    const openDocument = async () => {
        try {
            const results = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles],
            })
            for (const res of results) {
                setfile(res)
                setfileName(res.name)
            }
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
            } else {
                throw err
            }
        }
    }

    const handleUpload = (email, type, memId, files, token) => {
        if (!files) {
            Alert.alert('Status', 'File not found!')
        }
        else {
            dispatch(uploadDeposit(email, type, memId, files, token))
        }
    }

    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('user')
            const tokenValue = await AsyncStorage.getItem('token')
            if (value) {
                setmemId(JSON.parse(value).member.id)
                setemail(JSON.parse(value).email)
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
        setTimeout(() => {
            getData()
            setinfo(deposit.deposit)
            setisLoading(false)
        }, 500)
        return () => {
            abort.abort()
        }
    }, [loadFiles, deposit])

    const fetchMoreDeposit = () => {
        setpage(page + 1)
        dispatch(getMoreDeposit(page, memId))
    }

    const items = [{
        value: '1',
        label: 'Application Fee',
    }, {
        value: '2',
        label: 'Consultation Deposit Slip',
    }, {
        value: '3',
        label: 'Embassy Biometric Fee',
    }, {
        value: '4',
        label: 'FBI Assitance',
    }, {
        value: '5',
        label: 'Medical Assistance',
    }, {
        value: '6',
        label: 'Member Deposit Slip',
    }, {
        value: '7',
        label: 'NBI Assistance',
    }, {
        value: '8',
        label: 'Passporting Fee',
    }, {
        value: '9',
        label: 'Show Money',
    }, {
        value: '10',
        label: 'Tuition Fee',
    }, {
        value: '11',
        label: 'Visa Processing Fee',
    }]

    return (
        <SafeAreaView>
            <StatusBar backgroundColor='#231e57' />
            <ScrollView style={[t.bgWhite, t.hFull]}>
                <View style={[t.alignCenter, t.justifyCenter, t.m4]}>
                    <View style={[t.m2, t.borderB2, t.borderGray300, t.p2]}>
                        <Dropdown
                            data={items}
                            labelField="label"
                            valueField="value"
                            label="Dropdown"
                            placeholder="Select item"
                            value={type}
                            onChange={item => {
                                settype(item.value)
                            }}
                        />
                    </View>
                    <View style={[t.m2]}>
                        <TouchableOpacity
                            onPress={() => openDocument()}>
                            <Text style={[
                                t.border,
                                t.borderGray500,
                                t.textGray500,
                                t.borderDashed,
                                t.p4,
                                t.textBase,
                                t.textCenter,
                                t.roundedLg,
                            ]}>
                                {fileName ? fileName : 'Choose File'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[t.m2, t.w2_5, t.selfCenter]}>
                        <TouchableOpacity
                            onPress={() => handleUpload(email, type, memId, file, token)}>
                            <View style={[t.p2,
                            t.alignCenter,
                            t.justifyCenter,
                            t.bgBlue500,
                            t.roundedLg
                            ]}>
                                <Text style={[t.textCenter, t.textWhite]}>
                                    Upload
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    {/* listview */}
                    {isLoading ?
                        <>
                            <View style={[t.m2]}>
                                <Skeleton style={[t.h48]} rounded="md" />
                            </View>
                            <View style={[t.m2]}>
                                <Skeleton style={[t.h48]} rounded="md" />
                            </View>
                        </>
                        :
                        <>
                            {
                                info && Object.values(info).map((val, id) => (
                                    <View style={[t.m2, t.flex1]} key={id}>
                                        <View style={[t.flex, t.flexRow, t.justifyStart, t.bgIndigo900, t.roundedLg, t.pL4]}>
                                            <MaterialIcons name="google-drive-file" group="basic" style={[t.selfCenter, t.p4]} color="#ffffff" />
                                            <View style={[t.flexRow, t.flexCol, t.p2]}>
                                                <Text style={[t.fontBold, t.textWhite, t.mB4, t.textBase]}>
                                                    {val.file_type}
                                                </Text>
                                                <Text style={[t.fontNormal, t.pB4, t.textWhite]}>
                                                    Remarks: {val.remarks}
                                                </Text>
                                                <Text style={[t.fontNormal, t.textWhite]}>
                                                    Staus: {val.file_status}
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                ))
                            }
                            <View>
                                <TouchableOpacity onPress={() => fetchMoreDeposit()}>
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
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
export default DepositSlip