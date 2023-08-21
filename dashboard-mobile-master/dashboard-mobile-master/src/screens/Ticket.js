import React, { useEffect, useState } from "react"
import {
    Box,
    Stack,
    Text,
    Input,
    Icon,
    Button,
    TextArea,
} from "native-base"
import { t } from "react-native-tailwindcss"
import {
    View,
    ScrollView,
    FlatList,
    PermissionsAndroid,
    SafeAreaView,
    StatusBar,
    Alert,
    TouchableOpacity
} from "react-native"
import { Dropdown, MultiSelect } from 'react-native-element-dropdown'
import DocumentPicker from 'react-native-document-picker'
import callApi from "../../helpers/callApi"
import AsyncStorage from "@react-native-async-storage/async-storage"
import Loader from "../components/Loader"
import RNFetchBlob from 'rn-fetch-blob'
import { useDispatch } from "react-redux"
import { uploadTicket } from "../controller/actions/ticket"


const Ticket = () => {
    const [category, setcategory] = useState()
    const [type, settype] = useState()
    const [priority, setpriority] = useState()
    const dispatch = useDispatch()
    const [email, setemail] = useState()
    const [info, setinfo] = useState()
    const [details, setdetails] = useState()
    const [subject, setsubject] = useState()
    const [name, setname] = useState()
    const [token, settoken] = useState()
    const [isLoading, setisLoading] = useState(true)
    const [image, setimage] = useState()
    const [imageName, setimageName] = useState()


    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('user')
            const authtoken = await AsyncStorage.getItem('token')
            if (authtoken) {
                settoken(authtoken)
            }
            if (value) {
                setemail(JSON.parse(value).email)
                setname(JSON.parse(value).name)
            }
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        let abort = new AbortController()
        getData()
        return () => {
            abort.abort()
        }
    })


    const openImage = async () => {
        try {
            const results = await DocumentPicker.pick({
                type: [DocumentPicker.types.images],
            })
            for (const res of results) {
                setimage(res)
                setimageName(res.name)
            }
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
            } else {
                throw err
            }
        }
    }

    const categoryType = [{
        value: '5',
        label: 'Accounting'
    }, {
        value: '2',
        label: 'Hardware'
    }, {
        value: '4',
        label: 'HR'
    }, {
        value: '6',
        label: 'Info Pack'
    }, {
        value: '7',
        label: 'Programmes'
    }, {
        value: '8',
        label: 'Purchasing'
    }, {
        value: '9',
        label: 'Training'
    }, {
        value: '3',
        label: 'Website'
    }]

    const ticketType = [{
        value: '3',
        label: 'Request'
    }, {
        value: '1',
        label: 'Incident'
    }, {
        value: '2',
        label: 'Problem'
    }]

    const priorityType = [{
        value: '3',
        label: 'Low'
    }, {
        value: '2',
        label: 'Medium'
    }, {
        value: '1',
        label: 'High'
    }]

    const handleUpload = (files, email, subject, details, category, type, priority, name, token) => {
        if (!files) {
            Alert.alert('Status', 'File not found!')
        }
        else {
            dispatch(uploadTicket(files, email, subject, details, category, type, priority, name, token))
        }
    }
    //Render Item
    const renderItem = ({ item }) => (
        <View>
            <Box alignItems="center" style={[t.m1]}>
                <Box maxW="80" rounded="lg" overflow="hidden" borderColor="coolGray.200"
                    _dark={{
                        borderColor: "coolGray.600",
                        backgroundColor: "gray.700"
                    }}
                    _light={{
                        backgroundColor: "gray.50"
                    }}>
                    <Stack p="4" space={3}>
                        <Text fontWeight="400">
                            {item.created_at}
                        </Text>
                        <Text fontWeight="400">
                            Subject: {item.subject}
                        </Text>
                        <Text fontWeight="400">
                            Type: {item.type}
                        </Text>
                        <Text fontWeight="400">
                            Category: {item.category}
                        </Text>
                        <Text fontWeight="400">
                            Priority level: {item.priority}
                        </Text>
                        <Text fontWeight="400">
                            {item.detail}
                        </Text>
                        <Text fontWeight="400">
                            {item.status}
                        </Text>
                    </Stack>
                </Box>
            </Box>
        </View>
    )

    return (
        <SafeAreaView>
            <View style={[t.bgWhite, t.hFull]}>
                <StatusBar backgroundColor='#231e57' />
                <View style={[t.alignCenter, t.justifyCenter, t.m4]}>
                    <View style={[t.m2]}>
                        <Text style={[t.fontBold, t.textBase]} color="#231e57">Subject</Text>
                    </View>
                    <View style={[t.m2]}>
                        <Input
                            size="md"
                            variant="underlined"
                            placeholder=""
                            w={{
                                base: "100%",
                                md: "100%",
                            }}
                            onChangeText={(text) => setsubject(text)}
                        >
                        </Input>
                    </View>
                    <View style={[t.m2]}>
                        <Text style={[t.fontBold, t.textBase]} color="#231e57">Details</Text>
                    </View>
                    <View style={[t.m2]}>
                        <TextArea
                            size="md"
                            variant="underlined"
                            placeholder=""
                            w={{
                                base: "100%",
                                md: "100%",
                            }}
                            onChangeText={(text) => setdetails(text)}
                        >
                        </TextArea>
                    </View>
                    <View style={[t.m2]}>
                        <Text style={[t.fontBold, t.textBase]} color="#231e57">Category</Text>
                    </View>
                    <View style={[t.m2, t.borderB2, t.borderGray300, t.p2]}>
                        <Dropdown
                            data={categoryType}
                            labelField="label"
                            valueField="value"
                            label="Dropdown"
                            placeholder="Select item"
                            value={category}
                            onChange={item => {
                                setcategory(item.value)
                            }}
                        />
                    </View>
                    <View style={[t.m2]}>
                        <Text style={[t.fontBold, t.textBase]} color="#231e57">Ticket Type</Text>
                    </View>
                    <View style={[t.m2, t.borderB2, t.borderGray300, t.p2]}>
                        <Dropdown
                            data={ticketType}
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
                        <Text style={[t.fontBold, t.textBase]} color="#231e57">Priority Level</Text>
                    </View>
                    <View style={[t.m2, t.borderB2, t.borderGray300, t.p2]}>
                        <Dropdown
                            data={priorityType}
                            labelField="label"
                            valueField="value"
                            label="Dropdown"
                            placeholder="Select item"
                            value={priority}
                            onChange={item => {
                                setpriority(item.value)
                            }}
                        />
                    </View>
                    <View style={[t.m2]}>
                        <TouchableOpacity
                            onPress={() => openImage()}>
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
                                {imageName ? imageName : 'Choose File'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[t.m2, t.w2_5, t.selfCenter]}>
                        <TouchableOpacity
                            onPress={() =>
                                handleUpload(image, email, subject, details, category, type, priority, name, token)
                            }>
                            <View style={[t.p2,
                            t.alignCenter,
                            t.justifyCenter,
                            t.bgBlue500,
                            t.roundedLg
                            ]}>
                                <Text style={[t.textCenter, t.textWhite]}>
                                    Submit
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}
export default Ticket