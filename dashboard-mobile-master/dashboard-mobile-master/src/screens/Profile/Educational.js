import {
    Input,
    Icon,
    Button,
    ScrollView,
    Text,
} from "native-base"
import React, { useEffect, useState } from "react"
import {
    View,
    SafeAreaView,
    StatusBar,
    Alert,
    TouchableOpacity
} from "react-native"
import { t } from "react-native-tailwindcss"
import { Dropdown, MultiSelect } from 'react-native-element-dropdown'
import { useDispatch, useSelector } from "react-redux"
import { updateEducation } from "../../controller/actions/member"


const Educational = () => {
    const [education, seteducation] = useState()
    const [school, setschool] = useState()
    const [degree, setdegree] = useState()
    const [address, setaddress] = useState()
    const [id, setid] = useState()
    const [isLoading, setisLoading] = useState(true)
    const dispatch = useDispatch()
    const { member } = useSelector(state => state.member)

    useEffect(() => {
        let abort = new AbortController()
        if (member) {
            setid(member.data.education.membership_id)
            seteducation(member.data.education.education)
            setschool(member.data.education.name_of_school)
            setdegree(member.data.education.degree)
            setaddress(member.data.education.address)
        }
        console.log(education)
        return () => {
            abort.abort()
        }
    }, [education])

    const item = [{
        value: '1',
        label: 'High School Degree Holder'
    }, {
        value: '2',
        label: 'Associate Degree Holder'
    }, {
        value: '3',
        label: 'Bachelors Degree Holder'
    }, {
        value: '4',
        label: 'Master Degree Holder'
    }, {
        value: '5',
        label: 'Doctorate Degree Holder'
    }]

    const handleUpdate = (id, data) => {
        dispatch(updateEducation(id, data))
    }

    const data = {
        education: education,
        name_of_school: school,
        degree: degree,
        address: address,
    }

    return (
        <SafeAreaView>
            <View style={[t.bgWhite, t.hFull]}>
                <StatusBar backgroundColor='#231e57' />
                <View style={[t.alignCenter, t.justifyCenter, t.m4]}>
                    <View style={[t.m2]}>
                        <Text style={[t.fontBold, t.textBase]} color="#231e57">Educational Attainment</Text>
                    </View>
                    <View style={[t.m2, t.borderB2, t.borderGray300, t.p2]}>
                        <Dropdown
                            data={item}
                            labelField="label"
                            valueField="value"
                            label="Dropdown"
                            placeholder="Select item"
                            value={education}
                            onChange={item => {
                                seteducation(item.value)
                            }}
                        />
                    </View>

                    <View style={[t.m2]}>
                        <Text style={[t.fontBold, t.textBase]} color="#231e57">Degree Obtained</Text>
                    </View>
                    <View style={[t.m2]}>
                        <Input
                            size="md"
                            variant="underlined"
                            placeholder="Ex. Bachelor Of Science in Business Administration"
                            w={{
                                base: "100%",
                                md: "100%",
                            }}
                            // InputRightElement={
                            //     <Icon as={<Icons name="calendar" group="ui-interface" />} size={5} mr="2" color="muted.400" />
                            // }
                            onChangeText={(text) => setdegree(text)}
                        >
                            {degree}
                        </Input>
                    </View>

                    <View style={[t.m2]}>
                        <Text style={[t.fontBold, t.textBase]} color="#231e57">Name of Educational Institution</Text>
                    </View>
                    <View style={[t.m2]}>
                        <Input
                            size="md"
                            variant="underlined"
                            placeholder="Ex. University of the Philippines"
                            w={{
                                base: "100%",
                                md: "100%",
                            }}
                            // InputRightElement={
                            //     <Icon as={<Icons name="calendar" group="ui-interface" />} size={5} mr="2" color="muted.400" />
                            // }
                            onChangeText={(text) => setschool(text)}
                        >
                            {school}
                        </Input>
                    </View>

                    <View style={[t.m2]}>
                        <Text style={[t.fontBold, t.textBase]} color="#231e57">Address</Text>
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
                            // InputRightElement={
                            //     <Icon as={<Icons name="calendar" group="ui-interface" />} size={5} mr="2" color="muted.400" />
                            // }
                            onChangeText={(text) => setaddress(text)}
                        >
                            {address}
                        </Input>
                    </View>
                    <View style={[t.m2]}>
                        <TouchableOpacity
                            onPress={() => handleUpdate(id, data)}
                        >
                            <View style={[t.p2,
                            t.alignCenter,
                            t.justifyCenter,
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
            </View>
        </SafeAreaView>
    )
}
export default Educational