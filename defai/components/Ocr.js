import React, { useState, useEffect } from 'react';
import { Button, View, Platform, StyleSheet } from 'react-native';
import axios from 'axios';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SearchBar } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';
import * as WebBrowser from 'expo-web-browser';
import ReadAndDefine from './ReadAndDefine';

export default function URLConverter() {
  const [isClicked, setIsClicked] = React.useState(false);
  const [input, setInput] = React.useState('');
  const [isFocused, setFocused] = React.useState(false);
  const [url, setUrl] = React.useState(null);

  const pickAndConvertImage = async () => {
    WebBrowser.openBrowserAsync('https://postimg.cc/');
  };

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <SearchBar
          round
          clearIcon
          value={input}
          platform="ios"
          cancelButtonTitle
          returnKeyType="search"
          blurOnSubmit={true}
          backgroundColor="white"
          searchIcon={{ size: 24 }}
          placeholder="Paste here the image Url..."
          cancelButtonTitle="Clear"
          onFocus={() => {
            setFocused(true);
            setIsClicked(false);
          }}
          onBlur={() => setFocused(false)}
          onChangeText={(input) => setInput(input)}
          onSubmitEditing={(e) => {
            setUrl(e.nativeEvent.text);
            setIsClicked(true);
          }}
        />
        {!isFocused ? (
          <Button title="Convert image to URL" onPress={pickAndConvertImage} />
        ) : null}
        {!isFocused && isClicked ? <ReadAndDefine imageURL={url} /> : null}
        <StatusBar style="auto" />
      </View>
    </SafeAreaProvider>
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
