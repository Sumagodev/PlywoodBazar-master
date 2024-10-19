import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute, useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert,Modal } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Filtercategory from '../../components/Filtercategory';
import Home from '../../components/Home';
import Search from '../../components/Search';
import Userprofile from '../../components/Userprofile';
import { isAuthorisedContext } from '../Stack/Root';
import Notification from '../../components/Notification';
import { getDecodedToken } from '../../services/User.service';
import Login from '../../components/Login';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { getUnreadNotificationsCount } from '../../services/Notifications.service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {  } from 'react-native-paper';
import CustomButtonNew from '../../ReusableComponents/CustomButtonNew';
const Tab = createBottomTabNavigator();

function MyTabBar({ state, descriptors, navigation }) {
  const [isAuthorized] = useContext(isAuthorisedContext);
  const [count, setCount] = useState('')
  const focused = useIsFocused();
  const navigate = useNavigation()
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    getNotificationCount()
  }, [count, focused])
  // useEffect(() => {
  //   const checkRegistrationStatus = async () => {
  //     try {
  //       const isRegisterLogin: any = await AsyncStorage.getItem('isRegister');
  //       const isRegistered = JSON.parse(isRegisterLogin); // Convert string to boolean
  //       console.log('isRegisterLogin', isRegistered);

  //       const showRegistrationAlert = () => {
  //         if (!isRegistered) { // Use !isRegistered since we're checking for 'false'
  //           Alert.alert(
  //             'Get Registered/Login!',
  //             'Click Register/Login to proceed.',
  //             [
  //               {
  //                 text: 'Skip for Now',
  //                 style: 'cancel',
  //                 onPress: () => { },
  //               },
  //               {
  //                 text: 'Register',
  //                 style: 'default',
  //                 onPress: () => {
  //                   // Navigate to the registration page
  //                   navigate.navigate('Register'); // Ensure 'Register' is the correct route name
  //                 },
  //               },
  //               {
  //                 text: 'Login',
  //                 style: 'default',
  //                 onPress: () => {
  //                   // Navigate to the login page
  //                   navigate.navigate('Login'); // Ensure 'Login' is the correct route name
  //                 },
  //               },
  //             ],
  //             { cancelable: false }
  //           );
  //         }
  //       };

  //       const timeoutId = setTimeout(() => {
  //         showRegistrationAlert();
  //       }, 20000); // Show alert after 20 seconds

  //       return () => {
  //         clearTimeout(timeoutId); // Cleanup the timeout on unmount
  //       };
  //     } catch (error) {
  //       console.log('Error fetching isRegister value', error);
  //     }
  //   };

  //   checkRegistrationStatus();
  // }, [navigate]);



  // Function to fetch notification count
 
  useEffect(() => {
    const checkRegistrationStatus = async () => {
      try {
        const isRegisterLogin = await AsyncStorage.getItem('isRegister');
        const isRegisteredParsed = JSON.parse(isRegisterLogin); // Convert string to boolean
        console.log('isRegisterLogin', isRegisteredParsed);

        setIsRegistered(isRegisteredParsed);

        if (!isRegisteredParsed) {
          const timeoutId = setTimeout(() => {
            setShowModal(true); // Show modal after 20 seconds
          }, 20000); // 20-second delay before showing the modal

          return () => {
            clearTimeout(timeoutId); // Clear timeout on component unmount
          };
        }
      } catch (error) {
        console.log('Error fetching isRegister value', error);
      }
    };

    checkRegistrationStatus();
  }, []);

  // Handlers for modal buttons
  const handleRegister = () => {
    setShowModal(false);
    navigate.navigate('Register'); // Navigate to Register screen
  };

  const handleLogin = () => {
    setShowModal(false);
    navigate.navigate('Login'); // Navigate to Login screen
  };

 
  const getNotificationCount = async (): Promise<number> => {
    try {
      const token: any | null = await getDecodedToken();

      if (!token || !token.userId) {
        console.warn("Invalid token or user ID");
        return 0;
      }

      const unreadCount: any = await getUnreadNotificationsCount(token.userId);
      setCount(unreadCount.data.unreadCount)
      console.log('unreadCount', unreadCount);

      return unreadCount;
    } catch (error) {
      console.error("Error fetching notification count:", error);
      return 0;
    }
  };
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: '#BF9F65',
        paddingHorizontal: wp(3),
        paddingVertical: wp(3),
        justifyContent: 'space-between',
      }}
    >
        <Modal
        visible={showModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowModal(false)} // Close modal on hardware back button
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Get Registered/Login!</Text>
            <Text style={styles.modalMessage}>Click Register/Login to proceed.</Text>

            <View style={styles.buttonContainer}>
              {/* Register Button */}
             <View style={{flexDirection:'row',flexWrap:'wrap',justifyContent:"space-around"}}>

             <CustomButtonNew textSize={wp(4)} text="Register" paddingVertical={wp(2)} paddingHorizontal={wp(6)} onPress={handleRegister} />
             <CustomButtonNew textSize={wp(4)} text="Login" paddingVertical={wp(2)} paddingHorizontal={wp(9)} onPress={handleLogin} />
             </View>
             


              {/* Skip Button */}
              <TouchableOpacity style={styles.skipButton} onPress={() => setShowModal(false)}>
                <Text style={styles.skipButtonText}>Skip for Now</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel !== undefined ? options.tabBarLabel : options.title !== undefined ? options.title : route.name;

        const isFocused = state.index === index;

        const onPress = async () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            if (route.name === 'Account') {
              let token = await getDecodedToken();
              if (!token) {
                navigation.navigate('Login');
              } else {
                navigation.navigate({ name: route.name, merge: true });
              }
            } else {
              navigation.navigate({ name: route.name, merge: true });
            }
          }
          if (!isFocused && !event.defaultPrevented) {
            if (route.name === 'Notification') {
              let token = await getDecodedToken();
              if (!token) {
                // navigation.navigate('Login');
                // useEffect(() => {

                Alert.alert(
                  "Login/Registration Required",
                  "You need to be logged in to access this feature.",
                  [
                    {
                      text: "Login",
                      // Optionally, you can navigate to the Login screen here
                      // onPress: () => navigation.navigate('Login'),
                      onPress: () => { },
                      // onPress: () => navigation.dispatch(
                      //   CommonActions.reset({
                      //     index: 0,
                      //     routes: [{ name: 'Login'}],
                      //   })
                      // ),
                    },

                  ]
                );

              } else {
                navigation.navigate({ name: route.name, merge: true });
              }
            } else {
              navigation.navigate({ name: route.name, merge: true });
            }
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={[styles.navItem, isFocused && styles.selectedItem,]}
          >
            {
              label.toLowerCase() === 'home' ? (<Icon color={isFocused ? '#BF9F65' : 'white'} size={wp(6)} name="home-variant" style={isFocused ? styles.iconSelected : styles.iconDefault} />) :
                label.toLowerCase() === 'vendors' ? (<Icon color={isFocused ? '#BF9F65' : 'white'} size={wp(6)} name="store" style={isFocused ? styles.iconSelected : styles.iconDefault} />) :
                  label.toLowerCase() === 'product' ? (<Icon color={isFocused ? '#BF9F65' : 'white'} size={wp(6)} name="magnify" style={isFocused ? styles.iconSelected : styles.iconDefault} />) :
                    label.toLowerCase() === 'notification' ? (<FontAwesome color={isFocused ? '#BF9F65' : 'white'} size={wp(6)} name="bell" style={isFocused ? styles.iconSelected : styles.iconDefault} />) :
                      (
                        <Icon color={isFocused ? '#cc8d19' : 'white'} size={wp(6)} name={isAuthorized ? "account-check" : "account-arrow-right"} style={isFocused ? styles.iconSelected : styles.iconDefault} />
                      )
            }
            <Text style={[styles.label, isFocused && styles.selectedLabel,]}>
              {(label)
              }
            </Text>
            {isAuthorized && count > 0 && label === 'Notification' && !isFocused && (
              <View
                style={{
                  alignSelf: "center",
                  alignItems: "center",
                  position: 'absolute',
                  justifyContent: 'center',
                  right: wp(1),
                  top: wp(-1),
                  height: wp(6.5),
                  width: wp(6.5),
                  backgroundColor: "#E85C0D",
                  borderRadius: wp(7)
                }}
              >
                <Text style={{ fontSize: wp(3), color: '#ffffff', fontWeight: "800" }}>
                  {count > 99 ? '99+' : count}
                </Text>
              </View>
            )}


          </TouchableOpacity>
        );
      })}

    </View>
  );
}

const styles = StyleSheet.create({
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  selectedItem: {
    elevation: 5,
    backgroundColor: 'white',
    borderRadius: 50,
    flexDirection: 'row',
    alignItems: 'center',
    padding: wp(3),
  },
  iconDefault: {
    marginBottom: wp(1),
  },
  iconSelected: {
    marginRight: wp(1),
  },
  label: {
    color: 'white',
    fontSize: wp(3),
  },
  selectedLabel: {
    color: '#BF9F65',
    fontSize: wp(3),
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Semi-transparent overlay
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: 300,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'column',
    width: '100%',
  },
  button: {
    backgroundColor: '#4CAF50', // Green button
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  skipButton: {
    padding: 10,
    marginVertical: 5,
    alignItems: 'center',
  },
  skipButtonText: {
    color: '#FF0000', // Red text for skip
    fontSize: 16,
  },
})

export function BottomTabNavigator() {
  const [isAuthorized] = useContext(isAuthorisedContext);

  const getTabBarVisibility = (route: any) => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? '';

    if (routeName === 'Login') {
      return false;
    }
    return true;
  };

  return (
    <Tab.Navigator
      tabBar={(props) => <MyTabBar {...props} />}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: getTabBarVisibility(route) ? {} : { display: 'none' },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Vendors" component={Filtercategory} />
      <Tab.Screen name="Product" component={Search} />
      <Tab.Screen name="Notification" component={isAuthorized ? Notification : Login} />
      <Tab.Screen name="Account" component={isAuthorized ? Userprofile : Login} />
    </Tab.Navigator>
  );
}