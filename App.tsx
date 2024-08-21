import React from 'react';
import axios from 'axios';
export const axiosApiInstance = axios.create();
import {View, StyleSheet} from 'react-native'
import CustomColors from './src/styles/CustomColors';
import TopProfilesCard from './src/ReusableComponents/TopProfilesCard';

function App(): JSX.Element {
  return (
    <View style={styles.container}>
      <TopProfilesCard 
        imagePath={require('./assets/img/userpic.png')}
        name={'Keshav Enterprises'}
        onCallPressed={()=>{}}
        onCardPressed={()=>{}}
        onVisitPressed={()=>{}}
        >
      </TopProfilesCard>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CustomColors.masterBackground,
    alignItems: 'center',
    justifyContent: 'center',
  },
  spacer: { width: 20, height: 20, },
  row: {
    flexDirection: 'row', // Horizontal layout
    justifyContent: 'space-between', // Space between inputs
    alignItems: 'center', // Center align items vertically
    padding: 10, // Optional padding around the row
  },
});

export default App;