import {
  View,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Alert,
  ScrollView
} from 'react-native'
import MaterialIcons from 'react-native-ico'
import React, { useState, useEffect } from 'react'
import { t } from 'react-native-tailwindcss'
import { Skeleton, Text } from 'native-base'
import { Dropdown } from 'react-native-element-dropdown'
import DocumentPicker from 'react-native-document-picker'
import { useDispatch, useSelector } from 'react-redux'
import { uploadPrelimenary, getMorePreliminary } from '../../controller/actions/uploading'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Preliminary = () => {
  const [isLoading, setisLoading] = useState(true)
  const [type, settype] = useState()
  const [memId, setmemId] = useState()
  const [email, setemail] = useState()
  const [token, settoken] = useState()
  const [file, setfile] = useState()
  const [fileName, setfileName] = useState()
  const [info, setinfo] = useState()
  const dispatch = useDispatch()
  const [page, setpage] = useState(1)
  const { deposit } = useSelector(state => state)


  const openDocument = async () => {
    try {
      const results = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      })
      for (const res of results) {
        setfile(res)
        setfileName(res.name)
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
        throw err
      }
    }
  }

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('user')
      const tokenValue = await AsyncStorage.getItem('token')
      tokenValue ? settoken(tokenValue) : null
      if (value) {
        setmemId(JSON.parse(value).member.id)
        setemail(JSON.parse(value).email)
        setisLoading(false)
      }
    }
    catch (err) {
      console.log(err)
    }
  }

  const handleUpload = (email, type, memId, files, token) => {
    if (!files) {
      Alert.alert('Status', 'File not found!')
    }
    else {
      dispatch(uploadPrelimenary(email, type, memId, files, token))
    }
  }

  const fetchMorePreliminary = () => {
    setpage(page + 1)
    dispatch(getMorePreliminary(page, memId))
  }

  useEffect(() => {
    let abort = new AbortController()
    setTimeout(() => {
      getData()
      setinfo(deposit.preliminary)
      setisLoading(false)
    }, 500)
    return () => {
      abort.abort()
    }
  }, [deposit])


  const items = [{
    value: '1',
    label: 'CV/Resume'
  }, {
    value: '2',
    label: 'Signed Information Pack'
  }, {
    value: '3',
    label: 'Signed Membership Form'
  }, {
    value: '4',
    label: 'College TOR'
  }, {
    value: '5',
    label: 'College Diploma'
  }, {
    value: '6',
    label: 'High School Diploma'
  }, {
    value: '7',
    label: 'High School English Certificate'
  }, {
    value: '8',
    label: 'Passport'
  }, {
    value: '9',
    label: 'Work Cert (If any)'
  }]

  return (
    <SafeAreaView>
      <StatusBar backgroundColor='#231e57' />
      <ScrollView style={[t.bgWhite, t.hFull]}>
        <StatusBar backgroundColor='#231e57' />
        <View style={[t.alignCenter, t.justifyCenter, t.m4]}>
          <View style={[t.m2, t.borderB2, t.borderGray300, t.p2]}>
            <Dropdown
              data={items}
              labelField="label"
              valueField="value"
              label="Dropdown"
              placeholder="Select item"
              value={type}
              onChange={item => {
                settype(item.value)
              }}
            />
          </View>
          <View style={[t.m2]}>
            <TouchableOpacity
              onPress={() => openDocument()}>
              <Text style={[
                t.border,
                t.borderGray500,
                t.textGray500,
                t.borderDashed,
                t.p4,
                t.textBase,
                t.textCenter,
                t.roundedLg,
              ]}>
                {fileName ? fileName : 'Choose File'}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={[t.m2, t.w2_5, t.selfCenter]}>
            <TouchableOpacity
              onPress={() => handleUpload(email, type, memId, file, token)}>
              <View style={[t.p2,
              t.alignCenter,
              t.justifyCenter,
              t.bgBlue500,
              t.roundedLg
              ]}>
                <Text style={[t.textCenter, t.textWhite]}>
                  Upload
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* listview */}
          {isLoading ?
            <>
              <View style={[t.m2]}>
                <Skeleton style={[t.h48]} rounded="md" />
              </View>
              <View style={[t.m2]}>
                <Skeleton style={[t.h48]} rounded="md" />
              </View>
            </>
            :
            <>
              {
                info && Object.values(info).map((val, id) => (
                  <View style={[t.m2, t.flex1]} key={id}>
                    <View style={[t.flex, t.flexWrap, t.flexRow, t.justifyStart, t.bgIndigo900, t.roundedLg, t.pL4]}>
                      <MaterialIcons name="google-drive-file" group="basic" style={[t.selfCenter, t.m2, t.p6]} color="#ffffff" />
                      <View style={[t.flexRow, t.flexCol, t.mL4, t.p2]}>
                        <Text style={[t.fontBold, t.textWhite, t.mB4, t.textBase]}>
                          {val.file_type}
                        </Text>
                        <Text style={[t.fontNormal, t.pB4, t.textWhite]}>
                          Date Uploaded: {val.file_uploaded}
                        </Text>
                        <Text style={[t.fontNormal, t.textWhite]}>
                          Staus: {val.file_status}
                        </Text>
                      </View>
                    </View>
                  </View>
                ))
              }
              <View>
                <TouchableOpacity onPress={() => fetchMorePreliminary()}>
                  <Text style={[
                    t.m2,
                    t.bgWhite,
                    t.shadowMd,
                    t.selfCenter,
                    t.w2_5,
                    t.fontBold,
                    t.borderBlack,
                    t.textCenter,
                    t.textBase,
                    t.roundedFull,
                  ]}>
                    Load More...
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          }

        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Preliminary