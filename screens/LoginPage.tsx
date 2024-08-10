import { GoogleSignin, User as GoogleUser, statusCodes } from '@react-native-google-signin/google-signin';
import { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, Animated } from 'react-native';
import auth from '@react-native-firebase/auth';
import { StackNavigationProp } from '@react-navigation/stack';


GoogleSignin.configure({
    webClientId: '874760723077-kqimrubb1di644vrhl00e7efctjmkhbm.apps.googleusercontent.com',
});

interface LoginPageProps {
    navigation: StackNavigationProp<RootStackParamList>;
}

const LoginPage: React.FC<LoginPageProps> = ({ navigation }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const rotateAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.timing(rotateAnim, {
                toValue: 1,
                duration: 4000, // 2 seconds for the rotation
                useNativeDriver: true,
            })
        ).start();
    }, [rotateAnim]);

    const rotate = rotateAnim.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: ['-90deg', '0deg', '-90deg'],
    });
    async function onGoogleButtonPress() {
        try {
            setLoading(true);
            // Check if your device supports Google Play
            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
            // Get the users ID token
            const { idToken, user } = await GoogleSignin.signIn();

            // console.log(idToken);
            console.log(user);

            // Create a Google credential with the token
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);

            // Sign-in the user with the credential
            const userCredential = await auth().signInWithCredential(googleCredential);

            // Access the user UID
            const userUid = userCredential.user.uid;

            const firebaseIdToken = await userCredential.user.getIdToken();

            console.log(firebaseIdToken);
            navigation.navigate('SpeechText');
            return userCredential
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <View style={styles.container}>
            <Animated.Image
                source={require('../assets/signin_gear.png')}
                style={[styles.gearIcon, { transform: [{ rotate }] }]}
            />
            <Text style={styles.mainText}>Your <Text style={{ color: "#FFC400" }}>AI</Text> Powered</Text>
            <Text style={styles.boldText}>Inspection Assistant</Text>
            <TouchableOpacity style={styles.googleButton} onPress={onGoogleButtonPress}>
                <Image
                    style={styles.googleIcon}
                    source={{
                        uri: "https://i.ibb.co/j82DCcR/search.png",
                    }}
                />
                <Text style={styles.googleButtonText}>Login with Google</Text>
            </TouchableOpacity>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000a23',
        alignItems: 'center',
        justifyContent: 'center',
    },
    googleButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'Roboto',
        marginLeft: '4.2%',
        color: 'black',
        textAlign: 'center',
    },
    gearIcon: {
        width: 150, // Adjust size if needed
        height: 150, // Adjust size if needed
    },
    googleButton: {
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 13,
        borderColor: 'white',
        backgroundColor: "white",
        width: '70%',
        height: '7%',
        flexDirection: 'row',
        marginTop: '5%',
        paddingHorizontal: 15,
    },
    googleIcon: {
        height: 30,
        width: 30,
        marginLeft: 10,
    },
    mainText: {
        color: 'white',
        fontSize: 30,
        fontFamily: 'Roboto',
        marginTop: '10%',
    },
    boldText: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
        fontFamily: 'Roboto',
    }
});

export default LoginPage;