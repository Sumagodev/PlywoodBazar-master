import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Dimensions } from 'react-native';
import { Colors } from './Colors.js';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const LikeProduct = ( {imagePath, name, location, price,} ) => {
    return (
        <View style={[styles.container]}>
            <View style={[styles.elevatedContainer]}>
                <View style={[styles.upperContainer]}>
                
                </View>
                <Text style={styles.nameText}/>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    margin: 2,
    borderRadius: 20,
    width: { screenWidth }*0.4,
  },
  elevatedContainer: {
    margin: 1,
    borderRadius: 20,
  },
  upperContainer:{
    borderRadius: 20,
  },
  nameText: {
    color: Colors.textBlack,
    fintSize: 18,
  }
});

export default LikeProduct;