
import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';
import { defaultScreenProps } from '../utils/types';
import localStore from '../utils/storage'
import authService from "../services/authService"

const ActionCompletedPage = ({ route, navigation }: defaultScreenProps) => {
    const [message] = useState(route.params.message);

    const openModal = () => {
        navigation.navigate("CustomModal")
    }

    useEffect(() => {
        const handleModalopen = async () => {
            let userData = await localStore.get("userData");
            userData = JSON.parse(userData);
            if (!userData.hasRated) {
                setTimeout(() => {
                    openModal();
                    authService.updateRatingLastShown(userData.id);
                }, 10000);
            }
        }
        handleModalopen();
    }, [])

    return (
        <View style={styles.pageContainer}>
            <Text>{message}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    pageContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%'
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
    },
    highlight: {
        fontWeight: '700',
    },
    modalBackground: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 25,
        alignItems: "flex-end",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    image: {
        marginBottom: 35
    },
    modalTitle: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 16
    },
    contentContainer: {
        display: 'flex',
        alignItems: 'center'
    },
    modalContent: {
        marginBottom: 40
    },
    rateButton: {
        backgroundColor: '#1FB0F7',
        borderRadius: 6,
        paddingVertical: 16,
        paddingHorizontal: 95,
        color: "#fff",
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 24
    }
});

export default ActionCompletedPage;
