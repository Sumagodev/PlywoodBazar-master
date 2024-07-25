import {useNavigation} from '@react-navigation/native';
import {errorToast} from './toastutill';
// import { toastError } from "./toastUtils";

export default function useRedirectToLoginIfNotLoggedIn({isAuthorized}) {
  const navigation = useNavigation();
  console.log(isAuthorized, 'isAuthorized');
  return () => {
    if (isAuthorized) {
      // navigationRoute
    } else {
      // errorToast({message:"You are not logged in, please login!"})
      navigation.navigate('Mobilenumber');
    }
  };
}
