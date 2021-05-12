import React from 'react';
import { View, Text } from 'react-native';
import Define from './Define';

export default function ReadAndDefine(props) {
  const ocrSpaceToken = process.env.REACT_NATIVE_OCRSPACE;
  const [word, setWord] = React.useState(null);

  React.useEffect(() => {
    axios
      .get(
        `https://api.ocr.space/parse/imageurl?apikey=${ocrSpaceToken}&url=${props.imageURL}&language=eng`
      )
      .then((res) => console.log(res.data));
  }, [props.imageURL]);

  return (
    <View>
      <Text>Hello</Text>
    </View>
  );
}
