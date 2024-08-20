import React, { forwardRef } from 'react';
import { TextInput, StyleSheet, View } from 'react-native';
import CustomColors from '../styles/CustomColors';

const OtpSingleDigit = forwardRef(({ value, onChangeText, onKeyPress }, ref) => {
    return (
        <View style={styles.container}>
            <TextInput
                ref={ref}
                value={value}
                style={[
                    styles.input,
                    { backgroundColor: value ? '#a57970' : '#fff' },
                    { borderColor: value ? '#a57970' : '#fff' },
                ]}
                maxLength={1}
                keyboardType="numeric"
                onChangeText={onChangeText}
                onKeyPress={onKeyPress}
                textAlign="center"
                color='white'
                selectionColor={CustomColors.glossBrownDark}
            />
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    input: {
        width: 45,
        height: 45,
        borderRadius: 10,
        borderWidth: 1,
        paddingHorizontal: 10,
        textAlign: 'center',
        fontSize: 20,
        color: CustomColors.textBlack,
        shadowColor: CustomColors.shadowColorGray,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
});

export default OtpSingleDigit;