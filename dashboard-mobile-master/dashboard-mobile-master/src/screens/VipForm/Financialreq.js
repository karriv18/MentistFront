import {
    View,
    ScrollView,
    SafeAreaView,
    TouchableWithoutFeedback,
    Keyboard,
    PermissionsAndroid,
    StatusBar,
    Alert
} from 'react-native'
import { t } from "react-native-tailwindcss"

import React, { useState, useEffect } from 'react'
import DocumentPicker from 'react-native-document-picker'
import { Input, Button, Text } from 'native-base'
import AsyncStorage from '@react-native-async-storage/async-storage'
import RNFetchBlob from 'rn-fetch-blob'

const Financialreq = ({ navigation }) => {
    const [Type, setType] = useState()
    const [date, setDate] = useState(new Date())
    const [mode, setMode] = useState('date')
    const [show, setShow] = useState(false)
    const [SelectDate, setSelectDate] = useState()
    const [Files, setFiles] = useState()
    const [Require, setRequire] = useState()
    const [Require1, setRequire1] = useState()
    const [Notes, setNotes] = useState()
    const [FileName, setFileName] = useState()
    const [Token, setToken] = useState()
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date
        setShow(Platform.OS === 'ios')
        setDate(currentDate)
        setSelectDate(currentDate.toLocaleDateString())
    }

    const showMode = (currentMode) => {
        setShow(true)
        setMode(currentMode)
    }

    const showDatepicker = () => {
        showMode('date')
    }

    const Data = {
        show_amount: Require,
        user_sponsor: Require1,
        requirements: Type,
        date: SelectDate,
        messages: Notes,
    }

    const addMember = async (data) => {
        const jsonValue = await AsyncStorage.getItem('vip')
        const token = await AsyncStorage.getItem('token')
        setToken(token)
        if (jsonValue != null) {
            try {
                await AsyncStorage.mergeItem('vip', JSON.stringify(data))

            }
            catch (err) {
                console.log(err)
            }
        }
        const Item = await AsyncStorage.getItem('vip')
        const obj = JSON.parse(Item)
        await RNFetchBlob.fetch('POST', 'http://192.168.50.197/api/member', {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + Token,
        },
            [
                { name: 'file', filename: Files.name, type: Files.type, data: RNFetchBlob.wrap(Files.uri.replace("file://", "")) },
                { name: 'first_name', data: obj.first_name },
                { name: 'middle_name', data: obj.middle_name },
                { name: 'last_name', data: obj.last_name },
                { name: 'sex', data: obj.sex },
                { name: 'mobile_number', data: obj.mobile_number },
                { name: 'nationality', data: obj.nationality },
                { name: 'marital_status', data: obj.marital_status },
                { name: 'work_exp', data: obj.work_exp },
                { name: 'history', data: obj.history },
                { name: 'secondary_number', data: obj.secondary_number },
                { name: 'no_of_children', data: obj.no_of_children },
                { name: 'fb', data: obj.fb },
                { name: 'email_address', data: obj.email_address },
                { name: 'street', data: obj.street },
                { name: 'city', data: obj.city },
                { name: 'loc', data: JSON.stringify(obj.loc) },
                { name: 'education', data: obj.education },
                { name: 'degree', data: obj.degree },
                { name: 'name_of_school', data: obj.name_of_school },
                { name: 'marketing_executive', data: obj.marketing_executive },
                { name: 'countries', data: obj.countries },
                { name: 'social', data: obj.social },
                { name: 'show_amount', data: obj.show_amount },
                { name: 'user_sponsor', data: obj.user_sponsor },
                { name: 'requirements', data: obj.requirements },
                { name: 'date', data: obj.date },
                { name: 'messages', data: obj.messages },
            ]).uploadProgress((written, total) => {
                console.log('uploaded', written / total)
            }).then((response) => Alert.alert('Info', 'Save Successful'))
            .catch((err) => {
                console.log(err)
                Alert.alert('Error', 'Something went wrong')
            })
    }

    //Document function
    const openDocument = async () => {

        try {
            const results = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles],
            })
            for (const res of results) {
                setFiles(res)
                setFileName(res.name)
            }
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
            } else {
                throw err
            }
        }
    }
    useEffect(() => {
        let abortcontroller = new AbortController()
        async function getdata() {
            const res = await AsyncStorage.getItem('vip')
        }
        getdata()
        return () => {
            abortcontroller.abort()
        }
    }, [])



    return (
        <ScrollView style={[t.bgWhite]}>
            <SafeAreaView style={[t.alignCenter, t.justifyCenter, t.m4]}>
                <StatusBar backgroundColor='#231e57' />
                <View>
                    <Text style={[t.fontBold, t.textXl, t.m2, t.textGray600]}>
                        FINANCIAL REQUIREMENTS
                    </Text>
                </View>
                <View style={[t.hPx, t.mX2, t.bgGray600, t.m4]} />
                <View style={[t.m2]}>
                    <Text color="#231e57">Please type NONE if the question is not applicable to you. Be Realistic as the embassy will require bank statements (must be above 50000)</Text>
                </View>
                <View style={[t.m2]}>
                    <Input
                        variant="underlined"
                        placeholder="Ex. 50000"
                        keyboardType="number-pad"
                        w={{
                            base: "100%",
                            md: "100%"
                        }}
                        onChangeText={(itemValue) => setRequire(itemValue)}
                    >
                    </Input>
                </View>
                <View style={[t.m2]}>
                    <Text color="#231e57">Parents/Sponsors: Total Budget for Visa Processing, Immigration Lawyer's Fee and Tuition. Example in pesos: 50000</Text>
                </View>
                <View style={[t.m2]}>
                    <Input
                        placeholder="Ex. 50000"
                        variant="underlined"
                        keyboardType="number-pad"
                        w={{
                            base: "100%",
                            md: "100%"
                        }}
                        onChangeText={(itemValue) => setRequire1(itemValue)}
                    >
                    </Input>
                </View>
                <View>
                    <Text style={[t.fontBold, t.textXl, t.m2, t.textGray600]}>
                        PROGRAM CHOICE
                    </Text>
                    <View style={[t.hPx, t.mX2, t.bgGray600, t.m4]} />
                    <Picker style={[t.roundedLg, t.bgGray300, t.m2]}
                        selectedValue={Type}
                        onValueChange={(itemValue) => setType(itemValue)}>
                        <Picker.Item label="--Select--" value="0" />
                        <Picker.Item label="Student / Internship or Training Visa" value="Student / Internship or Training Visa" />
                        <Picker.Item label="Immigrant Visa" value="Immigrant Visa" />
                        <Picker.Item label="Nursing Bridging Course" value="Nursing Bridging Course" />
                        <Picker.Item label="Tourist / Business Visitor Visa" value="Tourist / Business Visitor Visa" />
                        <Picker.Item label="Fiancee / Spouse Visa" value="Fiancee / Spouse Visa" />
                        <Picker.Item label="Others" value="Others" />
                    </Picker>
                </View>
                <View>
                    <Text style={[t.fontBold, t.textXl, t.m2, t.textGray600]}>
                        PRELIMINARY REQUIREMENTS
                    </Text>
                    <View style={[t.hPx, t.mX2, t.bgGray600, t.m4]} />
                    <View style={[t.m2]}>
                        <Text color="#231e57">Fil-Global Immigration Preliminary requirements For initial assessment, please send me the following:</Text>
                    </View>
                    <View style={[t.m2]}>
                        <Text color="#231e57">* 1 CV/Resume</Text>
                    </View>
                    <View style={[t.m2]}>
                        <Text color="#231e57">* 2 Transcript of Records</Text>
                    </View>
                    <View style={[t.m2]}>
                        <Text color="#231e57">* 3 Passport/s and Visas/ (optional)</Text>
                    </View>
                    <View style={[t.m2]}>
                        <Text color="#231e57">* 4 Diploma</Text>
                    </View>
                    <View style={[t.m2]}>
                        <Text color="#231e57">* 5 IELTS, PTE, OET exam results (optional)</Text>
                    </View>
                    <View style={[t.m2]}>
                        <Text color="#231e57">You may submit available documents you have for now. Please send it to
                            <Text style={[t.textRed400, t.underline]}> webdev@fil-global.com</Text></Text>
                    </View>
                    <View style={[t.m2]}>
                        <Text color="#231e57" style={[t.fontBold, t.textBase]}>LASTLY: When do you want to FLY & is your Application URGENT?</Text>
                    </View>
                    <TouchableWithoutFeedback onFocus={() => Keyboard.dismiss()}>
                        <View style={[t.m2]}>
                            <Input
                                variant="underlined"
                                placeholder="mm/dd/yyyy"
                                w={{
                                    base: "100%",
                                    md: "100%"
                                }}
                                onPressIn={showDatepicker}
                            >
                                {SelectDate}
                            </Input>
                            {show && (
                                <DateTimePicker
                                    testID="dateTimePicker"
                                    value={date}
                                    mode={mode}
                                    is24Hour={true}
                                    display="default"
                                    onChange={onChange}
                                />
                            )}
                        </View>
                    </TouchableWithoutFeedback>
                    <View style={[t.m2]}>
                        <Text color="#231e57">Please provide your Message or Notes to us if you need to be prioritized. Please Let us know if you need help ASAP, or if this is an EMERGENCY. The company is NOT a recruitment agency and will NOT process working visas or employment application. We do only student, immigrant, tourist, fiancee, and internship OJT visa here at Fil-Global Immigration Services Corp.</Text>
                    </View>
                    <View style={[t.m2]}>
                        <Input
                            variant="underlined"
                            placeholder="Note: Message"
                            w={{
                                base: "100%",
                                md: "100%"
                            }}
                            onChangeText={(itemValue) => setNotes(itemValue)}
                        >
                        </Input>
                    </View>
                    <Text style={[t.fontBold, t.textXl, t.m2]} color="#231e57">
                        CV
                    </Text>
                    <View style={[t.m2]}>
                        <Input isDisabled>{FileName}</Input>
                    </View>
                    <Button
                        style={[t.m2, t.bgIndigo700]}
                        onPress={() => openDocument()}>
                        Choose File
                    </Button>
                    <Button
                        style={[t.m2, t.bgIndigo700]}
                        onPress={() => addMember(Data)}>
                        <Text style={[t.fontExtrabold, t.textWhite]}>SUBMIT</Text>
                    </Button>
                </View>
            </SafeAreaView>
        </ScrollView>
    )
}

export default Financialreq