import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { Modal } from 'react-native-paper';



const LoadingOverlay = ({ visible, message, style }) => {
    return (
        <Modal 
            isVisible={visible} 
            backdropColor="#000"
            backdropOpacity={0.7} 
            animationIn="fadeIn" 
            animationOut="fadeOut"
            useNativeDriver={true}
        >
            <View style={[styles.container, style]}>
                <ActivityIndicator size="large" color="#fff" />
                {message && <Text style={styles.message}>{message}</Text>}
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.8)',
        padding: 20,
        borderRadius: 10,
    },
    message: {
        color: '#fff',
        marginTop: 15,
        fontSize: 16,
        textAlign: 'center',
    },
});

export default LoadingOverlay;
