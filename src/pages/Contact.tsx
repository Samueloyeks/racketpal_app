import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
} from 'react-native';

const Contact = () => {

    return (
        <SafeAreaView style={styles.homePageContainer}>
            <Text>
                You can contact us via Racketpal@gmail.com
            </Text>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    homePageContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%'
    },
    actionButton: {
        backgroundColor: '#FFC34E',
        borderRadius: 6,
        padding: 10,
        margin: 10,
    },
    loadingContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    }
});

export default Contact;
