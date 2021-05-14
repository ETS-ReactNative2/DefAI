import React, { useState } from 'react';
import { Button, View, Platform, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import ReadAndDefine from './ReadAndDefine';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

export default function URLConverter() {
  const [isClicked, setIsClicked] = React.useState(false);
  const [encodeBase64, setEncodeBase64] = React.useState(null);
  const [isFocused, setIsFocused] = React.useState(false);

  // Request permissions from user
  React.useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  // Pick an image from the library
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      return result.uri;
    }
  };

  // Convert the image uri to base64
  const convertImage = async (imageURI) => {
    const convertedBase64 = await FileSystem.readAsStringAsync(imageURI, {
      encoding: 'base64',
    });
    setEncodeBase64(convertedBase64);
  };

  const pickAndConvert = async () => {
    pickImage().then((uri) => {
      convertImage(uri);
      setIsFocused(true);
      setIsClicked(false);
    });
  };

  return (
    <View style={styles.container}>
      <Button title="Convert image to URL" onPress={pickAndConvert} />
      <Button
        title="Define"
        onPress={() => {
          setIsClicked(true);
          setIsFocused(false);
        }}
      />
      {!isFocused && isClicked ? (
        <ReadAndDefine base64image={encodeBase64} />
      ) : null}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  textInputStyle: {
    justifyContent: 'center',
    height: 40,
    marginTop: 75,
    width: 300,
    marginLeft: 30,
    alignContent: 'center',
  },
});
