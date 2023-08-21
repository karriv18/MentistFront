import { Icon } from "native-base"
import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Icons from "react-native-ico-material-design"
import PersonalInfo from "./PersonalInfo"
import DependentsInfo from "./DependentsInfo"
import Educational from "./Educational"
import Information from "./Information"

const Tab = createBottomTabNavigator()

const ProfileFooter = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName

                    if (route.name === 'ProfileInformation') {
                        iconName = focused
                            ? 'user-shape'
                            : 'user-shape'
                    }
                    else if (route.name === 'DependentsInformation') {
                        iconName = focused ? 'users-social-symbol' : 'users-social-symbol'
                    }
                    else if (route.name === 'EducationalInformation') {
                        iconName = focused ? 'graduate-cap' : 'graduate-cap'
                    }
                    else if (route.name === 'OtherInformation') {
                        iconName = focused ? 'round-info-button' : 'round-info-button'
                    }

                    return <Icons name={iconName} size={size} color={color} />
                },
                tabBarShowLabel: false,
                headerShown: false,
                tabBarActiveTintColor: '#136DFF',
                tabBarInactiveTintColor: '#748c94',
            })}>
            <Tab.Screen
                name="ProfileInformation"
                component={PersonalInfo}
                options={{
                    tabBarShowLabel: true,
                    tabBarLabel: 'Profile',
                    tabBarLabelStyle: {
                        fontSize: 14,
                    },
                }} />
            <Tab.Screen
                name="DependentsInformation"
                component={DependentsInfo}
                options={{
                    tabBarShowLabel: true,
                    tabBarLabel: 'Dependents',
                    tabBarLabelStyle: {
                        fontSize: 14,
                    }
                }} />
            <Tab.Screen
                name="EducationalInformation"
                component={Educational}
                options={{
                    tabBarShowLabel: true,
                    tabBarLabel: 'Education',
                    tabBarLabelStyle: {
                        fontSize: 14,
                    }
                }} />
            <Tab.Screen
                name="OtherInformation"
                component={Information}
                options={{
                    tabBarShowLabel: true,
                    tabBarLabel: 'Other',
                    tabBarLabelStyle: {
                        fontSize: 14,
                    }
                }} />

        </Tab.Navigator>
    )
}

export default ProfileFooter