import {
    View,
    SafeAreaView,
    ScrollView,
    StatusBar,
    TouchableOpacity,
    Modal,
    Alert
} from 'react-native'
import React, { useEffect, useState, useMemo } from 'react'
import { t } from 'react-native-tailwindcss'
import { Icon, Input, Text } from 'native-base'
import Icons from 'react-native-ico'
import { useDispatch, useSelector } from 'react-redux'
import DatePicker from 'react-native-date-picker'
import { Dropdown, MultiSelect } from 'react-native-element-dropdown'
import { updateMember } from '../../controller/actions/member'

const PersonalInfo = () => {
    const [email, setemail] = useState()
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    const [firstName, setfirstName] = useState()
    const [middleName, setmiddleName] = useState()
    const [lastName, setlastName] = useState()
    const [selectedGender, setselectedGender] = useState()
    const [dob, setdob] = useState()
    const [maritalStatus, setmaritalStatus] = useState()
    const [dateMembership, setdateMembership] = useState()
    const [nationality, setnationality] = useState()
    const [mobileNumber, setmobileNumber] = useState()
    const [street, setstreet] = useState()
    const [city, setcity] = useState()
    const [location, setlocation] = useState()
    const [country, setcountry] = useState()
    const dispatch = useDispatch()
    const { member } = useSelector(state => state.member)
    const { message } = useSelector(state => state.message)

    const data = {
        first_name: firstName,
        middle_name: middleName,
        last_name: lastName,
        sex: selectedGender,
        mobile_number: mobileNumber,
        nationality: nationality,
        city: city,
        street: street,
        loc: location,
        marital_status: maritalStatus,
    }

    useEffect(() => {
        let abort = new AbortController()
        if (member) {
            console.log(member.data.member.country_name)
            setemail(member.data.member.email_address)
            setfirstName(member.data.member.first_name)
            setmiddleName(member.data.member.middle_name)
            setlastName(member.data.member.last_name)
            setdateMembership(member.data.member.date_of_membership)
            setnationality(member.data.member.nationality)
            setmobileNumber(member.data.member.mobile_number)
            setstreet(member.data.member.street)
            setcity(member.data.member.city)
            setlocation(member.data.member.loc)
            setdob(member.data.member.dob)
            setmaritalStatus(member.data.member.marital_status)
            setselectedGender(member.data.member.sex)
            setcountry(member.data.country.country_name)
        }
        return () => {
            abort.abort()
        }
    }, [member])

    const handleUpdate = (email, data) => {
        dispatch(updateMember(email, data))
    }

    const status = [{
        value: 'Single',
        label: 'Single'
    }, {
        value: 'Married',
        label: 'Married'
    }, {
        value: 'Widowed',
        label: 'Widowed'
    }, {
        value: 'Divorced',
        label: 'Divorced'
    }]

    const gender = [{
        value: 'M',
        label: 'Male'
    }, {
        value: 'F',
        label: 'Female'
    }]

    return (
        <SafeAreaView>
            <ScrollView style={[t.hFull, t.bgWhite]}>
                <StatusBar backgroundColor='#231e57' />
                {
                    <View style={[t.alignCenter, t.justifyCenter, t.m4]}>
                        <View style={[t.m2]}>
                            <Text style={[t.fontBold, t.textBase]} color="#231e57">Date of Membership</Text>
                        </View>
                        <View style={[t.m2]}>
                            <Input
                                size="md"
                                variant="underlined" isDisabled
                                placeholder="Date of Membership"
                                w={{
                                    base: "100%",
                                    md: "100%",
                                }}
                                InputRightElement={
                                    <Icon as={<Icons name="calendar" group="ui-interface" />} size={5} mr="2" color="muted.400" />
                                }
                                onChangeText={(text) => setdateMembership(text)}
                            >
                                {dateMembership}
                            </Input>
                        </View>

                        <View style={[t.mL2, t.mT6]}>
                            <Text style={[t.fontBold, t.textBase]} color="#231e57">First name</Text>
                        </View>
                        <View style={[t.m2]}>
                            <Input
                                size="md"
                                variant="underlined"
                                placeholder="Ex. John"
                                w={{
                                    base: "100%",
                                    md: "100%",
                                }}
                                onChangeText={(text) => setfirstName(text)}
                            >
                                {firstName}
                            </Input>
                        </View>
                        <View style={[t.mL2, t.mT6]}>
                            <Text style={[t.fontBold, t.textBase]} color="#231e57">Middle name</Text>
                        </View>
                        <View style={[t.m2]}>
                            <Input
                                size="md"
                                variant="underlined"
                                placeholder="Ex. Nicknack"
                                w={{
                                    base: "100%",
                                    md: "100%",
                                }}
                                onChangeText={(text) => setmiddleName(text)}

                            >
                                {middleName}
                            </Input>
                        </View>
                        <View style={[t.mL2, t.mT6]}>
                            <Text style={[t.fontBold, t.textBase]} color="#231e57">Last name</Text>
                        </View>
                        <View style={[t.m2]}>
                            <Input
                                size="md"
                                variant="underlined"
                                placeholder="Ex. Doe"
                                w={{
                                    base: "100%",
                                    md: "100%",
                                }}
                                onChangeText={(text) => setlastName(text)}
                            >
                                {lastName}
                            </Input>
                        </View>
                        {/* 2 input */}
                        <View style={[t.flexRow]}>
                            <View style={[t.flexCol, t.flexGrow]}>
                                <View style={[t.mL2, t.mT6]}>
                                    <Text style={[t.fontBold, t.textBase]} color="#231e57">Gender</Text>
                                </View>
                                <View style={[t.m2, t.borderB2, t.borderGray300, t.p2]}>
                                    <Dropdown
                                        data={gender}
                                        labelField="label"
                                        valueField="value"
                                        label="Dropdown"
                                        placeholder="Select item"
                                        value={selectedGender}
                                        onChange={item => {
                                            setselectedGender(item.value)
                                        }}
                                    />
                                </View>
                            </View>
                            <View style={[t.flexCol, t.flexGrow]}>
                                <View style={[t.mL2, t.mT6]}>
                                    <Text style={[t.fontBold, t.textBase]} color="#231e57">Civil Status</Text>
                                </View>
                                <View style={[t.m2, t.borderB2, t.borderGray300, t.p2]}>
                                    <Dropdown
                                        data={status}
                                        labelField="label"
                                        valueField="value"
                                        label="Dropdown"
                                        placeholder="Select item"
                                        value={maritalStatus}
                                        onChange={item => {
                                            setmaritalStatus(item.value)
                                        }}
                                    />
                                </View>
                            </View>
                        </View>

                        {/* 2 input */}
                        <View style={[t.flexRow]}>
                            <View style={[t.flexCol, t.flexGrow]}>
                                <View style={[t.mL2, t.mT6]}>
                                    <Text style={[t.fontBold, t.textBase]} color="#231e57">Date of Birth</Text>
                                </View>
                                <View style={[t.m2]}>
                                    <TouchableOpacity onPress={() => setOpen(true)}>
                                        <Input
                                            isDisabled
                                            size="md"
                                            variant="underlined"
                                            placeholder="Ex. Filipino"
                                            w={{
                                                base: "100%",
                                                md: "100%",
                                            }}>
                                            {dob}
                                        </Input>
                                    </TouchableOpacity>
                                    <View style={[t.flex1, t.justifyCenter, t.alignCenter]}>
                                        <View style={[t.m4, t.roundedLg, t.alignCenter]}>
                                            <DatePicker
                                                modal
                                                mode='date'
                                                open={open}
                                                date={date}
                                                onConfirm={(date) => {
                                                    // setdob(date)
                                                    console.log(date)
                                                    setOpen(false)
                                                    setDate(date)
                                                }}
                                                onCancel={() => {
                                                    setOpen(false)
                                                }}
                                            />
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={[t.flexCol, t.flexGrow]}>
                                <View style={[t.mL2, t.mT6]}>
                                    <Text style={[t.fontBold, t.textBase]} color="#231e57">Citizenship</Text>
                                </View>
                                <View style={[t.m2]}>
                                    <Input
                                        size="md"
                                        variant="underlined"
                                        placeholder="Ex. Filipino"
                                        w={{
                                            base: "100%",
                                            md: "100%",
                                        }}
                                        onChangeText={(text) => setnationality(text)}
                                    >
                                        {nationality}
                                    </Input>
                                </View>
                            </View>
                        </View>


                        <View style={[t.flexRow]}>
                            <View style={[t.flexCol, t.flexGrow]}>
                                <View style={[t.mL2, t.mT6]}>
                                    <Text style={[t.fontBold, t.textBase]} color="#231e57">Mobile Number</Text>
                                </View>
                                <View style={[t.m2]}>
                                    <Input
                                        size="md"
                                        variant="underlined"
                                        placeholder="Ex. 09123456789"
                                        keyboardType="number-pad"
                                        w={{
                                            base: "100%",
                                            md: "100%",
                                        }}
                                        onChangeText={(text) => setmobileNumber(text)}
                                    >
                                        {mobileNumber}
                                    </Input>
                                </View>
                            </View>
                            <View style={[t.flexCol, t.flexGrow]}>
                                <View style={[t.mL2, t.mT6]}>
                                    <Text style={[t.fontBold, t.textBase]} color="#231e57">Email</Text>
                                </View>
                                <View style={[t.m2]}>
                                    <Input
                                        size="md"
                                        variant="underlined" isDisabled
                                        placeholder="Ex. JohnDoe@email.com"
                                        w={{
                                            base: "100%",
                                            md: "100%",
                                        }}
                                    // InputRightElement={
                                    //     <Icon as={<Icons name="email" group="ui-interface" />} size={5} mr="2" color="muted.400" />
                                    // }
                                    >
                                        {email}
                                    </Input>
                                </View>
                            </View>
                        </View>
                        <View style={[t.mL2, t.mT6]}>
                            <Text style={[t.fontBold, t.textBase]} color="#231e57">Program Manager
                                (Your marketing executive will indicate your Programme Manager)</Text>
                        </View>
                        <View style={[t.m2]}>
                            <Input
                                size="md"
                                variant="underlined" isDisabled
                                placeholder="Program Manager"
                                w={{
                                    base: "100%",
                                    md: "100%",
                                }}
                            // InputRightElement={
                            //     <Icon as={<Icons name="email" group="ui-interface" />} size={5} mr="2" color="muted.400" />
                            // }
                            >
                            </Input>
                        </View>

                        <View style={[t.mL2, t.mT6]}>
                            <Text style={[t.fontBold, t.textBase]} color="#231e57">Street</Text>
                        </View>
                        <View style={[t.m2]}>
                            <Input
                                size="md"
                                variant="underlined"
                                placeholder="Ex. 12th St."
                                w={{
                                    base: "100%",
                                    md: "100%",
                                }}
                                InputRightElement={
                                    <Icon as={<Icons name="street-1" group="essential" />} size={5} mr="2" color="muted.400" />
                                }
                                onChangeText={(text) => setstreet(text)}
                            >
                                {street}
                            </Input>
                        </View>

                        <View style={[t.flexRow]}>
                            <View style={[t.flexCol, t.flexGrow]}>
                                <View style={[t.mL2, t.mT6]}>
                                    <Text style={[t.fontBold, t.textBase]} color="#231e57">City</Text>
                                </View>
                                <View style={[t.m2]}>
                                    <Input
                                        size="md"
                                        variant="underlined"
                                        placeholder="Ex. Manila City"
                                        w={{
                                            base: "100%",
                                            md: "100%",
                                        }}
                                        // InputRightElement={
                                        //     <Icon as={<Icons name="city" group="miscellaneous" />} size={5} mr="2" color="muted.400" />
                                        // }
                                        onChangeText={(text) => setcity(text)}
                                    >
                                        {city}
                                    </Input>
                                </View>
                            </View>
                            <View style={[t.flexCol, t.flexGrow]}>
                                <View style={[t.mL2, t.mT6]}>
                                    <Text style={[t.fontBold, t.textBase]} color="#231e57">Location</Text>
                                </View>
                                <View style={[t.m2]}>
                                    {/* <Dropdown
                                        data={country}
                                        labelField="country_name"
                                        valueField="id"
                                        label="Dropdown"
                                        placeholder="Select item"
                                        value={location}
                                        onChange={item => {
                                            setlocation(item.id)
                                        }}
                                    /> */}
                                    <Input
                                        isDisabled
                                        size="md"
                                        variant="underlined"
                                        placeholder="Ex. Manila City"
                                        w={{
                                            base: "100%",
                                            md: "100%",
                                        }}
                                        onChangeText={(text) => setcountry(text)}
                                    >
                                        {country}
                                    </Input>
                                </View>
                            </View>
                        </View>
                        <View style={[t.m2]}>
                            <TouchableOpacity
                                onPress={() => handleUpdate(email, data)}
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
                                        Update
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                }
            </ScrollView>
        </SafeAreaView>
    )
}

export default PersonalInfo