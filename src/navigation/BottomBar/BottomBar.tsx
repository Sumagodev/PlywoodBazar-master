import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
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
        backgroundColor: '#cc8d19',
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
              label.toLowerCase() === 'home' ? ( <Icon color={isFocused ? '#cc8d19' : 'white'} size={wp(6)} name="home-variant" style={isFocused ? styles.iconSelected : styles.iconDefault} />) :
              label.toLowerCase() === 'shop' ? ( <Icon color={isFocused ? '#cc8d19' : 'white'} size={wp(6)} name="store" style={isFocused ? styles.iconSelected : styles.iconDefault} />) : 
              label.toLowerCase() === 'product' ? ( <Icon color={isFocused ? '#cc8d19' : 'white'} size={wp(6)} name="magnify" style={isFocused ? styles.iconSelected : styles.iconDefault} /> ) : 
              label.toLowerCase() === 'notification' ? ( <FontAwesome color={isFocused ? '#cc8d19' : 'white'} size={wp(6)} name="bell" style={isFocused ? styles.iconSelected : styles.iconDefault} /> ) :
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
    fontSize: wp(4),
  },
  selectedLabel: {
    color: '#cc8d19',
    fontSize: wp(4),
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
      <Tab.Screen name="Shop" component={Filtercategory} />
      <Tab.Screen name="Product" component={Search} />
      <Tab.Screen name="Notification" component={isAuthorized ? Notification : Login} />
      <Tab.Screen name="Account" component={isAuthorized ? Userprofile : Login} />
    </Tab.Navigator>
  );
}