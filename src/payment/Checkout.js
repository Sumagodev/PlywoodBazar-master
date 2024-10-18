/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, TouchableOpacity, Image, View, ActivityIndicator, FlatList, Button} from 'react-native';
import HyperSdkReact from 'hyper-sdk-react';
import {BackHandler, NativeEventEmitter, NativeModules, Text} from 'react-native';
import ApiClient from './ApiClient';
import Header from '../navigation/customheader/Header';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {errorToast} from '../utils/toastutill';
import {getDecodedToken, getToken} from '../services/User.service';
import {getAllsubscription} from '../services/Subscription.service';
import LinearGradient from 'react-native-linear-gradient';
import GradientRibbon from '../ReusableComponents/GradientRibbon';
import CustomButtonNew from '../ReusableComponents/CustomButtonNew';
import LoadingDialog from '../ReusableComponents/LoadingDialog';

class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      processPayload: {},
      total: 1,
      isLoaderActive: false,
      subscriptions: [],
      selectedSubscriptionObj: null,
      userToken: '',
    };
  }

  componentDidMount() {
    this.getSubscriptions(); // Fetch subscriptions
    const eventEmitter = new NativeEventEmitter(NativeModules.HyperSdkReact);

    eventEmitter.addListener('HyperEvent', resp => {
      const data = JSON.parse(resp);
      const orderId = data.orderId;
      const event = data.event || '';

      switch (event) {
        case 'initiate_result':
        case 'hide_loader':
          this.setState({isLoaderActive: false});
          break;

        case 'process_result':
          const innerPayload = data.payload || {};
          const status = innerPayload.status || '';
          if (status !== 'backpressed' && status !== 'user_aborted') {
            this.props.navigation.navigate('Response', {orderId: orderId});
          }
          break;

        default:
          console.log(data);
      }
    });

    BackHandler.addEventListener('hardwareBackPress', () => {
      return !HyperSdkReact.isNull() && HyperSdkReact.onBackPressed();
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.selectedSubscriptionObj && this.state.selectedSubscriptionObj !== prevState.selectedSubscriptionObj) {
      this.startPaymentForHdfc(this.state.selectedSubscriptionObj);
    }
  }

  handleSubscriptionSelect = item => {
    this.setState({selectedSubscriptionObj: item}); // Set the selected subscription
  };

  startPaymentForHdfc = subscription => {
    console.log('Initiating payment for:', subscription);
    this.setState({selectedSubscriptionObj: subscription}); // Set the selected subscription
    this.startPayment(); // Call the payment method
  };

  getSubscriptions = async () => {
    try {
      const token = await getToken(); // Ensure you await the token retrieval
      this.setState({userToken: token});
      const decoded = await getDecodedToken(); // Ensure you await the decoded token
      const {data: res} = await getAllsubscription(`role=${decoded.role}`);
      if (res) {
        this.setState({subscriptions: res.data}); // Update state with the fetched subscriptions
      }
    } catch (error) {
      errorToast(error); // Show an error toast if the API call fails
    }
  };

  startPayment() {
    this.setState({isLoaderActive: true});

    console.log(this.state.selectedSubscriptionObj, 'Anoop'); // Accessing the selected subscription from state
    console.log(this.state.userToken, 'Anoop'); // Accessing the user token from state

    ApiClient.sendPostRequest(
      'https://api.plywoodbazar.com/test/usersubscription/initiateJuspayPaymentForSubcription',
      this.state.selectedSubscriptionObj, // Use the state variable
      this.state.userToken, // Use the state variable
      {
        onResponseReceived: response => {
          let parsedResponse;
          try {
            parsedResponse = typeof response === 'string' ? JSON.parse(response) : response;
          } catch (error) {
            console.error('Failed to parse response:', error);
            return;
          }

          const sdkPayload = parsedResponse.sdk_payload;
          HyperSdkReact.openPaymentPage(JSON.stringify(sdkPayload));
        },
        onFailure: error => {
          console.error('POST request failed:', error);
        },
      },
    );
  }

  renderNewSubscriptionItem = ({item}) => {
    const durationText = item?.noOfMonth ? `${item?.noOfMonth} ${item?.noOfMonth > 1 ? 'months' : 'month'}` : 'No Validity';

    return (
      <View style={stylesCard.cardContainer}>
        <LinearGradient colors={['#cc8d19', '#C08F64']} style={stylesCard.periodContainer}>
          <Text style={stylesCard.periodText}>{durationText}</Text>
        </LinearGradient>
        <View style={stylesCard.contentContainer}>
          <Text style={stylesCard.titleText} numberOfLines={2} ellipsizeMode="tail">
            {item?.description}
          </Text>
          <Text style={stylesCard.priceText}>
            ₹ {item?.price} + <Text style={stylesCard.gstText}>18% GST</Text>
          </Text>
          <Text style={stylesCard.priceText}>Total Amount : ₹ {Math.round(item?.price + item?.price * 0.18)}</Text>
          <Text style={stylesCard.durationText}>For {item?.advertisementDays > 1 ? `${item?.advertisementDays} Days` : `${item?.advertisementDays === 1 ? '1 Day' : '0 Days'}`}</Text>
          <View style={{marginBottom: wp(5)}}>
            <GradientRibbon feature1={item?.numberOfAdvertisement !== 0 ? `${item?.numberOfAdvertisement} Advertisements` : ' No Advertisements'} feature2={item?.numberOfSales !== 0 ? `${item?.numberOfSales} Flash sales` : ' No Flash sales'} />
          </View>
          <View style={stylesCard.buttonStyle}>
            <CustomButtonNew paddingHorizontal={wp(8)} paddingVertical={wp(3)} text="Buy Now" onPress={() => this.handleSubscriptionSelect(item)} />
          </View>
        </View>
      </View>
    );
  };

  render() {
    const {isLoaderActive, subscriptions} = this.state;
    return (
      <View style={{flex: 1}}>
        <Header normal={true} />
        <FlatList data={subscriptions} renderItem={this.renderNewSubscriptionItem} keyExtractor={item => item._id} style={{flexGrow: 0}} />
        <LoadingDialog visible={isLoaderActive}></LoadingDialog>
      </View>
    );
  }
}

const stylesCard = StyleSheet.create({
  cardContainer: {
    padding: wp(5),
    margin: wp(5),
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  periodContainer: {
    borderRadius: 10,
    padding: wp(3),
    alignItems: 'center',
    marginBottom: wp(3),
  },
  periodText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  contentContainer: {
    padding: wp(3),
  },
  titleText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  priceText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#cc8d19',
  },
  gstText: {
    fontSize: 14,
    color: '#000',
  },
  durationText: {
    fontSize: 14,
    color: '#777',
  },
  buttonStyle: {
    marginTop: wp(3),
  },
  loader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Checkout;
