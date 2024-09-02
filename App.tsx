import React from 'react';
import Toast from 'react-native-toast-message';
import RootStack from './src/navigation/Stack/Root';
import axios from 'axios';
axios.interceptors.request.use((request) => {
  console.log('Starting Request:', request);
  return request;
}, (error) => {
  console.error('Request Error:', error);
  return Promise.reject(error);
});

axios.interceptors.response.use((response) => {
  console.log('Response:', response);
  return response;
}, (error) => {
  console.error('Response Error:', error);
  return Promise.reject(error);
});
export const axiosApiInstance = axios.create();
import {SafeAreaView} from 'react-native'
import { OrientationLocker } from 'react-native-orientation-locker';
function App(): JSX.Element {
  return (
    <SafeAreaView style={{flex:1}}>
      <OrientationLocker orientation="PORTRAIT" />
      <RootStack />
      <Toast />
    </SafeAreaView>
  );
}
export default App;