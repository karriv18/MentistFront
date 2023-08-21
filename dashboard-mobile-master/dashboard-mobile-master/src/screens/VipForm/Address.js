import { Text, Input, Button, ScrollView } from "native-base"
import { View, SafeAreaView, StatusBar } from 'react-native'
import React, { useState, useEffect } from 'react'

import { t } from "react-native-tailwindcss"
import AsyncStorage from "@react-native-async-storage/async-storage"
import callApi from "../../../helpers/callApi"
import Loader from "../../components/Loader"

const Address = ({ navigation }) => {
    const [Type, setType] = useState()
    const [Street, setStreet] = useState()
    const [City, setCity] = useState()
    const [Country, setCountry] = useState({})
    const [isLoading, setisLoading] = useState(true)
    const [store, setstore] = useState()
    const Data = {
        street: Street,
        city: City,
        loc: Type,
    }

    const updateData = async (data) => {
        const jsonValue = await AsyncStorage.getItem('vip')
        console.log(jsonValue)
        if (jsonValue != null) {
            try {
                await AsyncStorage.mergeItem('vip', JSON.stringify(data))
                navigation.push('Educationalbg')
            }
            catch (err) {
                console.log(err)
            }
        }
    }
    useEffect(() => {
        async function getCountry() {
            try {
                const res = await callApi('get', '/countries')
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



    return (
        <SafeAreaView style={[t.alignCenter, t.justifyCenter, t.m4]}>
            {isLoading ? <Loader /> :
                <ScrollView style={[t.bgWhite]}>
                    <StatusBar backgroundColor='#231e57' />
                    <View>
                        <Text style={[t.fontBold, t.textBase, t.textXl, t.m2, t.textGray600]}>
                            ADDRESS INFORMATION
                        </Text>
                    </View>
                    <View style={[t.hPx, t.mX2, t.bgGray600, t.m4]} />
                    <View style={[t.m2]}>
                        <Text style={[t.fontBold, t.textBase]} color="#231e57">Mailing Street</Text>
                    </View>
                    <View style={[t.m2]}>
                        <Input
                            variant="underlined"
                            placeholder="Ex. Bldg/Bldg name/Blk/Street/Village/Brgy/District"
                            w={{
                                base: "100%",
                                md: "100%"
                            }}
                            onChangeText={(itemValue) => setStreet(itemValue)}
                        >
                        </Input>
                    </View>
                    <View style={[t.m2]}>
                        <Text style={[t.fontBold, t.textBase]} color="#231e57">Mailing City</Text>
                    </View>
                    <View style={[t.m2]}>
                        <Input
                            variant="underlined"
                            placeholder="Ex. Manila City"
                            w={{
                                base: "100%",
                                md: "100%"
                            }}
                            onChangeText={(itemValue) => setCity(itemValue)}
                        >
                        </Input>
                    </View>
                    <Text style={[t.fontBold, t.textBase, t.m2]} color="#231e57" >Mailing Country</Text>
                    <Picker style={[t.roundedLg, t.bgGray300, t.m2]}
                        selectedValue={Type}
                        onValueChange={(itemValue) => setType(itemValue)}>
                        {Country && Object.values(Country).map((val, id) => (
                            <Picker.Item label={val.country_name} value={val.id} key={id} />
                        ))}
                    </Picker>
                    <Button style={[t.m2, t.bgIndigo700]}
                        onPress={() => updateData(Data)}
                    >
                        <Text style={[t.fontExtrabold, t.textWhite]}>Next Page</Text>
                    </Button>
                </ScrollView >
            }
        </SafeAreaView>
    )
}

export default Address