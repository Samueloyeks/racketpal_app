
import React, { useEffect, useState } from 'react';
import {
    Modal,
    StyleSheet,
    View,
    Text,
    Pressable,
    Image,
    Platform,
    Linking,
    Alert,
    TextInput
} from 'react-native';
import StarRating from 'react-native-star-rating-widget';
import { defaultScreenProps } from '../utils/types';
import { GOOGLE_PACKAGE_NAME, APPLE_STORE_ID } from '@env';
import localStore from "../utils/storage";
import authService from "../services/authService"


const RatingModal = ({ route, navigation }: defaultScreenProps) => {
    const [rating, setRating] = useState<number>(0);
    const [feedbackMessage, setFeedbackMessage] = useState<string>("");
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

    const remindLater = () => {
        navigation.goBack();
    }

    useEffect(() => {
        if (rating > 3) {
            goToStoreRating();
        }
    }, [rating])

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

                    <View style={styles.contentContainer}>
                        <View style={styles.image}>
                            <Image source={require('../assets/imgs/modalHeader.png')} />
                        </View>

                        <Text style={styles.modalTitle}>Enjoying RacketPal?</Text>
                        <Text style={styles.modalContent}>
                            Tap a star to rate it on the {Platform.OS != 'ios' ? 'Play' : 'App'} Store
                        </Text>
                        <StarRating
                            rating={rating}
                            onChange={setRating}
                            starSize={50}
                            color="#FFC34E"
                            style={{ marginBottom: 48 }}
                        />
                        {
                            rating > 0 && rating <= 3 &&
                            <View style={{ alignSelf: 'stretch' }}>
                                <Text style={{ color: "#FFC34E", fontWeight: 'bold',fontSize: 10  }}>ANY FEEDBACK FOR US?</Text>
                                <TextInput
                                    multiline={true}
                                    numberOfLines={4}
                                    onChangeText={(text) => setFeedbackMessage(text)}
                                        value={feedbackMessage}
                                        style={styles.textarea}
                                    />
                                <Pressable style={styles.submitButton} onPress={() => closeModal()}>
                                    <Text style={{ color: "#fff", fontSize: 14, fontWeight: 'bold' }}>Submit</Text>
                                </Pressable>
                            </View>
                        }

                        {
                            rating == 0 &&
                            <Pressable onPress={() => remindLater()}>
                                <Text style={{ color: "#9E9DA2", fontWeight: 'bold', fontSize: 10 }}>Remind me later</Text>
                            </Pressable>
                        }
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
        top: -90,
    },
    modalTitle: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 16,
        marginTop: -50,
    },
    textarea: {
        borderColor: '#FFC34E',
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 6,
        paddingVertical: 10,
        paddingHorizontal: 12,
        alignSelf: 'stretch',
        marginTop: 4,
        marginBottom: 16,
    },
    contentContainer: {
        display: 'flex',
        alignItems: 'center'
    },
    modalContent: {
        marginBottom: 16
    },
    submitButton: {
        backgroundColor: '#FFC34E',
        borderRadius: 6,
        paddingVertical: 10,
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 24,
        justifyContent: 'center',
    }
});

export default RatingModal;
