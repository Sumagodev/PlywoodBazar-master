import { View, Text, StyleSheet, FlatList, Pressable, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Modal } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { createTicket, getTicketsbyUserId } from '../services/UserTicket.service';
import { getDecodedToken } from '../services/User.service';
import Header from '../navigation/customheader/Header';
import moment from 'moment';
import Entypo from 'react-native-vector-icons/Entypo';
import styles from '../../assets/stylecomponents/Style';
import { toastSuccess, errorToast } from '../utils/toastutill';
import FaqAccordion from '../ReusableComponents/FaqAccordion';
import TicketItem from '../ReusableComponents/TicketItem';
import CustomButtonOld from '../ReusableComponents/CustomButtonOld';
import CustomTextInputField from '../ReusableComponents/CustomTextInputField';
import { Input } from 'react-native-elements';
export default function AllChats(props) {
  const navigation = useNavigation();
  const [ticketsArr, setTicketsArr] = useState([]);
  const [limit, setLimit] = useState(100);
  const [skip, setSkip] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const focused = useIsFocused();
  const [userId, setUserId] = useState('');
  const [message, setMessage] = useState(null);
  const [applyFormModal, setModal] = useState(false);
  const handleGetUserTickets = async (skipValue, limitValue, userIdValue) => {
    try {
      let query = `page=${skipValue}&perPage=${limitValue}&userId=${userIdValue}`;

      let { data: res } = await getTicketsbyUserId(query);
      if (res.data) {
        setTicketsArr(res.data);
      }
    } catch (err) {
      errorToast(err);
    }
  };

  const handleGetDecodedToken = async () => {
    let temp = await getDecodedToken();
    console.log(temp);
    setUserId(temp.userId);
  };

  useEffect(() => {
    if (focused) {
      handleGetDecodedToken();
    }
  }, [focused]);
  useEffect(() => {
    if (focused && userId != '') {
      handleGetUserTickets(skip, limit, userId);
    }
  }, [focused, limit, skip, userId]);

  const handleTicketCreation = async () => {
    try {
      if (`${message}` === '' || !message) {
        errorToast('Please enter a message');
        return 0;
      }
      let decodedObj = await getDecodedToken();
      let obj = {
        userId: decodedObj?.userId,
        name: message,
      };
      let { data: res } = await createTicket(obj);
      if (res.message) {
        toastSuccess(res.message);
        setModal(false)
        // navigate(-1)
      }
    } catch (err) {
      errorToast(err);
    }
  };

  const [expandedAccordion, setExpandedAccordion] = useState(1);

  const toggleAccordion = accordionNumber => {
    if (accordionNumber === expandedAccordion) {
      // If the same accordion is clicked, collapse it
      setExpandedAccordion(null);
    } else {
      // Expand the clicked accordion and collapse the others
      setExpandedAccordion(accordionNumber);
    }
  };

  const renderTicket = ({ item, index }) => {
    return (
      <>
        <Pressable style={internal_styles.TicketContainer} onPress={() => navigation.navigate('Chat', { data: item._id })}>
          <View style={[internal_styles.flexRow, { marginBottom: 15, justifyContent: 'space-between' }]}>
            <Text style={{}}>{item.name}</Text>
            <Pressable onPress={() => navigation.navigate('Chat', { data: item._id })}>
              <Entypo name="chevron-thin-right" size={15} color="rgba(0,0,0,0.4)" />
            </Pressable>
          </View>
          <Text style={{ position: 'absolute', bottom: 5, right: 5, fontSize: 10 }}>{moment(item.createdAt).format('DD-MM-YYYY')}</Text>
        </Pressable>
      </>
    );
  };
  const renderMyTicket = ({ item, index }) => {
    const itemTicket = {
      name: item.name,
      date: moment(item.createdAt).format('DD-MM-YYYY')
    }
    return (
      <View style={{ alignSelf: 'center' }}>
        <TicketItem ticketItem={itemTicket} onViewPress={() => navigation.navigate('Chat', { data: item._id })}></TicketItem>
      </View>

    );
  };
  const faqData = [
    { question: 'What is plywoodbazar.com', answer: "Plywood bazar. com is India's largest online B2B market place brought a platform to interact with Manufacturers, Distributors, Dealers, Wholesalers and Retailers of Furniture, Plywood, Hardware & Interior- Exterior Industries.", id: 1 },
    { question: 'How to Register', answer: "1. Click Profile Icon right side corner at the top of website\nThen Click on Register here option\n2. Then Select radio button for Who are you? i.e. MANUFACTURER/IMPORTER, DISTRIBUTOR Or DEALER.\n 3.  Then Fill other information like Name Of Organization , Email , Name Of Authorised Person , Contact No. What’s App No. Address , Upload Profile Photo , Banner photo etc. \n 4. Then click on the Register Button.", id: 2 },
    { question: 'What is the Subscription', answer: "An amount of money that you pay, usually once a year, to receive a membership for connecting to our website as a MANUFACTURER/IMPORTER, DISTRIBUTOR Or DEALER. regularly or to belong to an organization.", id: 3 },
    { question: 'What is flash sale', answer: "A sale of goods at greatly reduced prices, lasting for only a short period of time. A discount or promotion offered by an ecommerce store for a short period of time.", id: 4 }
  ];

  const renderFaqItem = ({ item }) => (
    <FaqAccordion

      item={item}

    />
  );

  return (
    <View style={{}}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ backgroundColor: '#FFF4EC' }}
      >
        <Header normal={true} rootProps={props} />
        <FlatList
          data={ticketsArr}
          ListHeaderComponent={
            <>
              <View style={{ paddingHorizontal: 10 }}>
                <Text style={{ fontSize: wp(6), color: '#000000', fontWeight: 800, fontFamily: 'Poppins-Medium', alignSelf: 'center' }}>FAQ</Text>
                <FlatList
                  data={faqData}
                  keyExtractor={item => item.id.toString()}
                  renderItem={renderFaqItem}
                  contentContainerStyle={{ paddingBottom: hp(0) }}
                />
              </View>
              <View style={reviewStyle.container}>
                <Text style={reviewStyle.title}>Your Tickets</Text>
                <View style={reviewStyle.addBtn}>
                  <CustomButtonOld onPress={() => { setModal(true) }} text={"Add"} />
                </View>
              </View>
            </>
          }
          renderItem={renderMyTicket}

        // Adjust the paddingBottom to create space for the bottom container
        />

        <Modal
          animationType="slide"
          transparent={true}
          visible={applyFormModal}
          onRequestClose={() => {
            setModal(!applyFormModal);
          }}>


          <View style={internal_styles.bottom_container}>
            <Text style={{ marginBottom: wp(2), fontSize: wp(5), alignSelf: 'flex-start' }}>Create A Ticket</Text>

            <Input
              placeholder="Please Enter Message..."
              value={message}
              onChangeText={e => setMessage(e)}
              style={internal_styles.textInputStyles}
              multiline={true}
              numberOfLines={3}
            />
            <View style={[{ width: wp(50) }]}
            >
              <CustomButtonOld onPress={handleTicketCreation} text={'Raise New TIcket'}></CustomButtonOld>
            </View>
          </View>
        </Modal>


      </KeyboardAvoidingView>
    </View>
  );
}
const internal_styles = StyleSheet.create({

  emptyText: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 100,
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  bottom_container: {
    alignSelf: 'center',
    alignContent: 'center',
    alignItems: 'center',
    padding: 10,
    width: wp(100),
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#fff'
  },
  textInputStyles: {
    borderWidth: 0.5,
    width: wp(80),
    borderRadius: 5,
    backgroundColor: '#fff',
  },
});


const reviewStyle = StyleSheet.create({
  container: {
    alignSelf: 'center',
    marginVertical: wp(5),
    width: wp(85),
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  title: {
    fontSize: wp(6),
    fontWeight: 'bold',

  },
  addBtn: {
    borderRadius: 50, borderColor: '#BC9B80',
    borderWidth: wp(1),
    position: 'absolute',
    right: 0
  },
});