import Toast from 'react-native-toast-message';

export const errorToast = error => {


  if (error?.response?.data?.message) {
    Toast.show({
      type: 'error',
      text1: '',
      text2: error.response.data.message,
    });
  }
  else if (error?.message && error?.message != 'Invalid token specified') {
    console.log(error)
    Toast.show({
      type: 'error',
      text1: '',
      text2: error?.message,
    });
  }

  else if (error?.message) {
    console.log(error, 'asdfasdf')
    Toast.show({
      type: 'error',
      text1: '',
      text2: error?.message
    });
  }
  else {
    
    Toast.show({
      type: 'error',
      text1: '',
      text2: error,
    });
  }
};

export const toastSuccess = message => {
  Toast.show({
    type: 'success',
    text1: message,
  });
};