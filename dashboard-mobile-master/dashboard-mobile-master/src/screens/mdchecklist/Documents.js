import {
    View,
    SafeAreaView,
    ScrollView,
    StatusBar,
    TouchableOpacity,
    Alert
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { t } from 'react-native-tailwindcss'
import {
    Icon,
    Input,
    Skeleton,
    Text,
} from 'native-base'
import { Dropdown, MultiSelect } from 'react-native-element-dropdown'
import MaterialIcons from 'react-native-ico'
import AsyncStorage from '@react-native-async-storage/async-storage'
import DocumentPicker from 'react-native-document-picker'
import { useDispatch, useSelector } from 'react-redux'
import { getMoreDocuments, uploadMdChecklist } from '../../controller/actions/checklist'

const Documents = ({ route }) => {
    const [fileType, setfileType] = useState()
    const [isLoading, setisLoading] = useState(true)
    const [email, setemail] = useState()
    const [deadline, setdeadline] = useState()
    const [list, setlist] = useState()
    const [date, setdate] = useState()
    const [token, settoken] = useState()
    const [files, setfiles] = useState()
    const [name, setname] = useState()
    const [info, setinfo] = useState()
    const [fileName, setfileName] = useState()
    const [memId, setmemId] = useState()
    const [page, setpage] = useState(1)
    const dispatch = useDispatch()
    const { indicator } = route.params;
    const { mdchecklist } = useSelector(state => state.mdchecklist)
    const { mdChecklistData } = useSelector(state => state.mdchecklist)


    //Document function
    const openDocument = async () => {
        try {
            const results = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles],
            })
            for (const res of results) {
                setfiles(res)
                setfileName(res.name)
            }
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
            } else {
                throw err
            }
        }
    }

    const handleUpload = (id, file_type, indicator, files, Token, email, name) => {
        if (!files || !file_type) {
            Alert.alert('Status', 'File not found!')
        }
        else {
            dispatch(uploadMdChecklist(id, file_type, indicator, files, Token, email, name))
        }
    }


    const getData = async () => {
        const value = await AsyncStorage.getItem('token')
        const valueName = await AsyncStorage.getItem('user')
        if (valueName) {
            setmemId(JSON.parse(valueName).member.id)
            setname(JSON.parse(valueName).name)
            setemail(JSON.parse(valueName).email)
        }
        if (value) {
            settoken(value)
        }
    }

    const fetchMoreDocuments = () => {
        setpage(page + 1)
        dispatch(getMoreDocuments(memId, indicator, page))
    }

    useEffect(() => {
        let abort = new AbortController()
        setTimeout(() => {
            setlist(mdChecklistData.data.list_all)
            Object.values(mdChecklistData.data.deadline).map(val => setdeadline(val))
            setinfo(mdchecklist)
            getData()
            setisLoading(false)
        }, 500);

        return () => {
            abort.abort()
        }
    }, [email, mdchecklist])

    return (
        <SafeAreaView>
            <StatusBar backgroundColor='#231e57' />
            <ScrollView style={[t.bgWhite, t.hFull]}>
                <View style={[t.alignCenter, t.justifyCenter, t.m4]}>
                    {indicator == 'A' ?
                        <>
                            <Text style={[t.textXl, t.m2, t.textGray600, t.fontBold]}>
                                Identification Documentation
                            </Text>
                        </>
                        : indicator == 'B' ?
                            <>
                                <Text style={[t.textXl, t.m2, t.textGray600, t.fontBold]}>
                                    Financial Personal Documents
                                </Text>
                            </>
                            : indicator == 'C' ?
                                <>
                                    <Text style={[t.textXl, t.m2, t.textGray600, t.fontBold]}>
                                        Academic Documents
                                    </Text>
                                </>
                                : indicator == 'D' ?
                                    <>
                                        <Text style={[t.textXl, t.m2, t.textGray600, t.fontBold]}>
                                            English and Profession Requirements
                                        </Text>
                                    </>
                                    : indicator == 'E' ?
                                        <>
                                            <Text style={[t.textXl, t.m2, t.textGray600, t.fontBold]}>
                                                Training and Certifications
                                            </Text>
                                        </>
                                        : indicator == 'F' ?
                                            <>
                                                <Text style={[t.textXl, t.m2, t.textGray600, t.fontBold]}>
                                                    Character Reference
                                                </Text>
                                            </>
                                            : indicator == 'G' ?
                                                <>
                                                    <Text style={[t.textXl, t.m2, t.textGray600, t.fontBold]}>
                                                        Medical Clearance(Optional)
                                                    </Text>
                                                </>
                                                : indicator == 'H' ?
                                                    <>
                                                        <Text style={[t.textXl, t.m2, t.textGray600, t.fontBold]}>
                                                            Travel Arrangements and Insurance
                                                        </Text>
                                                    </>
                                                    : indicator == 'I' ?
                                                        <>
                                                            <Text style={[t.textXl, t.m2, t.textGray600, t.fontBold]}>
                                                                Employement History
                                                            </Text>
                                                        </>
                                                        : indicator == 'I' ?
                                                            <>
                                                                <Text style={[t.textXl, t.m2, t.textGray600, t.fontBold]}>
                                                                    Funds Sponsor’s Documents (optional)
                                                                </Text>
                                                            </>
                                                            : indicator == 'K' ?
                                                                <>
                                                                    <Text style={[t.textXl, t.m2, t.textGray600, t.fontBold]}>
                                                                        Dependent’s Documents (optional)
                                                                    </Text>
                                                                </>
                                                                : indicator == 'L' ?
                                                                    <>
                                                                        <Text style={[t.textXl, t.m2, t.textGray600, t.fontBold]}>
                                                                            Personal Sworn Statements
                                                                        </Text>
                                                                    </>
                                                                    : indicator == 'M' ?
                                                                        <>
                                                                            <Text style={[t.textXl, t.m2, t.textGray600, t.fontBold]}>
                                                                                Affidavit of Support (sponsors/parents)
                                                                            </Text>
                                                                        </>
                                                                        : indicator == 'N' ?
                                                                            <>
                                                                                <Text style={[t.textXl, t.m2, t.textGray600, t.fontBold]}>
                                                                                    SCHOOL SPONSOR DOCUMENTS
                                                                                </Text>
                                                                            </>
                                                                            :
                                                                            <>
                                                                                <Text style={[t.textXl, t.m2, t.textGray600, t.fontBold]}>
                                                                                    EMBASSY DOCUMENTS
                                                                                </Text>
                                                                            </>
                    }
                    <View style={[t.hPx, t.mX2, t.bgGray600, t.m4]} />
                    <View style={[t.m2]}>
                        <Input isDisabled
                            InputRightElement={
                                <Icon as={<MaterialIcons name="calendar" group="ui-interface" />} size={5} mr="2" color="muted.400" />
                            } >
                            {deadline}
                        </Input>
                    </View>
                    <View style={[t.m2, t.borderB2, t.borderGray300, t.p2]}>
                        <Dropdown
                            data={list}
                            labelField="file_name"
                            valueField="id"
                            label="Dropdown"
                            placeholder="Select item"
                            value={fileType}
                            onChange={item => {
                                setfileType(item.id)
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
                            onPress={() =>
                                handleUpload(id, fileType, indicator, files, token, email, name)}
                        >
                            <View style={[t.p2,
                            t.alignCenter,
                            t.justifyCenter,
                            // t.border,
                            // t.borderBlack,
                            t.bgBlue500,
                            t.roundedLg
                            ]}>
                                <Text style={[t.textCenter, t.textWhite]}>
                                    Upload
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    {
                        isLoading ?
                            <>
                                <View style={[t.m2]}>
                                    <Skeleton style={[t.h24]} rounded="md" />
                                </View>
                                <View style={[t.m2]}>
                                    <Skeleton style={[t.h24]} rounded="md" />
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
                                                    <Text style={[t.fontBold, t.textWhite, t.mB4, t.textBase]}>
                                                        {val.file_type.file_name}
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
                                    <TouchableOpacity onPress={() => fetchMoreDocuments()}>
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

export default Documents