
import React from 'react';
import {
    Modal,
    StyleSheet,
    View,
    Text,
    Pressable,
    Image,
    Platform,
    Linking,
    Alert
} from 'react-native';
import { defaultScreenProps } from '../utils/types';
import { GOOGLE_PACKAGE_NAME, APPLE_STORE_ID } from '@env';
import localStore from "../utils/storage";
import authService from "../services/authService"


const CustomModal = ({ route, navigation }: defaultScreenProps) => {

    const closeModal = () => {
        navigation.goBack();
    }

    const updateUserRatingStatus = async () => {
        let userData = await localStore.get("userData");
        userData = JSON.parse(userData)

        await authService.updateRatingStatus(userData.id);
    }

    const goToStoreRating = () => {
        closeModal()
        if (Platform.OS != 'ios') {
            updateUserRatingStatus();
            Linking.openURL(
                `http://play.google.com/store/apps/details?id=${GOOGLE_PACKAGE_NAME}`,
            ).catch(
                (err) => { console.log(err); Alert.alert('Please check for Google Play Store') }
            );
        } else {
            Linking.openURL(
                `itms://itunes.apple.com/in/app/apple-store/${APPLE_STORE_ID}`,
            ).catch((err) => Alert.alert('Please check for the App Store'));
        }
    }

    const goToContact = () => {
        updateUserRatingStatus();
        navigation.navigate("Contact")
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible
        >
            <View style={styles.modalBackground}>
                <View style={styles.modalView}>
                    <Pressable style={{ padding: 10 }} onPress={() => closeModal()}>
                        <Text>X</Text>
                    </Pressable>
                    {/* <StarRating
                            rating={rating}
                            onChange={setRating}
                        /> */}
                    <View style={styles.contentContainer}>
                        <Image source={require('../assets/imgs/stars.png')} style={styles.image} />
                        <Text style={styles.modalTitle}>Enjoying RacketPal?</Text>
                        <Text style={styles.modalContent}>
                            Your App Store review
                            greatly helps spread the word and grow the racket sports community!
                        </Text>

                        <Pressable style={styles.rateButton} onPress={() => goToStoreRating()}>
                            <Text>Rate Us</Text>
                        </Pressable>

                        <Pressable onPress={() => goToContact()}>
                            <Text style={{ textDecorationLine: 'underline' }}>Not yet? Give us Feedback</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>

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
        marginBottom: 24
    }
});

export default CustomModal;
