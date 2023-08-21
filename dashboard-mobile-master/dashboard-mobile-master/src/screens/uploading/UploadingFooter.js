import { Icon } from "native-base"
import React, { useEffect } from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Icons from "react-native-ico-material-design"
import DepositSlip from "./DepositSlip"
import Timelining from "./Timelining"
import Preliminary from "./Preliminary"

const Tab = createBottomTabNavigator()
const UploadingFooter = ({ route }) => {
    let status = route.params

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName

                    if (route.name === 'DepositSlip') {
                        iconName = focused
                            ? 'google-drive-file'
                            : 'google-drive-file'
                    }
                    else if (route.name === 'Timelining') {
                        iconName = focused ? 'google-drive-file' : 'google-drive-file'
                    }
                    else if (route.name === 'Preliminary') {
                        iconName = focused ? 'google-drive-file' : 'google-drive-file'
                    }
                    return <Icons name={iconName} size={size} color={color} />
                },
                tabBarShowLabel: false,
                headerShown: false,
                tabBarActiveTintColor: '#136DFF',
                tabBarInactiveTintColor: '#748c95',
            })}>
            {status == 3 ?
                <>
                    <Tab.Screen
                        name="DepositSlip"
                        component={DepositSlip}
                        options={{
                            tabBarShowLabel: true,
                            tabBarLabel: 'Deposit Slips',
                            tabBarLabelStyle: {
                                fontSize: 14,
                            },
                        }} />
                    <Tab.Screen
                        name="Preliminary"
                        component={Preliminary}
                        options={{
                            tabBarShowLabel: true,
                            tabBarLabel: 'Preliminary',
                            tabBarLabelStyle: {
                                fontSize: 14,
                            },
                        }} />
                    <Tab.Screen
                        name="Timelining"
                        component={Timelining}
                        options={{
                            tabBarShowLabel: true,
                            tabBarLabel: 'Timelining',
                            tabBarLabelStyle: {
                                fontSize: 14,
                            },
                        }} />
                </>
                :
                <>
                    <Tab.Screen
                        name="Preliminary"
                        component={Preliminary}
                        options={{
                            tabBarShowLabel: true,
                            tabBarLabel: 'Preliminary',
                            tabBarLabelStyle: {
                                fontSize: 14,
                            },
                        }} />
                </>
            }

        </Tab.Navigator>
    )
}

export default UploadingFooter