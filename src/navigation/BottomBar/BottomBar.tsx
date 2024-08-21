import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import React, { useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Filtercategory from '../../components/Filtercategory';
import Home from '../../components/Home';
import Search from '../../components/Search';
import Userprofile from '../../components/Userprofile';
import { isAuthorisedContext } from '../Stack/Root';
import Notification from '../../components/Notification';
import { getDecodedToken } from '../../services/User.service';
import Login from '../../components/Login';

const Tab = createBottomTabNavigator();

function MyTabBar({ state, descriptors, navigation }) {
  const [isAuthorized] = useContext(isAuthorisedContext);

  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: 'white',
        height: 65,
        paddingHorizontal: 8,
        justifyContent: 'space-between',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        alignItems: 'center',
        elevation: 8,
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
            style={{
              alignItems: 'center',
              backgroundColor: 'transparent',
            }}
          >
            {label.toLowerCase() === 'home' ? (
              <Icon color={isFocused ? '#B08218' : '#ACA9C9'} size={20} name="home" />
            ) : label.toLowerCase() === 'shop' ? (
              <Icon color={isFocused ? '#B08218' : '#ACA9C9'} size={20} name="grid" />
            ) : label.toLowerCase() === 'search' ? (
              <Icon color={isFocused ? '#B08218' : '#ACA9C9'} size={20} name="search" />
            ) : label.toLowerCase() === 'notification' ? (
              <FontAwesome color={isFocused ? '#B08218' : '#ACA9C9'} size={20} name="bell-o" />
            ) : (
              <Icon color={isFocused ? '#B08218' : '#ACA9C9'} size={20} name="user" />
            )}
            <Text style={{ color: isFocused ? '#B08218' : '#ACA9C9', fontSize: 13 }}>{label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

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
      <Tab.Screen name="Shop" component={Filtercategory} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Notification" component={Notification} />
      <Tab.Screen name="Account" component={isAuthorized ? Userprofile : Login} />
    </Tab.Navigator>
  );
}
