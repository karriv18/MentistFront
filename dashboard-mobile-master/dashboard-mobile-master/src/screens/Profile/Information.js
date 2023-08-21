import React, { useEffect, useState } from "react"
import {
    TextArea,
    Text,
    Input,
    Icon,
    Button,
    ScrollView,
} from "native-base"
import {
    View,
    SafeAreaView,
    StatusBar,
    Modal,
    TouchableOpacity,
    Alert
} from "react-native"
import { t } from "react-native-tailwindcss"
import MaterialIcons from "react-native-ico"
import AsyncStorage from "@react-native-async-storage/async-storage"
import callApi from "../../../helpers/callApi"
import Loader from "../../components/Loader"
import DatePicker from "react-native-date-picker"
import { useDispatch, useSelector } from "react-redux"
import { updateInformation } from "../../controller/actions/member"


const Information = () => {
    const [maidenName, setmaidenName] = useState()
    const [dop, setdop] = useState()
    const [mop, setmop] = useState()
    const [promo, setpromo] = useState()
    const [passport, setpassport] = useState()
    const [passExp, setpassExp] = useState()
    const [workExp, setworkExp] = useState()
    const [history, sethistory] = useState()
    const [social, setsocial] = useState()
    const [objective, setobjective] = useState()
    const [notes, setnotes] = useState()
    const [dob, setdob] = useState()
    const [isLoading, setisLoading] = useState(true)
    const [Refreshing, setRefreshing] = useState(false)
    const [id, setid] = useState()
    const dispatch = useDispatch()
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    const { member } = useSelector(state => state.member)

    useEffect(() => {
        let abort = new AbortController()
        if (member) {
            setid(member.data.otherinfo.membership_id)
            setmaidenName(member.data.otherinfo.maiden_name)
            setmop(member.data.otherinfo.mop)
            setpromo(member.data.otherinfo.promo)
            setpassport(member.data.otherinfo.passport)
            setpassExp(member.data.otherinfo.passport_exp)
            setworkExp(member.data.otherinfo.work_exp)
            sethistory(member.data.otherinfo.history)
            setnotes(member.data.otherinfo.notes)
            setsocial(member.data.otherinfo.social)
            setobjective(member.data.otherinfo.objective)
            setdob(member.data.otherinfo.dob)
            setdop(member.data.otherinfo.dop)
        }
        return () => {
            abort.abort()
        }
    }, [])

    const data = {
        maiden_name: maidenName,
        mop: mop,
        promo: promo,
        passport: passport,
        passport_exp: passExp,
        work_exp: workExp,
        history: history,
        notes: notes,
        social: social,
        objective: objective,
        dob: dob,
    }

    const handleUpdate = (id, data) => {
        dispatch(updateInformation(id, data))
    }


    return (
        <SafeAreaView>
            <ScrollView style={[t.bgWhite, t.hFull]}>
                <StatusBar backgroundColor='#231e57' />
                <View style={[t.alignCenter, t.justifyCenter, t.m4]}>
                    <View style={[t.m2]}>
                        <Text style={[t.fontBold, t.textBase]} color="#231e57">Mother's Maiden Name</Text>
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
                            onChangeText={(text) => setmaidenName(text)}
                        >
                            {maidenName}
                        </Input>
                    </View>
                    <View style={[t.flexRow]}>
                        <View style={[t.flexCol, t.flexGrow]}>
                            <View style={[t.m2]}>
                                <Text style={[t.fontBold, t.textBase]} color="#231e57">Date of Payment</Text>
                            </View>
                            <View style={[t.m2]}>
                                <TouchableOpacity onPress={() => setOpen(true)}>
                                    <Input
                                        isDisabled
                                        size="md"
                                        variant="underlined"
                                        placeholder="Ex. Credit Card"
                                        w={{
                                            base: "100%",
                                            md: "100%",
                                        }}>
                                        {dop}
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
                                                setdop(date)
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
                            <View style={[t.m2]}>
                                <Text style={[t.fontBold, t.textBase]} color="#231e57">Mode of Payment</Text>
                            </View>
                            <View style={[t.m2]}>
                                <Input
                                    size="md"
                                    variant="underlined"
                                    placeholder="Ex. Credit Card"
                                    w={{
                                        base: "100%",
                                        md: "100%",
                                    }}
                                    // InputRightElement={
                                    //     <Icon as={<Icons name="calendar" group="ui-interface" />} size={5} mr="2" color="muted.400" />
                                    // }
                                    onChangeText={(text) => setmop(text)}
                                >
                                    {mop}
                                </Input>
                            </View>
                        </View>
                    </View>
                    <View style={[t.m2]}>
                        <Text style={[t.fontBold, t.textBase]} color="#231e57">Promo Availed</Text>
                    </View>
                    <View style={[t.m2]}>
                        <Input
                            size="md"
                            variant="underlined"
                            placeholder="Ex. Fly Now Pay Later"
                            w={{
                                base: "100%",
                                md: "100%",
                            }}
                            onChangeText={(text) => setpromo(text)}
                        >
                            {promo}
                        </Input>
                    </View>
                    <View style={[t.m2]}>
                        <Text style={[t.fontBold, t.textBase]} color="#231e57">Passport Number</Text>
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
                            onChangeText={(text) => setpassport(text)}
                        >
                            {passport}
                        </Input>
                    </View>
                    <View style={[t.m2]}>
                        <Text style={[t.fontBold, t.textBase]} color="#231e57">Passport Expiry</Text>
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
                            onChangeText={(text) => setpassExp(text)}
                        >
                            {passExp}
                        </Input>
                    </View>
                    <View style={[t.m2]}>
                        <Text style={[t.fontBold, t.textBase]} color="#231e57">Occupation/Profession</Text>
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
                            onChangeText={(text) => setworkExp(text)}
                        >
                            {workExp}
                        </Input>
                    </View>
                    <View style={[t.m2]}>
                        <Text style={[t.fontBold, t.textBase]} color="#231e57">Work History(Current Employer)</Text>
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
                            onChangeText={(text) => sethistory(text)}
                        >
                            {history}
                        </Input>
                    </View>
                    <View style={[t.m2]}>
                        <Text style={[t.fontBold, t.textBase]} color="#231e57">How did you hear about us?</Text>
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
                            onChangeText={(text) => setsocial(text)}
                        >
                            {social}
                        </Input>
                    </View>
                    <View style={[t.m2]}>
                        <Text style={[t.fontBold, t.textBase]} color="#231e57">What is your main Objective?</Text>
                        <Text style={[t.fontBold]} color="#231e57">Please type NONE if the question is not applicable to you.</Text>
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
                            onChangeText={(text) => setobjective(text)}
                        >
                            {objective}
                        </Input>
                    </View>
                    <View style={[t.m2]}>
                        <Text style={[t.fontBold, t.textBase]} color="#231e57">Your History/Note</Text>
                        <Text style={[t.fontBold]} color="#231e57">Please type NONE if the question is not applicable to you.</Text>
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
                            onChangeText={(text) => setnotes(text)}
                        >
                            {notes}
                        </TextArea>
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
        </SafeAreaView>
    )
}
export default Information