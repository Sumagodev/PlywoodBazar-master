import React from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { getToken } from "../services/User.service";
import ApiClient from "./ApiClient";
import Header from "../navigation/customheader/Header";
import Icon from "react-native-vector-icons/FontAwesome"; // Import FontAwesome for icons
import { widthPercentageToDP } from "react-native-responsive-screen";
import CustomColors from "../styles/CustomColors";
import moment from 'moment-timezone';
import CustomButtonNew from "../ReusableComponents/CustomButtonNew";
import LoadingDialog from "../ReusableComponents/LoadingDialog";

export class Response extends React.Component {
  state = {
    responseText: "",
    orderId: "",
    orderStatus: "",
    txn_id: "",
    txn_uuid: "",
    effective_amount: "",
    message: "",
    last_updated: "",
    istTimestamp: "",
    inputDate: this.props.inputDate || new Date().toISOString(), // Default to current date if not provided
    formattedDate: new Date().toISOString(),
    countdown: 30, // Set initial countdown time in seconds
    timeoutMessage: "Redirecting in 30 seconds...", // Timeout message
    isLoaderActive: false,

  };

  formatDateToIST(dateString) {
    const options = {
      timeZone: 'Asia/Kolkata', // Indian Standard Time
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true, // Change to true for 12-hour format
    };
    return new Intl.DateTimeFormat('en-IN', options).format(new Date(dateString));
  }

  async componentDidMount() {
    this.setState({isLoaderActive: true});
    const orderId = this.props.route?.params?.orderId;
    if (!orderId) {
      console.error("No orderId found in navigation params");
      this.setState({ responseText: "Order ID not found" });
      return;
    }

    let token;
    try {
      token = await getToken();
      const payload = { orderId };
      setTimeout(() => {
        ApiClient.sendPostRequest(
          `https://api.plywoodbazar.com/test/payments/verifyPayment`,
          payload,
          token,
          {
            onResponseReceived: (response) => {
              const parsedResponse = JSON.parse(response);
              const orderStatus = parsedResponse.status;
  
              this.setState({
                orderStatus,
                txn_id: parsedResponse.txn_id || "",
                txn_uuid: parsedResponse.txn_uuid || "",
                effective_amount: parsedResponse.effective_amount || "",
                message: parsedResponse.message || "",
                orderId,
                formattedDate: this.formatDateToIST(parsedResponse.last_updated),
                isLoaderActive: false, // Set loader inactive after processing the response
              });
  
              switch (orderStatus) {
                case "CHARGED":
                  this.setState({ responseText: "Order Successful" });
                  break;
                case "PENDING_VBV":
                  this.setState({ responseText: "Order is Pending..." });
                  break;
                default:
                  this.setState({ responseText: "Order has Failed" });
                  break;
              }
  
              // Start countdown timer (uncomment if needed)
              // this.startCountdown(30);
            },
            onFailure: (error) => {
              console.error("GET request failed:", error);
              this.setState({ responseText: "Order Status API Failed", isLoaderActive: false });
            },
          }
        );
      }, 3000); // 
    } catch (error) {
      console.error("Error decoding token:", error);
      this.setState({ responseText: "Token retrieval failed" });
      this.setState({ isLoaderActive: false });

    }
  }

  startCountdown(duration) {
    this.setState({ countdown: duration });
    this.interval = setInterval(() => {
      this.setState((prevState) => {
        if (prevState.countdown <= 1) {
          clearInterval(this.interval);
          this.props.navigation.navigate("Checkout");
          return { countdown: 0, timeoutMessage: "Redirecting now..." };
        }
        return { countdown: prevState.countdown - 1 };
      });
    }, 1000);
  }

  componentWillUnmount() {
    // Clear the timer when the component unmounts
    clearInterval(this.interval);
  }

  handleGoToSubscriptions = () => {
    this.props.navigation.navigate("Checkout");
  };

  render() {
    const { responseText, orderId, orderStatus, txn_id, txn_uuid, effective_amount, formattedDate, isLoaderActive,countdown, timeoutMessage } = this.state;

    return (
      <View style={styles.container}>
        <Header normal={true} />
        <View style={styles.contentContainer}>
          {/* Success Icon */}
          {orderStatus === "CHARGED" && (
            <>
              <Icon name="check-circle" size={50} color="green" />
              <Text style={styles.responseText}>{responseText}</Text>
            </>
          )}

          {!orderStatus === "CHARGED" && (
            <>
              <Icon name="exclamation-circle" size={50} color="red" />
              <Text style={styles.responseTextError}>{responseText}</Text>
            </>
          )}

          {/* Tabular Format for Order Details */}
          <View style={styles.tableContainer}>
            <Text style={styles.tableHeader}>Order Details</Text>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Order Status:</Text>
              <Text style={styles.tableCellData}>{orderStatus === 'CHARGED' ? 'SUCCESS' : orderStatus}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Order ID:</Text>
              <Text style={styles.tableCellData}>{orderId}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Txn ID:</Text>
              <Text style={styles.tableCellData}>{txn_id}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Txn UUID:</Text>
              <Text style={styles.tableCellData}>{txn_uuid}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Amount:</Text>
              <Text style={styles.tableCellData}>₹ {effective_amount}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Time:</Text>
              <Text style={styles.tableCellData}>{formattedDate}</Text>
            </View>
          </View>

          {/* Button to Navigate Back to Subscriptions */}
          <View style={{ alignItems: 'center', marginVertical: widthPercentageToDP(10) }}>
            <CustomButtonNew text={"Back"} paddingHorizontal={widthPercentageToDP(8)} onPress={this.handleGoToSubscriptions} />
          </View>

          {/* Countdown Timer and Message */}
          <View style={styles.countdownContainer}>
            <Text style={styles.countdownText}>Redirecting in {countdown > 0 ? countdown : "0"} seconds.....</Text>
            
          </View>
        </View>
        <LoadingDialog visible={isLoaderActive}></LoadingDialog>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CustomColors.masterBackground,
  },
  contentContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  responseText: {
    color: "green",
    fontSize: 30,
    marginBottom: 20,
  },
  responseTextError: {
    color: "red",
    fontSize: 30,
    marginBottom: 20,
  },
  tableContainer: {
    width: "100%",
    borderRadius: 8,
    marginBottom: 20,
    overflow: 'hidden',
  },
  tableHeader: {
    fontSize: widthPercentageToDP(4.5),
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "left",
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingVertical: 5,
    overflow: 'hidden',
    flexWrap: 'wrap',
  },
  tableCell: {
    fontSize: widthPercentageToDP(3.75),
    color: 'rgba(47,47,47,0.8)',
    alignItems: 'flex-start',
    width: '27%',
  },
  tableCellData: {
    fontSize: widthPercentageToDP(3.75),
    color: "black",
    alignItems: 'flex-start',
    width: '73%',
  },
  countdownContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  countdownText: {
    fontSize: 18,
    color: "black",
  },
  countdownValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: "black",
  },
});

export default Response;
