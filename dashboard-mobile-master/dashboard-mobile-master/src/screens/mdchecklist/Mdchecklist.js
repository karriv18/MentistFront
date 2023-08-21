import {
    View,
    SafeAreaView,
    ScrollView,
    TouchableWithoutFeedback,
    StatusBar,
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { Icon, Text } from 'native-base'
import { t } from 'react-native-tailwindcss'
import Ico from 'react-native-ico'
import { getMdchecklist } from '../../controller/actions/checklist'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch } from 'react-redux'
const Mdchecklist = ({ navigation }) => {
    const [indicator, setindicator] = useState()
    const dispatch = useDispatch()
    const [memId, setmemId] = useState()

    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('user')
            value ? setmemId(JSON.parse(value).member.id) : null
        } catch (e) {
            console.log(e)
        }
    }
    const handleChecklist = (memId, indicator) => {
        dispatch(getMdchecklist(memId, indicator))
            .then(() => navigation.push('Documents', { indicator: indicator }))
    }
    useEffect(() => {
        let abort = new AbortController()
        setTimeout(() => {
            getData()
        }, 500)
        return () => {
            abort.abort()
        }
    }, [])

    return (
        <SafeAreaView>
            <StatusBar backgroundColor='#231e57' />
            <ScrollView style={[t.bgWhite,t.p4]}>
                <View style={[t.mB8]}>
                    <TouchableWithoutFeedback
                        onPress={() =>
                            handleChecklist(memId, 'A')
                        }>
                        <View style={[t.flex, t.flexWrap, t.flexRow, t.justifyBetween, t.itemsCenter, t.bgIndigo200, t.roundedLg, t.m1, t.p6]}>
                            <Text style={[t.flex1, t.fontBold]} >A. Identificaion Document</Text>
                            <Icon as={<Ico name="right-arrowhead" group="universalicons" color="#231e57" />} />
                        </View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback
                        onPress={() =>
                            handleChecklist(memId, 'B')
                        }>
                        <View style={[t.flex, t.flexNoWrap, t.flexRow, t.justifyBetween, t.itemsCenter, t.bgIndigo200, t.roundedLg, t.m1, t.p6]}>
                            <Text style={[t.flex1, t.fontBold]}>B. Financial Personal Documents</Text>
                            <Icon as={<Ico name="right-arrowhead" group="universalicons" color="#231e57" />} />
                        </View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback
                        onPress={() =>
                            handleChecklist(memId, 'C')
                        }>
                        <View style={[t.flex, t.flexNoWrap, t.flexRow, t.justifyBetween, t.itemsCenter, t.bgIndigo200, t.roundedLg, t.m1, t.p6]}>
                            <Text style={[t.flex1, t.fontBold]}>C. Academic Documents</Text>
                            <Icon as={<Ico name="right-arrowhead" group="universalicons" color="#231e57" />} />
                        </View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback
                        onPress={() =>
                            handleChecklist(memId, 'D')
                        }>
                        <View style={[t.flex, t.flexNoWrap, t.flexRow, t.justifyBetween, t.itemsCenter, t.bgIndigo200, t.roundedLg, t.m1, t.p6]}>
                            <Text style={[t.flex1, t.fontBold]}>D. English and Profession Requirements</Text>
                            <Icon as={<Ico name="right-arrowhead" group="universalicons" color="#231e57" />} />
                        </View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback
                        onPress={() =>
                            handleChecklist(memId, 'E')
                        }>
                        <View style={[t.flex, t.flexNoWrap, t.flexRow, t.justifyBetween, t.itemsCenter, t.bgIndigo200, t.roundedLg, t.m1, t.p6]}>
                            <Text style={[t.flex1, t.fontBold]}>E. Training and Certifications</Text>
                            <Icon as={<Ico name="right-arrowhead" group="universalicons" color="#231e57" />} />
                        </View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback
                        onPress={() =>
                            handleChecklist(memId, 'F')
                        }>
                        <View style={[t.flex, t.flexNoWrap, t.flexRow, t.justifyBetween, t.itemsCenter, t.bgIndigo200, t.roundedLg, t.m1, t.p6]}>
                            <Text style={[t.flex1, t.fontBold]}>F. Character Reference</Text>
                            <Icon as={<Ico name="right-arrowhead" group="universalicons" color="#231e57" />} />
                        </View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback
                        onPress={() =>
                            handleChecklist(memId, 'G')
                        }>
                        <View style={[t.flex, t.flexNoWrap, t.flexRow, t.justifyBetween, t.itemsCenter, t.bgIndigo200, t.roundedLg, t.m1, t.p6]}>
                            <Text style={[t.flex1, t.fontBold]}>G. Medical Clearance(Optional)</Text>
                            <Icon as={<Ico name="right-arrowhead" group="universalicons" color="#231e57" />} />
                        </View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback
                        onPress={() =>
                            handleChecklist(memId, 'H')
                        }>
                        <View style={[t.flex, t.flexNoWrap, t.flexRow, t.justifyBetween, t.itemsCenter, t.bgIndigo200, t.roundedLg, t.m1, t.p6]}>
                            <Text style={[t.flex1, t.fontBold]}>H. Travel Arrangements and Insurance</Text>
                            <Icon as={<Ico name="right-arrowhead" group="universalicons" color="#231e57" />} />
                        </View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback
                        onPress={() =>
                            handleChecklist(memId, 'I')
                        }>
                        <View style={[t.flex, t.flexNoWrap, t.flexRow, t.justifyBetween, t.itemsCenter, t.bgIndigo200, t.roundedLg, t.m1, t.p6]}>
                            <Text style={[t.flex1, t.fontBold]}>I. Employement History</Text>
                            <Icon as={<Ico name="right-arrowhead" group="universalicons" color="#231e57" />} />
                        </View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback
                        onPress={() =>
                            handleChecklist(memId, 'J')
                        }>
                        <View style={[t.flex, t.flexNoWrap, t.flexRow, t.justifyBetween, t.itemsCenter, t.bgIndigo200, t.roundedLg, t.m1, t.p6]}>
                            <Text style={[t.flex1, t.fontBold]}>J. Funds Sponsor’s Documents (optional)</Text>
                            <Icon as={<Ico name="right-arrowhead" group="universalicons" color="#231e57" />} />
                        </View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback
                        onPress={() =>
                            handleChecklist(memId, 'K')
                        }>
                        <View style={[t.flex, t.flexNoWrap, t.flexRow, t.justifyBetween, t.itemsCenter, t.bgIndigo200, t.roundedLg, t.m1, t.p6]}>
                            <Text style={[t.flex1, t.fontBold]}>K. Dependent’s Documents (optional)</Text>
                            <Icon as={<Ico name="right-arrowhead" group="universalicons" color="#231e57" />} />
                        </View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback
                        onPress={() =>
                            handleChecklist(memId, 'L')
                        }>
                        <View style={[t.flex, t.flexNoWrap, t.flexRow, t.justifyBetween, t.itemsCenter, t.bgIndigo200, t.roundedLg, t.m1, t.p6]}>
                            <Text style={[t.flex1, t.fontBold]}>L. Personal Sworn Statements</Text>
                            <Icon as={<Ico name="right-arrowhead" group="universalicons" color="#231e57" />} />
                        </View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback
                        onPress={() =>
                            handleChecklist(memId, 'M')
                        }>
                        <View style={[t.flex, t.flexNoWrap, t.flexRow, t.justifyBetween, t.itemsCenter, t.bgIndigo200, t.roundedLg, t.m1, t.p6]}>
                            <Text style={[t.flex1, t.fontBold]}>M. Affidavit of Support (sponsors/parents)</Text>
                            <Icon as={<Ico name="right-arrowhead" group="universalicons" color="#231e57" />} />
                        </View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback
                        onPress={() =>
                            handleChecklist(memId, 'N')
                        }>
                        <View style={[t.flex, t.flexNoWrap, t.flexRow, t.justifyBetween, t.itemsCenter, t.bgIndigo200, t.roundedLg, t.m1, t.p6]}>
                            <Text style={[t.flex1, t.fontBold]}>N. SCHOOL SPONSOR DOCUMENTS</Text>
                            <Icon as={<Ico name="right-arrowhead" group="universalicons" color="#231e57" />} />
                        </View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback
                        onPress={() =>
                            handleChecklist(memId, 'O')
                        }>
                        <View style={[t.flex, t.flexNoWrap, t.flexRow, t.justifyBetween, t.itemsCenter, t.bgIndigo200, t.roundedLg, t.m1, t.p6]}>
                            <Text style={[t.flex1, t.fontBold]}>O. EMBASSY DOCUMENTS</Text>
                            <Icon as={<Ico name="right-arrowhead" group="universalicons" color="#231e57" />} />
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </ScrollView >
        </SafeAreaView>
    )
}

export default Mdchecklist