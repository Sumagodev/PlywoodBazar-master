import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import GradientRibbon from './GradientRibbon';

const SubscriptionCard = ({
  period = "12 Months",
  title = "Plywood Bazar Subscription For Distributor",
  price = "₹2999",
  gst = "+18% GST",
  duration = "For 3 Days",
  features = ["1 Flash Sales", "1 Advertisements"],
  featureText1,
  featureText2
}) => {
  return (
    <View style={stylesCard.cardContainer}>
      <LinearGradient         colors={['#5A432F', '#C08F64'] } // Adjust gradient colors
      
  style={stylesCard.periodContainer}>
        <Text style={stylesCard.periodText}>{period}</Text>
      </LinearGradient>
      <View style={stylesCard.contentContainer}>
        <Text style={stylesCard.titleText} numberOfLines={2} ellipsizeMode='tail'>{title}</Text>
        <Text style={stylesCard.priceText}>
          {price} <Text style={ststylesCardyles.gstText}>{gst}</Text>
        </Text>
        <Text style={stylesCard.durationText}>{duration}</Text>
        <GradientRibbon feature1={featureText1} feature2={featureText2}>        
        </GradientRibbon>
      </View>
      
    </View>
  );
};

const stylesCard = StyleSheet.create({
    cardContainer: {
      margin:wp(2),
      flexDirection: 'row',
      padding: 16,
      backgroundColor: '#FFFFFF',
      borderRadius: 10,
      elevation: 2,
      marginLeft: 40, // Space for the floating circle
    },
    periodContainer: {
      width:wp(25),
      height:wp(25),
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#5A432F',
      padding: wp(1),
      borderRadius: wp(25),
      position: 'absolute',
      left: -wp(11), // Half the width of the circle
      top: '50%', // Center vertically based on the height of the card
      transform: [{ translateY: -32 }], // Half the height of the circle to offset it upwards
    },
    periodText: {
      color: '#fff',
      fontSize: wp(4),
      fontWeight: 'bold',
    },
    contentContainer: {
      marginLeft: wp(12), // Adjust to match the position of the text
      justifyContent: 'center',
    },
    titleText: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    priceText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#5A432F',
    },
    gstText: {
      fontSize: 14,
      fontWeight: 'normal',
      color: '#5A432F',
    },
    durationText: {
      fontSize: wp(3),
      color: '#000',
      fontWeight:600,
      marginTop: wp(1),
    },
    featuresContainer: {
      flexDirection: 'row',
      marginTop: 8,
      flex:1

    },
    featureText: {
      fontSize: 14,
      color: '#666',
      marginRight: 8,
    },
    buttonStyle: {
      position: 'absolute',
      bottom: wp(-6),
      alignSelf: 'center'
  },
  });
  
export default SubscriptionCard;

