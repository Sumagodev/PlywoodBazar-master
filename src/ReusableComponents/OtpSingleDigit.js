// OTP Single Digit UI.js

import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Colors } from './Colors';

const OtpSingleDigit = () => {
    const [isFocused, setIsFocused] = useState(false);
    return (
        <View style={styles.container}>
            <TextInput
                style={[
                    styles.input,
                    { backgroundColor: isFocused ? '#a57970' : '#fff' }, // Dark background when active, faint when inactive
                    { borderColor : isFocused ? '#a57970' : '#fff' },
                ]}
                maxLength={1} // Restricts input to one digit
                keyboardType="numeric" // Numeric keyboard for digit input
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                selectionColor="#fff" // Color of the cursor
                textAlign="center" // Center align text
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },input: {
    width: 45,
    height: 45,
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 10,
    textAlign: 'center',
    fontSize: 20,
    color: Colors.textBlack,
    // Shadow properties for iOS
    shadowColor: Colors.shadowColorGray,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Elevation for Android
    elevation: 5,
},
});

export default OtpSingleDigit;