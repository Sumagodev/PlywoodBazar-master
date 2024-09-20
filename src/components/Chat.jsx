import { View, Text, ScrollView, Pressable, Image, StyleSheet, TextInput, FlatList, KeyboardAvoidingView } from 'react-native';
import React, { useRef, useState, useEffect } from 'react';
import styles from '../../assets/stylecomponents/Style';
import { Switch } from 'react-native-paper';
import Entypo from 'react-native-vector-icons/Entypo';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Header from '../navigation/customheader/Header';
import { AddTicketMessage, getTicketMessagesbyId } from '../services/UserTicketMessage.service';
import { toastSuccess } from '../utils/toastutill';
import { getDecodedToken } from '../services/User.service';
import moment from 'moment';
export default function Chat(props) {
  const navigation = useNavigation();


  const focused = useIsFocused()


  const [messageArr, setMessageArr] = useState([]);
  const [message, setMessage] = useState("");
  const [ticketObj, setTicketObj] = useState({});
  const [userId, setUserId] = useState("");



  const handleGetUserTickets = async () => {
    try {
      let { data: res } = await getTicketMessagesbyId(props.route.params.data)
      if (res.data) {
        console.log(JSON.stringify(res.data, null, 2), "res.data")
        setMessageArr(res.data.ticketMessageArr)
        setTicketObj(res.data)
      }
    }
    catch (err) {
      errorToast(err)
    }
  }

  const handleGetDecodedToken = async () => {
    let temp = await getDecodedToken()
    console.log(temp)
    setUserId(temp.userId)
  }


  useEffect(() => {
    if (focused) {
      handleGetDecodedToken()
    }
  }, [focused])


  useEffect(() => {
    handleGetUserTickets()
  }, [])


  const commentsEndRef = useRef()
  const commentsContainerRef = useRef()






  const handleAddComment = async () => {
    try {
      if (message == "") {
        toastSuccess("Message is mandatory!!!");
        return
      }

      let obj = {
        message,
        userTicketsId: props.route.params.data,
        userId: userId
      }
      let { data: res } = await AddTicketMessage(obj)
      if (res.message) {
        toastSuccess(res.message)
        setMessage("")
        handleGetUserTickets()
      }
    }
    catch (err) {
      toastError(err)
    }
  }

  const renderMessage = ({ item, index }) => {
    return (
      <>
        {
          userId == item.userId ?
            <View style={styles1.flexend} >
              <View style={[styles1.selfuserboxsend,]}>
                <Text style={styles1.chattextmsg}> {item.message}</Text>
              </View>
              <View style={styles1.flexrowclass}>
                <Text style={[styles1.time,]}>{moment(item.createdAt).format("LLL")}</Text>
                {/* <Ionicons size={23} name="checkmark-done" color="#2D9CDB" /> */}
              </View>
            </View>
            :
            <View style={styles1.userchatmessage}>
              <View style={styles1.userchatmessagebox}>
                <Text style={styles1.chatother}>{item.message}</Text>
              </View>
              <Text style={[styles1.time,]}>{moment(item.createdAt).format("LLL")}</Text>
              {/* <Text style={styles1.chatsendtime}>2:55 PM</Text> */}
            </View>
        }
      </>
    )
  }

  return (
    <ScrollView
      ref={commentsEndRef}
      onContentSizeChange={() => commentsEndRef.current.scrollToEnd({ animated: true })}
      style={[styles.padinghr, styles.bgwhite]}>
      <KeyboardAvoidingView >

        <FlatList
          data={messageArr}
          scrollEnabled={false}

          ListHeaderComponent={
            <>
              <Header normal={true} screenName={'Chat'} rootProps={props} />
              <View style={[styles1.chatheader, { paddingBottom: 20 }]}>
                <View style={{ display: 'flex', flexDirection: 'row', gap: 5 }}>
                  <Image source={require('../../assets/img/help1.png')} style={{ width: wp(8), height: hp(4) }} />
                  <View>
                    <Text style={styles1.nameuser}>{ticketObj?.name}</Text>
                  </View>
                </View>
              </View>
            </>
          }
          renderItem={renderMessage}
          keyExtractor={(item, index) => index}
          contentContainerStyle={[styles1.chatbody, styles1.mttop, { display: 'flex', paddingBottom: 20, minHeight: hp(90) }]}
        />
        <View style={[styles1.rowflex, styles1.bottomtyper]}>
          <View style={styles1.typersect}>
            <TextInput onChangeText={(e) => setMessage(e)} placeholder="Please enter your message" value={message} style={styles1.inputsection} />
            <Pressable onPress={() => handleAddComment()}>
              <MaterialIcons name='send' size={29} color='#004852' />
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}
const styles1 = StyleSheet.create({
  inputsection: {
    flex: 2
  },
  micsect: {
    width: wp(13),
    backgroundColor: '#F7E9C9',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 10,

  },
  typersect: {
    width: wp(95),
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 1,
    justifyContent: 'space-between',

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.00,

    elevation: 1,

  },
  bottomtyper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#fff',
    // position: "absolute", bottom: 0
  },
  flexend: {
    alignItems: 'flex-end'
  },
  chatother: {
    color: '#F5F6FA',
    fontFamily: 'Manrope-Regular',
    paddingVertical: 8,
    padding: 10,
  },
  time: {
    color: '#a7a7a7',
    marginRight: 6
  },
  flexrowclass: {
    display: 'flex', flexDirection: 'row', alignItems: 'center', marginRight: 1
  },

  selfuserboxsend: {
    backgroundColor: '#eeeeee',
    width: wp(65),
    padding: 10,
    paddingVertical: 15,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15
  },
  chatusername: {
    fontSize: 21,
    color: '#000',
    fontWeight: '600',
  },
  userchatmessage: {
    alignItems: 'flex-start',
  },
  userchatmessagebox: {
    backgroundColor: '#B08218',
    borderBottomRightRadius: 15,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    padding: 5,
    color: '#fff',
    width: wp(65),
  },
  chattextmsg: {
    fontSize: 14,
    color: '#000',
    fontWeight: '400',
    lineHeight: 20,
  },
  chatsendtime: {
    marginLeft: 10,
    marginTop: 10,
  },

  flexstart: {
    alignItems: 'flex-start',
  },
  flexend: {
    alignItems: 'flex-end',
  },
  dflex: {
    display: 'flex',
  },
  online: {
    color: '#616161',
    fontFamily: 'Manrope-Regular',
  },
  nameuser: {
    fontSize: 17,
    color: '#000',
    fontFamily: 'Manrope-Bold',
  },
  chatheader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  flexbetween: {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 10,
    justifyContent: 'space-between',
  },
  imgsmall: {
    width: wp(6),
    height: hp(3),
  },
  categry: {
    fontSize: 18,
    color: '#000',
    fontFamily: 'Manrope-Medium',
  },
});
