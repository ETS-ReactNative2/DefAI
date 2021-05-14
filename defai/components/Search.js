import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SearchBar } from 'react-native-elements';
import Define from './Define';

export default function App() {
  const [isClicked, setIsClicked] = React.useState(false);
  const [input, setInput] = React.useState('');
  const [word, setWord] = React.useState('');
  const [isFocused, setFocused] = React.useState(false);

  const screenWidth = Dimensions.get('screen').width;
  const screenHeight = Dimensions.get('screen').height;
  console.log(screenWidth, screenHeight);

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <SearchBar
          round
          clearIcon
          value={input}
          platform="ios"
          cancelButtonTitle
          blurOnSubmit={true}
          returnKeyType="search"
          backgroundColor="white"
          cancelButtonTitle="Clear"
          searchIcon={{ size: 24 }}
          onBlur={() => setFocused(false)}
          placeholder="Type here an english word..."
          onFocus={() => {
            setFocused(true);
            setIsClicked(false);
          }}
          onChangeText={(input) => setInput(input)}
          onSubmitEditing={(e) => {
            // Take the text from the click event
            setWord(e.nativeEvent.text);
            setIsClicked(true);
          }}
        />
        {!isFocused && isClicked ? <Define word={word.toLowerCase()} /> : null}
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
