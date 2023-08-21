import React, { useState, useEffect } from "react"
import {
    View,
    Image,
    KeyboardAvoidingView,
    StatusBar,
    TouchableOpacity,
    Alert,
    SafeAreaView
} from "react-native"
import { t } from "react-native-tailwindcss"
import {
    Input,
    Button,
    Text,
    Icon,
    FormControl,
} from "native-base"
import { useDispatch } from "react-redux"
import MaterialIcons from "react-native-ico-material-design"
import { login } from "../controller/actions/auth"


const Login = ({ navigation }) => {
    const [email, setEmail] = useState()
    const dispatch = useDispatch()
    const [password, setPassword] = useState()
    const [isLoading, setisLoading] = useState(false)
    const [show, setShow] = useState(true)

    
    const handleLogin = (email, password) => {
        setisLoading(false)
        if (email == undefined || password == undefined) {
            return Alert.alert('Login Failed', 'Something went wrong')
        }
        else {
            dispatch(login(email, password))
            .then(()=>navigation.push('Loader'))
        }
    }

    return (
        <SafeAreaView style={[t.flex1, t.justifyCenter, t.alignCenter, t.bgWhite]}>
            <StatusBar backgroundColor='#231e57' />
            <View>
                <KeyboardAvoidingView enabled>
                    <FormControl>
                        <View style={[t.alignCenter]}>
                            <Image source={require('../assets/fil-global-icon.png')} style={[
                                t.objectCenter,
                                t.objectContain,
                                t.wFull]} />
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
                                Login to Fil-Global
                            </Text>
                        </View>
                        <View style={[t.flexRow, t.m2, t.mL8, t.mR8, t.mT12]}>
                            <Input
                                size="md"
                                placeholder=" Email"
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
                        <View style={[t.flexRow, t.mL8, t.mR8]}>
                        </View>
                        <View style={[t.flexRow, t.m2, t.mL8, t.mR8]}>
                            <Input
                                size="md"
                                w={{
                                    base: "100%",
                                    md: "100%",
                                }}
                                InputRightElement={
                                    <Button
                                        variant="outlined"
                                        size="sm" rounded="none" onPress={() => setShow((prev) => !prev)}>
                                        {show ? "Show" : "Hide"}
                                    </Button>
                                }
                                secureTextEntry={show}
                                placeholder=" Password"
                                variant="rounded"
                                onChangeText={(text) => setPassword(text)}
                            />

                        </View>
                    </FormControl>
                    {/* <TouchableOpacity>
                        <Text style={[t.textCenter, t.textBase, t.m6]}>
                            Forgot Password?
                        </Text>
                    </TouchableOpacity> */}
                    {!isLoading ? <Button
                        style={[t.h10, t.alignCenter, t.mL8, t.mR8, t.roundedFull, t.mT4, t.bgIndigo700]}
                        onPress={() =>
                            handleLogin(email, password)
                        }
                    >Login</Button> : <Button
                        isLoading
                        isLoadingText="Submitting"
                        _loading={{
                            bg: "primary.400",
                        }}
                        style={[t.h10, t.alignCenter, t.mL8, t.mR8, t.roundedFull, t.mT4, t.bgIndigo700]}
                    />}

                    <TouchableOpacity
                        onPress={() => navigation.push('Register')}>
                        <Text style={[t.textCenter, t.textBase, t.m6]}>
                            I don't have an account
                        </Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </View>
        </SafeAreaView>
    )
}
export default Login