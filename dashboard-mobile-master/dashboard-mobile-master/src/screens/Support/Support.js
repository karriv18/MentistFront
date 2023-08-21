import {
    View,
    SafeAreaView,
    PermissionsAndroid,
    LogBox,
    LayoutAnimation,
    Alert
} from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'
import {
    GiftedChat,
    Bubble,
    InputToolbar,
    MessageImage,
    ChatTimeStamp,
    Send
} from 'react-native-gifted-chat'
import { t } from 'react-native-tailwindcss'
import MaterialIcons from 'react-native-ico'
import { IconButton, Icon } from 'native-base'
import DocumentPicker from 'react-native-document-picker'
import { launchCamera } from 'react-native-image-picker'
import AsyncStorage from '@react-native-async-storage/async-storage'
import firestore from '@react-native-firebase/firestore'
import RNFetchBlob from 'rn-fetch-blob'


const Support = () => {
    const [Message, setMessages] = useState([])
    const [Files, setFiles] = useState()
    const [Id, setId] = useState()
    const [Token, setToken] = useState()
    const [ChatId, setChatId] = useState()
    const [Name, setName] = useState()
    const [Hashid, setHashid] = useState()
    const getId = async () => {
        try {
            const value = await AsyncStorage.getItem('user')
            const token = await AsyncStorage.getItem('token')
            setToken(token)
            if (value != null) {
                const hashid = JSON.parse(value).data.user.hashid_2
                setHashid(hashid)
                const name = JSON.parse(value).data.user.name
                setName(name)
                const chatid = JSON.parse(value).data.user.id
                setChatId(chatid)
                const Id = JSON.parse(value).data.user.member.id
                setId(Id)
                return Id != null ? JSON.parse(Id) : null
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getId()
        // getAllMessages
        const messageRef = firestore().collection('Support')
            .doc(JSON.stringify(Id))
            .collection('messages')
            .orderBy('createdAt', "desc")

        const unsubscribe = messageRef.onSnapshot((querySnap) => {
            const allmsg = querySnap.docs.map(docSnap => {
                const data = docSnap.data()
                if (data.createdAt) {
                    return {
                        ...docSnap.data(),
                        createdAt: docSnap.data().createdAt.toDate()
                    }
                }
                else {
                    return {
                        ...docSnap.data(),
                        createdAt: new Date()
                    }
                }
            })
            setMessages(allmsg)
        })
        LogBox.ignoreLogs(['EventEmitter.removeListener']);
        return () => {
            unsubscribe()
        }
    }, [Id])

    const openCamera = async () => {
        const options = {
            mediaType: 'mixed'
        }
        launchCamera(options, (response) => {
            if (response.didCancel) {
                return null
            } else if (response.assets && response.assets.length !== 0) {
                console.log(response.assets)
                const uri = response.assets[0].uri
                const fileName = response.assets[0].fileName
                const type = response.assets[0].type
                console.log(uri, '+', fileName, '+', type)
            }
        })
    }
    //Attachment
    const attachment = async () => {
        try {
            const results = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles],
            })
            for (const res of results) {
                RNFetchBlob.fetch('POST', 'http://192.168.50.197/api/uploadimage', {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + Token,
                },
                    [
                        { name: 'file', filename: res.name, type: res.type, data: RNFetchBlob.wrap(res.uri.replace("file://", "")) },
                        { name: 'name', data: Name },
                        { name: 'hashid_2', data: Hashid },
                        { name: 'id', data: JSON.stringify(ChatId) },
                        { name: 'membership_id', data: JSON.stringify(Id) },
                    ]).uploadProgress((written, total) => {
                        console.log('uploaded', written / total)
                    }).then(response => {
                        setFiles(JSON.parse(response.data).files)
                        Alert.alert('info', 'Copy to clipboard')
                    }).catch(err => {
                        console.log(err)
                    })
            }
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
            } else {
                throw err
            }
        }
    }
    const onSend = (messageArray) => {
        let file_type = ""
        if (Files) file_type = Files
        const msg = messageArray[0]
        console.log(msg)
        const mymsg = {
            ...msg,
            sentBy: Id,
            sentTo: "50",
            createdAt: new Date(),
            image: file_type,
        }
        setMessages(previousMessages => GiftedChat.append(previousMessages, mymsg))
        firestore()
            .collection('Support')
            .doc(JSON.stringify(Id))
            .collection('messages')
            .add({ ...mymsg, createdAt: firestore.FieldValue.serverTimestamp() })
        return setFiles("")
    }

    //gallery
    const gallery = async () => {
        try {
            const results = await DocumentPicker.pick({
                type: [DocumentPicker.types.images],
            })
            for (const res of results) {
                RNFetchBlob.fetch('POST', 'http://192.168.50.197/api/uploadimage', {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + Token,
                },
                    [
                        { name: 'file', filename: res.name, type: res.type, data: RNFetchBlob.wrap(res.uri.replace("file://", "")) },
                        { name: 'name', data: Name },
                        { name: 'hashid_2', data: Hashid },
                        { name: 'id', data: JSON.stringify(ChatId) },
                        { name: 'membership_id', data: JSON.stringify(Id) },
                    ]).uploadProgress((written, total) => {
                        console.log('uploaded', written / total)
                    }).then(response => {
                        setFiles(JSON.parse(response.data).files)
                        Alert.alert('info', 'Copy to clipboard')
                    }).catch(err => {
                        console.log(err.status)
                    })
            }
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
            } else {
                throw err
            }
        }
    }
    const config = {
        duration: 350,
        create: { type: LayoutAnimation.Types.spring, springDamping: 1.0, property: 'opacity' },
        update: { type: LayoutAnimation.Types.spring, springDamping: 1.0, property: 'opacity' },
        delete: { type: 'linear', property: 'opacity' },
    }

    return (
        <SafeAreaView style={[t.flex1, t.bgGray400]} >
            <GiftedChat
                placeholder='Type a message...'
                messages={Message}
                onSend={text => onSend(text)}
                user={{
                    _id: JSON.stringify(Id),
                }}
                renderMessageImage={(props) => {
                    return (<MessageImage {...props}
                    />
                    )
                }}
                renderBubble={(props) => {
                    LayoutAnimation.configureNext(config)
                    return (
                        <Bubble {...props}
                            wrapperStyle={{
                                right: {
                                    backgroundColor: "#231e57",
                                }
                            }}
                        />
                    )
                }}
                renderInputToolbar={(props) => {
                    return (<InputToolbar {...props}
                        containerStyle={[
                            t.flex,
                            t.bgWhite,
                        ]}
                        textInputStyle={[t.textBlack, t.textAuto]}
                    />
                    )
                }}
                keyboardShouldPersistTaps={'never'}
                // renderSend={(props) => {
                //     return (
                //         <Send {...props}
                //             containerStyle={[t.mR4]}>
                //             <View style={[t.roundedFull, t.p2, t.bgIndigo700]}>
                //                 <Icon as={<MaterialIcons name="send-button" as="material-design" color="white" />} />
                //             </View>
                //         </Send>
                //     )
                // }}
                alwaysShowSend={true}
                maxComposerHeight={60}


            />
            <View style={[t.flexRow, t.bgWhite, t.justifyStart]}>
                <IconButton _icon={{ as: MaterialIcons, name: "photo-album", group: "material-design" }}
                    size="lg"
                    colorScheme='indigo'
                    onPress={() => gallery()}
                />
                {/* <IconButton _icon={{ as: MaterialIcons, name: "photo-camera", group: "ui-interface" }}
                    size="lg"
                    colorScheme='indigo'
                    onPress={() => openCamera()}
                /> */}
                <IconButton _icon={{ as: MaterialIcons, name: "clip", group: "ui-interface" }}
                    size="lg"
                    colorScheme='indigo'
                    onPress={() => attachment()}
                />
            </View>
        </SafeAreaView>
    )
}

export default Support