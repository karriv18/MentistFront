import { Icon } from "native-base"
import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Dashboard from "../screens/Dashboard"
import MaterialIcons from "react-native-ico-material-design"
import Profile from "../screens/Profile/Profile"



const Tab = createBottomTabNavigator()


const Footer = () => {

    return (
        <Tab.Navigator
        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName
  
              if (route.name === 'ID') {
                iconName = focused
                  ? 'home'
                  : 'home-outline'
              } else if (route.name === 'Profile') {
                iconName = focused ? 'person' : 'person-outline'
              }
              
              return <MaterialIcons name={iconName} size={size} color={color} />
            },
            tabBarShowLabel:false,
            headerShown:false,
            tabBarActiveTintColor: '#136DFF',
            tabBarInactiveTintColor: 'gray',
          })}>
            {/* <Tab.Screen name="ID" component={ID}/> */}
            <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
    )
}
export default Footer