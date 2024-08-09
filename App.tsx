import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import Voice, { SpeechResultsEvent, SpeechErrorEvent } from '@react-native-voice/voice';

export default function App() {
  const [started, setStarted] = useState<boolean>(false);
  const [results, setResults] = useState<string[]>([]);

  useEffect(() => {
    Voice.onSpeechError = onSpeechError;
    Voice.onSpeechResults = onSpeechResults;
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const startSpeechToText = async () => {
    try {
      await Voice.start("en-NZ");
      setStarted(true);
    } catch (error) {
      console.error("Error starting speech recognition:", error);
    }
  };

  const stopSpeechToText = async () => {
    try {
      await Voice.stop();
      setStarted(false);
    } catch (error) {
      console.error("Error stopping speech recognition:", error);
    }
  };

  const onSpeechResults = (event: SpeechResultsEvent) => {
    setResults(event.value ?? []);
  };

  const onSpeechError = (event: SpeechErrorEvent) => {
    console.error("Speech recognition error:", event.error);
  };

  return (
    <View style={styles.container}>
      {!started ? <Button title="Start Speech to Text" onPress={startSpeechToText} /> : undefined}
      {started ? <Button title="Stop Speech to Text" onPress={stopSpeechToText} /> : undefined}
      {results.map((result, index) => (
        <Text key={index}>{result}</Text>
      ))}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
