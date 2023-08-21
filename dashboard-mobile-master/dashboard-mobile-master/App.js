import React from 'react'
import {
  LogBox,
  PermissionsAndroid,
} from 'react-native'
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack'
import { NavigationContainer, useIsFocused } from '@react-navigation/native'
import 'react-native-gesture-handler'
import { NativeBaseProvider } from 'native-base'
import { Provider } from "react-redux"
import store from './src/controller/store'
import Splashscreen from './src/screens/Splashscreen'
import Login from './src/screens/Login'
import Register from './src/screens/Register'
import Dashboard from './src/screens/Dashboard'
import ProfileFooter from './src/screens/Profile/ProfileFooter'
import PersonalInfo from './src/screens/Profile/PersonalInfo'
import DependentsInfo from './src/screens/Profile/DependentsInfo'
import DepositSlip from './src/screens/uploading/DepositSlip'
import UploadingFooter from './src/screens/uploading/UploadingFooter'
import Mdchecklist from './src/screens/mdchecklist/Mdchecklist'
import Documents from './src/screens/mdchecklist/Documents'
import Ticket from './src/screens/Ticket'
import Followup from './src/screens/Followup'
import Booking from './src/screens/Booking'
import Announcement from './src/screens/Announcement'
import Ads from './src/screens/Ads'
import Payment from './src/screens/Payment'
import SupportChat from './src/screens/Support/SupportChat'
import Webview from './src/screens/Support/Webview'
import Loader from './src/screens/Components/Loader'

const Stack = createStackNavigator()


LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
])


const App = () => {

  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name='Splashscreen'
              component={Splashscreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name='Dashboard'
              component={Dashboard}
              options={{
                headerShown: false,
                title: 'Personal Information',
                gestureEnabled: true,
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
              }}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Register"
              component={Register}
              options={{
                headerShown: false,
                title: 'Personal Information',
                gestureEnabled: true,
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
              }}
            />
             <Stack.Screen
              name="Loader"
              component={Loader}
              options={{
                headerShown: false,
                title: 'Loader',
                gestureEnabled: true,
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
              }}
            />
            <Stack.Screen
              name='ProfileFooter'
              component={ProfileFooter}
              options={{
                headerShown: true,
                headerStyle: {
                  backgroundColor: '#231e57',
                },
                headerTitleStyle: {
                  fontSize: 18,
                  fontFamily: 'Arial',
                },
                headerTintColor: '#ffffff',
                title: 'Personal Information',
                gestureEnabled: true,
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
              }}
            />
            <Stack.Screen
              name='PersonalInfo'
              component={PersonalInfo}
              options={{
                headerShown: true,
                title: 'Personal Information',
                gestureEnabled: true,
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
              }}
            />
            <Stack.Screen
              name='DependentsInfo'
              component={DependentsInfo}
              options={{
                headerShown: true,
                title: 'Dependents Information',
                gestureEnabled: true,
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
              }}
            />
            <Stack.Screen
              name='UploadingFooter'
              component={UploadingFooter}
              options={{
                headerShown: true,
                headerStyle: {
                  backgroundColor: '#231e57',
                },
                headerTitleStyle: {
                  fontSize: 18,
                  fontFamily: 'Arial',
                },
                headerTintColor: '#ffffff',
                title: 'Uploading/Timelining',
                gestureEnabled: true,
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
              }}
            />
            <Stack.Screen
              name='Mdchecklist'
              component={Mdchecklist}
              options={{
                headerShown: true,
                headerStyle: {
                  backgroundColor: '#231e57',
                },
                headerTitleStyle: {
                  fontSize: 18,
                  fontFamily: 'Arial',
                },
                headerTintColor: '#ffffff',
                title: 'MD Checklist',
                gestureEnabled: true,
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
              }}
            />
            <Stack.Screen
              name='Documents'
              component={Documents}
              options={{
                headerShown: true,
                headerStyle: {
                  backgroundColor: '#231e57',
                },
                headerTitleStyle: {
                  fontSize: 18,
                  fontFamily: 'Arial',
                },
                headerTintColor: '#ffffff',
                title: 'MD Checklist',
                gestureEnabled: true,
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
              }}
            />
            <Stack.Screen
              name='Ticket'
              component={Ticket}
              options={{
                headerShown: true,
                headerStyle: {
                  backgroundColor: '#231e57',
                },
                headerTitleStyle: {
                  fontSize: 18,
                  fontFamily: 'Arial',
                },
                headerTintColor: '#ffffff',
                title: 'Ticket',
                gestureEnabled: true,
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
              }}
            />
            <Stack.Screen
              name='Followup'
              component={Followup}
              options={{
                headerShown: true,
                headerStyle: {
                  backgroundColor: '#231e57',
                },
                headerTitleStyle: {
                  fontSize: 18,
                  fontFamily: 'Arial',
                },
                headerTintColor: '#ffffff',
                title: 'Follow Up',
                gestureEnabled: true,
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
              }}
            />
            <Stack.Screen
              name='Booking'
              component={Booking}
              options={{
                headerShown: true,
                headerStyle: {
                  backgroundColor: '#231e57',
                },
                headerTitleStyle: {
                  fontSize: 18,
                  fontFamily: 'Arial',
                },
                headerTintColor: '#ffffff',
                title: 'Book Appointment',
                gestureEnabled: true,
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
              }}
            />
            <Stack.Screen
              name='Annoucement'
              component={Announcement}
              options={{
                headerShown: true,
                headerStyle: {
                  backgroundColor: '#231e57',
                },
                headerTitleStyle: {
                  fontSize: 18,
                  fontFamily: 'Arial',
                },
                headerTintColor: '#ffffff',
                title: 'Annoucement',
                gestureEnabled: true,
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
              }}
            />
            <Stack.Screen
              name='Promo'
              component={Ads}
              options={{
                headerShown: true,
                headerStyle: {
                  backgroundColor: '#231e57',
                },
                headerTitleStyle: {
                  fontSize: 18,
                  fontFamily: 'Arial',
                },
                headerTintColor: '#ffffff',
                title: 'Promo',
                gestureEnabled: true,
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
              }}
            />
             <Stack.Screen
              name='Payment'
              component={Payment}
              options={{
                headerShown: true,
                headerStyle: {
                  backgroundColor: '#231e57',
                },
                headerTitleStyle: {
                  fontSize: 18,
                  fontFamily: 'Arial',
                },
                headerTintColor: '#ffffff',
                title: 'Payment Options',
                gestureEnabled: true,
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
              }}
            />
            <Stack.Screen
              name='Webview'
              component={Webview}
              options={{
                headerShown: true,
                headerStyle: {
                  backgroundColor: '#231e57',
                },
                headerTitleStyle: {
                  fontSize: 18,
                  fontFamily: 'Arial',
                },
                headerTintColor: '#ffffff',
                title: 'Support Chat',
                gestureEnabled: true,
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
              }}
            />
            {/* <Stack.Screen
            name='SupportChat'
            component={SupportChat}
            options={{
              headerShown: true,
              headerStyle: {
                backgroundColor: '#231e57',
              },
              headerTitleStyle: {
                fontSize: 18,
                fontFamily: 'Arial',
              },
              headerTintColor: '#ffffff',
              title: 'Support Chat',
              gestureEnabled: true,
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
          /> */}
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </Provider>
  )
}


export default App
