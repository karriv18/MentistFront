import { Icon } from "native-base"
import React from "react"
import { View, TouchableOpacity,Text, Image } from "react-native"
import {t} from 'react-native-tailwindcss'
import MaterialIcons from "react-native-ico-material-design"


const NavigationDrawerHeader = (props) => {
    const toggleDrawer = () => {
        props.navigationProps.toggleDrawer()
    }
    return (
        <View style={[t.flexRow,t.m2]}>
            <TouchableOpacity
            onPress={() => toggleDrawer()}>
                 <Icon as={<MaterialIcons name="menu-button" color="white" />} size={6} mr="2"/>
            </TouchableOpacity>
        </View>
    )
}

export default NavigationDrawerHeader