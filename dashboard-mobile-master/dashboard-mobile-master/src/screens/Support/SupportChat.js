import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  FlatList,
  ActivityIndicator
} from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'
import { t } from 'react-native-tailwindcss'
import { GiftedChat } from 'react-native-gifted-chat'
import { useDispatch, useSelector } from 'react-redux'
import Icon from 'react-native-ico'
import { Button, Input } from 'native-base'
import { launchCamera } from 'react-native-image-picker'
import DocumentPicker from 'react-native-document-picker'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getChat, getMoreChat, sendMsg } from '../../controller/actions/support'


const SupportChat = ({ route }) => {
  const [message, setmessage] = useState()
  const [files, setfiles] = useState()
  const [fileName, setfileName] = useState()
  const dispatch = useDispatch()
  const { id, name, user_id, token } = route.params;

  //bubble state
  const [chats, setchats] = useState()
  const [userId, setuserId] = useState()
  const [memberId, setmemberId] = useState()
  const [page, setpage] = useState(2)
  const { chat } = useSelector(state => state.support)


  const sndMsg = (data, files, token) => {
    if (files) {
      dispatch(sendMsg(data, files, token))
    } else {
      dispatch(sendMsg(data))
    }
  }

  const openDocument = async () => {
    try {
      const results = await DocumentPicker.pick({
        // allowMultiSelection:true,
        type: [DocumentPicker.types.allFiles],
        presentationStyle: 'fullScreen'
      })
      for (const res of results) {
        setfiles(res)
        setfileName(res.name)
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
        throw err
      }
    }
  }

  //message data
  const data = {
    post: message,
    name: name,
    user_id: user_id,
    membership_id: id,
  }

  // Launch Camera 
  const openCamera = async () => {
    const options = {
      mediaType: 'mixed'
    }
    await launchCamera(options, (response) => {
      if (response.didCancel) {
        return null
      } else if (response.assets && response.assets.length !== 0) {
        console.log(response.assets)
        const uri = response.assets[0].uri
        const fileName = response.assets[0].fileName
        const type = response.assets[0].type
        console.log(uri, '+', fileName, '+', type)
        setfileName(fileName)
      }
    })
  }

  //get chat data
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('user')
      if (value) {
        setuserId(JSON.parse(value).id)
        setmemberId(JSON.parse(value).member.id)
      }
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    let abort = new AbortController()
    setchats(chat)
    getData()
    return () => {
      abort.abort()
    }
  }, [chat])

  const fetchMoreClient = () => {
    setpage(page + 1)
    dispatch(getMoreChat(page, memberId))
  }

  //bubble component
  const renderFooter = () => {
    return (
      <View >
        {/* <Skeleton style={[t.roundedLg,t.m4]} h="40"/> */}
        <ActivityIndicator size="large" style={[t.alignCenter, t.justifyCenter]} />
      </View>
    )
  }

  const renderItem = ({ item }) => (
    <View style={[t.m2]}>
      {userId == item.user_id ?
        <>
          <Text style={[t.textCenter]}>
            {item.created_at}
          </Text>
          <Text style={[t.p2, t.textBlack, t.textSm, t.selfEnd]}>
            You
          </Text>
          <View style={[t.p2, t.bgBlue300, t.roundedLg, t.selfEnd]}>
            <Text style={[t.textBlack, t.textBase]}>
              {item.post}
            </Text>
            {/* <Text style={[t.textBlack, t.textBase]}>
                  {item.user_id}
                </Text> */}
            <Text style={[t.textBlack, t.textXs]}>
              {item.time}
            </Text>
          </View>
        </>
        :
        <>
          <View style={[t.selfCenter, t.m2]}>
            <Text>
              {item.created_at}
            </Text>
          </View>
          <Text style={[t.p2, t.textBlack, t.textSm]}>
            {item.name}
          </Text>
          <View style={[t.p2, t.bgGray300, t.roundedLg, t.mL2, t.selfStart]}>
            <Text style={[t.textBlack, t.textBase]}>
              {item.post}
            </Text>
            <Text style={[t.textBlack, t.textXs, t.selfEnd]}>
              {item.time}
            </Text>
          </View>
        </>
      }
    </View>
  )

  return (
    <SafeAreaView style={[t.flex1, t.bgWhite]}>
      <StatusBar backgroundColor='#231e57' />
      <View style={[t.flex1, t.justifyEnd]}>
        <View style={[t.flex1]}>
          <FlatList
            inverted
            data={chats}
            renderItem={renderItem}
            extraData={chats}
            keyExtractor={(item, index) => String(index)}
            onEndReachedThreshold={0.2}
            onEndReached={fetchMoreClient}
            ListFooterComponent={renderFooter} />
        </View>
        {
          fileName ?
            <>
              <View style={[t.m2, t.p6, t.border, t.borderBlack, t.bgGray300, t.roundedLg, t.justifyBetween]}>
                <Icon name="google-drive-file" group="material-design" style={[t.p4, t.selfCenter]} />
                <Text style={[t.textBlack, t.selfCenter]}>
                  {fileName}
                </Text>
              </View>
            </>
            :
            <></>
        }
        <View style={[t.flexRow, t.justifyAround]}>
          <View style={[t.m2, t.selfCenter]}>
            <TouchableOpacity
              onPress={() => openDocument()}>
              <Icon name="add-plus-button" group="material-design" color="blue" />
            </TouchableOpacity>
          </View>
          <View style={[t.m2, t.selfCenter]}>
            <TouchableOpacity onPress={() => openCamera()}>
              <Icon name="camera" group="material-design" color="blue" />
            </TouchableOpacity>
          </View>
          <View style={[t.m2, t.w4_6]}>
            <Input
              style={[t.textBlack]}
              placeholder="Type A Message..."
              size="md"
              variant="rounded"
              onChangeText={(value) => setmessage(value)}
            />
          </View>
          <View style={[t.m2, t.selfCenter]} >
            {/* <Button onPress={() => sndMsg(data, files, token)}>test</Button> */}
            <TouchableOpacity onPress={() => sndMsg(data, files, token)}>
              <View style={[t.roundedFull]}>
                <Icon name="send-button" group="material-design" color="blue" />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/* <Input/> */}
      {/* <View style={[t.m2, t.bottom0, t.absolute, t.w9_12, t.left0]}>
          <Button style={[t.w1_4]}>test</Button>
        </View>
        <View style={[t.m2, t.bottom0, t.absolute, t.w9_12, t.right0]}>
          <Button style={[t.w1_4]}>test</Button>
        </View> */}
    </SafeAreaView>
  )
}

export default SupportChat