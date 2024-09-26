import { View, Text } from 'react-native'
import React from 'react'


  
  const ProductViewNote = ({ content, productName, price, date }) => {
    return (
      <View>
        <Text>{content}</Text>
        <Text>Product: {productName}</Text>
        <Text>Price: {price}</Text>
        <Text>Date: {date}</Text>
      </View>
    );
  };
  
export default ProductViewNote