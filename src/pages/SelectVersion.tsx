import React, { useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Pressable,
    ActivityIndicator,
    Text,
    View,
} from 'react-native';
import { defaultScreenProps } from "../utils/types"

const SelectVersion = ({ navigation }: defaultScreenProps) => {
    const [isLoading, setIsLoading] = useState(false);



    const preformAction = (screen: String) => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            navigation.navigate(screen);
        }, 3000)
    }

    return (
        <SafeAreaView style={styles.pageContainer}>
            <Pressable
                onPress={() => preformAction("Home")}
                style={styles.actionButton}
            >
                <Text>Test Version</Text>
            </Pressable>
            <Pressable
                onPress={() => preformAction("Landing")}
                style={styles.actionButton}
            >
                <Text>Control Version</Text>
            </Pressable>
            {isLoading && <View style={styles.loadingContainer}><ActivityIndicator size="large" /></View>}

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    pageContainer: {
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

export default SelectVersion;
