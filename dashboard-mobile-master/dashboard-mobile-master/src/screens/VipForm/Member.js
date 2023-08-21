import {
    Text,
    Input,
    Button
} from "native-base"
import React, { useState, useEffect } from "react"
import {
    View,
    SafeAreaView,
    ScrollView,
    Keyboard,
    TouchableWithoutFeedback,
    Platform,
    StatusBar
} from "react-native"
import { t } from "react-native-tailwindcss"
import AsyncStorage from "@react-native-async-storage/async-storage"
import callApi from "../../../helpers/callApi"
import { findLastValidBreakpoint } from "native-base/lib/typescript/theme/tools"
import Loader from "../../components/Loader"

const Member = ({ navigation }) => {
    const [date, setDate] = useState(new Date())
    const [mode, setMode] = useState('date')
    const [show, setShow] = useState(false)
    const [SelectDate, setSelectDate] = useState()

    const [FirstName, setFirstName] = useState()
    const [MiddleName, setMiddleName] = useState()
    const [LastName, setLastName] = useState()
    const [Contact, setContact] = useState()
    const [Secondary, setSecondary] = useState()
    const [Email, setEmail] = useState()
    const [Job, setJob] = useState()
    const [Company, setCompany] = useState()
    const [Children, setChildren] = useState()
    const [FbName, setFbName] = useState()
    const [Nationality, setNationality] = useState()
    const [Country, setCountry] = useState(null)
    const [Status, setStatus] = useState()
    const [Gender, setGender] = useState()
    const [isLoading, setisLoading] = useState(true)



    useEffect(() => {
        async function getCountry() {
            try {
                const res = await callApi('get', '/nationals')
                if (res.status == 200) {
                    if (res.data.data != null) {
                        setCountry(res.data.data)
                        setisLoading(false)
                    }
                }
            }
            catch (err) {
                console.log(err)
            }
        }
        let abortcontroller = new AbortController()
        getCountry()
        return () => {
            abortcontroller.abort()
        }
    }, [])

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

    const data = {
        first_name: FirstName,
        middle_name: MiddleName,
        last_name: LastName,
        sex: Gender,
        mobile_number: Contact,
        nationality: Nationality,
        marital_status: Status,
        work_exp: Job,
        history: Company,
        secondary_number: Secondary,
        no_of_children: Children,
        fb: FbName,
        email_address: Email,
    }
    const addmember = async (data) => {
        const jsonValue = JSON.stringify(data)
        await AsyncStorage.setItem('vip', jsonValue)
        navigation.push('Address')
    }

    return (
        <ScrollView style={[t.bgWhite]}>
            {isLoading ? <Loader /> :
                <SafeAreaView style={[t.alignCenter, t.justifyCenter, t.m4]}>
                    <StatusBar backgroundColor='#231e57' />
                    <View>
                        <Text style={[t.textXl, t.m2, t.textGray600]}>
                            PERSONAL INFORMATION
                        </Text>
                    </View>
                    <View style={[t.hPx, t.mX2, t.bgGray600, t.m4]} />
                    <View style={[t.mL2]}>
                        <Text style={[t.fontBold, t.textBase]} color="#231e57">First name</Text>
                    </View>
                    <View style={[t.m2]}>
                        <Input
                            variant="underlined"
                            placeholder="Ex. John"
                            w={{
                                base: "100%",
                                md: "100%"
                            }}
                            onChangeText={(text) => setFirstName(text)}
                        >
                        </Input>
                    </View>
                    <View style={[t.mL2]}>
                        <Text style={[t.fontBold, t.textBase]} color="#231e57">Middle name</Text>
                    </View>
                    <View style={[t.m2]}>
                        <Input
                            variant="underlined"
                            placeholder="Ex. Mike"
                            w={{
                                base: "100%",
                                md: "100%"
                            }}
                            onChangeText={(text) => setMiddleName(text)}
                        >
                        </Input>
                    </View>
                    <View style={[t.mL2]}>
                        <Text style={[t.fontBold, t.textBase]} color="#231e57">Last name</Text>
                    </View>
                    <View style={[t.m2]}>
                        <Input
                            variant="underlined"
                            placeholder="Ex. Doe"
                            w={{
                                base: "100%",
                                md: "100%"
                            }}
                            onChangeText={(text) => setLastName(text)}
                        >
                        </Input>
                    </View>
                    <View style={[t.mL2]}>
                        <Text style={[t.fontBold, t.textBase]} color="#231e57">Date of Birth</Text>
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
                    <Text style={[t.mL2, t.fontBold]} color="#231e57">Sex</Text>
                    <Picker style={[t.roundedLg, t.bgGray300, t.m2]}
                        selectedValue={Gender}
                        onValueChange={(itemValue) => setGender(itemValue)}>
                        <Picker.Item label="--Select--" value="0" />
                        <Picker.Item label="Male" value="M" />
                        <Picker.Item label="Female" value="F" />
                    </Picker>
                    <View style={[t.mL2]}>
                        <Text style={[t.fontBold, t.textBase]} color="#231e57">Contact Number</Text>
                    </View>
                    <View style={[t.m2]}>
                        <Input
                            variant="underlined"
                            placeholder="Ex. 09123456789"
                            keyboardType="number-pad"
                            w={{
                                base: "100%",
                                md: "100%"
                            }}
                            onChangeText={(text) => setContact(text)}
                        >
                        </Input>
                    </View>
                    <View style={[t.mL2]}>
                        <Text style={[t.fontBold, t.textBase]} color="#231e57">Secondary Number</Text>
                    </View>
                    <View style={[t.m2]}>
                        <Input
                            variant="underlined"
                            placeholder="Ex. 09123456789"
                            keyboardType="number-pad"
                            w={{
                                base: "100%",
                                md: "100%"
                            }}
                            onChangeText={(text) => setSecondary(text)}
                        >
                        </Input>
                    </View>
                    <View style={[t.mL2]}>
                        <Text style={[t.fontBold, t.textBase]} color="#231e57">Email Address</Text>
                    </View>
                    <View style={[t.m2]}>
                        <Input
                            variant="underlined"
                            placeholder="Ex. JohnDoe@email.com"
                            w={{
                                base: "100%",
                                md: "100%"
                            }}
                            onChangeText={(text) => setEmail(text)}
                        >
                        </Input>
                    </View>
                    <Text style={[t.mL2, t.fontBold]} color="#231e57" >Nationality</Text>
                    <Picker style={[t.roundedLg, t.bgGray300, t.m2]}
                        selectedValue={Nationality}
                        onValueChange={(itemValue) => setNationality(itemValue)}>
                        {Country && Object.values(Country).map((val, id) => (
                            <Picker.Item label={val.nationality} value={val.nationality} key={id} />
                        ))}
                    </Picker>
                    <View style={[t.mL2]}>
                        <Text style={[t.fontBold, t.textBase]} color="#231e57">Occupation/Job Position</Text>
                    </View>
                    <View style={[t.m2]}>
                        <Input
                            placeholder="Ex. Manager"
                            variant="underlined"
                            w={{
                                base: "100%",
                                md: "100%"
                            }}
                            onChangeText={(text) => setJob(text)}
                        >
                        </Input>
                    </View>
                    <View style={[t.mL2]}>
                        <Text style={[t.fontBold, t.textBase]} color="#231e57">Company name</Text>
                    </View>
                    <View style={[t.m2]}>
                        <Input
                            variant="underlined"
                            placeholder="Ex. Company"
                            w={{
                                base: "100%",
                                md: "100%"
                            }}
                            onChangeText={(text) => setCompany(text)}
                        >
                        </Input>
                    </View>
                    <View style={[t.mL2]}>
                        <Text style={[t.fontBold, t.textBase]} color="#231e57">Number of children under 18 y/o</Text>
                    </View>
                    <View style={[t.m2]}>
                        <Input
                            variant="underlined"
                            keyboardType="number-pad"
                            placeholder="Ex. 1"
                            w={{
                                base: "100%",
                                md: "100%"
                            }}
                            onChangeText={(text) => setChildren(text)}
                        >
                        </Input>
                    </View>
                    <View style={[t.mL2]}>
                        <Text style={[t.fontBold, t.textBase]} color="#231e57">Facebook name</Text>
                    </View>
                    <View style={[t.m2]}>
                        <Input
                            variant="underlined"
                            placeholder="Ex. John Doe"
                            w={{
                                base: "100%",
                                md: "100%"
                            }}
                            onChangeText={(text) => setFbName(text)}
                        >
                        </Input>
                    </View>
                    <Text style={[t.mL2, t.fontBold]} color="#231e57" >Marital Status</Text>
                    <Picker style={[t.roundedLg, t.bgGray300, t.m2]}
                        selectedValue={Status}
                        onValueChange={(itemValue) => setStatus(itemValue)}>
                        <Picker.Item label="--Select--" value="0" />
                        <Picker.Item label="Single" value="Single" />
                        <Picker.Item label="Married" value="Married" />
                        <Picker.Item label="Widowed" value="Widowed" />
                        <Picker.Item label="Divorced" value="Divorced" />
                    </Picker>
                    <Button style={[t.m2, t.bgIndigo700]}

                        onPress={() =>
                            addmember(data)
                            // navigation.push('Address')
                        }
                    >
                        <Text style={[t.fontExtrabold, t.textWhite]}>Next Page</Text>
                    </Button>
                </SafeAreaView>
            }
        </ScrollView >
    )
}
export default Member