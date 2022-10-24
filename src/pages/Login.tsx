import React, {  useState } from 'react';
import {
    StyleSheet,
    Pressable,
    ActivityIndicator,
    Text,
    View,
    Alert,
} from 'react-native';
import { defaultScreenProps } from "../utils/types"
import authService from "../services/authService"
import localStore from "../utils/storage";


const Login = ({ navigation }: defaultScreenProps) => {
    const [isLoading, setIsLoading] = useState(false);

    const login = async () => {
        setIsLoading(true);
        const userData = await authService.login();
        await localStore.set("userData", userData);

        setIsLoading(false);
        if (userData) {
            navigation.navigate("SelectVersion")
        } else {
            Alert.alert("Error loggin in")
        }
    }

    return (
        <View style={styles.loginPageContainer}>
            <Pressable
                onPress={() => login()}
                style={styles.loginButton}
            >
                <Text>Login</Text>
            </Pressable>

            {isLoading && <View style={styles.loadingContainer}><ActivityIndicator size="large" /></View>}

        </View>
    );
};

const styles = StyleSheet.create({
    loginPageContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%'
    },
    loginButton: {
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

export default Login;
