import React, { useState, useEffect } from "react"
import 'react-native-gesture-handler'
import { PermissionsAndroid } from 'react-native'
import { createDrawerNavigator } from "@react-navigation/drawer"
import SideBarMenu from "./SideBarMenu"
import NavigationDrawerHeader from "./NavigationDrawerHeader"
import Icon from 'react-native-ico'
import { createNativeStackNavigator } from "@react-navigation/stack"
import Profile from "../screens/Profile/Profile"
import DependentsInfo from "../screens/Profile/DependentsInfo"
import Educational from "../screens/Profile/Educational"
import Information from "../screens/Profile/Information"
import DepositSlip from "../screens/uploading/DepositSlip"
import Timelining from "../screens/uploading/Timelining"
import Ticket from "../screens/Ticket"
import Followup from "../screens/Followup"
import Booking from "../screens/Booking"
import Announcement from "../screens/Announcement"
import Ads from "../screens/Ads"
import AsyncStorage from "@react-native-async-storage/async-storage"
import callApi from "../../helpers/callApi"
import Member from "../screens/VipForm/Member"
import Address from "../screens/VipForm/Address"
import Educationalbg from "../screens/VipForm/Educationalbg"
import Financialreq from "../screens/VipForm/Financialreq"
import Loader from "../components/Loader"
import Support from "../screens/Support/Support"
import Mdchecklist from "../screens/mdchecklist/Mdchecklist"
import Documents from "../screens/mdchecklist/Documents"

const Stack = createNativeStackNavigator()
const Drawer = createDrawerNavigator()


const ProfileStack = ({ navigation }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerHeader navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: '#231e57',
        },
        headerTintColor: '#ffffff',
        headerTitleStyle: {
          fontSize: 18,
          fontFamily: 'Arial',
        },
      }}
    >
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          title: "Profile Informations"
        }}
      />
    </Stack.Navigator>
  )
}

const DependentsInfoStack = ({ navigation }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerHeader navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: '#231e57',
        },
        headerTintColor: '#ffffff',
        headerTitleStyle: {
          fontSize: 18,
          fontFamily: 'Arial',
        },
      }}
    >
      <Stack.Screen
        name="DependentsInfo"
        component={DependentsInfo}
        options={{
          title: 'Dependents Information',
        }}
      />
    </Stack.Navigator>
  )
}
const EducationalStack = ({ navigation }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerHeader navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: '#231e57',
        },
        headerTintColor: '#ffffff',
        headerTitleStyle: {
          fontSize: 18,
          fontFamily: 'Arial',
        },
      }}
    >
      <Stack.Screen
        name="Educational"
        component={Educational}
        options={{
          title: 'Educational Background',
        }}
      />
    </Stack.Navigator>
  )
}
const InformationStack = ({ navigation }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerHeader navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: '#231e57',
        },
        headerTintColor: '#ffffff',
        headerTitleStyle: {
          fontSize: 18,
          fontFamily: 'Arial',
        },
      }}
    >
      <Stack.Screen
        name="Information"
        component={Information}
        options={{
          title: 'Other Informations',
        }}
      />
    </Stack.Navigator>
  )
}

const DepositStack = ({ navigation }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerHeader navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: '#231e57',
        },
        headerTintColor: '#ffffff',
        headerTitleStyle: {
          fontSize: 18,
          fontFamily: 'Arial',
        },
      }}
    >
      <Stack.Screen
        name="DepositSlip"
        component={DepositSlip}
        options={{
          title: 'Upload Deposit Slips',
        }}
      />
    </Stack.Navigator>
  )
}

const TimeliningStack = ({ navigation }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerHeader navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: '#231e57',
        },
        headerTintColor: '#ffffff',
        headerTitleStyle: {
          fontSize: 18,
          fontFamily: 'Arial',
        },
      }}
    >
      <Stack.Screen
        name="Timelining"
        component={Timelining}
        options={{
          title: 'Timelining',
        }}
      />
    </Stack.Navigator>
  )
}

const TicketStack = ({ navigation }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerHeader navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: '#231e57',
        },
        headerTintColor: '#ffffff',
        headerTitleStyle: {
          fontSize: 18,
          fontFamily: 'Arial',
        },
      }}
    >
      <Stack.Screen
        name="Ticket"
        component={Ticket}
        options={{
          title: 'Ticket',
        }}
      />
    </Stack.Navigator>
  )
}

const FollowupStack = ({ navigation }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerHeader navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: '#231e57',
        },
        headerTintColor: '#ffffff',
        headerTitleStyle: {
          fontSize: 18,
          fontFamily: 'Arial',
        },
      }}
    >
      <Stack.Screen
        name="Followup"
        component={Followup}
        options={{
          title: 'Follow Up',
        }}
      />
    </Stack.Navigator>
  )
}

const BookingStack = ({ navigation }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerHeader navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: '#231e57',
        },
        headerTintColor: '#ffffff',
        headerTitleStyle: {
          fontSize: 18,
          fontFamily: 'Arial',
        },
      }}
    >
      <Stack.Screen
        name="Booking"
        component={Booking}
        options={{
          title: 'Booking Appointment',
        }}

      />
    </Stack.Navigator>
  )
}

const AnnouncementStack = ({ navigation }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerHeader navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: '#231e57',
        },
        headerTintColor: '#ffffff',
        headerTitleStyle: {
          fontSize: 18,
          fontFamily: 'Arial',
        },
      }}
    >
      <Stack.Screen
        name="Announcement"
        component={Announcement}
        options={{
          title: 'Announcement',
        }}
      />
    </Stack.Navigator>
  )
}

const AdsStack = ({ navigation }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerHeader navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: '#231e57',
        },
        headerTintColor: '#ffffff',
        headerTitleStyle: {
          fontSize: 18,
          fontFamily: 'Arial',
        },
      }}
    >
      <Stack.Screen
        name="Ads"
        component={Ads}
        options={{
          title: 'Promo',
        }}
      />
    </Stack.Navigator>
  )
}

const SupportChatStack = ({ navigation }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerHeader navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: '#231e57',
        },
        headerTintColor: '#ffffff',
        headerTitleStyle: {
          fontSize: 18,
          fontFamily: 'Arial',
        },
      }}
    >
      <Stack.Screen
        name="SupportChat"
        component={Support}
        options={{
          title: 'Support Chat',
        }}
      />

    </Stack.Navigator>
  )
}

// const SupportStack = ({ navigation }) => {
//   return (
//     <Stack.Navigator
//       screenOptions={{
//         headerLeft: () => (
//           <NavigationDrawerHeader navigationProps={navigation} />
//         ),
//         headerStyle: {
//           backgroundColor: '#231e57',
//         },
//         headerTintColor: '#ffffff',
//         headerTitleStyle: {
//           fontSize: 18,
//           fontFamily: 'Arial',
//         },
//       }}
//     >
//       <Stack.Screen
//         name="SupportChat"
//         component={Webview}
//         options={{
//           title: 'Support Chat',
//         }}
//       />

//     </Stack.Navigator>
//   )
// }

const MdchecklistStack = ({ navigation }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerHeader navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: '#231e57',
        },
        headerTintColor: '#ffffff',
        headerTitleStyle: {
          fontSize: 18,
          fontFamily: 'Arial',
        },
      }}
    >
      <Stack.Screen
        name="MDChecklist"
        component={Mdchecklist}
        options={{
          title: 'MD Checklist',
        }}
      />
      <Stack.Screen
        name="Documents"
        component={Documents}
        options={{
          title: '',
        }}
      />

    </Stack.Navigator>
  )
}

const VipStack = ({ navigation }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerHeader navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: '#231e57',
        },
        headerTintColor: '#ffffff',
        headerTitleStyle: {
          fontSize: 18,
          fontFamily: 'Arial',
        },
      }}
    >
      <Stack.Screen
        name="Member"
        component={Member}
        options={{
          title: '',
        }}
      />
      <Stack.Screen
        name="Address"
        component={Address}
        options={{
          title: '',
        }}
      />
      <Stack.Screen
        name="Educationalbg"
        component={Educationalbg}
        options={{
          title: '',
        }}
      />
      <Stack.Screen
        name="Financialreq"
        component={Financialreq}
        options={{
          title: '',
        }}
      />

    </Stack.Navigator>
  )
}
const DrawerNavigation = () => {
  const [Status, setStatus] = useState()
  const [Email, setEmail] = useState()
  const [isLoading, setisLoading] = useState(true)
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('user')
      if (value != null) {
        const userEmail = JSON.parse(value).data.user.email
        setEmail(userEmail)
      }
    } catch (e) {
    }
  }

  const getMember = async (email) => {
    try {
      const res = await callApi('get', '/information?email=' + email)
      if (res.status == 200) {
        setisLoading(false)
        if (res.data != null) {
          setStatus(res.data.data.status)
          setisLoading(false)
        }
      }
    }
    catch (err) {
      console.log(err)
    }
  }
  const getPermissions = async () => {
    if (Platform.OS === 'android') {
      let granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      ])
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.CAMERA,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        ])
      }
    }
  }

  useEffect(() => {
    let abortcontroller = new AbortController()
    getPermissions()
    getData()
    getMember(Email)
    return () => {
      abortcontroller.abort()
    }
  }, [Email])

  return (
    <Drawer.Navigator
      screenOptions={{ headerShown: false }}
      drawerContent={SideBarMenu}
    >
      {isLoading ?
        <Stack.Screen
          name="Loader"
          component={Loader}
        /> :
        <>
          {Status == 7 ?
            <>
              <Drawer.Screen
                name='Personal Information'
                component={ProfileStack}
                options={{
                  drawerActiveTintColor: '#fff',
                  drawerInactiveTintColor: '#fff',
                  drawerIcon: () => (
                    <Icon name="user-shape" size={25} color={'white'} />
                  ),
                }} />

              <Drawer.Screen
                name='Dependents Information'
                component={DependentsInfoStack}
                options={{
                  drawerActiveTintColor: '#fff',
                  drawerInactiveTintColor: '#fff',
                  drawerIcon: () => (
                    <Icon name='create-group-button' size={25} color={'white'} />
                  ),
                }} />

              <Drawer.Screen
                name='Educational Background'
                component={EducationalStack}
                options={{
                  drawerActiveTintColor: '#fff',
                  drawerInactiveTintColor: '#fff',
                  drawerIcon: () => (
                    <Icon name='graduate-cap' size={22} color={'white'} />
                  ),
                }} />

              <Drawer.Screen
                name='Other Information'
                component={InformationStack}
                options={{
                  drawerActiveTintColor: '#fff',
                  drawerInactiveTintColor: '#fff',
                  drawerIcon: () => (
                    <Icon name='rounded-info-button' size={22} color={'white'} />
                  ),
                }} />

              <Drawer.Screen
                name='Upload Deposit Slip'
                component={DepositStack}
                options={{
                  drawerActiveTintColor: '#fff',
                  drawerInactiveTintColor: '#fff',
                  drawerIcon: () => (
                    <Icon name='upload-button' size={22} color={'white'} />
                  ),
                }} />

              <Drawer.Screen
                name='Ticket'
                component={TicketStack}
                options={{
                  drawerActiveTintColor: '#fff',
                  drawerInactiveTintColor: '#fff',
                  drawerIcon: () => (
                    <Icon name='add-button-inside-black-circle' size={22} color={'white'} />
                  ),
                }} />

              <Drawer.Screen
                name='Announcements'
                component={AnnouncementStack}
                options={{
                  drawerActiveTintColor: '#fff',
                  drawerInactiveTintColor: '#fff',
                  drawerIcon: () => (
                    <Icon name='notifications-button' size={22} color={'white'} />
                  ),
                }} />

              <Drawer.Screen
                name='Promo'
                component={AdsStack}
                options={{
                  drawerActiveTintColor: '#fff',
                  drawerInactiveTintColor: '#fff',
                  drawerIcon: () => (
                    <Icon name='round-info-button' size={22} color={'white'} />
                  ),
                }} />

            </>
            : Status == 2 ?
              <>
                <Drawer.Screen
                  name='Personal Information'
                  component={ProfileStack}
                  options={{
                    drawerActiveTintColor: '#fff',
                    drawerInactiveTintColor: '#fff',
                    drawerIcon: () => (
                      <Icon name="user-shape" size={25} color={'white'} />
                    ),
                  }} />

                <Drawer.Screen
                  name='Support Chat'
                  component={SupportChatStack}
                  options={{
                    drawerActiveTintColor: '#fff',
                    drawerInactiveTintColor: '#fff',
                    drawerIcon: () => (
                      <Icon name="message-black-speech-bubble-of-rectangular-shape" group="coolicons" size={25} color={'white'} />
                    ),
                  }} />

                <Drawer.Screen
                  name='Dependents Information'
                  component={DependentsInfoStack}
                  options={{
                    drawerActiveTintColor: '#fff',
                    drawerInactiveTintColor: '#fff',
                    drawerIcon: () => (
                      <Icon name='create-group-button' size={25} color={'white'} />
                    ),
                  }} />

                <Drawer.Screen
                  name='Educational Background'
                  component={EducationalStack}
                  options={{
                    drawerActiveTintColor: '#fff',
                    drawerInactiveTintColor: '#fff',
                    drawerIcon: () => (
                      <Icon name='graduate-cap' size={22} color={'white'} />
                    ),
                  }} />

                <Drawer.Screen
                  name='Other Information'
                  component={InformationStack}
                  options={{
                    drawerActiveTintColor: '#fff',
                    drawerInactiveTintColor: '#fff',
                    drawerIcon: () => (
                      <Icon name='rounded-info-button' size={22} color={'white'} />
                    ),
                  }} />

                <Drawer.Screen
                  name='Upload Deposit Slip'
                  component={DepositStack}
                  options={{
                    drawerActiveTintColor: '#fff',
                    drawerInactiveTintColor: '#fff',
                    drawerIcon: () => (
                      <Icon name='upload-button' size={22} color={'white'} />
                    ),
                  }} />

                <Drawer.Screen
                  name='Ticket'
                  component={TicketStack}
                  options={{
                    drawerActiveTintColor: '#fff',
                    drawerInactiveTintColor: '#fff',
                    drawerIcon: () => (
                      <Icon name='add-button-inside-black-circle' size={22} color={'white'} />
                    ),
                  }} />

                <Drawer.Screen
                  name='Book Appointment'
                  component={BookingStack}
                  options={{
                    drawerActiveTintColor: '#fff',
                    drawerInactiveTintColor: '#fff',
                    drawerIcon: () => (
                      <Icon name='bookmark-button-1' size={22} color={'white'} />
                    ),
                  }} />

                <Drawer.Screen
                  name='Announcements'
                  component={AnnouncementStack}
                  options={{
                    drawerActiveTintColor: '#fff',
                    drawerInactiveTintColor: '#fff',
                    drawerIcon: () => (
                      <Icon name='notifications-button' size={22} color={'white'} />
                    ),
                  }} />

                <Drawer.Screen
                  name='Promo'
                  component={AdsStack}
                  options={{
                    drawerActiveTintColor: '#fff',
                    drawerInactiveTintColor: '#fff',
                    drawerIcon: () => (
                      <Icon name='round-info-button' size={22} color={'white'} />
                    ),
                  }} />
              </>
              : Status == 3 ?
                <>
                  <Drawer.Screen
                    name='Personal Information'
                    component={ProfileStack}
                    options={{
                      drawerActiveTintColor: '#fff',
                      drawerInactiveTintColor: '#fff',
                      drawerIcon: () => (
                        <Icon name="user-shape" size={25} color={'white'} />
                      ),
                    }} />

                  <Drawer.Screen
                    name='Support Chat'
                    component={SupportChatStack}
                    options={{
                      drawerActiveTintColor: '#fff',
                      drawerInactiveTintColor: '#fff',
                      drawerIcon: () => (
                        <Icon name="message-black-speech-bubble-of-rectangular-shape" group="coolicons" size={25} color={'white'} />
                      ),
                    }} />

                  <Drawer.Screen
                    name='Dependents Information'
                    component={DependentsInfoStack}
                    options={{
                      drawerActiveTintColor: '#fff',
                      drawerInactiveTintColor: '#fff',
                      drawerIcon: () => (
                        <Icon name='create-group-button' size={25} color={'white'} />
                      ),
                    }} />

                  <Drawer.Screen
                    name='Educational Background'
                    component={EducationalStack}
                    options={{
                      drawerActiveTintColor: '#fff',
                      drawerInactiveTintColor: '#fff',
                      drawerIcon: () => (
                        <Icon name='graduate-cap' size={22} color={'white'} />
                      ),
                    }} />

                  <Drawer.Screen
                    name='Other Information'
                    component={InformationStack}
                    options={{
                      drawerActiveTintColor: '#fff',
                      drawerInactiveTintColor: '#fff',
                      drawerIcon: () => (
                        <Icon name='rounded-info-button' size={22} color={'white'} />
                      ),
                    }} />

                  <Drawer.Screen
                    name='Upload Deposit Slip'
                    component={DepositStack}
                    options={{
                      drawerActiveTintColor: '#fff',
                      drawerInactiveTintColor: '#fff',
                      drawerIcon: () => (
                        <Icon name='upload-button' size={22} color={'white'} />
                      ),
                    }} />

                  <Drawer.Screen
                    name='Timelining Page'
                    component={TimeliningStack}
                    options={{
                      drawerActiveTintColor: '#fff',
                      drawerInactiveTintColor: '#fff',
                      drawerIcon: () => (
                        <Icon name='upload-button' size={22} color={'white'} />
                      ),
                    }} />

                  <Drawer.Screen
                    name='MD Checklist'
                    component={MdchecklistStack}
                    options={{
                      drawerActiveTintColor: '#fff',
                      drawerInactiveTintColor: '#fff',
                      drawerIcon: () => (
                        <Icon name="file" group="font-awesome" size={22} color={'white'} />
                      ),
                    }} />

                  <Drawer.Screen
                    name='Ticket'
                    component={TicketStack}
                    options={{
                      drawerActiveTintColor: '#fff',
                      drawerInactiveTintColor: '#fff',
                      drawerIcon: () => (
                        <Icon name='add-button-inside-black-circle' size={22} color={'white'} />
                      ),
                    }} />
                  <Drawer.Screen
                    name='Follow Up'
                    component={FollowupStack}
                    options={{
                      drawerActiveTintColor: '#fff',
                      drawerInactiveTintColor: '#fff',
                      drawerIcon: () => (
                        <Icon name='add-to-queue-button' size={22} color={'white'} />
                      ),
                    }} />
                  <Drawer.Screen
                    name='Book Appointment'
                    component={BookingStack}
                    options={{
                      drawerActiveTintColor: '#fff',
                      drawerInactiveTintColor: '#fff',
                      drawerIcon: () => (
                        <Icon name='bookmark-button-1' size={22} color={'white'} />
                      ),
                    }} />
                  <Drawer.Screen
                    name='Announcements'
                    component={AnnouncementStack}
                    options={{
                      drawerActiveTintColor: '#fff',
                      drawerInactiveTintColor: '#fff',
                      drawerIcon: () => (
                        <Icon name='notifications-button' size={22} color={'white'} />
                      ),
                    }} />
                  <Drawer.Screen
                    name='Promo'
                    component={AdsStack}
                    options={{
                      drawerActiveTintColor: '#fff',
                      drawerInactiveTintColor: '#fff',
                      drawerIcon: () => (
                        <Icon name='round-info-button' size={22} color={'white'} />
                      ),
                    }} />
                </>
                : Status == undefined ?
                  <>
                    <Drawer.Screen
                      name='Membership Form'
                      component={VipStack}
                      options={{
                        drawerActiveTintColor: '#fff',
                        drawerInactiveTintColor: '#fff',
                        drawerIcon: () => (
                          <Icon name="file" group="essential" size={22} color={'white'} />
                        ),
                      }} />
                  </>
                  :
                  <>
                    <Drawer.Screen
                      name='Personal Information'
                      component={ProfileStack}
                      options={{
                        drawerActiveTintColor: '#fff',
                        drawerInactiveTintColor: '#fff',
                        drawerIcon: () => (
                          <Icon name="user-shape" size={25} color={'white'} />
                        ),
                      }} />

                    <Drawer.Screen
                      name='Dependents Information'
                      component={DependentsInfoStack}
                      options={{
                        drawerActiveTintColor: '#fff',
                        drawerInactiveTintColor: '#fff',
                        drawerIcon: () => (
                          <Icon name='create-group-button' size={25} color={'white'} />
                        ),
                      }} />

                    <Drawer.Screen
                      name='Educational Background'
                      component={EducationalStack}
                      options={{
                        drawerActiveTintColor: '#fff',
                        drawerInactiveTintColor: '#fff',
                        drawerIcon: () => (
                          <Icon name='graduate-cap' size={22} color={'white'} />
                        ),
                      }} />

                    <Drawer.Screen
                      name='Other Information'
                      component={InformationStack}
                      options={{
                        drawerActiveTintColor: '#fff',
                        drawerInactiveTintColor: '#fff',
                        drawerIcon: () => (
                          <Icon name='rounded-info-button' size={22} color={'white'} />
                        ),
                      }} />

                    <Drawer.Screen
                      name='Upload Deposit Slip'
                      component={DepositStack}
                      options={{
                        drawerActiveTintColor: '#fff',
                        drawerInactiveTintColor: '#fff',
                        drawerIcon: () => (
                          <Icon name='upload-button' size={22} color={'white'} />
                        ),
                      }} />

                    <Drawer.Screen
                      name='Ticket'
                      component={TicketStack}
                      options={{
                        drawerActiveTintColor: '#fff',
                        drawerInactiveTintColor: '#fff',
                        drawerIcon: () => (
                          <Icon name='add-button-inside-black-circle' size={22} color={'white'} />
                        ),
                      }} />

                    <Drawer.Screen
                      name='Book Appointment'
                      component={BookingStack}
                      options={{
                        drawerActiveTintColor: '#fff',
                        drawerInactiveTintColor: '#fff',
                        drawerIcon: () => (
                          <Icon name='bookmark-button-1' size={22} color={'white'} />
                        ),
                      }} />

                    <Drawer.Screen
                      name='Announcements'
                      component={AnnouncementStack}
                      options={{
                        drawerActiveTintColor: '#fff',
                        drawerInactiveTintColor: '#fff',
                        drawerIcon: () => (
                          <Icon name='notifications-button' size={22} color={'white'} />
                        ),
                      }} />

                    <Drawer.Screen
                      name='Promo'
                      component={AdsStack}
                      options={{
                        drawerActiveTintColor: '#fff',
                        drawerInactiveTintColor: '#fff',
                        drawerIcon: () => (
                          <Icon name='round-info-button' size={22} color={'white'} />
                        ),
                      }} />
                  </>
          }
        </>
      }
    </Drawer.Navigator>
  )
}
export default DrawerNavigation