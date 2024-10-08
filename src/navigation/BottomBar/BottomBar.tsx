import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet,Alert } from 'react-native';
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

const Tab = createBottomTabNavigator();

function MyTabBar({ state, descriptors, navigation }) {
  const [isAuthorized] = useContext(isAuthorisedContext);

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
            onPress: () => {},
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
            style={[ styles.navItem, isFocused && styles.selectedItem,]}
          >
            {
              label.toLowerCase() === 'home' ? ( <Icon color={isFocused ? '#BF9F65' : 'white'} size={wp(6)} name="home-variant" style={isFocused ? styles.iconSelected : styles.iconDefault} />) :
              label.toLowerCase() === 'vendors' ? ( <Icon color={isFocused ? '#BF9F65' : 'white'} size={wp(6)} name="store" style={isFocused ? styles.iconSelected : styles.iconDefault} />) : 
              label.toLowerCase() === 'product' ? ( <Icon color={isFocused ? '#BF9F65' : 'white'} size={wp(6)} name="magnify" style={isFocused ? styles.iconSelected : styles.iconDefault} /> ) : 
              label.toLowerCase() === 'notification' ? ( <FontAwesome color={isFocused ? '#BF9F65' : 'white'} size={wp(6)} name="bell" style={isFocused ? styles.iconSelected : styles.iconDefault} /> ) :
              (
                <Icon color={isFocused ? '#cc8d19' : 'white'} size={wp(6)} name={isAuthorized ? "account-check" : "account-arrow-right"} style={isFocused ? styles.iconSelected : styles.iconDefault} />
              )
            }
            <Text style={[ styles.label, isFocused && styles.selectedLabel,]}>
              {(label)}
            </Text>
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
    flex:1,
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
})

export function BottomTabNavigator() {
  const [isAuthorized] = useContext(isAuthorisedContext);

  const getTabBarVisibility = (route) => {
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