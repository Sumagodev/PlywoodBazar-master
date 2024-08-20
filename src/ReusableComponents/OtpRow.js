import React, { useRef, useState, useEffect } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import OtpSingleDigit from './OtpSingleDigit';

const OtpRow = ({ onOtpChange }) => {
    const [otp, setOtp] = useState(['', '', '', '']);
    const digitRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

    const handleTextChange = (text, index) => {
        const newOtp = [...otp];
        newOtp[index] = text;
        setOtp(newOtp);

        if (text && index < 3) {
            digitRefs[index + 1].current.focus(); // Move to the next input
        } else if (!text && index > 0) {
            digitRefs[index - 1].current.focus(); // Move to the previous input
        }
    };

    const handleKeyPress = ({ nativeEvent }, index) => {
        if (nativeEvent.key === 'Backspace' && otp[index] === '' && index > 0) {
            digitRefs[index - 1].current.focus(); // Move focus to the previous input on backspace
        }
    };

    useEffect(() => {
        const otpString = otp.join(''); // Concatenate OTP digits into a single string
        onOtpChange(otpString); // Pass the OTP string to the parent component
    }, [otp]);

    return (
        <View style={styles.row}>
            {otp.map((digit, index) => (
                <OtpSingleDigit
                    key={index}
                    ref={digitRefs[index]}
                    value={digit}
                    onChangeText={(text) => handleTextChange(text, index)}
                    onKeyPress={(e) => handleKeyPress(e, index)}
                />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});

export default OtpRow;