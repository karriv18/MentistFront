import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { WebView } from 'react-native-webview'
import { t } from 'react-native-tailwindcss'

const Webview = () => {
  return (
    <WebView source={{ uri: 'https://fil-global.com/dashboard' }} />
  )
}

export default Webview