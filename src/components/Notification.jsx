import React from 'react';
import { View, ScrollView, FlatList, Text } from 'react-native';
import ProfileViewNote from '../ReusableComponents/NotificationCards/ProfileViewNote';
import ProductViewNote from '../ReusableComponents/NotificationCards/ProductViewNote';
import ContactsNote from '../ReusableComponents/NotificationCards/ContactsNote';

// Sample data array with dynamic types
const data = [
  { id: '1', type: 'profile', content: 'Profile notification', name: 'John Doe', date: '2024-09-26' },
  { id: '2', type: 'product', content: 'Product notification', productName: 'Laptop', price: '$1200', date: '2024-09-25' },
  { id: '3', type: 'contacts', content: 'Contacts notification', contactName: 'Jane Smith', date: '2024-09-24' },
  { id: '4', type: 'profile', content: 'Another profile notification', name: 'Alex Johnson', date: '2024-09-23' },
  { id: '5', type: 'profile', content: 'Yet another profile notification', name: 'Chris Evans', date: '2024-09-22' },
  { id: '6', type: 'contacts', content: 'Another contacts notification', contactName: 'Emma Watson', date: '2024-09-21' },
];


const Notification = () => {

  const notificationItem = ({ item }) => {
    // Dynamic rendering based on item type
    
    switch (item.type) {
      case 'profile':
        return <ProfileViewNote content={item.content} name={item.name} date={item.date} />;
      case 'product':
        return <ProductViewNote content={item.content} productName={item.productName} price={item.price} date={item.date} />;
      case 'contacts':
        return <ContactsNote content={item.content} contactName={item.contactName} date={item.date} />;
      default:
        return <Text>Unknown notification type</Text>;
    }
  };
  

  return (

      <View style={{backgroundColor:"#ffffff"}}>
        <FlatList
          data={data}
          renderItem={notificationItem}
          keyExtractor={(item) => item.id}
        />
      </View>
 
  );
};

export default Notification;
