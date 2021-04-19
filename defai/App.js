import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import axios from 'axios';

export default function App() {
  const [result, setResult] = React.useState(null);
  const token = '3211b416b83aa9ad703f55770604d674e5f06f11';

  const client = axios.create({
    baseURL: 'https://owlbot.info',
    timeout: 5000,
    headers: { Authorization: 'Token ' + token },
  });

  client.get('/api/v4/dictionary/owl').then((response) => {
    console.log(response.data);
    setResult(response.data.definitions[0].definition);
  });

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Text>{result}</Text>
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
