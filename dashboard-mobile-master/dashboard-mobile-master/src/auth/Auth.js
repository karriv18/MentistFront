import React from "react"
import { createNativeStackNavigator } from '@react-navigation/stack'
import Splashscreen from '../screens/Splashscreen'
import Login from "../screens/Login"
import Register from "../screens/Register"
import DrawerNavigation from "../navigation/DrawerNavigation"

const Stack = createNativeStackNavigator()

const Auth = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Splashscreen"
                component={Splashscreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Login"
                component={Login}
                options={{ headerShown: false }}
            />
             <Stack.Screen
                name="Register"
                component={Register}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    )
}
export default Auth