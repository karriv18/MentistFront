import AsyncStorage from "@react-native-async-storage/async-storage"
import {
    View,
    SafeAreaView,
    StatusBar,
    TouchableOpacity,
    Alert
} from "react-native"
import {
    Input,
    ScrollView,
    Text,
} from "native-base"
import React, { useState, useEffect } from "react"
import { t } from "react-native-tailwindcss"
import { useDispatch, useSelector } from "react-redux"
import { updateDependents } from "../../controller/actions/member"


const DependentsInfo = () => {
    const [name, setname] = useState()
    const [contact, setcontact] = useState()
    const [email, setemail] = useState()
    const [relationship, setrelationship] = useState()
    const [id, setid] = useState()
    const [isLoading, setisLoading] = useState(true)
    const dispatch = useDispatch()
    const { member } = useSelector(state => state.member)

    useEffect(() => {
        let abort = new AbortController()
        if (member) {
            setid(member.data.dependents.membership_id)
            setname(member.data.dependents.dependents_name)
            setcontact(member.data.dependents.dependents_contact_number)
            setemail(member.data.dependents.dependents_email)
            setrelationship(member.data.dependents.relationship)
        }
        return () => {
            abort.abort()
        }
    }, [])

    const handleUpdate = (id, data) => {
        dispatch(updateDependents(id, data))
    }
    const data = {
        dependents_name: name,
        dependents_contact_number: contact,
        dependents_email: email,
        relationship: relationship,
    }


    return (
        <SafeAreaView>
            <StatusBar backgroundColor='#231e57' />
            <ScrollView style={[t.bgWhite, t.hFull]}>
                <View style={[t.alignCenter, t.justifyCenter, t.m4]}>
                    <View style={[t.roundedLg]}>
                        <View style={[t.m2]}>
                            <Text style={[t.fontBold, t.textBase]} color="#231e57">Full Name</Text>
                        </View>
                        <View style={[t.m2]}>
                            <Input
                                size="md"
                                variant="underlined"
                                placeholder="Ex. John Doe"
                                w={{
                                    base: "100%",
                                    md: "100%",
                                }}
                                // InputRightElement={
                                //     <Icon as={<Icons name="calendar" group="ui-interface" />} size={5} mr="2" color="muted.400" />
                                // }
                                onChangeText={(text) => setname(text)}
                            >
                                {name}
                            </Input>
                        </View>

                        <View style={[t.m2]}>
                            <Text style={[t.fontBold, t.textBase]} color="#231e57">Contact Number</Text>
                        </View>
                        <View style={[t.m2]}>
                            <Input
                                size="md"
                                variant="underlined"
                                placeholder="Ex. 09123456789"
                                w={{
                                    base: "100%",
                                    md: "100%",
                                }}
                                // InputRightElement={
                                //     <Icon as={<Icons name="calendar" group="ui-interface" />} size={5} mr="2" color="muted.400" />
                                // }
                                onChangeText={(text) => setcontact(text)}
                            >
                                {contact}
                            </Input>
                        </View>

                        <View style={[t.m2]}>
                            <Text style={[t.fontBold, t.textBase]} color="#231e57">Dependents Email</Text>
                        </View>
                        <View style={[t.m2]}>
                            <Input
                                size="md"
                                variant="underlined"
                                placeholder="Ex. JohnDoe@email.com"
                                w={{
                                    base: "100%",
                                    md: "100%",
                                }}
                                // InputRightElement={
                                //     <Icon as={<Icons name="calendar" group="ui-interface" />} size={5} mr="2" color="muted.400" />
                                // }
                                onChangeText={(text) => setemail(text)}
                            >
                                {email}
                            </Input>
                        </View>

                        <View style={[t.m2]}>
                            <Text style={[t.fontBold, t.textBase]} color="#231e57">Relationship</Text>
                        </View>
                        <View style={[t.m2]}>
                            <Input
                                size="md"
                                variant="underlined"
                                placeholder="Ex. Mother/Father"
                                w={{
                                    base: "100%",
                                    md: "100%",
                                }}
                                // InputRightElement={
                                //     <Icon as={<Icons name="calendar" group="ui-interface" />} size={5} mr="2" color="muted.400" />
                                // }
                                onChangeText={(text) => setrelationship(text)}
                            >
                                {relationship}
                            </Input>
                        </View>
                    </View>
                    <View style={[t.m2]}>
                        <TouchableOpacity
                            onPress={() => handleUpdate(id, data)}
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
            </ScrollView>
        </SafeAreaView >
    )
}
export default DependentsInfo