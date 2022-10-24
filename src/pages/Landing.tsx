import React, { useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Pressable,
    ActivityIndicator,
    Text,
    View,
    Alert
} from 'react-native';
import { defaultScreenProps } from "../utils/types"
import GameService from '../services/gameService';

const Landing = ({ navigation }: defaultScreenProps) => {
    const [isLoading, setIsLoading] = useState(false);

    const preformAction = async (message: String, actionIndex: number) => {
        setIsLoading(true);
        let response = await callApi(actionIndex);

        setIsLoading(false);

        if (response.status === "success") {
            navigation.navigate('LandingActionCompleted', {
                message
            });
        } else {
            Alert.alert("Unable to perform action")
        }
    }

    const callApi = async (actionIndex: number) => {
        switch (actionIndex) {
            case 1:
                return await GameService.create();
            case 2:
                return await GameService.join();
            case 3:
                return await GameService.invite();
            case 4:
                return await GameService.accept();
        }
    }
    return (
        <SafeAreaView style={styles.homePageContainer}>
            <Pressable
                onPress={() => preformAction("Game Successfully Created", 1)}
                style={styles.actionButton}
            >
                <Text>Create a game</Text>
            </Pressable>
            <Pressable
                onPress={() => preformAction("Game Successfully joined", 2)}
                style={styles.actionButton}
            >
                <Text>Join public game</Text>
            </Pressable>
            <Pressable
                onPress={() => preformAction("Invitation sent", 3)}
                style={styles.actionButton}
            >
                <Text>Invite users</Text>
            </Pressable>
            <Pressable
                onPress={() => preformAction("Invite accepted", 4)}
                style={styles.actionButton}
            >
                <Text>Accept invitation</Text>
            </Pressable>

            {isLoading && <View style={styles.loadingContainer}><ActivityIndicator size="large" /></View>}

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

export default Landing;
