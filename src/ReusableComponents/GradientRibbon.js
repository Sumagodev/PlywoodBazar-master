import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { widthPercentageToDP as wp} from 'react-native-responsive-screen';


const GradientRibbon = ( {feature1,feature2}) => {
  return (
    <LinearGradient
      colors={['#f0d5c9', '#f7ede6']} // Replace with your gradient colors
      start={{ x: 0, y: 0.5 }}
      end={{ x: 1, y: 0.5 }}
      style={styles.ribbon}
    >
        <View style={{flexDirection:'row'}}>
        <Text style={styles.ribbonText}>•{feature1}</Text>
        <Text style={styles.ribbonText}>•{feature2}</Text>
        </View>
      
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  ribbon: {
    marginTop:wp(1),
    width:'100%',
    flex:1,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20, // Rounded edges for the ribbon
    alignSelf: 'center', // Centering the ribbon
  },
  ribbonText: {
    marginLeft:wp(2),
    fontSize: wp(3),
    color: '#000', // Text color (adjust as needed)
    textAlign: 'center',
  },
});

export default GradientRibbon;
