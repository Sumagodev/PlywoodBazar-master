import React from 'react';
import { View, TextInput, StyleSheet, Image } from 'react-native';
import CustomColors from '../styles/CustomColors.js';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

const CustomSearchComponent = ({ 
    imagePath,
  inputType = 'text',
  placeholder = '',
  validator,
  ...rest
}) => {
  const handleOnChangeText = (text) => {
    if (validator) {
      validator(text);
    }
  };

  return (
    <View style={[styles.mainContainer]}>
        <View style={styles.iconContainer}>
                <Image style={styles.iconImageStyle} source={require('../../assets/img/ic_search.png')}></Image>
        </View>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        secureTextEntry={inputType === 'password'}
        keyboardType={
          inputType === 'number' ? 'numeric' : inputType === 'email'
            ? 'email-address'
            : 'default'
        }
        onChangeText={handleOnChangeText}
        {...rest}
      />
    </View>
  );
};

const styles = StyleSheet.create({

    mainContainer:{
        backgroundColor:CustomColors.searchBackground,
        borderRadius:wp(10),
        flexDirection:'row',
        width:wp(80),
        marginRight:wp(10),
        marginLeft:wp(10),
        marginTop:wp(10),
        marginBottom:wp(10),
        padding:wp(1)    
    },
    iconContainer:{      
        backgroundColor:CustomColors.mattBrownDark,
        width:wp(12),
        height:wp(12),
        justifyContent:'center',
        alignItems:'center',
        alignSelf:'center',
        borderRadius:wp(10),
    },
    iconImageStyle:{
        width:wp(10),
        height:wp(10),
        justifyContent:'center',
        alignItems:'center',
    }
});

export default CustomSearchComponent;