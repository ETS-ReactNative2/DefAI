import React from 'react';
import Define from './Define';

export default function ReadAndDefine(props) {
  const googleAPI = process.env.REACT_NATIVE_GOOGLE;
  const base64Img = props.base64image;
  const [word, setWord] = React.useState(null);

  const extractImage = async () => {
    let googleVisionRes = await fetch(
      'https://vision.googleapis.com/v1/images:annotate?key=' + googleAPI,
      {
        method: 'POST',
        body: JSON.stringify({
          requests: [
            {
              image: {
                content: base64Img,
              },
              features: [{ type: 'TEXT_DETECTION', maxResults: 5 }],
            },
          ],
        }),
      }
    );
    await googleVisionRes.json().then((res) => {
      try {
        setWord(res.responses[0].textAnnotations[1].description);
      } catch (e) {
        setWord('');
      }
    });
  };

  React.useEffect(() => {
    extractImage();
  }, [props.base64image]);

  return <Define word={word} />;
}
