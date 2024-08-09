import { GoogleSignin, User as GoogleUser, statusCodes } from '@react-native-google-signin/google-signin';
import { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import auth from '@react-native-firebase/auth';
import { StackNavigationProp } from '@react-navigation/stack';


GoogleSignin.configure({
    webClientId: '1093353768795-cpnii77bepuseh4p3b2q0ibkikgv8k0i.apps.googleusercontent.com',
});

interface LoginPageProps {
    navigation: StackNavigationProp<RootStackParamList>;
}

const LoginPage: React.FC<LoginPageProps> = ({ navigation }) => {
    const [loading, setLoading] = useState<boolean>(false);
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
            <Text>Open up App.tsx to start working on your app!</Text>
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
        color: 'white',
    },
    googleButton: {
        textAlign: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 50,
        borderColor: 'white',
        width: '85%',
        height: '10%',
        flexDirection: 'row',
        marginTop: '20%',
        paddingHorizontal: 15,
    },
    googleIcon: {
        height: 30,
        width: 30,
        marginLeft: 10,
    },
});

export default LoginPage;