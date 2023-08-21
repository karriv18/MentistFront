import React, { useState } from "react"
import {
    View,
    Image,
    KeyboardAvoidingView,
    StatusBar,
    TouchableOpacity,
    SafeAreaView,
    Alert
} from "react-native"
import { t } from "react-native-tailwindcss"
import {
    Input,
    Button,
    Text,
    Icon,
} from "native-base"
import { useDispatch, useSelector } from "react-redux"
import MaterialIcons from "react-native-ico"
import { register } from "../controller/actions/auth"



const Register = ({ navigation }) => {
    const [email, setEmail] = useState()
    const dispatch = useDispatch()
    const [password, setPassword] = useState()
    const [name, setName] = useState()
    const [Show, setShow] = useState(true)

    const handleRegister = (name, email, password) => {
        if (email == undefined || password == undefined || name == undefined) {
            return Alert.alert('Login Failed', 'Something went wrong')
        }
        else {
            dispatch(register(name, email, password))
        }
    }

    return (
        <SafeAreaView style={[t.flex1, t.justifyCenter, t.alignCenter, t.bgWhite]}>
            <StatusBar backgroundColor='#231e57' />
            <View>
                <KeyboardAvoidingView enabled>
                    <View style={[t.alignCenter]}>
                        <Image source={require('../assets/fil-global-icon.png')} style={[
                            t.objectCenter,
                            t.objectContain,
                            t.wFull,
                            t.m30]} />
                    </View>
                    <View style={[t.alignCenter, t.mT5]}>
                        <Text style={[
                            t.textBlack,
                            t.textCenter,
                            t.textXl,
                            t.fontSans,
                            t.fontExtrabold,
                            t.textBlue900
                        ]}>
                            Create an account to Fil-Global
                        </Text>
                    </View>
                    <View style={[t.flexRow, t.m2, t.mL8, t.mR8, t.mT12]}>
                        <Input
                            size="md"
                            placeholder="Name"
                            variant="rounded"
                            w={{
                                base: "100%",
                                md: "100%",
                            }}
                            InputRightElement={
                                <Icon as={<MaterialIcons name="name" group="basic" />} size={5} mr="2" color="muted.400" />
                            }
                            onChangeText={(text) => setName(text)}
                        />
                    </View>
                    <View style={[t.flexRow, t.m2, t.mL8, t.mR8]}>
                        <Input
                            size="md"
                            placeholder="Email"
                            variant="rounded"
                            w={{
                                base: "100%",
                                md: "100%",
                            }}
                            InputRightElement={
                                <Icon as={<MaterialIcons name="black-envelope-email-symbol" />} size={5} mr="2" color="muted.400" />
                            }
                            onChangeText={(text) => setEmail(text)}
                        />
                    </View>
                    <View style={[t.flexRow, t.m2, t.mL8, t.mR8]}>
                        <Input
                            size="md"
                            w={{
                                base: "100%",
                                md: "100%",
                            }}
                            InputRightElement={

                                <Button size="sm"
                                    variant="outlined"
                                    rounded="none" onPress={() => setShow((prev) => !prev)}>
                                    {Show ? "Show" : "Hide"}
                                </Button>
                            }
                            secureTextEntry={Show}
                            placeholder=" Password"
                            variant="rounded"
                            onChangeText={(text) => setPassword(text)}
                        />
                    </View>
                    <Button
                        style={[t.h10, t.alignCenter, t.mL8, t.mR8, t.roundedFull, t.mT2, t.bgIndigo700]}
                        onPress={() => handleRegister(name, email, password)}
                    >Sign Up</Button>
                    <TouchableOpacity
                        onPress={() => navigation.push('Login')}>
                        <Text style={[t.textCenter, t.textBase, t.m6]}>
                            Already have an account?
                        </Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </View>
        </SafeAreaView>
    )
}
export default Register