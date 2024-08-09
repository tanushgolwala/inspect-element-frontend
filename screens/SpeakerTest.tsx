import React, { useState } from "react";
import { View, Text, Button, TouchableOpacity } from "react-native";
import Tts from 'react-native-tts';
import { textData } from "./data/textData";

interface SpeakerTestProps {
    navigation: any;
}


const SpeakerTest: React.FC = () => {
    const [language, setlanguage] = useState<string>("en-US")

    // const getVoices = async () => {
    //     const voices = await Tts.voices();
    //     const availableVoices = voices
    //         .filter(v => !v.networkConnectionRequired && !v.notInstalled)
    //         .map(v => {
    //             return { id: v.id, name: v.name, language: v.language };
    //         });
    //     console.log(availableVoices)
    // }

    const handleButtonPress = () => {
        const text = textData.message.speechText
        Tts.setDefaultLanguage(language)
        Tts.getInitStatus().then(() => {
            Tts.speak(text, {
                iosVoiceId: 'com.apple.ttsbundle.Samantha-compact',
                rate: 0.5,
                androidParams: {
                    KEY_PARAM_PAN: -1,
                    KEY_PARAM_VOLUME: 0.5,
                    KEY_PARAM_STREAM: 'STREAM_MUSIC',
                },
            });
        })
    }
    return (
        <View>
            <Text>Speaker Test</Text>
            <TouchableOpacity onPress={handleButtonPress}>
                <Text>Press to speak</Text>
            </TouchableOpacity>
        </View>
    );
}

export default SpeakerTest;