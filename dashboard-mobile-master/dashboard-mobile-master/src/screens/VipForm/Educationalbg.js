import { Text, Input, Button } from "native-base"
import { View, SafeAreaView, ScrollView, StatusBar } from 'react-native'
import { t } from "react-native-tailwindcss"

import React, { useState, useEffect } from 'react'
import callApi from "../../../helpers/callApi"
import AsyncStorage from "@react-native-async-storage/async-storage"
import Loader from "../../components/Loader"

const Educationalbg = ({ navigation }) => {
    const [Country, setCountry] = useState()
    const [Idea, setIdea] = useState()
    const [Education, setEducation] = useState()
    const [Degree, setDegree] = useState()
    const [Institution, setInstitution] = useState()
    const [Marketing, setMarketing] = useState({})
    const [Agent, setAgent] = useState()
    const [isLoading, setisLoading] = useState(true)

    const Data = {
        education: Education,
        degree: Degree,
        name_of_school: Institution,
        marketing_executive: Agent,
        countries: Country,
        social: Idea,
    }

    const updateData = async (data) => {
        const jsonValue = await AsyncStorage.getItem('vip')
        if (jsonValue != null) {
            const merge = await AsyncStorage.mergeItem('vip', JSON.stringify(data))
            navigation.push('Financialreq')
            // jsonValue = JSON.parse(jsonValue)
            // jsonValue.push(data)
            // AsyncStorage.setItem('vip', JSON.stringify(jsonValue))
        }
    }

    useEffect(() => {
        async function getMarketing() {
            try {
                const res = await callApi('get', '/marketing')
                if (res.status == 200) {
                    if (res.data.data != null) {
                        setMarketing(res.data.data)
                        setisLoading(false)
                    }
                }
            }
            catch (err) {
                console.log(err)
            }
        }
        let abortcontroller = new AbortController()
        getMarketing()
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
                            EDUCATIONAL BACKGROUND
                        </Text>
                    </View>
                    <View style={[t.hPx, t.mX2, t.bgGray600, t.m4]} />
                    <View style={[t.m2]}>
                        <Text style={[t.fontBold, t.textBase]} color="#231e57">Highest Educational Attainment</Text>
                    </View>
                    <View style={[t.m2]}>
                        <Text color="#231e57">Note: An Associate degree is an undergraduate academic degree awarded by colleges and universities upon completion of a course of study lasting two years</Text>
                    </View>
                    <Picker style={[t.roundedLg, t.bgGray300, t.m2]}
                        selectedValue={Education}
                        onValueChange={(itemValue) => setEducation(itemValue)}>
                        <Picker.Item label="--Select--" value="0" />
                        <Picker.Item label="High School Degree Holder" value="High School Degree Holder" />
                        <Picker.Item label="Associate Degree Holder" value="Associate Degree Holder" />
                        <Picker.Item label="Bachelor's Degree Holder" value="Bachelor's Degree Holder" />
                        <Picker.Item label="Master's Degree Holder" value="Master's Degree Holder" />
                        <Picker.Item label="Doctorate Degree Holder" value="Doctorate Degree Holder" />
                    </Picker>
                    <View style={[t.m2]}>
                        <Text style={[t.fontBold, t.textBase]} color="#231e57">Degree Obtained</Text>
                    </View>
                    <View style={[t.m2]}>
                        <Text color="#231e57">Please type the complete title of DEGREE obtained and please AVOID ABBREVIATIONS</Text>
                    </View>
                    <View style={[t.m2]}>
                        <Input
                            variant="underlined"
                            placeholder="Ex. Bachelor of Science in Business Administration"
                            w={{
                                base: "100%",
                                md: "100%"
                            }}
                            onChangeText={(itemValue) => setDegree(itemValue)}
                        >
                        </Input>
                    </View>
                    <View style={[t.m2]}>
                        <Text style={[t.fontBold, t.textBase]} color="#231e57">Name of Educational Institution</Text>
                    </View>
                    <View style={[t.m2]}>
                        <Input
                            variant="underlined"
                            placeholder="Ex. Universiy of the Philippines"
                            w={{
                                base: "100%",
                                md: "100%"
                            }}
                            onChangeText={(itemValue) => setInstitution(itemValue)}
                        >
                        </Input>
                    </View>
                    <View>
                        <Text style={[t.fontBold, t.textBase, t.textXl, t.m2, t.textGray600]}>
                            OTHER INFORMATION
                        </Text>
                        <View style={[t.hPx, t.mX2, t.bgGray600, t.m4]} />
                        <Text style={[t.fontBold, t.textBase, t.m2]} color="#231e57">Which countries are you applying for?</Text>
                        <Picker style={[t.roundedLg, t.bgGray300, t.m2]}
                            selectedValue={Country}
                            onValueChange={(itemValue) => setCountry(itemValue)}>
                            <Picker.Item label="UNITED KINGDOM" value="UNITED KINGDOM" />
                            <Picker.Item label="CANADA" value="CANADA" />
                            <Picker.Item label="AUSTRALIA" value="AUSTRALIA" />
                            <Picker.Item label="NEW ZEALAND" value="NEW ZEALAND" />
                            <Picker.Item label="UNITED STATES of AMERICA" value="UNITED STATES of AMERICA" />
                            <Picker.Item label="NORWAY" value="NORWAY" />
                            <Picker.Item label="DENMARK" value="DENMARK" />
                            <Picker.Item label="ITALY" value="ITALY" />
                            <Picker.Item label="SPAIN" value="SPAIN" />
                            <Picker.Item label="GERMANY" value="GERMANY" />
                            <Picker.Item label="MALTA" value="MALTA" />
                            <Picker.Item label="RUSSIA" value="RUSSIA" />
                            <Picker.Item label="SINGAPORE" value="SINGAPORE" />
                            <Picker.Item label="IRELAND" value="IRELAND" />
                            <Picker.Item label="JAPAN" value="JAPAN" />
                            <Picker.Item label="AUSTRIA" value="AUSTRIA" />
                            <Picker.Item label="SLOVENIA" value="SLOVENIA" />
                            <Picker.Item label="SWITZERLAND" value="SWITZERLAND" />
                            <Picker.Item label="ESTONIA" value="ESTONIA" />
                            <Picker.Item label="GEORGIA" value="GEORGIA" />
                            <Picker.Item label="SWEDEN" value="SWEDEN" />
                            <Picker.Item label="POLAND" value="POLAND" />
                            <Picker.Item label="CZECH REPUBLIC" value="CZECH REPUBLIC" />
                            <Picker.Item label="HUNGARY" value="HUNGARY" />
                            <Picker.Item label="FRANCE" value="FRANCE" />
                            <Picker.Item label="FINLAND" value="FINLAND" />
                            <Picker.Item label="CHINA" value="CHINA" />
                            <Picker.Item label="CYPRUS" value="CYPRUS" />
                            <Picker.Item label="Other" value="Other" />
                        </Picker>
                        <Text style={[t.fontBold, t.textBase, t.m2]} color="#231e57" >How did you learn about Fil-Global?</Text>
                        <Picker style={[t.roundedLg, t.bgGray300, t.m2]}
                            selectedValue={Idea}
                            onValueChange={(itemValue) => setIdea(itemValue)}>
                            <Picker.Item label="Google Search" value="Google Search" />
                            <Picker.Item label="Website - www.fil-global.com" value="Website - www.fil-global.com" />
                            <Picker.Item label="Facebook" value="Facebook" />
                            <Picker.Item label="LinkedIn" value="LinkedIn" />
                            <Picker.Item label="Twitter" value="Twitter" />
                            <Picker.Item label="Instagram" value="Instagram" />
                            <Picker.Item label="Flyers" value="Flyers" />
                            <Picker.Item label="Events" value="Events" />
                            <Picker.Item label="Whatsapp" value="Whatsapp" />
                            <Picker.Item label="Youtube" value="Youtube" />
                            <Picker.Item label="From Friend/Family/Relatives" value="From Friend/Family/Relatives" />
                            <Picker.Item label="Other" value="Other" />
                        </Picker>
                        <View style={[t.m2]}>
                            <Text style={[t.fontBold, t.textBase, t.m2]} color="#231e57">Name of Marketing Manager who referred you to Fil-Global</Text>
                        </View>
                        <Picker style={[t.roundedLg, t.bgGray300, t.m2]}
                            selectedValue={Agent}
                            onValueChange={(itemValue) => setAgent(itemValue)}>
                            {Marketing && Object.values(Marketing).map((val, id) => (
                                <Picker.Item label={val.agents_name} value={val.email} key={id} />
                            ))}
                        </Picker>
                        <Button style={[t.m2, t.bgIndigo700]}
                            onPress={() =>
                                // navigation.push('Financialreq')
                                updateData(Data)
                            }
                        >
                            <Text style={[t.fontExtrabold, t.textWhite]}>Next Page</Text>
                        </Button>
                    </View>
                </ScrollView>
            }
        </SafeAreaView>
    )
}

export default Educationalbg