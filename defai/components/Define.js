import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import { Image } from 'react-native-elements';

export default function Define(props) {
  const owlbotToken = process.env.REACT_NATIVE_OWLBOT;
  const unsplashToken = process.env.REACT_NATIVE_UNSPLASH;
  const [error, setError] = React.useState(false);
  const [toggle, setToggle] = React.useState(false);
  const [defInfo, setDefInfo] = React.useState([]);
  const [photo, setPhoto] = React.useState(null);

  const client = axios.create({
    baseURL: 'https://owlbot.info',
    timeout: 3000,
    headers: {
      Authorization: 'Token ' + owlbotToken,
      'Content-Type': 'application/json',
    },
  });

  const fetchData = async () => {
    client
      .get(`/api/v4/dictionary/${props.word}`)
      .then((res) => {
        setDefInfo(res.data);
        setToggle(true);
      })
      .catch(() => setError(true));
  };

  React.useEffect(() => {
    axios
      .get(
        `https://api.unsplash.com/search/photos?query=${props.word}&client_id=${unsplashToken}`
      )
      .then((res) => setPhoto(res.data.results[0].urls.small));
  });

  React.useEffect(() => {
    fetchData();
    return () => {
      return null;
    };
  }, [props.word]);

  if (toggle && !error) {
    return (
      <View style={styles.container}>
        <Text style={styles.titleWord}>{props.word}</Text>
        {defInfo.pronunciation ? (
          <Text style={styles.pronunciation}>/{defInfo.pronunciation}/</Text>
        ) : null}
        {photo ? (
          <Text style={{ marginTop: 14, fontSize: 18 }}>
            <Image
              source={{ uri: photo }}
              style={{ width: 200, height: 200 }}
            />
          </Text>
        ) : null}
        <Text />
        <FlatList
          data={defInfo.definitions}
          keyExtractor={(item) => item.definition + Math.random().toString()}
          renderItem={({ item }) => (
            <View style={styles.listItem}>
              <Text style={styles.listItemText}>
                <Text style={styles.titles}>Type</Text>: {item.type}
              </Text>
              <Text />
              <Text style={styles.listItemText}>
                <Text style={styles.titles}>Definition</Text>: {item.definition}
              </Text>
              {item.example ? (
                // Example is available
                <Text style={{ marginTop: 14, fontSize: 18 }}>
                  <Text />
                  <Text>
                    <Text style={styles.titles}>Example: </Text>
                    {item.example.charAt(0).toUpperCase() +
                      item.example.slice(1)}
                  </Text>
                </Text>
              ) : null}
              {item.emoji ? (
                // Emoji is available
                <Text style={{ marginTop: 14, fontSize: 18 }}>
                  <Text style={styles.titles}>Emoji</Text>: {item.emoji}
                </Text>
              ) : null}
            </View>
          )}
        ></FlatList>
      </View>
    );
  } else if (error) {
    return (
      // Error is returned
      <View style={(styles.listItem, { alignItems: 'center' })}>
        <Text style={styles.listItemText}>
          Word is not found in the database!
        </Text>
      </View>
    );
  } else {
    return (
      // Waiting to fetch data
      <View style={(styles.listItem, { alignItems: 'center' })}>
        <Text style={styles.listItemText}>Wait a minute</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
  },
  titleWord: {
    fontSize: 60,
    color: 'red',
  },
  pronunciation: {
    fontSize: 20,
  },
  titles: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'blue',
  },
  text: {
    fontSize: 20,
    color: '#101010',
    marginTop: 60,
    fontWeight: '700',
  },
  listItem: {
    marginTop: 10,
    padding: 20,
    backgroundColor: '#fff',
    width: '100%',
  },
  listItemText: {
    fontSize: 18,
  },
});
