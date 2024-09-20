import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

const NavBar = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  const navItems = [
    { id: 1, icon: 'home-variant', label: 'Home' },
    { id: 2, icon: 'store', label: 'Shop' },
    { id: 3, icon: 'magnify', label: 'Search' },
    { id: 4, icon: 'bell', label: 'Notification' },
    { id: 5, icon: 'account-check', label: 'Account' },
  ];

  const handlePress = (id) => {
    console.log(id);
    setSelectedItem(id);
  };

  return (
    <View style={styles.navBar}>
      {navItems.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={[
            styles.navItem,
            selectedItem === item.id && styles.selectedItem,
          ]}
          onPress={() => handlePress(item.id)}
        >
          <Icon
            name={item.icon}
            size={wp(6)}
            color={selectedItem === item.id ? '#cc8d19' : 'white'}
            style={selectedItem === item.id ? styles.iconSelected : styles.iconDefault}
          />
          <Text
            style={[
              styles.label,
              selectedItem === item.id && styles.selectedLabel,
            ]}
          >
            {item.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#cc8d19',
    borderRadius: 50,
    elevation: 5,
    margin: wp(2),
    padding: wp(2),
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedItem: {
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
});


export default NavBar;