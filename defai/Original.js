import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SearchBar, Header, Icon } from 'react-native-elements';
import Define from './components/Define';
import ExtractText from './components/ExtractText';

export default function App() {
  const [isClicked, setIsClicked] = React.useState(false);
  const [input, setInput] = React.useState('');
  const [word, setWord] = React.useState('');
  const [isFocused, setFocused] = React.useState(false);

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <Header
          leftComponent={
            <Icon
              name="camera"
              type="font-awesome"
              color="#fff"
              style={{ marginTop: 16 }}
              onPress={() => ExtractText()}
            />
          }
          rightComponent={{
            icon: 'mic',
            color: '#fff',
            size: 30,
            marginTop: 12,
          }}
          backgroundColor="#b5b3b3"
          centerComponent={{
            text: 'DefAI',
            style: {
              marginTop: 3,
              fontSize: 40,
              color: 'white',
              alignContent: 'center',
            },
          }}
        />
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
          placeholder="Type here an english word..."
          cancelButtonTitle="Clear"
          onFocus={() => {
            setFocused(true);
            setIsClicked(false);
          }}
          onBlur={() => setFocused(false)}
          onChangeText={(input) => setInput(input)}
          onSubmitEditing={(e) => {
            setWord(e.nativeEvent.text);
            setIsClicked(true);
          }}
        />
        {!isFocused && isClicked ? <Define word={word} /> : null}
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
