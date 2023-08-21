import {
    Button,
    TextArea,
    Text,
    Icon,
    FlatList,
    Stack,
    ScrollView
} from "native-base"
import React, { useState, useEffect } from "react"
import { View, SafeAreaView, StatusBar, KeyboardAvoidingView, TouchableOpacity } from "react-native"
import { t } from "react-native-tailwindcss"
import AsyncStorage from "@react-native-async-storage/async-storage"
import MaterialIcons from "react-native-ico"
import callApi from "../../helpers/callApi"
import { Dropdown, MultiSelect } from 'react-native-element-dropdown'
import Loader from "../components/Loader"
import { useDispatch, useSelector } from "react-redux"
import { addFollowUp } from "../controller/actions/followup"


const Followup = () => {
    const [selectAgent, setselectAgent] = useState()
    const [type, settype] = useState()
    const [info, setinfo] = useState()
    const [agents, setagents] = useState()
    const [name, setname] = useState()
    const [email, setemail] = useState()
    const [concern, setconcern] = useState()
    const dispatch = useDispatch()
    const [isLoading, setisLoading] = useState(true)
    const { followup } = useSelector(state => state.followup)

    const Data = {
        clients_name: name,
        clients_email: email,
        concern: concern,
        email: selectAgent,
        type: type,
    }


    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('user')
            if (value) {
                setname(JSON.parse(value).name)
                setemail(JSON.parse(value).email)
            }
        } catch (e) {
            console.log(e)
        }
    }
    const handleAdd = (data) => {
        dispatch(addFollowUp(data))
    }

    useEffect(() => {
        let abort = new AbortController()
        setTimeout(() => {
            getData()
            setagents(followup.agents)
            setinfo(followup.followup)
        }, 500)
        return () => {
            abort.abort()
        }
    }, [followup])

    //Render Item
    const renderItem = ({ item }) => (
        <View style={[t.m2]}>
            <View style={[t.flexRow, t.flexCol, t.p2, t.bgBlue300, t.roundedLg, t.relative]}>
                <Text style={[t.fontBold, t.p2, t.textBlack, t.textBase]}>
                    Reference# ({item.id})
                </Text>
                <Text style={[t.fontNormal, t.p2, t.textBlack]}>
                    Type: {item.type}
                </Text>
                <Text style={[t.fontNormal, t.p2, t.textBlack]}>
                    MSR Agent: {item.email}
                </Text>
                <Text style={[t.fontNormal, t.p2, t.textBlack]}>
                    Concern: {item.concerns}
                </Text>
                <Text style={[t.fontNormal, t.p2, t.textBlack]}>
                    Solutions: {item.solutions}
                </Text>
                <Text style={[t.fontNormal, t.p2, t.textBlack]}>
                    Notes: {item.notes}
                </Text>
            </View>
        </View>
    )

    const ItemSeparatorView = () => {
        return (
            <View
                style={{
                    height: 0.5,
                    width: '100%',
                    // backgroundColor: '#C8C8C8',
                }}
            />
        )
    }

    const items = [{
        value: 'Complaints',
        label: 'Complaints'
    }, {
        value: 'Departure',
        label: 'Departure'
    }, {
        value: 'Requirements',
        label: 'Requirements'
    }, {
        value: 'Visa Processing',
        label: 'Visa Processing'
    }, {
        value: 'Refund',
        label: 'Refund'
    }, {
        value: 'Others',
        label: 'Others'
    }]

    return (
        <SafeAreaView>
            <StatusBar backgroundColor='#231e57' />
            <View style={[t.alignCenter, t.justifyCenter, t.m4]}>
                <View style={[t.m2]}>
                    <Text style={[t.fontBold, t.textBase]} color="#231e57">MSR Agents</Text>
                </View>
                <View style={[t.m2, t.borderB2, t.borderGray300,]}>
                    <Dropdown
                        data={agents}
                        labelField="agents_name"
                        valueField="email"
                        label="Dropdown"
                        search
                        placeholder="Select item"
                        value={selectAgent}
                        onChange={item => {
                            setselectAgent(item.email)
                        }}
                    />
                </View>
                <View style={[t.m2]}>
                    <Text style={[t.fontBold, t.textBase]} color="#231e57">Type</Text>
                </View>
                <View style={[t.m2, t.borderB2, t.borderGray300,]}>
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
                    <Text style={[t.fontBold, t.textBase]} color="#231e57">Concerns</Text>
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
                        onChangeText={(value) => setconcern(value)}
                    >
                    </TextArea>
                </View>
                <View style={[t.m2, t.w2_5, t.selfCenter]}>
                    <TouchableOpacity
                        onPress={() => handleAdd(Data)}>
                        <View style={[t.p2,
                        t.alignCenter,
                        t.justifyCenter,
                        // t.border,
                        // t.borderBlack,
                        t.bgBlue500,
                        t.roundedLg
                        ]}>
                            <Text style={[t.textCenter, t.textWhite]}>
                                Add Follow up
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={info}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => String(index)}
                    onEndReachedThreshold={0.2}
                    ItemSeparatorComponent={ItemSeparatorView}
                    style={[t.pB32]}
                />
            </View>
        </SafeAreaView>
    )
}
export default Followup