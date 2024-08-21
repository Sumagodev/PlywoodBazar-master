import React from 'react';
import Toast from 'react-native-toast-message';
import RootStack from './src/navigation/Stack/Root';
import axios from 'axios';
export const axiosApiInstance = axios.create();
import {SafeAreaView} from 'react-native'
function App(): JSX.Element {
  return (
    <SafeAreaView style={{flex:1}}>
      <RootStack />
      <Toast />
    </SafeAreaView>
  );
}
export default App;